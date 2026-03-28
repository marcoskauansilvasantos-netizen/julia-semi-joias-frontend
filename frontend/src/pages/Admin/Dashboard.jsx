import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Plus, LogOut, Pencil, Trash2 } from 'lucide-react';
import { mockProducts } from '../../mock/mockData';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    promoPrice: '',
    category: 'OURO 10K',
    image: '',
    inStock: true,
    featured: false,
    discount: ''
  });

  useEffect(() => {
    // Verificar autenticação
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }

    // Carregar produtos do mock
    const allProducts = [
      ...mockProducts.ouro10k,
      ...mockProducts.prata925,
      ...mockProducts.novaColecao
    ];
    setProducts(allProducts);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logout realizado com sucesso');
    navigate('/admin/login');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Editar produto existente
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), promoPrice: formData.promoPrice ? parseFloat(formData.promoPrice) : null }
          : p
      ));
      toast.success('Produto atualizado com sucesso!');
      setEditingProduct(null);
    } else {
      // Adicionar novo produto
      const newProduct = {
        id: products.length + 1,
        ...formData,
        price: parseFloat(formData.price),
        promoPrice: formData.promoPrice ? parseFloat(formData.promoPrice) : null,
        discount: formData.discount ? parseInt(formData.discount) : null
      };
      setProducts(prev => [...prev, newProduct]);
      toast.success('Produto adicionado com sucesso!');
    }

    // Resetar formulário
    setFormData({
      name: '',
      price: '',
      promoPrice: '',
      category: 'OURO 10K',
      image: '',
      inStock: true,
      featured: false,
      discount: ''
    });
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      promoPrice: product.promoPrice ? product.promoPrice.toString() : '',
      category: product.category,
      image: product.image,
      inStock: product.inStock,
      featured: product.featured,
      discount: product.discount ? product.discount.toString() : ''
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast.success('Produto excluído com sucesso!');
    }
  };

  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-header-content">
          <h1 className="admin-title">Painel Administrativo</h1>
          <Button onClick={handleLogout} variant="outline" className="logout-button">
            <LogOut size={16} /> Sair
          </Button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-actions">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="add-product-button">
                <Plus size={16} /> Adicionar Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="dialog-content-admin">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="product-form">
                <div className="form-group">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Label htmlFor="price">Preço (R$)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="promoPrice">Preço Promocional (R$)</Label>
                    <Input
                      id="promoPrice"
                      type="number"
                      step="0.01"
                      value={formData.promoPrice}
                      onChange={(e) => handleInputChange('promoPrice', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OURO 10K">Ouro 10K</SelectItem>
                        <SelectItem value="PRATA 925">Prata 925</SelectItem>
                        <SelectItem value="NOVA COLEÇÃO">Nova Coleção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="discount">Desconto (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => handleInputChange('discount', e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    required
                  />
                </div>

                <div className="form-switches">
                  <div className="switch-group">
                    <Label htmlFor="inStock">Em Estoque</Label>
                    <Switch
                      id="inStock"
                      checked={formData.inStock}
                      onCheckedChange={(checked) => handleInputChange('inStock', checked)}
                    />
                  </div>

                  <div className="switch-group">
                    <Label htmlFor="featured">Produto Destaque</Label>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange('featured', checked)}
                    />
                  </div>
                </div>

                <Button type="submit" className="submit-button">
                  {editingProduct ? 'Salvar Alterações' : 'Adicionar Produto'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="all" className="products-tabs">
          <TabsList className="tabs-list-admin">
            <TabsTrigger value="all">Todos ({products.length})</TabsTrigger>
            <TabsTrigger value="nova">Nova Coleção ({getProductsByCategory('NOVA COLEÇÃO').length})</TabsTrigger>
            <TabsTrigger value="ouro">Ouro 10K ({getProductsByCategory('OURO 10K').length})</TabsTrigger>
            <TabsTrigger value="prata">Prata 925 ({getProductsByCategory('PRATA 925').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="tab-content-admin">
            <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="nova" className="tab-content-admin">
            <ProductsTable products={getProductsByCategory('NOVA COLEÇÃO')} onEdit={handleEdit} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="ouro" className="tab-content-admin">
            <ProductsTable products={getProductsByCategory('OURO 10K')} onEdit={handleEdit} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="prata" className="tab-content-admin">
            <ProductsTable products={getProductsByCategory('PRATA 925')} onEdit={handleEdit} onDelete={handleDelete} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ProductsTable = ({ products, onEdit, onDelete }) => {
  return (
    <div className="products-table-container">
      {products.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum produto encontrado</p>
        </div>
      ) : (
        <div className="products-grid-admin">
          {products.map((product) => (
            <Card key={product.id} className="product-card-admin">
              <CardHeader className="product-card-header">
                <img src={product.image} alt={product.name} className="product-image-admin" />
              </CardHeader>
              <CardContent className="product-card-content">
                <CardTitle className="product-name-admin">{product.name}</CardTitle>
                <div className="product-details">
                  <p className="product-category">{product.category}</p>
                  <p className="product-price-admin">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                    {product.promoPrice && (
                      <span className="promo-price-admin">
                        {' '}→ R$ {product.promoPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </p>
                  <div className="product-badges">
                    {product.inStock ? (
                      <span className="badge-stock">Em Estoque</span>
                    ) : (
                      <span className="badge-out">Esgotado</span>
                    )}
                    {product.featured && <span className="badge-featured">Destaque</span>}
                  </div>
                </div>
                <div className="product-actions">
                  <Button
                    onClick={() => onEdit(product)}
                    variant="outline"
                    size="sm"
                    className="action-button"
                  >
                    <Pencil size={14} /> Editar
                  </Button>
                  <Button
                    onClick={() => onDelete(product.id)}
                    variant="destructive"
                    size="sm"
                    className="action-button"
                  >
                    <Trash2 size={14} /> Excluir
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
