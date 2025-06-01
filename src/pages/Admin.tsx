
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    price: "",
    originalPrice: "",
    processor: "",
    ram: "",
    storage: "",
    image: "",
    inStock: true
  });

  useEffect(() => {
    // Load products and orders from localStorage
    const savedProducts = localStorage.getItem('adminProducts');
    const savedOrders = localStorage.getItem('orders');
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      ...productForm,
      price: parseInt(productForm.price),
      originalPrice: parseInt(productForm.originalPrice) || parseInt(productForm.price),
      specs: [productForm.processor, productForm.ram, productForm.storage]
    };

    let updatedProducts;
    if (editingProduct) {
      updatedProducts = products.map(p => p.id === editingProduct.id ? newProduct : p);
      toast({ title: "Produit modifié avec succès!" });
    } else {
      updatedProducts = [...products, newProduct];
      toast({ title: "Produit ajouté avec succès!" });
    }

    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    
    // Reset form
    setProductForm({
      name: "",
      brand: "",
      price: "",
      originalPrice: "",
      processor: "",
      ram: "",
      storage: "",
      image: "",
      inStock: true
    });
    setShowAddProduct(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product: any) => {
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      originalPrice: product.originalPrice.toString(),
      processor: product.processor,
      ram: product.ram,
      storage: product.storage,
      image: product.image,
      inStock: product.inStock
    });
    setEditingProduct(product);
    setShowAddProduct(true);
  };

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));
    toast({ title: "Produit supprimé" });
  };

  const updateOrderStatus = (orderId: number, status: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    toast({ title: "Statut de commande mis à jour" });
  };

  return (
    <div className="min-h-screen bg-lapta-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-lapta-dark mb-8">Tableau de bord administrateur</h1>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Gestion des produits</h2>
              <Button 
                onClick={() => setShowAddProduct(true)}
                className="bg-lapta-orange hover:bg-lapta-orange/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
            </div>

            {showAddProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingProduct ? "Modifier le produit" : "Ajouter un nouveau produit"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProductSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand">Marque</Label>
                        <Select value={productForm.brand} onValueChange={(value) => setProductForm({...productForm, brand: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une marque" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Apple">Apple</SelectItem>
                            <SelectItem value="Lenovo">Lenovo</SelectItem>
                            <SelectItem value="Microsoft">Microsoft</SelectItem>
                            <SelectItem value="Dell">Dell</SelectItem>
                            <SelectItem value="HP">HP</SelectItem>
                            <SelectItem value="ASUS">ASUS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Prix (DZD)</Label>
                        <Input
                          id="price"
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="originalPrice">Prix original (DZD)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="processor">Processeur</Label>
                        <Input
                          id="processor"
                          value={productForm.processor}
                          onChange={(e) => setProductForm({...productForm, processor: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="ram">RAM</Label>
                        <Input
                          id="ram"
                          value={productForm.ram}
                          onChange={(e) => setProductForm({...productForm, ram: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="storage">Stockage</Label>
                        <Input
                          id="storage"
                          value={productForm.storage}
                          onChange={(e) => setProductForm({...productForm, storage: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={productForm.image}
                        onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                        required
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={productForm.inStock}
                        onChange={(e) => setProductForm({...productForm, inStock: e.target.checked})}
                      />
                      <Label htmlFor="inStock">En stock</Label>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" className="bg-lapta-orange hover:bg-lapta-orange/90">
                        {editingProduct ? "Modifier" : "Ajouter"}
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setShowAddProduct(false);
                          setEditingProduct(null);
                          setProductForm({
                            name: "",
                            brand: "",
                            price: "",
                            originalPrice: "",
                            processor: "",
                            ram: "",
                            storage: "",
                            image: "",
                            inStock: true
                          });
                        }}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Liste des produits</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Marque</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.price.toLocaleString()} DZD</TableCell>
                        <TableCell>
                          <Badge variant={product.inStock ? "default" : "destructive"}>
                            {product.inStock ? "En stock" : "Rupture"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <h2 className="text-2xl font-semibold">Gestion des commandes</h2>
            
            <Card>
              <CardHeader>
                <CardTitle>Commandes récentes</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>
                          {order.customer.firstName} {order.customer.lastName}
                        </TableCell>
                        <TableCell>{order.total.toLocaleString()} DZD</TableCell>
                        <TableCell>
                          {new Date(order.date).toLocaleDateString('fr-FR')}
                        </TableCell>
                        <TableCell>
                          <Select 
                            value={order.status} 
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="En attente">En attente</SelectItem>
                              <SelectItem value="Confirmée">Confirmée</SelectItem>
                              <SelectItem value="En préparation">En préparation</SelectItem>
                              <SelectItem value="Expédiée">Expédiée</SelectItem>
                              <SelectItem value="Livrée">Livrée</SelectItem>
                              <SelectItem value="Annulée">Annulée</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Stats Tab */}
          <TabsContent value="stats" className="space-y-6">
            <h2 className="text-2xl font-semibold">Statistiques</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Produits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-lapta-orange">
                    {products.length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Total Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-lapta-orange">
                    {orders.length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Chiffre d'affaires</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-lapta-orange">
                    {orders.reduce((total, order) => total + order.total, 0).toLocaleString()} DZD
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
