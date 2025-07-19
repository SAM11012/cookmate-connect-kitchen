import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { X, ChefHat } from 'lucide-react';

const TenantOnboarding = () => {
  // Personal Information
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  // Food Preferences
  const [dietaryPreference, setDietaryPreference] = useState('');
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);
  const [spicinessLevel, setSpicinessLevel] = useState('');
  const [ingredientDislikes, setIngredientDislikes] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [meals, setMeals] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState('');
  
  // Cook details state
  const [cookName, setCookName] = useState('');
  const [cookWhatsappNumber, setCookWhatsappNumber] = useState('');
  const [cookLanguage, setCookLanguage] = useState('');

  const cuisineOptions = [
    'North Indian', 'South Indian', 'Chinese', 'Continental', 
    'Italian', 'Thai', 'Mexican', 'Bengali', 'Gujarati', 'Punjabi'
  ];

  const mealOptions = ['Breakfast', 'Lunch', 'Dinner'];

  const addIngredientDislike = () => {
    if (ingredientInput.trim() && !ingredientDislikes.includes(ingredientInput.trim())) {
      setIngredientDislikes([...ingredientDislikes, ingredientInput.trim()]);
      setIngredientInput('');
    }
  };

  const removeIngredientDislike = (ingredient: string) => {
    setIngredientDislikes(ingredientDislikes.filter(item => item !== ingredient));
  };

  const handleSubmit = () => {
    console.log('Form submitted with data:', {
      personal: { name, age, gender },
      preferences: { dietaryPreference, cuisinePreferences, spicinessLevel, ingredientDislikes },
      contact: { whatsappNumber, meals },
      cook: { cookName, cookWhatsappNumber, cookLanguage }
    });
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">Food Preferences</CardTitle>
            <CardDescription>
              Tell us about your food preferences and cook details so we can send perfect recipes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
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
              </div>
            </div>

            <Separator />

            {/* Dietary Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Dietary Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diet">Dietary Preference</Label>
                  <Select value={dietaryPreference} onValueChange={setDietaryPreference}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="spiciness">Spiciness Level</Label>
                  <Select value={spicinessLevel} onValueChange={setSpicinessLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select spiciness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Cuisine Preferences</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
                  {cuisineOptions.map((cuisine) => (
                    <div key={cuisine} className="flex items-center space-x-2">
                      <Checkbox
                        id={cuisine}
                        checked={cuisinePreferences.includes(cuisine)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCuisinePreferences([...cuisinePreferences, cuisine]);
                          } else {
                            setCuisinePreferences(cuisinePreferences.filter(c => c !== cuisine));
                          }
                        }}
                      />
                      <Label htmlFor={cuisine} className="text-sm">{cuisine}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ingredient Dislikes */}
              <div className="space-y-2">
                <Label htmlFor="ingredient-input">Ingredient Dislikes</Label>
                <div className="flex gap-2">
                  <Input
                    id="ingredient-input"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    placeholder="Enter an ingredient you dislike"
                    onKeyPress={(e) => e.key === 'Enter' && addIngredientDislike()}
                  />
                  <Button type="button" onClick={addIngredientDislike} variant="outline">
                    Add
                  </Button>
                </div>
                {ingredientDislikes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ingredientDislikes.map((ingredient) => (
                      <Badge key={ingredient} variant="secondary" className="flex items-center gap-1">
                        {ingredient}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeIngredientDislike(ingredient)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Cook Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Cook Details</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cookName">Cook Name</Label>
                  <Input
                    id="cookName"
                    value={cookName}
                    onChange={(e) => setCookName(e.target.value)}
                    placeholder="Enter cook's name"
                  />
                </div>
                <div>
                  <Label htmlFor="cookWhatsapp">Cook's WhatsApp Number</Label>
                  <Input
                    id="cookWhatsapp"
                    value={cookWhatsappNumber}
                    onChange={(e) => setCookWhatsappNumber(e.target.value)}
                    placeholder="Enter cook's WhatsApp number"
                  />
                </div>
                <div>
                  <Label htmlFor="cookLanguage">Preferred Language</Label>
                  <Select value={cookLanguage} onValueChange={setCookLanguage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
              <div>
                <Label htmlFor="whatsapp">Your WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Enter your WhatsApp number"
                />
              </div>
            </div>

            <Separator />

            {/* Meal Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Meal Preferences</h3>
              <div>
                <Label>Meals per Day</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {mealOptions.map((meal) => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={meal}
                        checked={meals.includes(meal)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setMeals([...meals, meal]);
                          } else {
                            setMeals(meals.filter(m => m !== meal));
                          }
                        }}
                      />
                      <Label htmlFor={meal}>{meal}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              className="w-full"
              size="lg"
              onClick={handleSubmit}
            >
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantOnboarding;