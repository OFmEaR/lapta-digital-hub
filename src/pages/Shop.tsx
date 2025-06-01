
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const Shop = () => {
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const { addToCart } = useCart();

  const brands = ["Apple", "Lenovo", "Microsoft", "Dell", "HP", "ASUS"];
  
  const products = [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      brand: "Apple",
      price: 249900,
      originalPrice: 279900,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      specs: ["Puce M3 Pro", "32GB RAM", "1TB SSD", "Écran 16.2\""],
      inStock: true,
      processor: "Puce M3 Pro",
      ram: "32GB",
      storage: "1TB SSD"
    },
    {
      id: 2,
      name: "ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: 189900,
      originalPrice: 219900,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
      specs: ["Intel i7", "16GB RAM", "512GB SSD", "Écran 14\""],
      inStock: true,
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD"
    },
    {
      id: 3,
      name: "Surface Laptop 5",
      brand: "Microsoft",
      price: 129900,
      originalPrice: 159900,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
      specs: ["Intel i5", "8GB RAM", "256GB SSD", "Écran 13.5\""],
      inStock: false,
      processor: "Intel i5",
      ram: "8GB",
      storage: "256GB SSD"
    },
    {
      id: 4,
      name: "Dell XPS 13",
      brand: "Dell",
      price: 99900,
      originalPrice: 119900,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      specs: ["Intel i5", "8GB RAM", "256GB SSD", "Écran 13.4\""],
      inStock: true,
      processor: "Intel i5",
      ram: "8GB",
      storage: "256GB SSD"
    },
    {
      id: 5,
      name: "HP Spectre x360",
      brand: "HP",
      price: 149900,
      originalPrice: 169900,
      image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500",
      specs: ["Intel i7", "16GB RAM", "512GB SSD", "Écran 13.5\""],
      inStock: true,
      processor: "Intel i7",
      ram: "16GB",
      storage: "512GB SSD"
    },
    {
      id: 6,
      name: "ASUS ZenBook 14",
      brand: "ASUS",
      price: 89900,
      originalPrice: 99900,
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500",
      specs: ["AMD Ryzen 7", "12GB RAM", "512GB SSD", "Écran 14\""],
      inStock: true,
      processor: "AMD Ryzen 7",
      ram: "12GB",
      storage: "512GB SSD"
    }
  ];

  const handleBrandChange = (brand: string, checked: boolean) => {
    if (checked) {
      setSelectedBrands([...selectedBrands, brand]);
    } else {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    }
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast({
      title: "Produit ajouté au panier!",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  const filteredProducts = products
    .filter(product => 
      product.price >= priceRange[0] && 
      product.price <= priceRange[1] &&
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-lapta-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-lapta-dark mb-4">
            Boutique d'Ordinateurs Portables
          </h1>
          <p className="text-gray-600">
            Trouvez l'ordinateur portable parfait pour vos besoins avec nos options de filtrage avancées
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filtres</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Gamme de prix: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} DZD
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500000}
                  min={0}
                  step={10000}
                  className="mb-2"
                />
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Marque</label>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                      />
                      <label htmlFor={brand} className="text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium mb-2">Trier par</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Nom A-Z</SelectItem>
                    <SelectItem value="price-low">Prix: Croissant</SelectItem>
                    <SelectItem value="price-high">Prix: Décroissant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                Affichage de {filteredProducts.length} sur {products.length} produits
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {!product.inStock && (
                        <Badge variant="destructive" className="absolute top-2 right-2">
                          Rupture de stock
                        </Badge>
                      )}
                      {product.originalPrice !== product.price && (
                        <Badge className="absolute top-2 left-2 bg-lapta-red">
                          Promo
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{product.brand}</Badge>
                      <div className="text-right">
                        <span className="text-xl font-bold text-lapta-orange">{product.price.toLocaleString()} DZD</span>
                        {product.originalPrice !== product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice.toLocaleString()} DZD</span>
                        )}
                      </div>
                    </div>
                    <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
                    <div className="space-y-1 mb-4 text-sm text-gray-600">
                      <p>• {product.processor}</p>
                      <p>• {product.ram} RAM</p>
                      <p>• {product.storage}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-lapta-orange hover:bg-lapta-orange/90" 
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Ajouter au panier" : "Rupture"}
                      </Button>
                      <Button asChild variant="outline" className="border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
                        <Link to={`/produit/${product.id}`}>Détails</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Aucun produit trouvé correspondant à vos critères.</p>
                <Button 
                  onClick={() => {
                    setPriceRange([0, 500000]);
                    setSelectedBrands([]);
                  }}
                  className="mt-4 bg-lapta-orange hover:bg-lapta-orange/90"
                >
                  Effacer les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
