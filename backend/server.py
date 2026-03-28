from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, status
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId
import os
import logging
import bcrypt
import jwt
import secrets

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# JWT Configuration
JWT_ALGORITHM = "HS256"
JWT_SECRET = os.environ.get("JWT_SECRET")

# ==================== Password Hashing ====================
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# ==================== JWT Token Management ====================
def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

# ==================== Auth Helper ====================
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== Models ====================
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str = Field(alias="_id")
    email: str
    name: str
    role: str
    created_at: datetime

    class Config:
        populate_by_name = True

class Product(BaseModel):
    name: str
    price: float
    promo_price: Optional[float] = None
    category: str
    image: str
    in_stock: bool = True
    featured: bool = False
    discount: Optional[int] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ProductResponse(BaseModel):
    id: str
    name: str
    price: float
    promoPrice: Optional[float] = None
    category: str
    image: str
    inStock: bool
    featured: bool
    discount: Optional[int] = None
    isNew: bool = False

class ProductCreate(BaseModel):
    name: str
    price: float
    promoPrice: Optional[float] = None
    category: str
    image: str
    inStock: bool = True
    featured: bool = False
    discount: Optional[int] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    promoPrice: Optional[float] = None
    category: Optional[str] = None
    image: Optional[str] = None
    inStock: Optional[bool] = None
    featured: Optional[bool] = None
    discount: Optional[int] = None

# ==================== Helper Functions ====================
def product_helper(product) -> dict:
    return {
        "id": str(product["_id"]),
        "name": product["name"],
        "price": product["price"],
        "promoPrice": product.get("promo_price"),
        "category": product["category"],
        "image": product["image"],
        "inStock": product.get("in_stock", True),
        "featured": product.get("featured", False),
        "discount": product.get("discount"),
        "isNew": product["category"] == "NOVA COLEÇÃO"
    }

# ==================== Auth Routes ====================
@api_router.post("/auth/login")
async def login(credentials: LoginRequest, response: Response):
    email = credentials.email.lower()
    user = await db.users.find_one({"email": email})
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=3600,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    return {
        "_id": user_id,
        "email": user["email"],
        "name": user.get("name", "Admin"),
        "role": user.get("role", "admin"),
        "created_at": user.get("created_at")
    }

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

# ==================== Product Routes ====================
@api_router.get("/products", response_model=List[ProductResponse])
async def get_products(category: Optional[str] = None):
    query = {}
    if category:
        query["category"] = category
    
    products = await db.products.find(query).to_list(1000)
    return [product_helper(product) for product in products]

@api_router.get("/products/{product_id}", response_model=ProductResponse)
async def get_product(product_id: str):
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    product = await db.products.find_one({"_id": ObjectId(product_id)})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product_helper(product)

@api_router.post("/products", response_model=ProductResponse)
async def create_product(
    product: ProductCreate,
    current_user: dict = Depends(get_current_user)
):
    product_dict = {
        "name": product.name,
        "price": product.price,
        "promo_price": product.promoPrice,
        "category": product.category,
        "image": product.image,
        "in_stock": product.inStock,
        "featured": product.featured,
        "discount": product.discount,
        "created_at": datetime.now(timezone.utc)
    }
    
    result = await db.products.insert_one(product_dict)
    created_product = await db.products.find_one({"_id": result.inserted_id})
    
    return product_helper(created_product)

@api_router.put("/products/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: str,
    product_update: ProductUpdate,
    current_user: dict = Depends(get_current_user)
):
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    update_data = {}
    if product_update.name is not None:
        update_data["name"] = product_update.name
    if product_update.price is not None:
        update_data["price"] = product_update.price
    if product_update.promoPrice is not None:
        update_data["promo_price"] = product_update.promoPrice
    if product_update.category is not None:
        update_data["category"] = product_update.category
    if product_update.image is not None:
        update_data["image"] = product_update.image
    if product_update.inStock is not None:
        update_data["in_stock"] = product_update.inStock
    if product_update.featured is not None:
        update_data["featured"] = product_update.featured
    if product_update.discount is not None:
        update_data["discount"] = product_update.discount
    
    if not update_data:
        raise HTTPException(status_code=400, detail="No fields to update")
    
    result = await db.products.update_one(
        {"_id": ObjectId(product_id)},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    updated_product = await db.products.find_one({"_id": ObjectId(product_id)})
    return product_helper(updated_product)

@api_router.delete("/products/{product_id}")
async def delete_product(
    product_id: str,
    current_user: dict = Depends(get_current_user)
):
    if not ObjectId.is_valid(product_id):
        raise HTTPException(status_code=400, detail="Invalid product ID")
    
    result = await db.products.delete_one({"_id": ObjectId(product_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return {"message": "Product deleted successfully"}

# ==================== Root Route ====================
@api_router.get("/")
async def root():
    return {"message": "Julia Semi Joias API"}

# Include the router in the main app
app.include_router(api_router)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://julia-semi-joias.preview.emergentagent.com", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ==================== Startup Events ====================
@app.on_event("startup")
async def startup_event():
    # Create indexes
    await db.users.create_index("email", unique=True)
    logger.info("Created database indexes")
    
    # Seed admin user
    await seed_admin()
    logger.info("Admin user seeded")
    
    # Write test credentials
    await write_test_credentials()
    logger.info("Test credentials written")

async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@juliasemijoias.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "julia2024")
    
    existing = await db.users.find_one({"email": admin_email})
    
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc)
        })
        logger.info(f"Admin user created: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one(
            {"email": admin_email},
            {"$set": {"password_hash": hash_password(admin_password)}}
        )
        logger.info(f"Admin password updated: {admin_email}")

async def write_test_credentials():
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@juliasemijoias.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "julia2024")
    
    credentials_path = Path("/app/memory/test_credentials.md")
    credentials_path.parent.mkdir(exist_ok=True)
    
    content = f"""# Test Credentials - Julia Semi Joias

## Admin User
- **Email:** {admin_email}
- **Password:** {admin_password}
- **Role:** admin

## Auth Endpoints
- POST /api/auth/login
- GET /api/auth/me
- POST /api/auth/logout

## Product Endpoints
- GET /api/products
- GET /api/products/{{product_id}}
- POST /api/products (authenticated)
- PUT /api/products/{{product_id}} (authenticated)
- DELETE /api/products/{{product_id}} (authenticated)

## Testing Notes
- All authenticated routes require login first
- Tokens are stored in httpOnly cookies
- Frontend URL: https://julia-semi-joias.preview.emergentagent.com
- Admin panel: https://julia-semi-joias.preview.emergentagent.com/admin/login
"""
    
    credentials_path.write_text(content)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
