
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RouteValidator from "@/components/routing/RouteValidator";
import Index from "./pages/Index";

const queryClient = new QueryClient();

// Lazy load pages
const Colleges = lazy(() => import("./pages/Colleges"));
const CollegeDetail = lazy(() => import("./pages/CollegeDetail"));
const CollegeDetailsDirectory = lazy(() => import("./pages/CollegeDetailsDirectory"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Articles = lazy(() => import("./pages/Articles"));
const Exams = lazy(() => import("./pages/Exams"));
const Courses = lazy(() => import("./pages/Courses"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Auth = lazy(() => import("./pages/Auth"));

function AppContent() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <RouteValidator>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/colleges" element={<Colleges />} />
                <Route path="/college/:slug" element={<CollegeDetail />} />
                <Route path="/college-directory" element={<CollegeDetailsDirectory />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/articles" element={<Articles />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </RouteValidator>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
