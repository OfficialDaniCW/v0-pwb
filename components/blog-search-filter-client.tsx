"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { BlogPostsGrid } from "./blog-posts-grid"

interface BlogPost {
  id?: number
  title: string
  slug: string
  excerpt: string
  category: string
  published_at: string
  read_time_minutes: number
  featured_image_url?: string
  tags?: string[]
}

interface BlogSearchFilterClientProps {
  posts: BlogPost[]
}

// Color palette for tags - cycling through distinct colors
const TAG_COLORS = [
  { bg: "bg-blue-500/20", text: "text-blue-300", border: "border-blue-500/30" },
  { bg: "bg-purple-500/20", text: "text-purple-300", border: "border-purple-500/30" },
  { bg: "bg-pink-500/20", text: "text-pink-300", border: "border-pink-500/30" },
  { bg: "bg-green-500/20", text: "text-green-300", border: "border-green-500/30" },
  { bg: "bg-orange-500/20", text: "text-orange-300", border: "border-orange-500/30" },
  { bg: "bg-cyan-500/20", text: "text-cyan-300", border: "border-cyan-500/30" },
  { bg: "bg-indigo-500/20", text: "text-indigo-300", border: "border-indigo-500/30" },
  { bg: "bg-teal-500/20", text: "text-teal-300", border: "border-teal-500/30" },
]

export function BlogSearchFilterClient({ posts }: BlogSearchFilterClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract unique categories and tags from posts
  const categories = useMemo(() => {
    const cats = ["All Posts"]
    posts.forEach((post) => {
      if (post.category && !cats.includes(post.category)) {
        cats.push(post.category)
      }
    })
    return cats
  }, [posts])

  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    posts.forEach((post) => {
      post.tags?.forEach((tag) => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }, [posts])

  // Get color for a specific tag
  const getTagColor = (tag: string) => {
    const index = allTags.indexOf(tag) % TAG_COLORS.length
    return TAG_COLORS[index]
  }

  // Filter posts based on search, category, and tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      const categoryMatch = selectedCategory === "All Posts" || post.category === selectedCategory

      // Search filter (title, excerpt, tags)
      const searchLower = searchQuery.toLowerCase()
      const searchMatch =
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchLower))

      // Tags filter
      const tagsMatch = selectedTags.length === 0 || selectedTags.some((selectedTag) => post.tags?.includes(selectedTag))

      return categoryMatch && searchMatch && tagsMatch
    })
  }, [posts, searchQuery, selectedCategory, selectedTags])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All Posts")
    setSelectedTags([])
  }

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        <input
          type="text"
          placeholder="Search blog posts by title, topic, or keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          suppressHydrationWarning
          className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/40 rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:border-[#1E90FF] transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              suppressHydrationWarning
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-[#1E90FF] text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const colors = getTagColor(tag)
              const isSelected = selectedTags.includes(tag)
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  suppressHydrationWarning
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                    isSelected
                      ? `${colors.bg} ${colors.text} ${colors.border} border-opacity-100`
                      : `${colors.bg} ${colors.text} ${colors.border} border-opacity-50 hover:border-opacity-100`
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Active Filters & Clear */}
      {(searchQuery || selectedCategory !== "All Posts" || selectedTags.length > 0) && (
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-sm text-white/60">
            Showing <span className="text-white font-semibold">{filteredPosts.length}</span> of{" "}
            <span className="text-white font-semibold">{posts.length}</span> posts
          </div>
          <button
            onClick={clearFilters}
            suppressHydrationWarning
            className="flex items-center gap-1 text-sm text-[#1E90FF] hover:text-[#1E90FF]/80 transition-colors"
          >
            <X className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      )}

      {/* Results */}
      <div className="pt-4">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/60">No posts found matching your search. Try adjusting your filters.</p>
          </div>
        ) : (
          <BlogPostsGrid posts={filteredPosts} />
        )}
      </div>
    </div>
  )
}
