#!/usr/bin/env python3
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

async def seed_products():
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    # Check if products already exist
    count = await db.products.count_documents({})
    if count > 0:
        print(f"Database already has {count} products. Skipping seed.")
        client.close()
        return
    
    products = [
        # Nova Coleção (15% OFF)
        {
            "name": "Brinco ear cuff way",
            "price": 135.00,
            "promo_price": 114.75,
            "category": "NOVA COLEÇÃO",
            "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
            "in_stock": True,
            "featured": True,
            "discount": 15,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Bracelete infinito",
            "price": 130.00,
            "promo_price": 110.50,
            "category": "NOVA COLEÇÃO",
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
            "in_stock": True,
            "featured": True,
            "discount": 15,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Bracelete luz",
            "price": 120.00,
            "promo_price": 102.00,
            "category": "NOVA COLEÇÃO",
            "image": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
            "in_stock": True,
            "featured": True,
            "discount": 15,
            "created_at": datetime.now(timezone.utc)
        },
        # Ouro 10K
        {
            "name": "Brinco trio de argolas",
            "price": 155.00,
            "promo_price": None,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400",
            "in_stock": True,
            "featured": True,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Brinco meia argola",
            "price": 110.00,
            "promo_price": None,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1588444650681-294e97c8f274?w=400",
            "in_stock": True,
            "featured": True,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Brinco longo cristal",
            "price": 175.00,
            "promo_price": 166.25,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
            "in_stock": True,
            "featured": True,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Brinco coração",
            "price": 130.00,
            "promo_price": None,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Pulseira corações",
            "price": 55.00,
            "promo_price": None,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Bracelete torcido",
            "price": 135.00,
            "promo_price": None,
            "category": "OURO 10K",
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        # Prata 925
        {
            "name": "Tornozeleira trio de coração",
            "price": 95.00,
            "promo_price": None,
            "category": "PRATA 925",
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
            "in_stock": True,
            "featured": True,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Pulseira celestial",
            "price": 130.00,
            "promo_price": 123.50,
            "category": "PRATA 925",
            "image": "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
            "in_stock": True,
            "featured": True,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Bracelete liso",
            "price": 158.00,
            "promo_price": None,
            "category": "PRATA 925",
            "image": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Colar choker",
            "price": 105.00,
            "promo_price": 89.25,
            "category": "PRATA 925",
            "image": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Anel zircônias",
            "price": 95.00,
            "promo_price": None,
            "category": "PRATA 925",
            "image": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
            "in_stock": True,
            "featured": False,
            "discount": None,
            "created_at": datetime.now(timezone.utc)
        },
    ]
    
    result = await db.products.insert_many(products)
    print(f"✅ Seeded {len(result.inserted_ids)} products successfully!")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(seed_products())
