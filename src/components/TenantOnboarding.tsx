
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/hooks/use-toast';

const TenantOnboarding = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    dietaryPreference: '',
    cuisinePreferences: [] as string[],
    spicinessLevel: '',
    ingredientDislikes: '',
    whatsappNumber: '',
    mealsPerDay: [] as string[]
  });

  const cuisines = [
    'North Indian', 'South Indian', 'Chinese', 'Continental', 
    'Italian', 'Thai', 'Mexican', 'Bengali', 'Gujarati', 'Punjabi'
  ];

  const meals = ['Breakfast', 'Lunch', 'Dinner'];

  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      cuisinePreferences: checked 
        ? [...prev.cuisinePreferences, cuisine]
        : prev.cuisinePreferences.filter(c => c !== cuisine)
    }));
  };

  const handleMealChange = (meal: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      mealsPerDay: checked 
        ? [...prev.mealsPerDay, meal]
        : prev.mealsPerDay.filter(m => m !== meal)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.whatsappNumber || !formData.dietaryPreference) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    console.log('Form submitted:', formData);
    toast({
      title: "Preferences Saved!",
      description: "Your food preferences have been successfully saved.",
    });
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-green-600">
              Setup Your Food Preferences
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Help us understand your taste preferences so we can suggest perfect recipes
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      placeholder="Enter your age"
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Gender</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                  <Input
                    id="whatsapp"
                    value={formData.whatsappNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>
              </div>

              {/* Food Preferences */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Food Preferences</h3>
                
                <div>
                  <Label>Dietary Preference *</Label>
                  <RadioGroup 
                    value={formData.dietaryPreference}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, dietaryPreference: value }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegetarian" id="veg" />
                      <Label htmlFor="veg">Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="non-vegetarian" id="non-veg" />
                      <Label htmlFor="non-veg">Non-Vegetarian</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vegan" id="vegan" />
                      <Label htmlFor="vegan">Vegan</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label>Cuisine Preferences (Select multiple)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {cuisines.map((cuisine) => (
                      <div key={cuisine} className="flex items-center space-x-2">
                        <Checkbox
                          id={cuisine}
                          checked={formData.cuisinePreferences.includes(cuisine)}
                          onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                        />
                        <Label htmlFor={cuisine} className="text-sm">{cuisine}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label>Spiciness Level</Label>
                  <RadioGroup 
                    value={formData.spicinessLevel}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, spicinessLevel: value }))}
                    className="mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low-spice" />
                      <Label htmlFor="low-spice">Low 🔥</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium-spice" />
                      <Label htmlFor="medium-spice">Medium 🔥🔥</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high-spice" />
                      <Label htmlFor="high-spice">High 🔥🔥🔥</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <Label htmlFor="dislikes">Ingredient Dislikes (comma separated)</Label>
                  <Input
                    id="dislikes"
                    value={formData.ingredientDislikes}
                    onChange={(e) => setFormData(prev => ({ ...prev, ingredientDislikes: e.target.value }))}
                    placeholder="e.g., mushrooms, broccoli, fish"
                  />
                </div>
                
                <div>
                  <Label>Meals per Day</Label>
                  <div className="flex gap-4 mt-2">
                    {meals.map((meal) => (
                      <div key={meal} className="flex items-center space-x-2">
                        <Checkbox
                          id={meal}
                          checked={formData.mealsPerDay.includes(meal)}
                          onCheckedChange={(checked) => handleMealChange(meal, checked as boolean)}
                        />
                        <Label htmlFor={meal}>{meal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
              >
                Save Preferences
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantOnboarding;
