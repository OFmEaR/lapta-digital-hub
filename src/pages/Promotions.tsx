
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const Promotions = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7); // 7 days from now

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const promotionalProducts = [
    {
      id: 1,
      name: "MacBook Air M2",
      brand: "Apple",
      price: 999,
      originalPrice: 1199,
      discount: 17,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500",
      specs: ["M2 Chip", "8GB RAM", "256GB SSD", "13.6\" Display"],
      inStock: true,
      dealType: "Flash Sale"
    },
    {
      id: 2,
      name: "Dell Inspiron 15",
      brand: "Dell",
      price: 649,
      originalPrice: 899,
      discount: 28,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",
      specs: ["Intel i5", "8GB RAM", "512GB SSD", "15.6\" Display"],
      inStock: true,
      dealType: "Weekly Deal"
    },
    {
      id: 3,
      name: "HP Pavilion Gaming",
      brand: "HP",
      price: 799,
      originalPrice: 1099,
      discount: 27,
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500",
      specs: ["AMD Ryzen 5", "16GB RAM", "512GB SSD", "15.6\" Display"],
      inStock: true,
      dealType: "Clearance"
    },
    {
      id: 4,
      name: "Lenovo ThinkPad E14",
      brand: "Lenovo",
      price: 549,
      originalPrice: 749,
      discount: 27,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500",
      specs: ["Intel i5", "8GB RAM", "256GB SSD", "14\" Display"],
      inStock: true,
      dealType: "Bundle Deal"
    },
    {
      id: 5,
      name: "ASUS ROG Strix",
      brand: "ASUS",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
      specs: ["Intel i7", "16GB RAM", "1TB SSD", "15.6\" Display"],
      inStock: false,
      dealType: "Pre-order"
    },
    {
      id: 6,
      name: "Microsoft Surface Pro 9",
      brand: "Microsoft",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500",
      specs: ["Intel i5", "8GB RAM", "256GB SSD", "13\" Display"],
      inStock: true,
      dealType: "Limited Time"
    }
  ];

  const dealTypeColors = {
    "Flash Sale": "bg-red-500",
    "Weekly Deal": "bg-lapta-orange",
    "Clearance": "bg-purple-500",
    "Bundle Deal": "bg-blue-500",
    "Pre-order": "bg-gray-500",
    "Limited Time": "bg-green-500"
  };

  return (
    <div className="min-h-screen bg-lapta-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-lapta-dark mb-4">
            🔥 Hot Deals & Promotions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Limited time offers on premium laptops - Save up to 30%!
          </p>
          
          {/* Countdown Timer */}
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-lapta-dark mb-4">⏰ Sale Ends In:</h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <div className="bg-lapta-orange text-white rounded-lg p-4">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-sm">Days</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-lapta-orange text-white rounded-lg p-4">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-sm">Hours</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-lapta-orange text-white rounded-lg p-4">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-sm">Minutes</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-lapta-orange text-white rounded-lg p-4">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-sm">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promotionalProducts.map((product, index) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 animate-fade-in overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Deal Type Badge */}
                  <Badge className={`absolute top-2 left-2 text-white ${dealTypeColors[product.dealType as keyof typeof dealTypeColors]}`}>
                    {product.dealType}
                  </Badge>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-2 right-2 bg-lapta-red text-white rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold">{product.discount}%</div>
                      <div className="text-xs">OFF</div>
                    </div>
                  </div>
                  
                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-2">
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{product.brand}</Badge>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-lapta-orange">${product.price}</div>
                    <div className="text-sm text-gray-500 line-through">${product.originalPrice}</div>
                  </div>
                </div>
                
                <CardTitle className="mb-2 text-lg">{product.name}</CardTitle>
                
                <div className="space-y-1 mb-4 text-sm text-gray-600">
                  {product.specs.map((spec, idx) => (
                    <p key={idx}>• {spec}</p>
                  ))}
                </div>
                
                <div className="text-center mb-4">
                  <div className="bg-green-100 text-green-800 rounded-lg p-2">
                    <span className="font-semibold">You Save: ${product.originalPrice - product.price}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {product.inStock ? (
                    <>
                      <Button asChild className="w-full bg-lapta-orange hover:bg-lapta-orange/90">
                        <Link to={`/product/${product.id}`}>View Deal</Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
                        <Link to="/contact">Contact for Deal</Link>
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full bg-gray-600 hover:bg-gray-700" disabled>
                      Notify Me When Available
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Special Offers Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-lapta-dark text-center mb-8">
            💎 Exclusive Offers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-lapta-orange to-lapta-red text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">🎁 Bundle Deals</h3>
                <p className="mb-4">Buy a laptop + accessories and save up to 15% extra!</p>
                <Button asChild variant="secondary">
                  <Link to="/shop">View Bundles</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">🔄 Trade-In Program</h3>
                <p className="mb-4">Trade your old laptop and get instant credit towards a new one!</p>
                <Button asChild variant="secondary">
                  <Link to="/contact">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">📱 Student Discounts</h3>
                <p className="mb-4">Students get an additional 10% off on all laptops!</p>
                <Button asChild variant="secondary">
                  <Link to="/contact">Verify Student Status</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-lapta-dark text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Don't Miss Out!</h2>
          <p className="text-xl mb-6">
            These deals won't last long. Contact us now to secure your favorite laptop at the best price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-lapta-orange hover:bg-lapta-orange/90">
              <Link to="/contact">Contact Us Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-lapta-dark">
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
