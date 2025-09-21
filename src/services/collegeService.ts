import { createClient } from '@supabase/supabase-js';
import { DatabaseCollege, DatabaseBranch, DatabaseCutoffData, Course, Placement, Ranking, AdmissionProcess } from "@/types/database";
import { sanitizeInput, isValidSlug } from "@/utils/security";

// Supabase configuration
const supabaseUrl = 'https://gsvxhqxuxwanujktjjys.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdnhocXh1eHdhbnVqa3RqanlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4Njc0MTUsImV4cCI6MjA3MzQ0MzQxNX0.I0qH3PkGB4_P2XK5IoXNpiRWGuS68qtQIuHAFT7bp_c';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to map Supabase data to DatabaseCollege interface
// Note: Supabase returns data in snake_case by default, so we map it to camelCase
const mapSupabaseCollegeToDatabaseCollege = (college: any): DatabaseCollege => {
    return {
    id: college.id,
    name: college.name,
    slug: college.slug,
    location: college.location,
    district: college.district,
    type: college.type,
    type_collwge: college.type_collwge, // Added mapping for the new field
    naac_grade: college.naac_grade,
    established: college.established,
    website: college.website,
    facilities: college.facilities,
    featured: college.featured,
    homepage_featured: college.homepage_featured,
    display_order: college.display_order,
    image_url: college.image_url,
    college_logo: college.college_logo, // Mapped college_logo
    principal_name: college.principal_name,
    email: college.email,
    phone: college.phone,
    address: college.address,
    description: college.description,
    created_at: college.created_at,
    updated_at: college.updated_at,
    courses: college.courses,
    placements: college.placements,
    rankings: college.rankings,
    admission_process: college.admission_process,
  };
};

export async function getColleges(): Promise<DatabaseCollege[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*, courses(*), placements(*), rankings(*)');

    if (error) throw error;
    if (!data) return [];

    // Map Supabase data to DatabaseCollege interface
    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getColleges:', error.message);
    throw error;
  }
}

export async function getFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('featured', true);

    if (error) throw error;
    if (!data) return [];

    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getFeaturedColleges:', error.message);
    throw error;
  }
}

export async function getHomepageFeaturedColleges(): Promise<DatabaseCollege[]> {
  try {
    const { data, error } = await supabase
      .from('colleges')
      .select('*')
      .eq('homepage_featured', true);

    if (error) throw error;
    if (!data) return [];

    return data.map(mapSupabaseCollegeToDatabaseCollege);
  } catch (error: any) {
    console.error('Service error in getHomepageFeaturedColleges:', error.message);
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
    
    const { data, error } = await supabase
      .from('colleges')
      .select(`
        *,
        courses (*),
        placements (*),
        rankings (*),
        admission_process (*)
      `)
      .eq('slug', sanitizedSlug)
      .single();

    if (error) throw error;
    if (!data) {
      console.log('No college found for slug:', sanitizedSlug);
      return null;
    }

    return mapSupabaseCollegeToDatabaseCollege(data);
  } catch (error: any) {
    console.error('Service error in getCollegeBySlug:', error.message);
    return null;
  }
}

export async function getBranches(): Promise<DatabaseBranch[]> {
  try {
    const { data, error } = await supabase
      .from('Branches')
      .select('*');

    if (error) throw error;
    if (!data) return [];

    // Assuming Supabase returns data compatible with DatabaseBranch or needs mapping
    // For now, returning as is, assuming structure matches or is handled by frontend
    return data as DatabaseBranch[]; 
  } catch (error: any) {
    console.error('Service error in getBranches:', error.message);
    throw error;
  }
}

export async function getCutoffData(): Promise<DatabaseCutoffData[]> {
  try {
    const { data, error } = await supabase
      .from('CutoffData')
      .select('*');

    if (error) throw error;
    if (!data) return [];

    // Assuming Supabase returns data compatible with DatabaseCutoffData or needs mapping
    return data as DatabaseCutoffData[];
  } catch (error: any) {
    console.error('Service error in getCutoffData:', error.message);
    throw error;
  }
}

export async function getCutoffDataForCollege(collegeId: string): Promise<DatabaseCutoffData[]> {
  try {
    const { data, error } = await supabase
      .from('CutoffData')
      .select('*')
      .eq('college_id', collegeId);

    if (error) throw error;
    if (!data) return [];

    return data as DatabaseCutoffData[];
  } catch (error: any) {
    console.error('Service error in getCutoffDataForCollege:', error.message);
    return [];
  }
}
