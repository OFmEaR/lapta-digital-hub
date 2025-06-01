
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: 1,
    name: "MacBook Pro 16\"",
    brand: "Apple",
    price: 2499,
    originalPrice: 2799,
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
    ],
    inStock: true,
    stockCount: 12,
    description: "The MacBook Pro 16-inch delivers exceptional performance for professionals. With the powerful M3 Pro chip, stunning Liquid Retina XDR display, and all-day battery life, it's designed for those who demand the very best.",
    specs: {
      processor: "Apple M3 Pro chip with 12-core CPU and 18-core GPU",
      memory: "32GB unified memory",
      storage: "1TB SSD storage",
      display: "16.2-inch Liquid Retina XDR display (3456 x 2234)",
      graphics: "18-core GPU",
      ports: "3 x Thunderbolt 4, HDMI, SDXC card slot, MagSafe 3",
      wireless: "Wi-Fi 6E, Bluetooth 5.3",
      camera: "1080p FaceTime HD camera",
      audio: "Six-speaker system with force-cancelling woofers",
      keyboard: "Backlit Magic Keyboard with Touch ID",
      battery: "Up to 22 hours video playback",
      weight: "4.8 pounds (2.16 kg)",
      dimensions: "14.01 x 9.77 x 0.66 inches"
    },
    features: [
      "M3 Pro chip for incredible performance",
      "Liquid Retina XDR display with 1000 nits sustained brightness",
      "Advanced camera and audio for video calls",
      "All-day battery life",
      "Studio-quality three-microphone array",
      "Touch ID for secure login and payments"
    ],
    warranty: "1-year limited warranty included, AppleCare+ available"
  };

  const handleContactWhatsApp = () => {
    const message = `Hi! I'm interested in the ${product.name} (${product.brand}) priced at $${product.price}. Can you provide more information?`;
    const whatsappUrl = `https://wa.me/0783026420?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleContactCall = () => {
    window.location.href = 'tel:0783026420';
  };

  const handleNotifyStock = () => {
    toast({
      title: "Stock Notification",
      description: "We'll notify you when this item is back in stock!",
    });
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-lapta-orange">Home</Link></li>
            <li>/</li>
            <li><Link to="/shop" className="hover:text-lapta-orange">Shop</Link></li>
            <li>/</li>
            <li className="text-lapta-orange">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-lapta-orange' : 'border-gray-200'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-lapta-dark mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-lapta-orange">${product.price}</span>
                {product.originalPrice !== product.price && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {product.originalPrice !== product.price && (
                  <Badge className="bg-lapta-red">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                {product.inStock ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 font-medium">
                      In Stock ({product.stockCount} available)
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  </>
                )}
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.inStock ? (
                  <>
                    <Button 
                      onClick={handleContactWhatsApp}
                      className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-2"
                    >
                      <span>💬</span>
                      <span>WhatsApp</span>
                    </Button>
                    <Button 
                      onClick={handleContactCall}
                      className="bg-lapta-orange hover:bg-lapta-orange/90 flex items-center justify-center space-x-2"
                    >
                      <span>📞</span>
                      <span>Call Now</span>
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={handleNotifyStock}
                    className="col-span-2 bg-gray-600 hover:bg-gray-700"
                  >
                    Notify When Available
                  </Button>
                )}
              </div>
              <Button asChild variant="outline" className="w-full border-lapta-orange text-lapta-orange hover:bg-lapta-orange hover:text-white">
                <Link to="/contact">Get Custom Quote</Link>
              </Button>
            </div>

            {/* Quick Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="text-lapta-orange">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Specifications */}
        <div className="mt-16">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="warranty">Warranty</TabsTrigger>
            </TabsList>
            
            <TabsContent value="specs" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Specifications</CardTitle>
                  <CardDescription>Complete technical details and specifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-2">
                        <dt className="font-medium text-lapta-dark capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </dt>
                        <dd className="text-gray-600 mt-1">{value}</dd>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="features" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Product Features</CardTitle>
                  <CardDescription>What makes this laptop special</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-lapta-gray rounded-lg">
                        <span className="text-lapta-orange text-xl">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="warranty" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Warranty Information</CardTitle>
                  <CardDescription>Protection and support details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">{product.warranty}</p>
                    <div className="bg-lapta-gray p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">What's Covered:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Hardware defects and malfunctions</li>
                        <li>• Manufacturing defects</li>
                        <li>• Technical support</li>
                        <li>• Repair or replacement services</li>
                      </ul>
                    </div>
                    <Button asChild className="bg-lapta-orange hover:bg-lapta-orange/90">
                      <Link to="/contact">Contact for Extended Warranty</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
