import { useState, useEffect, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import Advertisement from "@/components/Advertisement";
import CollegesHero from "@/components/colleges/CollegesHero";
import CollegeFilters from "@/components/colleges/CollegeFilters";
import CollegeCard from "@/components/colleges/CollegeCard";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";
import { useSearchParams } from "react-router-dom";
import { DatabaseCollege } from "@/types/database"; // Import DatabaseCollege type
// Corrected import path for collegeData
import { College } from "../../collegeData"; // Import College type
import { Button } from "@/components/ui/button"; // Ensure Button is imported

const Colleges = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams] = useSearchParams();
  const [visibleCollegeCount, setVisibleCollegeCount] = useState(10); // State for pagination

  const { data: colleges = [], isLoading, error } = useQuery<DatabaseCollege[]>({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  useEffect(() => {
    if (colleges.length > 0) {
      console.log("Fetched colleges data:", colleges);
    }
  }, [colleges]);

  const searchQuery = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  const fieldParam = searchParams.get('field') || '';

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  const categories = useMemo(() => {
    const uniqueTypes = new Set<string>();
    colleges.forEach(college => uniqueTypes.add(college.type));

    const categoryList = Array.from(uniqueTypes).map(type => {
      const count = colleges.filter(c => c.type === type).length;
      let id = type.toLowerCase();
      let name = type;
      if (id === "management") {
        id = "mba";
        name = "MBA";
      } else if (id === "arts") {
        name = "Arts & Humanities";
      }
      return { id, name, count };
    });

    const sortedCategories = [
      { id: "all", name: "All Categories", count: colleges.length },
      ...categoryList.sort((a, b) => a.name.localeCompare(b.name))
    ];

    return sortedCategories;
  }, [colleges]);

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      if (selectedCategory !== "all") {
        const collegeTypeLower = college.type_collwge.toLowerCase();
        const selectedCategoryLower = selectedCategory.toLowerCase();

        if (selectedCategoryLower === 'mba') {
          if (collegeTypeLower !== 'management') return false;
        } else {
          if (!collegeTypeLower.includes(selectedCategoryLower)) return false;
        }
      }
      
      if (fieldParam) {
        const courseFieldMap: { [key: string]: string } = {
          "cs": "Computer Science",
          "mechanical": "Mechanical",
          "electronics": "Electronics",
          "civil": "Civil",
          "mbbs": "MBBS",
          "bds": "BDS",
          "nursing": "Nursing",
          "pharmacy": "Pharmacy",
          "fashion": "Fashion Design",
          "interior": "Interior Design",
          "graphic": "Graphic Design",
        };
        const courseName = courseFieldMap[fieldParam];
        if (courseName && college.courses) {
          if (!college.courses.some(course => course.name.includes(courseName))) {
            return false;
          }
        }
      }

      if (selectedState !== "all") {
        if (college.district !== selectedState) return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.district.toLowerCase().includes(query) ||
          college.type.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [colleges, selectedCategory, selectedState, searchQuery, fieldParam]);

  const collegesToDisplay = useMemo(() => {
    return filteredColleges.slice(0, visibleCollegeCount);
  }, [filteredColleges, visibleCollegeCount]);

  const handleLoadMore = () => {
    setVisibleCollegeCount(prevCount => prevCount + 10); // Load 10 more colleges
  };

  const collegesFoundCount = useMemo(() => filteredColleges.length, [filteredColleges]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onBookingClick={() => setIsBookingModalOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header onBookingClick={() => setIsBookingModalOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-red-600">Error loading colleges. Please try again later.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      <CollegesHero collegeCount={collegesFoundCount} />

      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <Advertisement placement="home" className="max-w-4xl mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <CollegeFilters
            categories={categories}
            selectedCategory={selectedCategory}
            selectedState={selectedState}
            showFilters={showFilters}
            onCategoryChange={setSelectedCategory}
            onStateChange={setSelectedState}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {collegesFoundCount} Colleges Found
                </h2>
                {searchQuery && (
                  <p className="text-gray-600 mt-1">
                    Search results for "{searchQuery}"
                  </p>
                )}
              </div>
              <select className="p-2 border rounded-md">
                <option>Sort by Relevance</option>
                <option>Sort by Ranking</option>
                <option>Sort by Fees (Low to High)</option>
                <option>Sort by Fees (High to Low)</option>
              </select>
            </div>

            {collegesToDisplay.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No colleges found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No colleges match your search for "${searchQuery}"`
                    : "No colleges match your current filters"
                  }
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6"> {/* Changed to flex column for full row display */}
                {collegesToDisplay.map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
            )}

            {filteredColleges.length > collegesToDisplay.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={handleLoadMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </div>
  );
};

export default Colleges;
