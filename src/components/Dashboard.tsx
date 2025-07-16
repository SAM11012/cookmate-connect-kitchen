
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ChefHat, 
  BookOpen, 
  MessageSquare,
  Calendar,
  Edit,
  Send,
  Play
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { icon: Users, label: 'Active Tenants', value: '12', color: 'text-blue-600' },
    { icon: ChefHat, label: 'Registered Cooks', value: '8', color: 'text-green-600' },
    { icon: BookOpen, label: 'Recipes Sent', value: '156', color: 'text-orange-600' },
    { icon: MessageSquare, label: 'WhatsApp Messages', value: '234', color: 'text-purple-600' },
  ];

  const weeklyMeals = [
    { day: 'Monday', breakfast: 'Poha', lunch: 'Dal Rice', dinner: 'Paneer Curry' },
    { day: 'Tuesday', breakfast: 'Upma', lunch: 'Sambar Rice', dinner: 'Chicken Curry' },
    { day: 'Wednesday', breakfast: 'Idli', lunch: 'Rajma Rice', dinner: 'Fish Fry' },
    { day: 'Thursday', breakfast: 'Dosa', lunch: 'Curd Rice', dinner: 'Mutton Curry' },
    { day: 'Friday', breakfast: 'Paratha', lunch: 'Biryani', dinner: 'Veg Curry' },
  ];

  const recentTenants = [
    { name: 'Rahul Kumar', preferences: 'Veg, North Indian, Medium Spice', cook: 'Sunita Devi' },
    { name: 'Priya Sharma', preferences: 'Non-Veg, South Indian, High Spice', cook: 'Ravi Kumar' },
    { name: 'Alex Johnson', preferences: 'Vegan, Continental, Low Spice', cook: 'Maya Patel' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-orange-500 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to CookMate Dashboard</h1>
        <p className="text-green-100">Manage your tenants, cooks, and meal preferences all in one place</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Meal Plan */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Weekly Meal Plan
            </CardTitle>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Plan
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {weeklyMeals.map((meal, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="font-semibold text-gray-900 mb-2">{meal.day}</div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">B:</span> {meal.breakfast}
                    </div>
                    <div>
                      <span className="text-gray-600">L:</span> {meal.lunch}
                    </div>
                    <div>
                      <span className="text-gray-600">D:</span> {meal.dinner}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tenants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-green-600" />
              Recent Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTenants.map((tenant, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{tenant.name}</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{tenant.preferences}</p>
                  <p className="text-sm text-green-600">Cook: {tenant.cook}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <Button 
              onClick={() => navigate('/onboarding')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Users className="h-4 w-4 mr-2" />
              Add Tenant
            </Button>
            <Button 
              onClick={() => navigate('/cooks')}
              variant="outline"
            >
              <ChefHat className="h-4 w-4 mr-2" />
              Register Cook
            </Button>
            <Button 
              onClick={() => navigate('/recipes')}
              variant="outline"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              View Recipes
            </Button>
            <Button variant="outline">
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
