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
    "https://www.harvard.edu/wp-content/uploads/2023/11/110823_Features_KS_713-scaled.jpg",
    "https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_1090_29-15%3A00_o-HARVARD-UNIVERSITY-BUILDING-facebook.jpeg",
    "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/TI4O5DJZH5N6FHYHS4SKQG7MAY.jpg",
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-10 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-float"></div>
        <div
          className="absolute top-32 right-20 w-20 h-20 bg-white/10 rounded-full blur-lg animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-16 left-1/4 w-32 h-32 bg-orange-400/15 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <Carousel className="w-full h-[120vh]"> {/* Reduced height */}
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <img
                  src={image}
                  alt={`Hero Image ${index + 1}`}
                  className="w-full h-[90vh] object-cover opacity-100" // Reduced height
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4" />
          <CarouselNext className="absolute right-4" />
        </Carousel>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main Content */}
        <div className="text-center text-white mb-12">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-5 font-poppins">
              Find Your{" "}
              <span className="gradient-text bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Dream College
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Discover 6000+ premium institutions across India with our
              AI-powered platform
            </p>
          </div>

          {/* Enhanced Search Section */}
          <div className="max-w-3xl mx-auto mb-10 animate-slide-up relative z-20">
            <div className="glass-effect rounded-2xl shadow-2xl p-2 hover-lift">
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
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-base px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ml-2"
                  onClick={() => {
                    const searchInput = document.querySelector(
                      'input[placeholder*="Search colleges"]'
                    ) as HTMLInputElement;
                    if (searchInput?.value) {
                      window.location.href = `/colleges?search=${encodeURIComponent(
                        searchInput.value
                      )}`;
                    }
                  }}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 animate-scale-in">
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-5 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-2xl font-bold mb-1 text-white">6000+</div>
              <div className="text-xs text-gray-200">Premium Colleges</div>
            </div>
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-5 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-2xl font-bold mb-1 text-white">500+</div>
              <div className="text-xs text-gray-200">Course Options</div>
            </div>
            <div className="bg-black/50 backdrop-blur-md rounded-lg p-5 hover-lift border border-white/20">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-2xl font-bold mb-1 text-white">95%</div>
              <div className="text-xs text-gray-200">Success Rate</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="animate-slide-up">
            <Link to="/colleges">
              <Button
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-base px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
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