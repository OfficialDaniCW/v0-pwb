"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Trash2,
  Upload,
  FileText,
  Save,
  Eye,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Calculator,
  Bold,
  Italic,
  List,
  Link2,
  Heading2,
  TrendingUp,
  ImageIcon,
  Layers,
  Star,
} from "lucide-react"
import { blogPosts as staticBlogPosts } from "@/lib/blog-posts"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  published_at: string | null
  is_published: boolean
  featuredImage?: string
  readTime?: number
}

interface GalleryImage {
  id: number
  title: string
  location: string
  service_type: string
  before_image_url: string
  after_image_url: string
  description: string
  featured: boolean
}

interface Transformation {
  id: number
  title: string
  before_image_url: string
  after_image_url: string
  service_type: string
  location: string
  description: string
  featured: boolean
  display_order: number
}

const fallbackPortfolio = [
  {
    id: 1,
    title: "Commercial Patio",
    before_image_url: "/images/portfolio/commercial-patio-before.jpg",
    after_image_url: "/images/portfolio/commercial-patio-after.jpg",
    service_type: "Patio Cleaning",
    location: "Swanage, Purbeck",
    description: "Professional commercial patio restoration",
    featured: true,
    display_order: 1,
  },
  {
    id: 2,
    title: "Garden Patio",
    before_image_url: "/images/portfolio/garden-patio-before.jpg",
    after_image_url: "/images/portfolio/garden-patio-after.jpg",
    service_type: "Patio Cleaning",
    location: "Corfe Castle, Purbeck",
    description: "Complete garden patio transformation",
    featured: true,
    display_order: 2,
  },
  {
    id: 3,
    title: "Render Cleaning",
    before_image_url: "/images/portfolio/render-clean-before.jpg",
    after_image_url: "/images/portfolio/render-clean-after.jpg",
    service_type: "Render Cleaning",
    location: "Wareham, Purbeck",
    description: "Professional render soft wash treatment",
    featured: true,
    display_order: 3,
  },
  {
    id: 4,
    title: "Swanage Patio",
    before_image_url: "/images/portfolio/swanage-patio-before.jpg",
    after_image_url: "/images/portfolio/swanage-patio-after.jpg",
    service_type: "Patio Cleaning",
    location: "Swanage",
    description: "Residential patio deep clean",
    featured: true,
    display_order: 4,
  },
  {
    id: 5,
    title: "Patio Restoration",
    before_image_url: "/images/portfolio/patio-cleaning-before.jpg",
    after_image_url: "/images/portfolio/patio-cleaning-after.jpg",
    service_type: "Patio Cleaning",
    location: "Poole",
    description: "Complete patio restoration project",
    featured: true,
    display_order: 5,
  },
]

export default function PWBAdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saveMessage, setSaveMessage] = useState("")
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)
  const [uploadingWorksBefore, setUploadingWorksBefore] = useState(false)
  const [uploadingWorksAfter, setUploadingWorksAfter] = useState(false)

  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() =>
    staticBlogPosts.map((post, index) => ({
      id: index + 1,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      published_at: post.publishedAt,
      is_published: true,
      featuredImage: post.featuredImage,
      readTime: post.readTime,
    })),
  )
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Property Maintenance",
    is_published: false,
  })

  const [pricingData, setPricingData] = useState({
    driveway: { baseRate: 2.5, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
    patio: { baseRate: 2.3, easyAccess: 1, hardAccess: 1.25, noWater: 1.15 },
    roof: { baseRate: 3.5, easyAccess: 1, hardAccess: 1.4, noWater: 1.1 },
    walls: { baseRate: 2.0, easyAccess: 1, hardAccess: 1.3, noWater: 1.2 },
  })

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() =>
    fallbackPortfolio.map((item) => ({
      id: item.id,
      title: item.title,
      location: item.location,
      service_type: item.service_type,
      before_image_url: item.before_image_url,
      after_image_url: item.after_image_url,
      description: item.description,
      featured: item.featured,
    })),
  )
  const [currentGallery, setCurrentGallery] = useState<Partial<GalleryImage>>({
    title: "",
    location: "",
    service_type: "",
    before_image_url: "",
    after_image_url: "",
    description: "",
    featured: false,
  })

  const [transformations, setTransformations] = useState<Transformation[]>(fallbackPortfolio)
  const [currentTransformation, setCurrentTransformation] = useState<Partial<Transformation>>({
    title: "",
    before_image_url: "",
    after_image_url: "",
    service_type: "",
    location: "",
    description: "",
    featured: true,
    display_order: 0,
  })

  // Load data from database (merge with existing)
  useEffect(() => {
    loadBlogPosts()
    loadGalleryImages()
    loadTransformations()
  }, [])

  const handleSectionChange = (section: string) => {
    setActiveSection(section || "dashboard")
  }

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        // Merge database posts with static posts (avoid duplicates)
        const dbSlugs = new Set(data.map((p: BlogPost) => p.slug))
        const staticNotInDb = staticBlogPosts
          .filter((p) => !dbSlugs.has(p.slug))
          .map((post, index) => ({
            id: 1000 + index, // Assign higher IDs to distinguish from DB entries if needed
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            published_at: post.publishedAt,
            is_published: true,
            featuredImage: post.featuredImage,
            readTime: post.readTime,
          }))
        setBlogPosts([...data, ...staticNotInDb])
      } else {
        // If DB has no posts, use static ones as fallback
        setBlogPosts(
          staticBlogPosts.map((post, index) => ({
            id: index + 1,
            title: post.title,
            slug: post.slug,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            published_at: post.publishedAt,
            is_published: true,
            featuredImage: post.featuredImage,
            readTime: post.readTime,
          })),
        )
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
      // Keep the static posts as fallback
    }
  }

  const loadGalleryImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setGalleryImages(data)
      }
      // Keep fallback data if no database entries
    } catch (error) {
      console.error("Error loading gallery images:", error)
    }
  }

  const loadTransformations = async () => {
    try {
      const response = await fetch("/api/transformations")
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setTransformations(data)
      }
      // Keep fallback data if no database entries
    } catch (error) {
      console.error("Error loading transformations:", error)
    }
  }

  const handleImageUpload = async (file: File, type: "before" | "after") => {
    try {
      type === "before" ? setUploadingBefore(true) : setUploadingAfter(true)

      setSaveMessage("Optimizing and uploading image...")

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      const blob = await response.json()

      if (type === "before") {
        setCurrentGallery((prev) => ({ ...prev, before_image_url: blob.url }))
      } else {
        setCurrentGallery((prev) => ({ ...prev, after_image_url: blob.url }))
      }

      const savingsMsg = blob.savings > 0 ? ` (${blob.savings}% smaller)` : ""
      setSaveMessage(`Image uploaded successfully!${savingsMsg}`)
      setTimeout(() => setSaveMessage(""), 4000)
    } catch (error) {
      setSaveMessage("Error uploading image. Please try again.")
      console.error("Upload error:", error)
    } finally {
      type === "before" ? setUploadingBefore(false) : setUploadingAfter(false)
    }
  }

  const handleWorksImageUpload = async (file: File, type: "before" | "after") => {
    try {
      type === "before" ? setUploadingWorksBefore(true) : setUploadingWorksAfter(true)

      setSaveMessage("Optimizing and uploading image...")

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      const blob = await response.json()

      if (type === "before") {
        setCurrentTransformation((prev) => ({ ...prev, before_image_url: blob.url }))
      } else {
        setCurrentTransformation((prev) => ({ ...prev, after_image_url: blob.url }))
      }

      const savingsMsg = blob.savings > 0 ? ` (${blob.savings}% smaller)` : ""
      setSaveMessage(`Image uploaded successfully!${savingsMsg}`)
      setTimeout(() => setSaveMessage(""), 4000)
    } catch (error) {
      setSaveMessage("Error uploading image. Please try again.")
      console.error("Upload error:", error)
    } finally {
      type === "before" ? setUploadingWorksBefore(false) : setUploadingWorksAfter(false)
    }
  }

  const saveBlogPost = async () => {
    try {
      const method = currentPost.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentPost),
      })

      if (response.ok) {
        setSaveMessage("Blog post saved successfully!")
        loadBlogPosts()
        if (!currentPost.id) {
          setCurrentPost({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            category: "Property Maintenance",
            is_published: false,
          })
        }
      } else {
        setSaveMessage("Error saving blog post. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error saving blog post. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Blog post deleted successfully!")
        loadBlogPosts()
      } else {
        setSaveMessage("Error deleting blog post. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error deleting blog post. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const saveGalleryItem = async () => {
    try {
      const method = currentGallery.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentGallery),
      })

      if (response.ok) {
        setSaveMessage("Gallery item saved successfully!")
        loadGalleryImages()
        if (!currentGallery.id) {
          setCurrentGallery({
            title: "",
            location: "",
            service_type: "",
            before_image_url: "",
            after_image_url: "",
            description: "",
            featured: false,
          })
        }
      } else {
        setSaveMessage("Error saving gallery item. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error saving gallery item. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteGalleryItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Gallery item deleted successfully!")
        loadGalleryImages()
      } else {
        setSaveMessage("Error deleting gallery item. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error deleting gallery item. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const saveTransformation = async () => {
    try {
      const method = currentTransformation.id ? "PUT" : "POST"
      const response = await fetch("/api/transformations", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTransformation),
      })

      if (response.ok) {
        setSaveMessage("Transformation saved successfully!")
        loadTransformations()
        if (!currentTransformation.id) {
          setCurrentTransformation({
            title: "",
            before_image_url: "",
            after_image_url: "",
            service_type: "",
            location: "",
            description: "",
            featured: true,
            display_order: 0,
          })
        }
      } else {
        setSaveMessage("Error saving transformation. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error saving transformation. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteTransformation = async (id: number) => {
    if (!confirm("Are you sure you want to delete this transformation?")) return

    try {
      const response = await fetch(`/api/transformations/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Transformation deleted successfully!")
        loadTransformations()
      } else {
        setSaveMessage("Error deleting transformation. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error deleting transformation. Please try again.")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Allow letters, numbers, spaces, and hyphens
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .trim() // Remove leading/trailing hyphens
  }

  const insertFormatting = (type: string) => {
    const textarea = document.querySelector('[data-rich-text="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = currentPost.content?.substring(start, end) || ""

    let newText = ""
    let cursorOffset = 0

    switch (type) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`
        cursorOffset = selectedText ? newText.length : 2
        break
      case "italic":
        newText = `*${selectedText || "italic text"}*`
        cursorOffset = selectedText ? newText.length : 1
        break
      case "heading":
        newText = `\n## ${selectedText || "Heading"}\n`
        cursorOffset = selectedText ? newText.length : 4
        break
      case "list":
        newText = `\n- ${selectedText || "List item"}\n`
        cursorOffset = selectedText ? newText.length : 3
        break
      case "link":
        newText = `[${selectedText || "link text"}](url)`
        cursorOffset = selectedText ? newText.length : 1
        break
    }

    const content = currentPost.content || ""
    const before = content.substring(0, start)
    const after = content.substring(end)

    setCurrentPost((prev) => ({
      ...prev,
      content: before + newText + after,
    }))

    // Set cursor position after insertion (optional, for better UX)
    requestAnimationFrame(() => {
      const textareaAfterUpdate = document.querySelector('[data-rich-text="true"]') as HTMLTextAreaElement
      if (textareaAfterUpdate) {
        textareaAfterUpdate.focus()
        textareaAfterUpdate.setSelectionRange(start + cursorOffset, start + cursorOffset)
      }
    })
  }

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setAiGenerating(true)
    try {
      // Changed API endpoint to match typical blog helper functionality
      const response = await fetch("/api/ai/blog-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentPost((prev) => ({
          ...prev,
          // Append generated content to existing content
          content: (prev.content || "") + "\n\n" + data.content,
        }))
        setAiPrompt("")
        setSaveMessage("AI content generated successfully!")
      } else {
        setSaveMessage("Error generating AI content. Please try again.")
      }
    } catch (error) {
      console.error("AI generation error:", error)
      setSaveMessage("Error generating AI content. Please try again.")
    }
    setAiGenerating(false)
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const updatePricing = async () => {
    try {
      const response = await fetch("/api/admin/pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pricingData),
      })

      if (response.ok) {
        setSaveMessage("Pricing updated successfully!")
      } else {
        setSaveMessage("Error updating pricing. Please try again.")
      }
    } catch (error) {
      setSaveMessage("Error updating pricing. Please try again.")
      console.error(error)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const renderContent = () => {
    switch (activeSection) {
      case "blog":
        return renderBlogSection()
      case "gallery":
        return renderGallerySection()
      case "works":
        return renderWorksSection()
      case "pricing":
        return renderPricingSection()
      case "dashboard":
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome to Admin Dashboard</h1>
        <p className="text-white/60 mt-1">Manage your PowerWash Bros website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-[#1a3a5c] border-[#1E90FF]/30 shadow-lg hover:shadow-xl hover:shadow-[#1E90FF]/10 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Blog Posts</p>
                <p className="text-3xl font-bold text-white mt-1">{blogPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#1E90FF]/20 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#1E90FF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a3a5c] border-[#00C853]/30 shadow-lg hover:shadow-xl hover:shadow-[#00C853]/10 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Gallery Items</p>
                <p className="text-3xl font-bold text-white mt-1">{galleryImages.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#00C853]/20 rounded-xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a3a5c] border-purple-500/30 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Our Works</p>
                <p className="text-3xl font-bold text-white mt-1">{transformations.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Layers className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1a3a5c] border-[#00C853]/30 shadow-lg hover:shadow-xl hover:shadow-[#00C853]/10 transition-all">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/70">Site Status</p>
                <p className="text-lg font-bold text-[#00C853] mt-1">Live</p>
              </div>
              <div className="w-12 h-12 bg-[#00C853]/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-[#00C853]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a3a5c] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-[#1E90FF]/30 hover:bg-[#1E90FF]/20 hover:border-[#1E90FF] bg-[#0B1E3F] text-white"
              onClick={() => {
                window.location.hash = "blog"
                setActiveSection("blog")
              }}
            >
              <FileText className="h-5 w-5 text-[#1E90FF]" />
              <span>New Blog Post</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-[#00C853]/30 hover:bg-[#00C853]/20 hover:border-[#00C853] bg-[#0B1E3F] text-white"
              onClick={() => {
                window.location.hash = "gallery"
                setActiveSection("gallery")
              }}
            >
              <ImageIcon className="h-5 w-5 text-[#00C853]" />
              <span>Add Gallery</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-purple-500/30 hover:bg-purple-500/20 hover:border-purple-500 bg-[#0B1E3F] text-white"
              onClick={() => {
                window.location.hash = "works"
                setActiveSection("works")
              }}
            >
              <Layers className="h-5 w-5 text-purple-400" />
              <span>Add Work</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-orange-500/30 hover:bg-orange-500/20 hover:border-orange-500 bg-[#0B1E3F] text-white"
              onClick={() => {
                window.location.hash = "pricing"
                setActiveSection("pricing")
              }}
            >
              <Calculator className="h-5 w-5 text-orange-400" />
              <span>Update Pricing</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#1a3a5c] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {blogPosts.slice(0, 3).map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-3 bg-[#0B1E3F] rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1E90FF]/20 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-[#1E90FF]" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">{post.title}</p>
                    <p className="text-xs text-white/50">{post.category}</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-[#00C853]/20 text-[#00C853] rounded-full">Published</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBlogSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Blog Management</h1>
          <p className="text-white/60 mt-1">Create and manage blog posts</p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 bg-[#0B1E3F] hover:bg-[#1E90FF] text-white hover:text-white"
          onClick={() => window.open("/blog", "_blank")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Blog
        </Button>
      </div>

      {/* Blog Form - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">{currentPost.id ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Helper */}
          <div className="p-4 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-[#1E90FF]" />
              <span className="font-semibold text-[#1E90FF]">AI Blog Helper</span>
            </div>
            <p className="text-sm text-white/70 mb-3">
              Ask AI to help write sections, expand ideas, or improve your content
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Write a section about moss prevention tips..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                onClick={generateWithAI}
                disabled={aiGenerating || !aiPrompt.trim()}
                className="bg-[#1E90FF] hover:bg-[#1E90FF]/90"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {aiGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={currentPost.title || ""}
                onChange={(e) => {
                  setCurrentPost((prev) => ({
                    ...prev,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  }))
                }}
                placeholder="Enter blog post title..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="slug" className="text-white">
                Slug
              </Label>
              <Input
                id="slug"
                value={currentPost.slug || ""}
                onChange={(e) => setCurrentPost((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <select
              id="category"
              value={currentPost.category || "Property Maintenance"}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full h-10 px-3 rounded-md border border-white/20 bg-white/10 text-white"
            >
              <option value="Property Maintenance" className="bg-[#0B1E3F]">
                Property Maintenance
              </option>
              <option value="Cleaning Tips" className="bg-[#0B1E3F]">
                Cleaning Tips
              </option>
              <option value="Business News" className="bg-[#0B1E3F]">
                Business News
              </option>
              <option value="Seasonal Advice" className="bg-[#0B1E3F]">
                Seasonal Advice
              </option>
              <option value="Company News" className="bg-[#0B1E3F]">
                Company News
              </option>
              <option value="Expert Advice" className="bg-[#0B1E3F]">
                Expert Advice
              </option>
              <option value="Prevention Tips" className="bg-[#0B1E3F]">
                Prevention Tips
              </option>
              <option value="Industry Insights" className="bg-[#0B1E3F]">
                Industry Insights
              </option>
            </select>
          </div>

          <div>
            <Label htmlFor="excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={currentPost.excerpt || ""}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the post..."
              rows={2}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="content" className="text-white">
                Content
              </Label>
              <div className="flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("bold")}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("italic")}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("heading")}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("list")}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => insertFormatting("link")}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              id="content"
              data-rich-text="true"
              value={currentPost.content || ""}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here... (Markdown supported)"
              rows={12}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPost.is_published || false}
                onChange={(e) => setCurrentPost((prev) => ({ ...prev, is_published: e.target.checked }))}
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <span className="text-sm text-white">Publish immediately</span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveBlogPost} className="bg-[#1E90FF] hover:bg-[#1E90FF]/90">
              <Save className="h-4 w-4 mr-2" />
              {currentPost.id ? "Update Post" : "Save Post"}
            </Button>
            {currentPost.id && (
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                onClick={() =>
                  setCurrentPost({
                    title: "",
                    slug: "",
                    excerpt: "",
                    content: "",
                    category: "Property Maintenance",
                    is_published: false,
                  })
                }
              >
                Create New
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Posts - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Existing Blog Posts ({blogPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {blogPosts.length === 0 ? (
            <p className="text-white/50 text-center py-8">No blog posts yet. Create your first post above!</p>
          ) : (
            <div className="space-y-3">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{post.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-white/60 mt-1">
                      <span className="px-2 py-0.5 bg-white/10 rounded">{post.category}</span>
                      <span className={post.is_published ? "text-[#00C853]" : "text-orange-400"}>
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                      onClick={() => setCurrentPost(post)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBlogPost(post.id)}
                      className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderGallerySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Gallery Management</h1>
          <p className="text-white/60 mt-1">Manage before/after images for your portfolio</p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 bg-[#0B1E3F] hover:bg-[#1E90FF] text-white hover:text-white"
          onClick={() => window.open("/our-work", "_blank")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Gallery
        </Button>
      </div>

      {/* Gallery Form - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">
            {currentGallery.id ? "Edit Gallery Item" : "Add New Gallery Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gallery-title" className="text-white">
                Title
              </Label>
              <Input
                id="gallery-title"
                value={currentGallery.title || ""}
                onChange={(e) => setCurrentGallery((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Victorian Driveway Restoration"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="gallery-location" className="text-white">
                Location
              </Label>
              <Input
                id="gallery-location"
                value={currentGallery.location || ""}
                onChange={(e) => setCurrentGallery((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Swanage, Purbeck"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gallery-service" className="text-white">
              Service Type
            </Label>
            <Input
              id="gallery-service"
              value={currentGallery.service_type || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, service_type: e.target.value }))}
              placeholder="e.g., Driveway Cleaning"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <Label htmlFor="gallery-description" className="text-white">
              Description
            </Label>
            <Textarea
              id="gallery-description"
              value={currentGallery.description || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the transformation..."
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Before Image</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors bg-white/5">
                {currentGallery.before_image_url ? (
                  <div className="relative">
                    <img
                      src={currentGallery.before_image_url || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCurrentGallery((prev) => ({ ...prev, before_image_url: "" }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-white/40 mb-2" />
                    <span className="text-sm text-white/60">
                      {uploadingBefore ? "Uploading..." : "Click to upload before image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "before")}
                      disabled={uploadingBefore}
                    />
                  </label>
                )}
              </div>
            </div>
            <div>
              <Label className="text-white">After Image</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors bg-white/5">
                {currentGallery.after_image_url ? (
                  <div className="relative">
                    <img
                      src={currentGallery.after_image_url || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCurrentGallery((prev) => ({ ...prev, after_image_url: "" }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-white/40 mb-2" />
                    <span className="text-sm text-white/60">
                      {uploadingAfter ? "Uploading..." : "Click to upload after image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], "after")}
                      disabled={uploadingAfter}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentGallery.featured || false}
                onChange={(e) => setCurrentGallery((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <span className="text-sm text-white">Featured item</span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveGalleryItem} className="bg-[#1E90FF] hover:bg-[#1E90FF]/90">
              <Save className="h-4 w-4 mr-2" />
              {currentGallery.id ? "Update Item" : "Save Item"}
            </Button>
            {currentGallery.id && (
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                onClick={() =>
                  setCurrentGallery({
                    title: "",
                    location: "",
                    service_type: "",
                    before_image_url: "",
                    after_image_url: "",
                    description: "",
                    featured: false,
                  })
                }
              >
                Create New
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Gallery Items - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Existing Gallery Items ({galleryImages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {galleryImages.length === 0 ? (
            <p className="text-white/50 text-center py-8">No gallery items yet. Add your first item above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-lg overflow-hidden hover:border-[#1E90FF]/50 transition-colors bg-white/5"
                >
                  <div className="relative h-32 bg-[#0B1E3F]">
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative">
                        <img
                          src={item.before_image_url || "/placeholder.svg?height=128&width=150&query=before cleaning"}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                          Before
                        </span>
                      </div>
                      <div className="w-1/2 relative">
                        <img
                          src={item.after_image_url || "/placeholder.svg?height=128&width=150&query=after cleaning"}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-xs bg-[#00C853] text-white px-1.5 py-0.5 rounded">
                          After
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white text-sm">{item.title}</h3>
                    <p className="text-white/60 text-xs mt-1">{item.location}</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                        onClick={() => setCurrentGallery(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderWorksSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Our Works Management</h1>
          <p className="text-white/60 mt-1">Manage transformation showcases</p>
        </div>
        <Button
          variant="outline"
          className="border-white/20 bg-[#0B1E3F] hover:bg-[#1E90FF] text-white hover:text-white"
          onClick={() => window.open("/our-work", "_blank")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Works
        </Button>
      </div>

      {/* Works Form - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">{currentTransformation.id ? "Edit Work" : "Add New Work"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="works-title" className="text-white">
                Title
              </Label>
              <Input
                id="works-title"
                value={currentTransformation.title || ""}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Victorian Terrace Transformation"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="works-location" className="text-white">
                Location
              </Label>
              <Input
                id="works-location"
                value={currentTransformation.location || ""}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Swanage, Purbeck"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="works-service" className="text-white">
              Service Type
            </Label>
            <Input
              id="works-service"
              value={currentTransformation.service_type || ""}
              onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, service_type: e.target.value }))}
              placeholder="e.g., Driveway Cleaning"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <Label htmlFor="works-description" className="text-white">
              Description
            </Label>
            <Textarea
              id="works-description"
              value={currentTransformation.description || ""}
              onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the transformation..."
              rows={3}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Before Image</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors bg-white/5">
                {currentTransformation.before_image_url ? (
                  <div className="relative">
                    <img
                      src={currentTransformation.before_image_url || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCurrentTransformation((prev) => ({ ...prev, before_image_url: "" }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-white/40 mb-2" />
                    <span className="text-sm text-white/60">
                      {uploadingWorksBefore ? "Uploading..." : "Click to upload before image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleWorksImageUpload(e.target.files[0], "before")}
                      disabled={uploadingWorksBefore}
                    />
                  </label>
                )}
              </div>
            </div>
            <div>
              <Label className="text-white">After Image</Label>
              <div className="mt-2 border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors bg-white/5">
                {currentTransformation.after_image_url ? (
                  <div className="relative">
                    <img
                      src={currentTransformation.after_image_url || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-32 object-cover rounded"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCurrentTransformation((prev) => ({ ...prev, after_image_url: "" }))}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto text-white/40 mb-2" />
                    <span className="text-sm text-white/60">
                      {uploadingWorksAfter ? "Uploading..." : "Click to upload after image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleWorksImageUpload(e.target.files[0], "after")}
                      disabled={uploadingWorksAfter}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentTransformation.featured || false}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-white/20 bg-white/10"
              />
              <span className="text-sm text-white">Featured work</span>
            </label>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveTransformation} className="bg-[#1E90FF] hover:bg-[#1E90FF]/90">
              <Save className="h-4 w-4 mr-2" />
              {currentTransformation.id ? "Update Work" : "Save Work"}
            </Button>
            {currentTransformation.id && (
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                onClick={() =>
                  setCurrentTransformation({
                    title: "",
                    before_image_url: "",
                    after_image_url: "",
                    service_type: "",
                    location: "",
                    description: "",
                    featured: true,
                    display_order: 0,
                  })
                }
              >
                Create New
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Existing Works - Navy theme */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Existing Works ({transformations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {transformations.length === 0 ? (
            <p className="text-white/50 text-center py-8">No works yet. Add your first work above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transformations.map((item) => (
                <div
                  key={item.id}
                  className="border border-white/10 rounded-lg overflow-hidden hover:border-[#1E90FF]/50 transition-colors bg-white/5"
                >
                  <div className="relative h-32 bg-[#0B1E3F]">
                    {item.featured && (
                      <div className="absolute top-2 right-2 z-10">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex">
                      <div className="w-1/2 relative">
                        <img
                          src={item.before_image_url || "/placeholder.svg?height=128&width=150&query=before cleaning"}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-red-500 text-white px-1.5 py-0.5 rounded">
                          Before
                        </span>
                      </div>
                      <div className="w-1/2 relative">
                        <img
                          src={item.after_image_url || "/placeholder.svg?height=128&width=150&query=after cleaning"}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-xs bg-[#00C853] text-white px-1.5 py-0.5 rounded">
                          After
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-white text-sm">{item.title}</h3>
                    <p className="text-[#1E90FF] text-xs mt-0.5">{item.service_type}</p>
                    <p className="text-white/60 text-xs">{item.location}</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-white/20 text-white hover:bg-white/10 text-xs bg-transparent"
                        onClick={() => setCurrentTransformation(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTransformation(item.id)}
                        className="text-red-400 border-red-400/30 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )

  const renderPricingSection = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0B1E3F]">Pricing Management</h1>
        <p className="text-[#0B1E3F]/70 mt-1">Configure pricing rates and multipliers</p>
      </div>

      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#1E90FF]" />
            Base Rates & Multipliers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(pricingData).map(([service, rates]) => (
            <div key={service} className="p-4 border border-white/10 rounded-lg bg-white/5">
              <h3 className="font-semibold text-[#1E90FF] capitalize mb-4">{service} Cleaning</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-white/70 text-xs">Base Rate (£/sqm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.baseRate}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: {
                          ...prev[service as keyof typeof prev],
                          baseRate: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs">Easy Access (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.easyAccess}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: {
                          ...prev[service as keyof typeof prev],
                          easyAccess: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs">Hard Access (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.hardAccess}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: {
                          ...prev[service as keyof typeof prev],
                          hardAccess: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-xs">No Water (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.noWater}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: {
                          ...prev[service as keyof typeof prev],
                          noWater: Number.parseFloat(e.target.value),
                        },
                      }))
                    }
                    className="mt-1 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button
            onClick={() => {
              updatePricing() // Call the actual updatePricing function
            }}
            className="bg-[#1E90FF] hover:bg-[#1E90FF]/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Pricing
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <AdminLayout onSectionChange={handleSectionChange}>
      <div className="min-h-screen">
        <div className="p-6">
          {saveMessage && (
            <Alert
              className={`mb-4 ${
                saveMessage.includes("Error")
                  ? "border-red-500 bg-red-500/10 text-red-600"
                  : "border-[#00C853] bg-[#00C853]/10 text-[#00C853]"
              }`}
            >
              {saveMessage.includes("Error") ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{saveMessage}</AlertDescription>
            </Alert>
          )}

          {renderContent()}
        </div>
      </div>
    </AdminLayout>
  )
}
