import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Users, ChefHat, ExternalLink, Search, MessageSquare, Play, Share, Heart, Flame } from 'lucide-react';

const RecipeViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const recipes = [
    {
      id: 1,
      name: 'Butter Chicken',
      cuisine: 'North Indian',
      ingredients: ['Chicken', 'Tomatoes', 'Cream', 'Spices', 'Butter'],
      instructions: ['Marinate chicken', 'Cook in tomato gravy', 'Add cream and simmer'],
      cookingTime: '25 minutes',
      difficulty: 'Medium',
      serves: 4,
      spiceLevel: 'Medium',
      youtubeUrl: 'https://youtube.com/watch?v=example'
    },
    {
      id: 2,
      name: 'Masala Dosa',
      cuisine: 'South Indian',
      ingredients: ['Dosa batter', 'Potatoes', 'Onions', 'Spices'],
      instructions: ['Prepare potato filling', 'Make dosa', 'Add filling and fold'],
      cookingTime: '30 minutes',
      difficulty: 'Easy',
      serves: 2,
      spiceLevel: 'Low',
      youtubeUrl: 'https://youtube.com/watch?v=example2'
    },
    {
      id: 3,
      name: 'Chicken Curry',
      cuisine: 'North Indian',
      ingredients: ['Chicken', 'Onions', 'Tomatoes', 'Spices', 'Coconut milk'],
      instructions: ['Marinate chicken', 'Sauté onions', 'Add tomatoes and spices', 'Add chicken and simmer', 'Finish with coconut milk'],
      cookingTime: '45 minutes',
      difficulty: 'Hard',
      serves: 4,
      spiceLevel: 'High',
      youtubeUrl: 'https://youtube.com/watch?v=example3'
    },
    {
      id: 4,
      name: 'Pasta Carbonara',
      cuisine: 'Italian',
      ingredients: ['Pasta', 'Eggs', 'Bacon', 'Parmesan cheese', 'Black pepper'],
      instructions: ['Cook pasta', 'Fry bacon', 'Mix eggs and cheese', 'Combine with hot pasta', 'Season with pepper'],
      cookingTime: '20 minutes',
      difficulty: 'Medium',
      serves: 3,
      spiceLevel: 'Low',
      youtubeUrl: 'https://youtube.com/watch?v=example4'
    }
  ];

  const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];
  const difficulties = [...new Set(recipes.map(recipe => recipe.difficulty))];

  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCuisine = selectedCuisine === '' || recipe.cuisine === selectedCuisine;
      const matchesDifficulty = selectedDifficulty === '' || recipe.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCuisine && matchesDifficulty;
    });
  }, [searchTerm, selectedCuisine, selectedDifficulty]);

  const handleSendToWhatsApp = (recipe: any) => {
    console.log('Sending recipe to WhatsApp:', recipe.name);
  };

  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Recipe Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover delicious recipes perfect for your preferences. Each recipe includes detailed instructions and video tutorials.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Cuisines</SelectItem>
                  {cuisines.map(cuisine => (
                    <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
                  {difficulties.map(difficulty => (
                    <SelectItem key={difficulty} value={difficulty}>{difficulty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <ChefHat className="h-16 w-16 text-primary" />
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{recipe.name}</CardTitle>
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{recipe.cuisine}</Badge>
                    <Badge variant="outline">
                      <Clock className="h-3 w-3 mr-1" />
                      {recipe.cookingTime}
                    </Badge>
                    <Badge variant="outline">
                      <Users className="h-3 w-3 mr-1" />
                      {recipe.serves}
                    </Badge>
                    <Badge variant="outline">
                      <Flame className="h-3 w-3 mr-1" />
                      {recipe.spiceLevel}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Ingredients:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                        <li key={idx}>• {ingredient}</li>
                      ))}
                      {recipe.ingredients.length > 4 && (
                        <li className="text-primary font-medium">
                          +{recipe.ingredients.length - 4} more ingredients
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Instructions:</h4>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      {recipe.instructions.slice(0, 3).map((step, idx) => (
                        <li key={idx}>{idx + 1}. {step}</li>
                      ))}
                      {recipe.instructions.length > 3 && (
                        <li className="text-primary font-medium">
                          +{recipe.instructions.length - 3} more steps
                        </li>
                      )}
                    </ol>
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button 
                      onClick={() => handleSendToWhatsApp(recipe)}
                      className="flex-1"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Send to Cook
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Tutorial
                    </Button>
                    
                    <Button variant="outline" size="sm">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No recipes found matching your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeViewer;