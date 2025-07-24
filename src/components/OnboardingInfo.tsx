import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

type OnboardingData = {
  personal: { name: string; age: string; gender: string };
  preferences: { dietaryPreference: string; cuisinePreferences: string[]; spicinessLevel: string; ingredientDislikes: string[] };
  contact: { whatsappNumber: string; meals: string[] };
  cook: { cookName: string; cookWhatsappNumber: string; cookLanguage: string };
};

const OnboardingInfo: React.FC = () => {
  const [data, setData] = useState<OnboardingData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("onboardingData");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>No Onboarding Data Found</CardTitle>
            <CardDescription>
              Please fill out your onboarding information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => navigate("/onboarding")}>Go to Onboarding</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:py-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Your Onboarding Information</CardTitle>
            <CardDescription>
              Review and edit your onboarding details below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><span className="font-medium">Name:</span> {data.personal.name}</div>
                <div><span className="font-medium">Age:</span> {data.personal.age}</div>
                <div><span className="font-medium">Gender:</span> {data.personal.gender}</div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold text-lg mb-2">Dietary Preferences</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Dietary Preference:</span> {data.preferences.dietaryPreference}</div>
                <div><span className="font-medium">Spiciness Level:</span> {data.preferences.spicinessLevel}</div>
                <div className="col-span-2">
                  <span className="font-medium">Cuisine Preferences:</span> {data.preferences.cuisinePreferences.join(", ")}
                </div>
                <div className="col-span-2">
                  <span className="font-medium">Ingredient Dislikes:</span> {data.preferences.ingredientDislikes.join(", ")}
                </div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold text-lg mb-2">Cook Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div><span className="font-medium">Cook Name:</span> {data.cook.cookName}</div>
                <div><span className="font-medium">Cook WhatsApp:</span> {data.cook.cookWhatsappNumber}</div>
                <div><span className="font-medium">Preferred Language:</span> {data.cook.cookLanguage}</div>
              </div>
            </section>
            <Separator />
            <section>
              <h3 className="font-semibold text-lg mb-2">Contact & Meals</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="font-medium">Your WhatsApp:</span> {data.contact.whatsappNumber}</div>
                <div><span className="font-medium">Meals per Day:</span> {data.contact.meals.join(", ")}</div>
              </div>
            </section>
            <Button className="w-full mt-4" onClick={() => navigate("/onboarding")}>
              Edit Onboarding Info
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OnboardingInfo;
