import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Calendar, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getCollegeBySlug } from "@/services/collegeService";
import AdmissionProcessTable from "@/components/colleges/details/AdmissionProcessTable";
import CoursesTable from "@/components/colleges/details/CoursesTable";
import FacilitiesTable from "@/components/colleges/details/FacilitiesTable";
import PlacementsTable from "@/components/colleges/details/PlacementsTable";
import RankingsTable from "@/components/colleges/details/RankingsTable";

const CollegeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("info");

  // Validate slug format
  useEffect(() => {
    if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
      console.error("Invalid slug format:", slug);
      navigate("/404", { replace: true });
      return;
    }
  }, [slug, navigate]);

  const { data: college, isLoading, error } = useQuery({
    queryKey: ['college', slug],
    queryFn: () => getCollegeBySlug(slug!),
    enabled: !!slug,
  });

  // Handle college not found
  useEffect(() => {
    if (!isLoading && !college && !error) {
      console.error("College not found for slug:", slug);
      navigate("/404", { replace: true });
    }
  }, [college, isLoading, error, slug, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onBookingClick={() => setIsBookingModalOpen(true)} />
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !college) {
    return null; // Navigation to 404 is handled in useEffect
  }

  const tabs = [
    { id: "info", label: "Info" },
    { id: "admission", label: "Admission Process" },
    { id: "courses", label: "Courses" },
    { id: "placements", label: "Placements" },
    { id: "rankings", label: "Rankings" },
    { id: "facilities", label: "Facilities" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header onBookingClick={() => setIsBookingModalOpen(true)} />
      
      {/* Hero Section */}
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700">
        <img
          src={college.image_url}
          alt={college.name}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-700/60"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-start space-x-6 text-white">
              <img
                src={college.college_logo }
                alt={college.name}
                className="w-24 h-24 rounded-lg bg-white p-2"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{college.name}: Courses, Fees, Admission 2025, Placements, Ranking</h1>
                <div className="flex items-center space-x-6 text-sm mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{college.established}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>4.4</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{college.type}</span>
                  </div>
                </div>
              </div>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                onClick={() => setIsBookingModalOpen(true)}
              >
                Enquire Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-sm text-gray-600">
            Home / Colleges / {college.name}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "info" && (
              <div className="space-y-8">
                <div>
                  <p className="text-gray-700 leading-relaxed">{college.description}</p>
                </div>
                {college.courses && <CoursesTable collegeName={college.name} courses={college.courses} />}
                {college.admission_process && <AdmissionProcessTable collegeName={college.name} collegeLocation={college.location} admissionProcess={college.admission_process} />}
                {college.placements && <PlacementsTable collegeName={college.name} placements={college.placements} />}
                {college.rankings && <RankingsTable collegeName={college.name} rankings={college.rankings} />}
                <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
              </div>
            )}

            {activeTab === "courses" && college.courses && (
              <CoursesTable collegeName={college.name} courses={college.courses} />
            )}

            {activeTab === "rankings" && college.rankings && (
              <RankingsTable collegeName={college.name} rankings={college.rankings} />
            )}

            {activeTab === "facilities" && (
              <FacilitiesTable collegeName={college.name} facilities={college.facilities} />
            )}

            {activeTab === "placements" && college.placements && (
              <PlacementsTable collegeName={college.name} placements={college.placements} />
            )}

            {activeTab === "admission" && college.admission_process && (
              <AdmissionProcessTable collegeName={college.name} collegeLocation={college.location} admissionProcess={college.admission_process} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Top Colleges</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=40&h=40&fit=crop" className="w-10 h-10 rounded" />
                    <span className="text-sm">Sri Ramakrishna Engineering College</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=40&h=40&fit=crop" className="w-10 h-10 rounded" />
                    <span className="text-sm">Karpagam College of Engineering</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <img src="https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=40&h=40&fit=crop" className="w-10 h-10 rounded" />
                    <span className="text-sm">RVS College of Engineering and Technology</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4">Quick Facts</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-semibold">{college.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{college.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">District:</span>
                    <span className="font-semibold">{college.district}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default CollegeDetail;
