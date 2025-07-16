
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const CookRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    associatedTenant: '',
    whatsappNumber: '',
    languagePreference: ''
  });

  // Mock data for tenants - in real app, this would come from API
  const tenants = [
    'John Doe', 'Jane Smith', 'Rahul Kumar', 'Priya Sharma', 'Alex Johnson'
  ];

  const languages = [
    'English', 'Hindi', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Marathi'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.associatedTenant || !formData.whatsappNumber) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Cook registration submitted:', formData);
    toast({
      title: "Cook Registered Successfully!",
      description: `${formData.name} has been registered and linked to ${formData.associatedTenant}.`,
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-lg">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-600">
              Register Cook
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Add a new cook and link them to a tenant
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="cook-name">Cook Name *</Label>
                <Input
                  id="cook-name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter cook's full name"
                  required
                />
              </div>
              
              <div>
                <Label>Associated Tenant *</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, associatedTenant: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent>
                    {tenants.map((tenant) => (
                      <SelectItem key={tenant} value={tenant}>
                        {tenant}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="cook-whatsapp">WhatsApp Number *</Label>
                <Input
                  id="cook-whatsapp"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              
              <div>
                <Label>Language Preference</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, languagePreference: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                Register Cook
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CookRegistration;
