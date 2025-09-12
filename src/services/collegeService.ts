import { colleges as collegeData, College } from '../../collegeData'; // Import from collegeData.ts
import { DatabaseCollege, DatabaseBranch, DatabaseCutoffData } from "@/types/database";
import { sanitizeInput, isValidSlug } from "@/utils/security";

// Helper function to transform College data to DatabaseCollege format
const transformCollegeToDatabaseCollege = (college: College): DatabaseCollege => {
  const district = college.location.split(',')[0].trim(); // Extract district from location
  // Generate slug: lowercase, replace spaces with hyphens, remove non-alphanumeric characters except hyphens
  const slug = college.name
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/[^\w-]+/g, ''); // Remove all non-word chars except hyphens

  return {
    id: college.id,
    name: college.name,
    slug: slug,
    location: college.location,
    district: district,
    type: college.type, // Assuming type mapping is direct or handled by frontend
    naac_grade: "N/A", // Default value as per user input
    established: college.established,
    website: college.contact?.website || null,
    facilities: college.facilities,
    featured: false, // Default value as per user input
    homepage_featured: false, // Default value
    display_order: 0, // Default value
    image_url: college.image,
    principal_name: null, // Default value
    email: college.contact?.email || null,
    phone: college.contact?.phone || null,
    address: college.contact?.address || null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
};

export async function getColleges(): Promise<DatabaseCollege[]> {
  try {
    // Transform collegeData to DatabaseCollege format
    const transformedColleges = collegeData.map(transformCollegeToDatabaseCollege);
    return transformedColleges;
  } catch (error) {
    console.error('Service error in getColleges:', error);
    throw error;
  }
}

export async function getFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const allColleges = await getColleges(); // Get transformed data
    const featuredColleges = allColleges.filter(college => college.featured);
    return featuredColleges;
  } catch (error) {
    console.error('Service error in getFeaturedColleges:', error);
    throw error;
  }
}

export async function getHomepageFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const allColleges = await getColleges(); // Get transformed data
    const homepageFeaturedColleges = allColleges.filter(college => college.homepage_featured);
    return homepageFeaturedColleges;
  } catch (error) {
    console.error('Service error in getHomepageFeaturedColleges:', error);
    throw error;
  }
}

export async function getCollegeBySlug(slug: string): Promise<DatabaseCollege | null> {
  try {
    // Validate and sanitize the slug input
    if (!isValidSlug(slug)) {
      console.error('Invalid slug format:', slug);
      return null;
    }

    const sanitizedSlug = sanitizeInput(slug);
    
    const allColleges = await getColleges(); // Get transformed data
    const college = allColleges.find(college => college.slug === sanitizedSlug);

    if (!college) {
      console.log('No college found for slug:', sanitizedSlug);
      return null;
    }

    return college;
  } catch (error) {
    console.error('Service error in getCollegeBySlug:', error);
    return null;
  }
}

export async function getBranches(): Promise<DatabaseBranch[]> {
  try {
    // Returning an empty array as branch data is not available in college.json
    return [];
  } catch (error) {
    console.error('Service error in getBranches:', error);
    throw error;
  }
}

export async function getCutoffData(): Promise<DatabaseCutoffData[]> {
  try {
    // Returning an empty array as cutoff data is not available in college.json
    return [];
  } catch (error) {
    console.error('Service error in getCutoffData:', error);
    throw error;
  }
}

export async function getCutoffDataForCollege(collegeId: string): Promise<DatabaseCutoffData[]> {
  try {
    // Returning an empty array as cutoff data is not available in college.json
    console.log(`Fetching cutoff data for collegeId: ${collegeId}`);
    return [];
  } catch (error) {
    console.error('Service error in getCutoffDataForCollege:', error);
    return [];
  }
}
