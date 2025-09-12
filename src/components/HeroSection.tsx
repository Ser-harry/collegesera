
import { TrendingUp, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SearchAutocomplete from "./SearchAutocomplete";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"; // Import carousel components

const HeroSection = () => {
  const heroImages = [
    "https://www.harvard.edu/wp-content/uploads/2023/11/110823_Features_KS_713-scaled.jpg", // Harvard
    "https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_1090_29-15%3A00_o-HARVARD-UNIVERSITY-BUILDING-facebook.jpeg", // University of Manchester (using provided Harvard image)
    "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/TI4O5DJZH5N6FHYHS4SKQG7MAY.jpg", // Yale
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full blur-lg animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-orange-400/15 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image}
                  alt={`Hero Image ${index + 1}`}
                  className="w-full h-full object-cover opacity-100"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-24">
        {/* Main Content */}
        <div className="text-center text-white mb-16">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 font-poppins">
              Find Your <span className="gradient-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">Dream College</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Discover 6000+ premium institutions across India with our AI-powered platform
            </p>
          </div>
          
          {/* Enhanced Search Section */}
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up relative z-20">
            <div className="glass-effect rounded-2xl shadow-2xl p-3 hover-lift">
              <div className="flex items-center">
                <div className="flex-1">
                  <SearchAutocomplete
                    placeholder="Search colleges, courses, or locations..."
                    variant="hero"
                    className="flex-1"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-10 py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ml-2"
                  onClick={() => {
                    const searchInput = document.querySelector('input[placeholder*="Search colleges"]') as HTMLInputElement;
                    if (searchInput?.value) {
                      window.location.href = `/colleges?search=${encodeURIComponent(searchInput.value)}`;
                    }
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards - Fixed background for visibility */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-scale-in">
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Users className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">6000+</div>
              <div className="text-sm text-gray-200">Premium Colleges</div>
            </div>
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <Award className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">500+</div>
              <div className="text-sm text-gray-200">Course Options</div>
            </div>
            <div className="bg-black/50 backdrop-blur-md rounded-xl p-6 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold mb-1 text-white">95%</div>
              <div className="text-sm text-gray-200">Success Rate</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up">
            <Link to="/colleges">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg px-12 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Explore Colleges Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
