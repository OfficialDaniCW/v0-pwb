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

interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  published_at: string | null
  is_published: boolean
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

export default function PWBAdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [saveMessage, setSaveMessage] = useState("")
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)
  const [uploadingWorksBefore, setUploadingWorksBefore] = useState(false)
  const [uploadingWorksAfter, setUploadingWorksAfter] = useState(false)

  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState("")

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
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

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [currentGallery, setCurrentGallery] = useState<Partial<GalleryImage>>({
    title: "",
    location: "",
    service_type: "",
    before_image_url: "",
    after_image_url: "",
    description: "",
    featured: false,
  })

  const [transformations, setTransformations] = useState<Transformation[]>([])
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
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "")
      if (hash) {
        setActiveSection(hash)
      } else {
        setActiveSection("dashboard")
      }
    }

    // Set initial section from hash
    handleHashChange()

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Load data from database
  useEffect(() => {
    loadBlogPosts()
    loadGalleryImages()
    loadTransformations()
  }, [])

  const loadBlogPosts = async () => {
    try {
      const response = await fetch("/api/admin/blog")
      const data = await response.json()
      if (Array.isArray(data)) {
        setBlogPosts(data)
      } else {
        console.error("Blog posts data is not an array:", data)
        setBlogPosts([])
      }
    } catch (error) {
      console.error("Error loading blog posts:", error)
      setBlogPosts([])
    }
  }

  const loadGalleryImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      const data = await response.json()
      setGalleryImages(data)
    } catch (error) {
      console.error("Error loading gallery images:", error)
    }
  }

  const loadTransformations = async () => {
    try {
      const response = await fetch("/api/transformations")
      const data = await response.json()
      if (Array.isArray(data)) {
        setTransformations(data)
      }
    } catch (error) {
      console.error("Error loading transformations:", error)
    }
  }

  const handleImageUpload = async (file: File, type: "before" | "after") => {
    try {
      type === "before" ? setUploadingBefore(true) : setUploadingAfter(true)

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

      setSaveMessage("Image uploaded successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
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

      setSaveMessage("Image uploaded successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
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
        setSaveMessage("Error saving blog post")
      }
    } catch (error) {
      setSaveMessage("Error saving blog post")
      console.error(error)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await fetch(`/api/admin/blog?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Blog post deleted successfully!")
        loadBlogPosts()
      } else {
        setSaveMessage("Error deleting blog post")
      }
    } catch (error) {
      setSaveMessage("Error deleting blog post")
      console.error(error)
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
        setSaveMessage("Error saving gallery item")
      }
    } catch (error) {
      setSaveMessage("Error saving gallery item")
      console.error(error)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteGalleryItem = async (id: number) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return

    try {
      const response = await fetch(`/api/admin/gallery?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Gallery item deleted successfully!")
        loadGalleryImages()
      } else {
        setSaveMessage("Error deleting gallery item")
      }
    } catch (error) {
      setSaveMessage("Error deleting gallery item")
      console.error(error)
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
        setSaveMessage("Work item saved successfully!")
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
        setSaveMessage("Error saving work item")
      }
    } catch (error) {
      setSaveMessage("Error saving work item")
      console.error(error)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const deleteTransformation = async (id: number) => {
    if (!confirm("Are you sure you want to delete this work item?")) return

    try {
      const response = await fetch(`/api/transformations?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setSaveMessage("Work item deleted successfully!")
        loadTransformations()
      } else {
        setSaveMessage("Error deleting work item")
      }
    } catch (error) {
      setSaveMessage("Error deleting work item")
      console.error(error)
    }
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector('textarea[data-rich-text="true"]') as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let newText = ""

    switch (format) {
      case "bold":
        newText = `**${selectedText || "bold text"}**`
        break
      case "italic":
        newText = `*${selectedText || "italic text"}*`
        break
      case "heading":
        newText = `\n## ${selectedText || "Heading"}\n`
        break
      case "list":
        newText = `\n- ${selectedText || "List item"}\n`
        break
      case "link":
        newText = `[${selectedText || "link text"}](url)`
        break
      default:
        return
    }

    const newContent = textarea.value.substring(0, start) + newText + textarea.value.substring(end)
    setCurrentPost((prev) => ({ ...prev, content: newContent }))
  }

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setAiGenerating(true)
    try {
      const response = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          context: currentPost.content || "",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setCurrentPost((prev) => ({
          ...prev,
          content: prev.content ? `${prev.content}\n\n${data.content}` : data.content,
        }))
        setAiPrompt("")
        setSaveMessage("AI content generated successfully!")
      } else {
        setSaveMessage("Error generating AI content")
      }
    } catch (error) {
      console.error("AI generation error:", error)
      setSaveMessage("Error generating AI content")
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
        setSaveMessage("Error updating pricing")
      }
    } catch (error) {
      setSaveMessage("Error updating pricing")
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
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[#0B1E3F]">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your PowerWash Bros website content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Blog Posts</p>
                <p className="text-3xl font-bold text-[#0B1E3F] mt-1">{blogPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#1E90FF]/10 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#1E90FF]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Gallery Items</p>
                <p className="text-3xl font-bold text-[#0B1E3F] mt-1">{galleryImages.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Our Works</p>
                <p className="text-3xl font-bold text-[#0B1E3F] mt-1">{transformations.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Layers className="h-6 w-6 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Site Status</p>
                <p className="text-lg font-bold text-green-600 mt-1">Live</p>
              </div>
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-[#1E90FF]/5 hover:border-[#1E90FF] bg-transparent"
              onClick={() => {
                window.location.hash = "blog"
                setActiveSection("blog")
              }}
            >
              <FileText className="h-6 w-6 text-[#1E90FF]" />
              <span className="text-sm">New Blog Post</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-green-500/5 hover:border-green-500 bg-transparent"
              onClick={() => {
                window.location.hash = "gallery"
                setActiveSection("gallery")
              }}
            >
              <ImageIcon className="h-6 w-6 text-green-500" />
              <span className="text-sm">Add Gallery</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-purple-500/5 hover:border-purple-500 bg-transparent"
              onClick={() => {
                window.location.hash = "works"
                setActiveSection("works")
              }}
            >
              <Layers className="h-6 w-6 text-purple-500" />
              <span className="text-sm">Add Work</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-orange-500/5 hover:border-orange-500 bg-transparent"
              onClick={() => {
                window.location.hash = "pricing"
                setActiveSection("pricing")
              }}
            >
              <Calculator className="h-6 w-6 text-orange-500" />
              <span className="text-sm">Update Pricing</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderBlogSection = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0B1E3F]">Blog Management</h1>
          <p className="text-gray-600 mt-1">Create and manage blog posts</p>
        </div>
        <Button
          variant="outline"
          className="border-gray-200 bg-transparent"
          onClick={() => window.open("/blog", "_blank")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Blog
        </Button>
      </div>

      {/* Blog Form */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">{currentPost.id ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* AI Helper */}
          <div className="p-4 bg-[#1E90FF]/5 border border-[#1E90FF]/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-[#1E90FF]" />
              <span className="font-semibold text-[#1E90FF]">AI Blog Helper</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Ask AI to help write sections, expand ideas, or improve your content
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., Write a section about moss prevention tips..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 bg-white"
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
              <Label htmlFor="title">Title</Label>
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
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={currentPost.slug || ""}
                onChange={(e) => setCurrentPost((prev) => ({ ...prev, slug: e.target.value }))}
                placeholder="url-friendly-slug"
                className="bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={currentPost.category || "Property Maintenance"}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, category: e.target.value }))}
              className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
            >
              <option value="Property Maintenance">Property Maintenance</option>
              <option value="Cleaning Tips">Cleaning Tips</option>
              <option value="Business News">Business News</option>
              <option value="Seasonal Advice">Seasonal Advice</option>
            </select>
          </div>

          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={currentPost.excerpt || ""}
              onChange={(e) => setCurrentPost((prev) => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Brief summary of the post..."
              rows={2}
              className="bg-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="content">Content</Label>
              <div className="flex gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("bold")}>
                  <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("italic")}>
                  <Italic className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("heading")}>
                  <Heading2 className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("list")}>
                  <List className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => insertFormatting("link")}>
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
              className="bg-white font-mono text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={currentPost.is_published || false}
                onChange={(e) => setCurrentPost((prev) => ({ ...prev, is_published: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Publish immediately</span>
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

      {/* Existing Posts */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">Existing Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {blogPosts.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No blog posts yet. Create your first post above!</p>
          ) : (
            <div className="space-y-3">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-[#0B1E3F]">{post.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 rounded">{post.category}</span>
                      <span className={post.is_published ? "text-green-600" : "text-orange-500"}>
                        {post.is_published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPost(post)}>
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteBlogPost(post.id)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#0B1E3F]">Gallery Management</h1>
          <p className="text-gray-600 mt-1">Manage before/after images for your portfolio</p>
        </div>
        <Button
          variant="outline"
          className="border-gray-200 bg-transparent"
          onClick={() => window.open("/our-work", "_blank")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Gallery
        </Button>
      </div>

      {/* Gallery Form */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">
            {currentGallery.id ? "Edit Gallery Item" : "Add New Gallery Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="gallery-title">Title</Label>
              <Input
                id="gallery-title"
                value={currentGallery.title || ""}
                onChange={(e) => setCurrentGallery((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Victorian Driveway Restoration"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="gallery-location">Location</Label>
              <Input
                id="gallery-location"
                value={currentGallery.location || ""}
                onChange={(e) => setCurrentGallery((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Swanage, Purbeck"
                className="bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gallery-service">Service Type</Label>
            <Input
              id="gallery-service"
              value={currentGallery.service_type || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, service_type: e.target.value }))}
              placeholder="e.g., Driveway Cleaning"
              className="bg-white"
            />
          </div>

          <div>
            <Label htmlFor="gallery-description">Description</Label>
            <Textarea
              id="gallery-description"
              value={currentGallery.description || ""}
              onChange={(e) => setCurrentGallery((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the transformation..."
              rows={3}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Before Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors">
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
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
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
              <Label>After Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors">
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
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
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
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Featured item</span>
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

      {/* Existing Gallery Items */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">Existing Gallery Items</CardTitle>
        </CardHeader>
        <CardContent>
          {galleryImages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No gallery items yet. Add your first item above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex h-24">
                    {item.before_image_url && (
                      <img
                        src={item.before_image_url || "/placeholder.svg"}
                        alt="Before"
                        className="w-1/2 object-cover"
                      />
                    )}
                    {item.after_image_url && (
                      <img
                        src={item.after_image_url || "/placeholder.svg"}
                        alt="After"
                        className="w-1/2 object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#0B1E3F] text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.location}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs bg-transparent"
                        onClick={() => setCurrentGallery(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteGalleryItem(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#0B1E3F]">Our Works Management</h1>
          <p className="text-gray-600 mt-1">Manage before/after transformations shown on the homepage carousel</p>
        </div>
        <Button variant="outline" className="border-gray-200 bg-transparent" onClick={() => window.open("/", "_blank")}>
          <Eye className="h-4 w-4 mr-2" />
          Preview Homepage
        </Button>
      </div>

      {/* Works Form */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">
            {currentTransformation.id ? "Edit Work Item" : "Add New Work Item"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="work-title">Title</Label>
              <Input
                id="work-title"
                value={currentTransformation.title || ""}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Driveway Cleaning"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="work-service">Service Type</Label>
              <select
                id="work-service"
                value={currentTransformation.service_type || ""}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, service_type: e.target.value }))}
                className="w-full h-10 px-3 rounded-md border border-gray-200 bg-white"
              >
                <option value="">Select service type...</option>
                <option value="Driveway Cleaning">Driveway Cleaning</option>
                <option value="Patio Cleaning">Patio Cleaning</option>
                <option value="Roof Cleaning">Roof Cleaning</option>
                <option value="Render Cleaning">Render Cleaning</option>
                <option value="Decking Restoration">Decking Restoration</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="work-location">Location</Label>
              <Input
                id="work-location"
                value={currentTransformation.location || ""}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Swanage, Dorset"
                className="bg-white"
              />
            </div>
            <div>
              <Label htmlFor="work-order">Display Order</Label>
              <Input
                id="work-order"
                type="number"
                value={currentTransformation.display_order || 0}
                onChange={(e) =>
                  setCurrentTransformation((prev) => ({ ...prev, display_order: Number.parseInt(e.target.value) || 0 }))
                }
                placeholder="0"
                className="bg-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="work-description">Description (optional)</Label>
            <Textarea
              id="work-description"
              value={currentTransformation.description || ""}
              onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Brief description of the work..."
              rows={2}
              className="bg-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Before Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors">
                {currentTransformation.before_image_url ? (
                  <div className="relative">
                    <img
                      src={currentTransformation.before_image_url || "/placeholder.svg"}
                      alt="Before"
                      className="w-full h-32 object-cover rounded"
                    />
                    <span className="absolute bottom-2 left-2 text-xs font-semibold bg-red-500/80 text-white px-2 py-1 rounded">
                      Before
                    </span>
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
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
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
              <Label>After Image</Label>
              <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-[#1E90FF] transition-colors">
                {currentTransformation.after_image_url ? (
                  <div className="relative">
                    <img
                      src={currentTransformation.after_image_url || "/placeholder.svg"}
                      alt="After"
                      className="w-full h-32 object-cover rounded"
                    />
                    <span className="absolute bottom-2 right-2 text-xs font-semibold bg-green-500/80 text-white px-2 py-1 rounded">
                      After
                    </span>
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
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
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
                checked={currentTransformation.featured ?? true}
                onChange={(e) => setCurrentTransformation((prev) => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Show on homepage carousel</span>
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

      {/* Existing Works */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F]">Existing Works ({transformations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {transformations.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No works added yet. Add your first transformation above!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {transformations.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="flex h-24 relative">
                    {item.before_image_url && (
                      <div className="w-1/2 relative">
                        <img
                          src={item.before_image_url || "/placeholder.svg"}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 left-1 text-xs bg-red-500/80 text-white px-1.5 py-0.5 rounded">
                          Before
                        </span>
                      </div>
                    )}
                    {item.after_image_url && (
                      <div className="w-1/2 relative">
                        <img
                          src={item.after_image_url || "/placeholder.svg"}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 text-xs bg-green-500/80 text-white px-1.5 py-0.5 rounded">
                          After
                        </span>
                      </div>
                    )}
                    {item.featured && (
                      <div className="absolute top-1 right-1 bg-yellow-500 text-white p-1 rounded-full">
                        <Star className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-[#0B1E3F] text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-500">{item.service_type}</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 text-xs bg-transparent"
                        onClick={() => setCurrentTransformation(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteTransformation(item.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
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
        <p className="text-gray-600 mt-1">Configure pricing rates and multipliers</p>
      </div>

      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-[#0B1E3F] flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Base Rates & Multipliers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(pricingData).map(([service, rates]) => (
            <div key={service} className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold text-[#0B1E3F] capitalize mb-4">{service} Cleaning</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-xs">Base Rate (£/sqm)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rates.baseRate}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: { ...rates, baseRate: Number.parseFloat(e.target.value) },
                      }))
                    }
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs">Easy Access (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.easyAccess}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: { ...rates, easyAccess: Number.parseFloat(e.target.value) },
                      }))
                    }
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs">Hard Access (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.hardAccess}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: { ...rates, hardAccess: Number.parseFloat(e.target.value) },
                      }))
                    }
                    className="bg-white"
                  />
                </div>
                <div>
                  <Label className="text-xs">No Water (x)</Label>
                  <Input
                    type="number"
                    step="0.05"
                    value={rates.noWater}
                    onChange={(e) =>
                      setPricingData((prev) => ({
                        ...prev,
                        [service]: { ...rates, noWater: Number.parseFloat(e.target.value) },
                      }))
                    }
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={updatePricing} className="bg-[#1E90FF] hover:bg-[#1E90FF]/90">
            <Save className="h-4 w-4 mr-2" />
            Save Pricing
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <AdminLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {saveMessage && (
          <Alert
            className={`mb-6 ${saveMessage.includes("Error") ? "border-red-500 bg-red-50" : "border-green-500 bg-green-50"}`}
          >
            {saveMessage.includes("Error") ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
            <AlertDescription className={saveMessage.includes("Error") ? "text-red-700" : "text-green-700"}>
              {saveMessage}
            </AlertDescription>
          </Alert>
        )}

        {renderContent()}
      </div>
    </AdminLayout>
  )
}
