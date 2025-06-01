
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleWhatsApp = () => {
    const message = "Hi! I'd like to inquire about your laptop products and services.";
    const whatsappUrl = `https://wa.me/0783026420?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleMessenger = () => {
    // Replace with actual Facebook page ID
    const messengerUrl = "https://m.me/YourFacebookPageID";
    window.open(messengerUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-lapta-gray py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-lapta-dark mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Get in touch with our experts for personalized laptop recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredContact">Preferred Contact Method</Label>
                      <Select value={formData.preferredContact} onValueChange={(value) => handleChange("preferredContact", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="How should we contact you?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="phone">Phone Call</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="messenger">Facebook Messenger</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="What can we help you with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product-inquiry">Product Inquiry</SelectItem>
                        <SelectItem value="custom-quote">Custom Quote Request</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="warranty">Warranty Information</SelectItem>
                        <SelectItem value="bulk-order">Bulk Order</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      required
                      placeholder="Tell us about your laptop needs, budget, or any specific requirements..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full bg-lapta-orange hover:bg-lapta-orange/90">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Contact</CardTitle>
                <CardDescription>Reach us instantly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center space-x-2"
                >
                  <span>💬</span>
                  <span>WhatsApp Chat</span>
                </Button>
                <Button 
                  onClick={handleMessenger}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <span>📱</span>
                  <span>Facebook Messenger</span>
                </Button>
                <Button 
                  onClick={() => window.location.href = 'tel:0783026420'}
                  className="w-full bg-lapta-orange hover:bg-lapta-orange/90 flex items-center justify-center space-x-2"
                >
                  <span>📞</span>
                  <span>Call Now</span>
                </Button>
              </CardContent>
            </Card>

            {/* Contact Details */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-lapta-orange">📞</span>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">0783.02.64.20</p>
                    <p className="text-gray-600">0656.52.75.45</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lapta-orange">📧</span>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">info@lapta.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lapta-orange">📍</span>
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">Your Address Here</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-lapta-orange">🕒</span>
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sat: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sun: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <CardTitle>Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Laptop Sales & Consultation</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Custom Configuration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Technical Support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Warranty Services</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Bulk Orders for Businesses</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-lapta-orange">✓</span>
                    <span>Trade-in Programs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Find Us</CardTitle>
              <CardDescription>Visit our showroom to see laptops in person</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  Interactive Google Map would be embedded here
                  <br />
                  <span className="text-sm">(Replace with actual Google Maps embed)</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
