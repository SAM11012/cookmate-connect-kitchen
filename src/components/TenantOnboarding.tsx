import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X, ChefHat } from "lucide-react";
import { tenantSchema } from "@/formValidations/preferenceSchmma";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type OnboardingData = {
  personal: {
    name: string;
    age: string;
    gender: string;
  };
  preferences: {
    dietaryPreference: string;
    cuisinePreferences: string[];
    spicinessLevel: string;
    ingredientDislikes: string[];
  };
  contact: {
    whatsappNumber: string;
    meals: string[];
  };
  cook: {
    cookName: string;
    cookWhatsappNumber: string;
    cookLanguage: string;
  };
};

const TenantOnboarding = () => {
  // Personal Information
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // Food Preferences
  const [dietaryPreference, setDietaryPreference] = useState("");
  const [cuisinePreferences, setCuisinePreferences] = useState<string[]>([]);
  const [spicinessLevel, setSpicinessLevel] = useState("");
  const [ingredientDislikes, setIngredientDislikes] = useState<string[]>([]);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [meals, setMeals] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");

  // Cook details state
  const [cookName, setCookName] = useState("");
  const [cookWhatsappNumber, setCookWhatsappNumber] = useState("");
  const [cookLanguage, setCookLanguage] = useState("");

  // Zod error state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"valid" | "invalid" | "idle">(
    "idle"
  );
  const [loading, setLoading] = useState(false);

  const cuisineOptions = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Continental",
    "Italian",
    "Thai",
    "Mexican",
    "Bengali",
    "Gujarati",
    "Punjabi",
  ];

  const mealOptions = ["Breakfast", "Lunch", "Dinner"];
  const navigate = useNavigate();

  const addIngredientDislike = () => {
    if (
      ingredientInput.trim() &&
      !ingredientDislikes.includes(ingredientInput.trim())
    ) {
      setIngredientDislikes([...ingredientDislikes, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const removeIngredientDislike = (ingredient: string) => {
    setIngredientDislikes(
      ingredientDislikes.filter((item) => item !== ingredient)
    );
  };

  const handleSubmit = async () => {
    console.log("ia m");
    if (loading) return;
    // Map form state to Zod schema structure
    // Prevent empty string -> 0 for numbers, pass undefined if empty
    const dataForValidation = {
      name,
      age: age ? Number(age) : undefined,
      gender: gender as "male" | "female" | "other",
      dietaryPreference,
      spicinessLevel: spicinessLevel ? Number(spicinessLevel) : undefined,
      cuisinePreferences,
      dislikes: ingredientDislikes,
      cookDetails: cookName, // Simplified: only cookName
      whatsappNumber,
      language: cookLanguage,
      mealPreferences: {
        breakfast: meals.includes("Breakfast"),
        lunch: meals.includes("Lunch"),
        dinner: meals.includes("Dinner"),
      },
    };
    console.log("ia m 2");
    const result = tenantSchema.safeParse(dataForValidation);

    if (!result.success) {
      console.log("Zod validation failed. Data:", dataForValidation);
      console.log("Zod errors:", result.error.errors);
      // Map Zod errors to field errors (handle nested errors)
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        const path = err.path.join(".");
        errors[path] = err.message;
      });
      setFormErrors(errors);
      setFormStatus("invalid");
      return;
    }
    console.log("ia 3");
    setFormErrors({});
    setFormStatus("valid");

    // Save to localStorage in the old structure for compatibility
    const onboardingData: OnboardingData = {
      personal: { name, age, gender },
      preferences: {
        dietaryPreference,
        cuisinePreferences,
        spicinessLevel,
        ingredientDislikes,
      },
      contact: { whatsappNumber, meals },
      cook: { cookName, cookWhatsappNumber, cookLanguage },
    };

    setLoading(true);
    console.log("ia 5");
    try {
      const response = await axios.post(
        `http://localhost:3001/submit-preferences`,
        {
          name,
          age: Number(age),
          gender,
          dietaryPreference,
          spicinessLevel,
          cuisinePreferences,
          ingredientDislikes,
          cookName,
          cookWhatsApp: cookWhatsappNumber,
          preferredLanguage: cookLanguage,
          userWhatsApp: whatsappNumber,
          mealsPerDay: meals.length,
          breakfast: meals.includes("Breakfast"),
          lunch: meals.includes("Lunch"),
          dinner: meals.includes("Dinner"),
        }
      );

      localStorage.setItem("onboardingData", JSON.stringify(onboardingData));
      console.log("Form submitted with data:", onboardingData);
    } catch (err) {
      // handle error
      console.log(err);
      setFormStatus("invalid");
    } finally {
      setLoading(false);
      navigate('/dashboard')
    }
  };
  console.log(formErrors, "the form Errors", formStatus);
  return (
    <div className="min-h-screen bg-background py-4 px-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-primary">
              Food Preferences
            </CardTitle>
            <CardDescription>
              Tell us about your food preferences and cook details so we can
              send perfect recipes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                  {formErrors.name && (
                    <span className="text-red-500 text-xs">
                      {formErrors.name}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    disabled={loading}
                  />
                  {formErrors.age && (
                    <span className="text-red-500 text-xs">
                      {formErrors.age}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={gender}
                    onValueChange={setGender}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.gender && (
                    <span className="text-red-500 text-xs">
                      {formErrors.gender}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Dietary Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Dietary Preferences
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="diet">Dietary Preference</Label>
                  <Select
                    value={dietaryPreference}
                    onValueChange={setDietaryPreference}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="non-vegetarian">
                        Non-Vegetarian
                      </SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.dietaryPreference && (
                    <span className="text-red-500 text-xs">
                      {formErrors.dietaryPreference}
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="spiciness">Spiciness Level</Label>
                  <Input
                    id="spiciness"
                    type="number"
                    min={0}
                    max={5}
                    value={spicinessLevel}
                    onChange={(e) => setSpicinessLevel(e.target.value)}
                    placeholder="0-5"
                    disabled={loading}
                  />
                  {formErrors.spicinessLevel && (
                    <span className="text-red-500 text-xs">
                      {formErrors.spicinessLevel}
                    </span>
                  )}
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
                        disabled={loading}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setCuisinePreferences([
                              ...cuisinePreferences,
                              cuisine,
                            ]);
                          } else {
                            setCuisinePreferences(
                              cuisinePreferences.filter((c) => c !== cuisine)
                            );
                          }
                        }}
                      />
                      <Label htmlFor={cuisine} className="text-sm">
                        {cuisine}
                      </Label>
                    </div>
                  ))}
                </div>
                {formErrors.cuisinePreferences && (
                  <span className="text-red-500 text-xs">
                    {formErrors.cuisinePreferences}
                  </span>
                )}
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
                    onKeyPress={(e) =>
                      e.key === "Enter" && addIngredientDislike()
                    }
                    disabled={loading}
                  />
                  <Button
                    type="button"
                    onClick={addIngredientDislike}
                    variant="outline"
                    disabled={loading}
                  >
                    Add
                  </Button>
                </div>
                {ingredientDislikes.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {ingredientDislikes.map((ingredient) => (
                      <Badge
                        key={ingredient}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {ingredient}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeIngredientDislike(ingredient)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
                {formErrors.dislikes && (
                  <span className="text-red-500 text-xs">
                    {formErrors.dislikes}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Cook Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  Cook Details
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="cookName">Cook Name</Label>
                  <Input
                    id="cookName"
                    value={cookName}
                    onChange={(e) => setCookName(e.target.value)}
                    placeholder="Enter cook's name"
                    disabled={loading}
                  />
                  {formErrors.cookDetails && (
                    <span className="text-red-500 text-xs">
                      {formErrors.cookDetails}
                    </span>
                  )}
                </div>
                <div>
                  <Label htmlFor="cookWhatsapp">Cook's WhatsApp Number</Label>
                  <Input
                    id="cookWhatsapp"
                    value={cookWhatsappNumber}
                    onChange={(e) => setCookWhatsappNumber(e.target.value)}
                    placeholder="Enter cook's WhatsApp number"
                    disabled={loading}
                  />
                </div>
                <div>
                  <Label htmlFor="cookLanguage">Preferred Language</Label>
                  <Select
                    value={cookLanguage}
                    onValueChange={setCookLanguage}
                    disabled={loading}
                  >
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
                  {formErrors.language && (
                    <span className="text-red-500 text-xs">
                      {formErrors.language}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Contact Information
              </h3>
              <div>
                <Label htmlFor="whatsapp">Your WhatsApp Number</Label>
                <Input
                  id="whatsapp"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="Enter your WhatsApp number"
                  disabled={loading}
                />
                {formErrors.whatsappNumber && (
                  <span className="text-red-500 text-xs">
                    {formErrors.whatsappNumber}
                  </span>
                )}
              </div>
            </div>

            <Separator />

            {/* Meal Preferences */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Meal Preferences
              </h3>
              <div>
                <Label>Meals per Day</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {mealOptions.map((meal) => (
                    <div key={meal} className="flex items-center space-x-2">
                      <Checkbox
                        id={meal}
                        checked={meals.includes(meal)}
                        disabled={loading}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setMeals([...meals, meal]);
                          } else {
                            setMeals(meals.filter((m) => m !== meal));
                          }
                        }}
                      />
                      <Label htmlFor={meal}>{meal}</Label>
                    </div>
                  ))}
                </div>
                {formErrors.mealPreferences && (
                  <span className="text-red-500 text-xs">
                    {formErrors.mealPreferences}
                  </span>
                )}
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
            <div className="mt-2 text-xs">
              {formStatus === "valid" && (
                <span className="text-green-600">Form is valid!</span>
              )}
              {formStatus === "invalid" && (
                <span className="text-red-600">
                  Form is invalid. Please fix the errors above.
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TenantOnboarding;
