"use client"

import type React from "react"
import AdminLayout from "@/components/admin/admin-layout"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Save,
  Eye,
  Sparkles,
  Calculator,
  TrendingUp,
  ImageIcon,
  Layers,
  Upload,
  Trash2,
  Edit,
  AlertTriangle,
} from "lucide-react"
import Image from "next/image"
import { ScheduledPostsManager } from "@/components/admin/scheduled-posts-manager"

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  published_at: string | null
  is_published: boolean
  featured_image_url?: string
  read_time_minutes?: number
  author?: string
  tags?: string[]
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
  const [uploadingBlogImage, setUploadingBlogImage] = useState(false)

  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Property Maintenance",
    is_published: false,
    featured_image_url: "",
    read_time_minutes: 5,
    author: "PowerWash Bros",
  })

  const [pricingData, setPricingData] = useState({
    driveway: {
      baseRate: 3,
      blockPavingResanding: 2,
      easyAccess: 1,
      hardAccess: 1.3,
    },
    patio: {
      baseRate: 5,
      easyAccess: 1,
      hardAccess: 1.25,
    },
    roof: {
      baseRate: 11.5,
      easyAccess: 1,
      hardAccess: 1.4,
    },
    gutter: {
      baseRate: 6,
      perMetre: true,
    },
    walls: {
      baseRate: 3,
      easyAccess: 1,
      hardAccess: 1.3,
    },
    softwash: {
      baseRate: 5,
      easyAccess: 1,
      hardAccess: 1.35,
    },
  })

  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(fallbackPortfolio)
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

  useEffect(() => {
    loadBlogPosts()
    loadGalleryImages()
    loadTransformations()
    // Pricing data is initialized with default values above
  }, [])

  const handleSectionChange = (section: string) => {
    setActiveSection(section || "dashboard")
  }

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      if (response.ok) {
        const posts = await response.json()
        setBlogPosts(posts)
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error)
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

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size (max 10MB)
    const MAX_FILE_SIZE = 10 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      setSaveMessage("File too large. Maximum size is 10MB.")
      setTimeout(() => setSaveMessage(""), 3000)
      return
    }

    setUploadingBlogImage(true)
    setSaveMessage("Optimizing and uploading image...")

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentPost((prev) => ({ ...prev, featured_image_url: data.url }))
        const savingsMsg = data.savings > 0 ? ` (optimized to ${data.optimizedSize} bytes, ${data.savings}% reduction)` : ""
        setSaveMessage(`Image uploaded successfully!${savingsMsg}`)
      } else {
        setSaveMessage("Failed to upload image")
      }
    } catch (error) {
      setSaveMessage("Error uploading image")
      console.error("[v0] Blog image upload error:", error)
    } finally {
      setUploadingBlogImage(false)
      setTimeout(() => setSaveMessage(""), 4000)
    }
  }

  const saveBlogPost = async () => {
    try {
      const method = currentPost.id ? "PUT" : "POST"
      const response = await fetch("/api/admin/blog", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...currentPost,
          is_published: true,
        }),
      })

      if (response.ok) {
        const savedPost = await response.json()
        if (currentPost.id) {
          setBlogPosts((prev) => prev.map((p) => (p.id === savedPost.id ? savedPost : p)))
        } else {
          setBlogPosts((prev) => [savedPost, ...prev])
        }
        setCurrentPost({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Property Maintenance",
          is_published: false,
          featured_image_url: "",
          read_time_minutes: 5,
          author: "PowerWash Bros",
        })
        setSaveMessage("Blog post saved successfully!")
      } else {
        setSaveMessage("Failed to save blog post")
      }
    } catch (error) {
      setSaveMessage("Error saving blog post")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setBlogPosts((prev) => prev.filter((p) => p.id !== id))
        setSaveMessage("Blog post deleted successfully!")
      } else {
        setSaveMessage("Failed to delete blog post")
      }
    } catch (error) {
      setSaveMessage("Error deleting blog post")
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const editBlogPost = (post: BlogPost) => {
    setCurrentPost(post)
    window.scrollTo({ top: 0, behavior: "smooth" })
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
      const response = await fetch("/api/ai/blog-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentPost((prev) => ({
          ...prev,
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
            {blogPosts.length === 0 && (
              <div className="text-center py-8 text-white/50">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No blog posts yet. Create your first post above!</p>
              </div>
            )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-white">
                Category
              </Label>
              <select
                id="category"
                value={currentPost.category || "Property Maintenance"}
                onChange={(e) => setCurrentPost((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full h-10 px-3 rounded-md bg-white/10 border border-white/20 text-white"
              >
                <option value="Property Maintenance">Property Maintenance</option>
                <option value="Prevention Tips">Prevention Tips</option>
                <option value="Dorset Properties">Dorset Properties</option>
                <option value="Industry Insights">Industry Insights</option>
                <option value="Product Guides">Product Guides</option>
                <option value="Company News">Company News</option>
                <option value="Expert Advice">Expert Advice</option>
              </select>
            </div>
            <div>
              <Label htmlFor="readTime" className="text-white">
                Read Time (minutes)
              </Label>
              <Input
                id="readTime"
                type="number"
                value={currentPost.read_time_minutes || 5}
                onChange={(e) =>
                  setCurrentPost((prev) => ({ ...prev, read_time_minutes: Number.parseInt(e.target.value) || 5 }))
                }
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-white mb-2 block">Featured Image</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                {currentPost.featured_image_url ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-white/20">
                    <Image
                      src={currentPost.featured_image_url || "/placeholder.svg"}
                      alt="Featured image preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setCurrentPost((prev) => ({ ...prev, featured_image_url: "" }))}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-[#1E90FF] transition-colors">
                    <Upload className="h-8 w-8 text-white/50 mb-2" />
                    <span className="text-white/50 text-sm">
                      {uploadingBlogImage ? "Uploading..." : "Click to upload featured image"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBlogImageUpload}
                      disabled={uploadingBlogImage}
                    />
                  </label>
                )}
              </div>
              <div className="text-sm text-white/60 space-y-2">
                <p>Recommended size: 1200 x 630 pixels</p>
                <p>Max file size: 5MB</p>
                <p>Supported formats: JPG, PNG, WebP</p>
                <p className="text-[#1E90FF]">Images are automatically optimised on upload</p>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="excerpt"
              value={currentPost.excerpt || ""}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="A brief summary of the blog post (shown in cards)..."
              rows={2}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>

          <div>
            <Label htmlFor="content" className="text-white">
              Content (Markdown supported)
            </Label>
            <Textarea
              id="content"
              value={currentPost.content || ""}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, content: e.target.value }))}
              placeholder="Write your blog post content here... Markdown is supported."
              rows={12}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 font-mono text-sm"
            />
          </div>

          <div className="flex justify-between items-center">
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
                    featured_image_url: "",
                    read_time_minutes: 5,
                    author: "PowerWash Bros",
                  })
                }
              >
                Cancel Edit
              </Button>
            )}
            <Button className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white ml-auto" onClick={saveBlogPost}>
              <Save className="h-4 w-4 mr-2" />
              {currentPost.id ? "Update Blog Post" : "Save Blog Post"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Existing Blog Posts List */}
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Existing Blog Posts ({blogPosts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 bg-[#1a3a5c] rounded-lg border border-white/10"
              >
                <div className="flex items-center gap-4 flex-1">
                  {post.featured_image_url ? (
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={post.featured_image_url || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <ImageIcon className="h-6 w-6 text-white/30" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white truncate">{post.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded">{post.category}</span>
                      <span className={`text-xs ${post.is_published ? "text-[#00C853]" : "text-yellow-500"}`}>
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 bg-[#0B1E3F] hover:bg-[#1E90FF] text-white"
                    onClick={() => editBlogPost(post)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white"
                    onClick={() => deleteBlogPost(post.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {blogPosts.length === 0 && (
              <div className="text-center py-8 text-white/50">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No blog posts yet. Create your first post above!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderGallerySection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Gallery Management</h1>
          <p className="text-white/60 mt-1">Create and manage gallery items</p>
        </div>
      </div>
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Add New Gallery Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="gallery-title" className="text-white">
              Title
            </Label>
            <Input
              id="gallery-title"
              value={currentGallery.title || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter gallery item title..."
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
              placeholder="Enter gallery item location..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Label htmlFor="gallery-service-type" className="text-white">
              Service Type
            </Label>
            <Input
              id="gallery-service-type"
              value={currentGallery.service_type || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, service_type: e.target.value }))}
              placeholder="Enter gallery item service type..."
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
              placeholder="Enter gallery item description..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="bg-[#00C853] hover:bg-[#00C853]/90 text-white"
              onClick={saveGalleryItem}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Gallery Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderWorksSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Our Works Management</h1>
          <p className="text-white/60 mt-1">Create and manage our works items</p>
        </div>
      </div>
      <Card className="bg-[#0B1E3F] border-white/10 shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Add New Work Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="works-title" className="text-white">
              Title
            </Label>
            <Input
              id="works-title"
              value={currentTransformation.title || ""}
              onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter work item title..."
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
              placeholder="Enter work item location..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Label htmlFor="works-service-type" className="text-white">
              Service Type
            </Label>
            <Input
              id="works-service-type"
              value={currentTransformation.service_type || ""}
              onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, service_type: e.target.value }))}
              placeholder="Enter work item service type..."
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
              placeholder="Enter work item description..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="bg-purple-500 hover:bg-purple-500/90 text-white"
              onClick={saveTransformation}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Work Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderPricingSection = () => {
    if (!pricingData || !pricingData.driveway) {
      return (
        <div className="text-center py-12">
          <p className="text-white/70">Loading pricing data...</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Pricing Management</h1>
            <p className="text-white/60 mt-1">Configure pricing rates and multipliers</p>
          </div>
        </div>

        {/* Base Rates & Multipliers */}
        <div className="rounded-xl border border-white/10 bg-[#0B1E3F] p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Base Rates & Multipliers</h2>
          </div>

          {/* Driveway Cleaning */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-[#1E90FF] mb-4">Driveway Cleaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.driveway.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      driveway: { ...prev.driveway, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Easy Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.driveway.easyAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      driveway: { ...prev.driveway, easyAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Hard Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.driveway.hardAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      driveway: { ...prev.driveway, hardAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Block Paving Resanding (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.driveway.blockPavingResanding}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      driveway: { ...prev.driveway, blockPavingResanding: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Patio Cleaning */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-[#1E90FF] mb-4">Patio Cleaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.patio.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      patio: { ...prev.patio, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Easy Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.patio.easyAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      patio: { ...prev.patio, easyAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Hard Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.patio.hardAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      patio: { ...prev.patio, hardAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Roof Cleaning - Separate from Gutters */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-[#1E90FF] mb-4">Roof Cleaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.roof.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      roof: { ...prev.roof, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Easy Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.roof.easyAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      roof: { ...prev.roof, easyAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Hard Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.roof.hardAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      roof: { ...prev.roof, hardAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Gutter Cleaning - Now Separate */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-[#00C853] mb-4">Gutter Cleaning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/linear metre)</Label>
                <Input
                  type="number"
                  step="0.5"
                  value={pricingData.gutter.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      gutter: { ...prev.gutter, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div className="flex items-end">
                <p className="text-white/60 text-sm pb-2">Priced per linear metre of guttering</p>
              </div>
            </div>
          </div>

          {/* Exterior Walls */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-[#1E90FF] mb-4">Exterior Walls</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.walls.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      walls: { ...prev.walls, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Easy Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.walls.easyAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      walls: { ...prev.walls, easyAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Hard Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.walls.hardAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      walls: { ...prev.walls, hardAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          {/* Softwash */}
          <div className="rounded-lg border border-white/10 bg-[#162D50] p-5 mb-4">
            <h3 className="text-lg font-semibold text-purple-400 mb-4">Softwash Treatment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-white/80 text-sm">Base Rate (£/sqm)</Label>
                <Input
                  type="number"
                  step="0.1"
                  value={pricingData.softwash.baseRate}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      softwash: { ...prev.softwash, baseRate: Number.parseFloat(e.target.value) || 0 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Easy Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.softwash.easyAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      softwash: { ...prev.softwash, easyAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80 text-sm">Hard Access (x)</Label>
                <Input
                  type="number"
                  step="0.05"
                  value={pricingData.softwash.hardAccess}
                  onChange={(e) =>
                    setPricingData((prev) => ({
                      ...prev,
                      softwash: { ...prev.softwash, hardAccess: Number.parseFloat(e.target.value) || 1 },
                    }))
                  }
                  className="mt-1 bg-[#0B1E3F] border-white/20 text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={updatePricing} className="bg-orange-500 hover:bg-orange-600 text-white">
              Update Pricing
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={handleSectionChange}>
      {saveMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {saveMessage}
        </div>
      )}
      {renderContent()}
    </AdminLayout>
  )
}
