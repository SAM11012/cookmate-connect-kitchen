
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Users, 
  ChefHat, 
  Flame, 
  Play, 
  Share,
  Heart,
  MessageSquare
} from 'lucide-react';

const RecipeViewer = () => {
  // Mock recipe data
  const recipes = [
    {
      id: 1,
      name: 'Butter Chicken',
      cuisine: 'North Indian',
      cookTime: '45 mins',
      serves: '4 people',
      spiceLevel: 'Medium',
      difficulty: 'Intermediate',
      ingredients: [
        '500g chicken (cut into pieces)',
        '1 cup tomato puree',
        '1/2 cup heavy cream',
        '2 tbsp butter',
        '1 tsp garam masala',
        '1 tsp red chili powder',
        '1 tbsp ginger-garlic paste',
        'Salt to taste'
      ],
      instructions: [
        'Marinate chicken with yogurt, ginger-garlic paste, and spices for 30 minutes',
        'Heat butter in a pan and cook marinated chicken until 80% done',
        'In the same pan, add tomato puree and cook for 5 minutes',
        'Add cream, garam masala, and remaining spices',
        'Add cooked chicken back to the pan and simmer for 10 minutes',
        'Garnish with fresh coriander and serve hot with rice or naan'
      ],
      youtubeUrl: 'https://youtube.com/watch?v=example',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Masala Dosa',
      cuisine: 'South Indian',
      cookTime: '30 mins',
      serves: '2 people',
      spiceLevel: 'Low',
      difficulty: 'Easy',
      ingredients: [
        '2 cups dosa batter',
        '2 medium potatoes (boiled)',
        '1 onion (chopped)',
        '1 tsp mustard seeds',
        '1 tsp cumin seeds',
        'Curry leaves',
        '1 tsp turmeric powder',
        'Oil for cooking'
      ],
      instructions: [
        'Heat oil in a pan, add mustard seeds and cumin seeds',
        'Add chopped onions and curry leaves, cook until onions turn golden',
        'Add boiled potatoes, turmeric powder, and salt. Mix well',
        'Heat a non-stick pan and pour dosa batter, spread evenly',
        'Cook until the bottom turns golden brown',
        'Add potato filling on one side and fold the dosa',
        'Serve hot with coconut chutney and sambar'
      ],
      youtubeUrl: 'https://youtube.com/watch?v=example2',
      image: '/placeholder.svg'
    }
  ];

  const handleSendToWhatsApp = (recipe: any) => {
    console.log('Sending recipe to WhatsApp:', recipe.name);
    // Implementation for WhatsApp integration
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Recipe Collection</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <ChefHat className="h-4 w-4 mr-2" />
          Add New Recipe
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gradient-to-br from-orange-100 to-green-100 flex items-center justify-center">
              <ChefHat className="h-16 w-16 text-green-600" />
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
                  {recipe.cookTime}
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
                <h4 className="font-semibold text-gray-900 mb-2">Ingredients:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {recipe.ingredients.slice(0, 4).map((ingredient, idx) => (
                    <li key={idx}>• {ingredient}</li>
                  ))}
                  {recipe.ingredients.length > 4 && (
                    <li className="text-green-600 font-medium">
                      +{recipe.ingredients.length - 4} more ingredients
                    </li>
                  )}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Instructions:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  {recipe.instructions.slice(0, 3).map((step, idx) => (
                    <li key={idx}>{idx + 1}. {step}</li>
                  ))}
                  {recipe.instructions.length > 3 && (
                    <li className="text-green-600 font-medium">
                      +{recipe.instructions.length - 3} more steps
                    </li>
                  )}
                </ol>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button 
                  onClick={() => handleSendToWhatsApp(recipe)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
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
        ))}
      </div>
    </div>
  );
};

export default RecipeViewer;
