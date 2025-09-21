
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getColleges } from "@/services/collegeService";

const CollegeGrid = () => {
  const { data: colleges = [], isLoading, error } = useQuery({
    queryKey: ['colleges'],
    queryFn: getColleges,
  });

  const categories = [
    "Management", "Engineering", "Design", "Hotel Management", 
    "Law", "Animation", "Mass Communication", "IT and Software", "Social Work"
  ];

  if (isLoading) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Loading colleges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>Error loading colleges. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Top <span className="text-orange-500">Colleges</span>
          </h2>
          <Button variant="ghost" className="text-orange-500 hover:text-orange-600">
            View more →
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
            >
              • {category}
            </button>
          ))}
        </div>

        {/* College Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {colleges.slice(0, 6).map((college) => (
            <Link key={college.id} to={`/college/${college.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer relative">
                {college.featured && (
                  <Badge className="absolute top-3 right-3 bg-orange-500 text-white hover:bg-orange-600 z-10">
                    Featured
                  </Badge>
                )}
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img
                      src={college.college_logo || "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=100&h=100&fit=crop"}
                      alt={college.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg leading-tight mb-1">
                        {college.name}
                      </h3>
                      <p className="text-blue-600 text-sm">{college.location}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Established in</span>
                      <p className="font-semibold">{college.established || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Tuition Fees</span>
                      <p className="font-semibold">
                        {college.placements && college.placements.length > 0
                          ? `₹${(
                              Number(college.placements[0].median_ctc_engineering) / 100000
                            ).toFixed(2)} LPA`
                          : "N/A"}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">No. of Courses</span>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">
                          {college.courses?.length || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Ranking</span>
                      <p className="font-semibold text-orange-500">
                        {college.rankings && college.rankings.length > 0
                          ? `#${college.rankings[0].rank}`
                          : "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {college.type}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollegeGrid;
