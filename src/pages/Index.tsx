
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
      price: "$2,499",
      originalPrice: "$2,799",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
      specs: ["M3 Pro Chip", "32GB RAM", "1TB SSD", "16.2\" Display"],
      inStock: true
    },
    {
      id: 2,
      name: "ThinkPad X1 Carbon",
      brand: "Lenovo",
      price: "$1,899",
      originalPrice: "$2,199",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
      specs: ["Intel i7", "16GB RAM", "512GB SSD", "14\" Display"],
      inStock: true
    },
    {
      id: 3,
      name: "Surface Laptop 5",
      brand: "Microsoft",
      price: "$1,299",
      originalPrice: "$1,599",
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
      specs: ["Intel i5", "8GB RAM", "256GB SSD", "13.5\" Display"],
      inStock: false
    }
  ];

  const trustFeatures = [
    {
      icon: "🚀",
      title: "Fast Delivery",
      description: "Quick and secure delivery to your doorstep"
    },
    {
      icon: "🔧",
      title: "Expert Support",
      description: "Professional technical support and consultation"
    },
    {
      icon: "🛡️",
      title: "Warranty",
      description: "Comprehensive warranty on all products"
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive pricing and flexible payment options"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lapta-gray to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-lapta-dark mb-6">
                Premium Laptops for 
                <span className="text-lapta-orange"> Every Need</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover the latest laptops from top brands with professional consultation and competitive prices. Your perfect computing solution awaits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-lapta-orange hover:bg-lapta-orange/90 text-white">
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
                  <Link to="/contact">Get Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <img 
                src="/lovable-uploads/1a8dd20f-0b34-4d3b-9dd7-d37993f51dcd.png"
                alt="LAPTA Laptops"
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
            <h2 className="text-3xl md:text-4xl font-bold text-lapta-dark mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked laptops with the best value and performance
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
                        Out of Stock
                      </Badge>
                    )}
                    {product.originalPrice !== product.price && (
                      <Badge className="absolute top-2 left-2 bg-lapta-red">
                        Sale
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{product.brand}</Badge>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-lapta-orange">{product.price}</span>
                      {product.originalPrice !== product.price && (
                        <span className="text-sm text-gray-500 line-through ml-2">{product.originalPrice}</span>
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
                    <Button asChild className="flex-1 bg-lapta-orange hover:bg-lapta-orange/90" disabled={!product.inStock}>
                      <Link to={`/product/${product.id}`}>
                        {product.inStock ? "View Details" : "Notify Me"}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
                      <Link to="/contact">Contact</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
              <Link to="/shop">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-lapta-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-lapta-dark mb-4">
              Why Choose LAPTA?
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted partner for premium computing solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center group animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-lapta-dark mb-2">
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
      <section className="py-20 bg-lapta-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Get expert consultation and find the best laptop for your needs and budget
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-lapta-orange hover:bg-lapta-orange/90">
              <Link to="/contact">Contact Us Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-lapta-dark">
              <Link to="/promotions">View Promotions</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
