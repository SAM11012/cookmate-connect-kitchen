
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import TenantOnboarding from "./components/TenantOnboarding";
import CookRegistration from "./components/CookRegistration";
import Dashboard from "./components/Dashboard";
import RecipeViewer from "./components/RecipeViewer";
import AuthPage from "./components/AuthPage";
import NotFound from "./pages/NotFound";
import OnboardingInfo from "./components/OnboardingInfo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/onboarding" element={<TenantOnboarding />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding-info" element={<OnboardingInfo />} />
            <Route path="/tenants" element={<TenantOnboarding />} />
            <Route path="/cooks" element={<CookRegistration />} />
            <Route path="/recipes" element={<RecipeViewer />} />
            <Route path="/settings" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
