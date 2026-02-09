// Database utility functions for PowerWash Bros
// Using Neon PostgreSQL

// Note: Direct database connections should only be used in server-only contexts
// For client-facing features, use API routes instead

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string | null
  content: string
  featured_image_url: string | null
  author: string
  category: string | null
  tags: string[] | null
  published_at: Date | null
  updated_at: Date
  is_published: boolean
  meta_title: string | null
  meta_description: string | null
  read_time_minutes: number | null
  views: number
  created_at: Date
}

export interface Transformation {
  id: number
  title: string
  location: string | null
  service_type: string | null
  before_image_url: string
  after_image_url: string
  description: string | null
  featured: boolean
  display_order: number | null
  created_at: Date
}

export interface Testimonial {
  id: number
  customer_name: string
  property_type: string | null
  location: string | null
  service: string | null
  quote: string
  rating: number
  featured: boolean
  display_order: number | null
  created_at: Date
}

export interface QuoteRequest {
  id: number
  name: string
  email: string
  phone: string
  postcode: string
  property_type: string | null
  service_needed: string | null
  property_details: string | null
  preferred_contact: string
  heard_from: string | null
  status: string
  created_at: Date
}
