"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Edit2, Trash2, Eye, EyeOff } from "lucide-react"
import { blogPosts } from "@/lib/blog-posts"

interface ScheduledPost {
  title: string
  slug: string
  publishedAt: string
  status: string
  excerpt: string
}

export function ScheduledPostsManager() {
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([])
  const [publishedPosts, setPublishedPosts] = useState<ScheduledPost[]>([])

  useEffect(() => {
    const now = new Date()
    
    const scheduled = blogPosts
      .filter(post => {
        const publishDate = new Date(post.publishedAt)
        return publishDate > now && (post.status === "scheduled" || post.status === undefined)
      })
      .map(post => ({
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        status: post.status || "scheduled",
        excerpt: post.excerpt
      }))
      .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())

    const published = blogPosts
      .filter(post => {
        const publishDate = new Date(post.publishedAt)
        return publishDate <= now
      })
      .map(post => ({
        title: post.title,
        slug: post.slug,
        publishedAt: post.publishedAt,
        status: "published",
        excerpt: post.excerpt
      }))
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5)

    setScheduledPosts(scheduled)
    setPublishedPosts(published)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 3600 * 24))
    return days
  }

  return (
    <div className="space-y-6">
      {/* Scheduled Posts */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="w-5 h-5" />
            Scheduled Posts ({scheduledPosts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledPosts.length === 0 ? (
            <p className="text-white/60 text-center py-8">No scheduled posts</p>
          ) : (
            <div className="space-y-3">
              {scheduledPosts.map((post) => {
                const daysUntil = getDaysUntil(post.publishedAt)
                const isImminentPublish = daysUntil <= 7

                return (
                  <div
                    key={post.slug}
                    className={`p-4 rounded-lg border transition-all ${
                      isImminentPublish
                        ? "border-orange-500/50 bg-orange-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{post.title}</h4>
                        <p className="text-white/60 text-sm mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1 text-white/70">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.publishedAt)}
                          </span>
                          <span
                            className={`flex items-center gap-1 font-medium ${
                              isImminentPublish
                                ? "text-orange-400"
                                : "text-white/70"
                            }`}
                          >
                            <Clock className="w-4 h-4" />
                            {daysUntil > 0 ? `${daysUntil} days` : "Today"}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-white border-white/20 hover:bg-white/10 bg-transparent"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recently Published */}
      <Card className="border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Eye className="w-5 h-5" />
            Recently Published
          </CardTitle>
        </CardHeader>
        <CardContent>
          {publishedPosts.length === 0 ? (
            <p className="text-white/60 text-center py-8">No published posts</p>
          ) : (
            <div className="space-y-3">
              {publishedPosts.map((post) => (
                <div key={post.slug} className="p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{post.title}</h4>
                      <p className="text-white/60 text-sm mb-2">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-white/70">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                          Published
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="border-blue-500/30 bg-blue-500/10">
        <CardContent className="pt-6">
          <p className="text-blue-200 text-sm">
            <strong>Blog Scheduling:</strong> Posts are automatically published on their scheduled date. Scheduled posts appear here and are hidden from the public blog until their publish date arrives. Manage scheduled dates directly in the blog posts configuration.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
