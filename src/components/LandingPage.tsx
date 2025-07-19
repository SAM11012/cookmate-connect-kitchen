
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Users, MessageSquare, Clock } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: ChefHat,
      title: 'Smart Recipe Matching',
      description: 'AI-powered recommendations based on your preferences and dietary requirements.'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Integration',
      description: 'Automatically send cooking instructions to your domestic cook via WhatsApp.'
    },
    {
      icon: Users,
      title: 'Easy Management',
      description: 'Manage multiple cooks and customize meal preferences effortlessly.'
    },
    {
      icon: Clock,
      title: 'Time Saving',
      description: 'No more daily discussions about what to cook. Set it once, enjoy always.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-orange-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Personalized Meals.{' '}
            <span className="text-green-600">Delivered to Your Cook.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Bridge the gap between your food preferences and your domestic cook. 
            CookMate automatically sends personalized recipe instructions via WhatsApp, 
            ensuring you get meals you love every time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/onboarding')}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 text-lg"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
          </div>
        </div>
        
        {/* Problem Statement */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            The Problem We Solve
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">
              As a busy professional in cities like Bangalore, you rely on domestic cooks 
              for your daily meals. But there's a constant communication gap - your cook 
              doesn't know your preferences, dietary restrictions, or spice levels. 
              This leads to repetitive meals or dishes you don't enjoy.
            </p>
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How CookMate Helps
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
