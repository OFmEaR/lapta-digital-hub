
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Boutique", path: "/boutique" },
    { name: "Promotions", path: "/promotions" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/f9ae0785-a0fe-4fea-b215-6aaa3791c262.png" 
              alt="LAPTA" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-lapta-orange border-b-2 border-lapta-orange"
                    : "text-gray-700 hover:text-lapta-orange"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Cart Button */}
            <Link to="/panier" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-lapta-orange text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button className="bg-lapta-orange hover:bg-lapta-orange/90 text-white">
              Devis Gratuit
            </Button>
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.path)
                        ? "text-lapta-orange"
                        : "text-gray-700 hover:text-lapta-orange"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link 
                  to="/panier" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-lapta-orange"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Panier ({cartCount})
                </Link>
                <Button className="bg-lapta-orange hover:bg-lapta-orange/90 text-white w-full mt-4">
                  Devis Gratuit
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
