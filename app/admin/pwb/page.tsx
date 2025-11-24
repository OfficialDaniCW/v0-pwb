"use client"

import { useState, useEffect } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Trash2,
  Upload,
  ImageIcon,
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

export default function PWBAdminDashboard() {
  const [activeTab, setActiveTab] = useState("blog")
  const [saveMessage, setSaveMessage] = useState("")
  const [uploadingBefore, setUploadingBefore] = useState(false)
  const [uploadingAfter, setUploadingAfter] = useState(false)

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

  // Load data from database
  useEffect(() => {
    loadBlogPosts()
    loadGalleryImages()
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
        setCurrentPost({
          title: "",
          slug: "",
          excerpt: "",
          content: "",
          category: "Property Maintenance",
          is_published: false,
        })
      }
    } catch (error) {
      setSaveMessage("Error saving blog post.")
      console.error(error)
    }
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
    } catch (error) {
      setSaveMessage("Error saving gallery item.")
      console.error(error)
    }
  }

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return

    setAiGenerating(true)
    try {
      const response = await fetch("/api/admin/ai-blog-helper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          currentContent: currentPost.content,
        }),
      })

      const data = await response.json()

      if (data.content) {
        setCurrentPost((prev) => ({
          ...prev,
          content: prev.content ? `${prev.content}\n\n${data.content}` : data.content,
        }))
        setSaveMessage("AI content generated successfully!")
        setAiPrompt("")
      }
    } catch (error) {
      setSaveMessage("Error generating AI content.")
      console.error(error)
    } finally {
      setAiGenerating(false)
    }
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
      }
    } catch (error) {
      setSaveMessage("Error updating pricing.")
      console.error(error)
    }
  }

  const insertFormatting = (format: string) => {
    const textarea = document.querySelector("textarea[data-rich-text]") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = currentPost.content?.substring(start, end) || ""
    const before = currentPost.content?.substring(0, start) || ""
    const after = currentPost.content?.substring(end) || ""

    let newText = ""
    switch (format) {
      case "bold":
        newText = `${before}**${selectedText || "bold text"}**${after}`
        break
      case "italic":
        newText = `${before}_${selectedText || "italic text"}_${after}`
        break
      case "heading":
        newText = `${before}## ${selectedText || "Heading"}${after}`
        break
      case "list":
        newText = `${before}- ${selectedText || "List item"}${after}`
        break
      case "link":
        newText = `${before}[${selectedText || "link text"}](url)${after}`
        break
      default:
        return
    }

    setCurrentPost((prev) => ({ ...prev, content: newText }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  return (
    <AdminLayout>
      <div className="p-6 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">PowerWash Bros Admin</h1>
              <p className="text-gray-600">Manage your blog, gallery & pricing</p>
            </div>
            <Button onClick={() => window.open("/", "_blank")} variant="outline" className="gap-2 bg-white">
              <Eye className="h-4 w-4" />
              Preview Site
            </Button>
          </div>

          {saveMessage && (
            <Alert
              className={`${saveMessage.includes("Error") ? "bg-red-50 border-red-200" : "bg-green-50 border-green-200"}`}
            >
              {saveMessage.includes("Error") ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={saveMessage.includes("Error") ? "text-red-800" : "text-green-800"}>
                {saveMessage}
              </AlertDescription>
            </Alert>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1">
              <TabsTrigger
                value="blog"
                className="gap-2 data-[state=active]:bg-[#1E90FF] data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Blog Management</span>
                <span className="sm:hidden">Blog</span>
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="gap-2 data-[state=active]:bg-[#1E90FF] data-[state=active]:text-white"
              >
                <ImageIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Gallery Management</span>
                <span className="sm:hidden">Gallery</span>
              </TabsTrigger>
              <TabsTrigger
                value="pricing"
                className="gap-2 data-[state=active]:bg-[#1E90FF] data-[state=active]:text-white"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">Pricing Management</span>
                <span className="sm:hidden">Pricing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="space-y-6 mt-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Create/Edit Blog Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  {/* AI Blog Helper */}
                  <div className="bg-gradient-to-r from-[#1E90FF]/10 to-[#0B1E3F]/10 border border-[#1E90FF]/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-[#1E90FF] mb-1">AI Blog Helper</h3>
                          <p className="text-sm text-gray-600">
                            Ask AI to help write sections, expand ideas, or improve your content
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={aiPrompt}
                            onChange={(e) => setAiPrompt(e.target.value)}
                            placeholder="e.g., Write a section about moss prevention tips..."
                            disabled={aiGenerating}
                            className="bg-white border-gray-200"
                          />
                          <Button
                            onClick={generateWithAI}
                            disabled={aiGenerating || !aiPrompt.trim()}
                            className="gap-2 bg-[#1E90FF] hover:bg-[#1E90FF]/90"
                          >
                            <Sparkles className="h-4 w-4" />
                            {aiGenerating ? "..." : "Generate"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Title</Label>
                      <Input
                        value={currentPost.title || ""}
                        onChange={(e) => {
                          const title = e.target.value
                          setCurrentPost((prev) => ({
                            ...prev,
                            title,
                            slug: generateSlug(title),
                          }))
                        }}
                        placeholder="Enter blog post title..."
                        className="bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Slug</Label>
                      <Input
                        value={currentPost.slug || ""}
                        onChange={(e) => setCurrentPost((prev) => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-friendly-slug"
                        className="bg-white border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Category</Label>
                    <select
                      className="w-full p-2 border border-gray-200 rounded-md bg-white text-gray-900"
                      value={currentPost.category || ""}
                      onChange={(e) => setCurrentPost((prev) => ({ ...prev, category: e.target.value }))}
                    >
                      <option value="Property Maintenance">Property Maintenance</option>
                      <option value="Prevention Tips">Prevention Tips</option>
                      <option value="Purbeck Properties">Purbeck Properties</option>
                      <option value="Industry Insights">Industry Insights</option>
                      <option value="Product Guides">Product Guides</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Excerpt</Label>
                    <Textarea
                      value={currentPost.excerpt || ""}
                      onChange={(e) => setCurrentPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief summary of the post..."
                      rows={3}
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-gray-700">Content</Label>
                      <div className="flex gap-1 border border-gray-200 rounded-md p-1 bg-gray-50">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("bold")}
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("italic")}
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("heading")}
                          title="Heading"
                        >
                          <Heading2 className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("list")}
                          title="List"
                        >
                          <List className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => insertFormatting("link")}
                          title="Link"
                        >
                          <Link2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      data-rich-text
                      value={currentPost.content || ""}
                      onChange={(e) => setCurrentPost((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Write your blog content here... Use the toolbar above for formatting."
                      rows={20}
                      className="font-mono bg-white border-gray-200"
                    />
                    <p className="text-xs text-gray-500">
                      Markdown supported: **bold**, _italic_, ## headings, - lists, [links](url)
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentPost.is_published || false}
                        onChange={(e) =>
                          setCurrentPost((prev) => ({
                            ...prev,
                            is_published: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 accent-[#1E90FF]"
                      />
                      <span className="text-gray-700">Publish immediately</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveBlogPost} className="gap-2 bg-[#1E90FF] hover:bg-[#1E90FF]/90">
                      <Save className="h-4 w-4" />
                      Save Blog Post
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white"
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
                      Clear Form
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Existing Blog Posts</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {blogPosts.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8">
                        No blog posts found. Create your first post above.
                      </p>
                    ) : (
                      blogPosts.map((post) => (
                        <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.category}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {post.is_published ? (
                                <span className="text-green-600">Published</span>
                              ) : (
                                <span className="text-amber-600">Draft</span>
                              )}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              onClick={() => setCurrentPost(post)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              onClick={() => window.open(`/blog/${post.slug}`, "_blank")}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6 mt-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Create/Edit Gallery Item</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Title</Label>
                      <Input
                        value={currentGallery.title || ""}
                        onChange={(e) => setCurrentGallery((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Victorian Driveway Restoration"
                        className="bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-700">Location</Label>
                      <Input
                        value={currentGallery.location || ""}
                        onChange={(e) => setCurrentGallery((prev) => ({ ...prev, location: e.target.value }))}
                        placeholder="e.g., Swanage, Purbeck"
                        className="bg-white border-gray-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Service Type</Label>
                    <Input
                      value={currentGallery.service_type || ""}
                      onChange={(e) => setCurrentGallery((prev) => ({ ...prev, service_type: e.target.value }))}
                      placeholder="e.g., Driveway Cleaning"
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-700">Description</Label>
                    <Textarea
                      value={currentGallery.description || ""}
                      onChange={(e) => setCurrentGallery((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the transformation..."
                      rows={3}
                      className="bg-white border-gray-200"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Before Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        {currentGallery.before_image_url ? (
                          <div className="space-y-2">
                            <img
                              src={currentGallery.before_image_url || "/placeholder.svg"}
                              alt="Before"
                              className="w-full h-48 object-cover rounded"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              onClick={() =>
                                setCurrentGallery((prev) => ({
                                  ...prev,
                                  before_image_url: "",
                                }))
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, "before")
                              }}
                              disabled={uploadingBefore}
                            />
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {uploadingBefore ? "Uploading..." : "Click to upload before image"}
                            </p>
                          </label>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">After Image</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                        {currentGallery.after_image_url ? (
                          <div className="space-y-2">
                            <img
                              src={currentGallery.after_image_url || "/placeholder.svg"}
                              alt="After"
                              className="w-full h-48 object-cover rounded"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white"
                              onClick={() => setCurrentGallery((prev) => ({ ...prev, after_image_url: "" }))}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) handleImageUpload(file, "after")
                              }}
                              disabled={uploadingAfter}
                            />
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">
                              {uploadingAfter ? "Uploading..." : "Click to upload after image"}
                            </p>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={currentGallery.featured || false}
                      onChange={(e) => setCurrentGallery((prev) => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 accent-[#1E90FF]"
                    />
                    <Label className="text-gray-700 cursor-pointer">Feature on homepage</Label>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={saveGalleryItem} className="gap-2 bg-[#1E90FF] hover:bg-[#1E90FF]/90">
                      <Save className="h-4 w-4" />
                      Save Gallery Item
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white"
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
                      Clear Form
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Existing Gallery Items</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {galleryImages.length === 0 ? (
                      <p className="text-sm text-gray-500 text-center py-8 col-span-2">
                        No gallery items yet. Add your first transformation above.
                      </p>
                    ) : (
                      galleryImages.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                          <div className="grid grid-cols-2">
                            <img
                              src={item.before_image_url || "/placeholder.svg"}
                              alt="Before"
                              className="w-full h-32 object-cover"
                            />
                            <img
                              src={item.after_image_url || "/placeholder.svg"}
                              alt="After"
                              className="w-full h-32 object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <div className="flex gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-white"
                                onClick={() => setCurrentGallery(item)}
                              >
                                Edit
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6 mt-6">
              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Pricing Calculator Configuration</CardTitle>
                  <p className="text-sm text-gray-600">Set base rates and multipliers for the pricing calculator</p>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  {Object.entries(pricingData).map(([service, rates]) => (
                    <div key={service} className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
                      <h3 className="font-semibold capitalize text-lg text-gray-900">{service} Cleaning</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Base Rate (£/m²)</Label>
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
                            className="bg-white border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Easy Access (×)</Label>
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
                            className="bg-white border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Hard Access (×)</Label>
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
                            className="bg-white border-gray-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">No Water (×)</Label>
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
                            className="bg-white border-gray-200"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button onClick={updatePricing} className="gap-2 bg-[#1E90FF] hover:bg-[#1E90FF]/90">
                    <Save className="h-4 w-4" />
                    Save Pricing Configuration
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-gray-900">Pricing Preview</CardTitle>
                  <p className="text-sm text-gray-600">Example calculations based on current rates</p>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    {Object.entries(pricingData).map(([service, rates]) => (
                      <div key={service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="capitalize font-medium text-gray-700">
                          {service} (50m², Easy Access, Water Available)
                        </span>
                        <span className="text-lg font-bold text-[#1E90FF]">
                          £{Math.round(50 * rates.baseRate * rates.easyAccess)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  )
}
