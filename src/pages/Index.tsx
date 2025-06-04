
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "MacBook Pro 16\"",
      brand: "Apple",
      price: "450 000",
      originalPrice: "500 000",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      specs: ["Puce M3 Pro", "32 Go RAM", "1 To SSD", "Écran 16.2\""],
      inStock: true
    },
    {
      id: 2,
      name: "ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: "320 000",
      originalPrice: "380 000",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
      specs: ["Intel i7", "16 Go RAM", "512 Go SSD", "Écran 14\""],
      inStock: true
    },
    {
      id: 3,
      name: "Surface Laptop 5",
      brand: "Microsoft",
      price: "250 000",
      originalPrice: "290 000",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
      specs: ["Intel i5", "8 Go RAM", "256 Go SSD", "Écran 13.5\""],
      inStock: false
    }
  ];

  const trustFeatures = [
    {
      icon: "🚀",
      title: "Livraison Rapide",
      description: "Livraison rapide et sécurisée à votre porte"
    },
    {
      icon: "🔧",
      title: "Support Expert",
      description: "Support technique professionnel et consultation"
    },
    {
      icon: "🛡️",
      title: "Garantie",
      description: "Garantie complète sur tous les produits"
    },
    {
      icon: "💰",
      title: "Meilleurs Prix",
      description: "Prix compétitifs et options de paiement flexibles"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rocdz-gray to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-rocdz-dark mb-6">
                <span className="text-rocdz-blue">Republicofcomputerdz</span>
                <br />
                Ordinateurs Portables Premium
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Découvrez les derniers ordinateurs portables des meilleures marques avec consultation professionnelle et prix compétitifs. Votre solution informatique parfaite vous attend.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-rocdz-blue hover:bg-rocdz-blue-dark text-white">
                  <Link to="/boutique">Acheter Maintenant</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-rocdz-blue text-rocdz-blue hover:bg-rocdz-blue hover:text-white">
                  <Link to="/contact">Obtenir une Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600"
                alt="Ordinateurs Portables ROCDZ"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rocdz-dark mb-4">
              Produits Vedettes
            </h2>
            <p className="text-xl text-gray-600">
              Ordinateurs portables sélectionnés avec le meilleur rapport qualité-prix
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
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
                        Rupture de Stock
                      </Badge>
                    )}
                    {product.originalPrice !== product.price && (
                      <Badge className="absolute top-2 left-2 bg-rocdz-red">
                        Promotion
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-rocdz-blue">{product.price} DZD</span>
                      {product.originalPrice !== product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice} DZD</span>
                      )}
                    </div>
                  </div>
                  <CardTitle className="mb-2">{product.name}</CardTitle>
                  <CardDescription className="mb-4">
                    <ul className="space-y-1">
                      {product.specs.map((spec, idx) => (
                        <li key={idx} className="text-sm">• {spec}</li>
                      ))}
                    </ul>
                  </CardDescription>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 bg-rocdz-blue hover:bg-rocdz-blue-dark" disabled={!product.inStock}>
                      <Link to={`/produit/${product.id}`}>
                        {product.inStock ? "Voir Détails" : "Me Notifier"}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-rocdz-blue text-rocdz-blue hover:bg-rocdz-blue hover:text-white">
                      <Link to="/contact">Contact</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-rocdz-blue text-rocdz-blue hover:bg-rocdz-blue hover:text-white">
              <Link to="/boutique">Voir Tous les Produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-rocdz-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-rocdz-dark mb-4">
              Pourquoi Choisir ROCDZ ?
            </h2>
            <p className="text-xl text-gray-600">
              Votre partenaire de confiance pour des solutions informatiques premium
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-rocdz-dark mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-rocdz-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt à Trouver Votre Ordinateur Portable Parfait ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Obtenez une consultation d'expert et trouvez le meilleur ordinateur portable pour vos besoins et votre budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-rocdz-blue hover:bg-rocdz-blue-dark">
              <Link to="/contact">Contactez-nous Maintenant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-rocdz-dark">
              <Link to="/promotions">Voir les Promotions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
