import { Instagram } from "lucide-react"
import { getInstagramPosts } from "@/lib/instagram"

export async function InstagramFeed() {
  // Fetch live posts
  const livePosts = await getInstagramPosts()

  // Fallback static posts if no live data is available
  const staticPosts = [
    {
      id: "1",
      media_url: "/images/driveway-transformation-before-after.jpg",
      caption: "Another stunning driveway transformation in Swanage",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
    {
      id: "2",
      media_url: "/images/roof-cleaning-moss-removal.jpg",
      caption: "Roof cleaning perfection in Purbeck",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
    {
      id: "3",
      media_url: "/images/patio-cleaning-purbeck-stone.jpg",
      caption: "Purbeck stone patio restored to its former glory",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
    {
      id: "4",
      media_url: "/images/commercial-property-cleaning.jpg",
      caption: "Commercial property maintenance in Bournemouth",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
    {
      id: "5",
      media_url: "/images/render-cleaning-soft-wash.jpg",
      caption: "Render soft washing brings properties back to life",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
    {
      id: "6",
      media_url: "/images/gutter-cleaning-before-after.jpg",
      caption: "Gutter cleaning keeping Dorset properties protected",
      permalink: "https://www.instagram.com/powerwashbrosltd/",
      media_type: "IMAGE",
    },
  ]

  // Use live posts if available, otherwise fallback
  const posts = livePosts.length > 0 ? livePosts.slice(0, 6) : staticPosts

  return (
    <section className="py-20 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram className="h-8 w-8 text-[#1E90FF]" />
            <h2 className="text-3xl md:text-5xl font-bold text-white">Follow Our Work</h2>
          </div>
          <p className="text-xl text-white/70 mb-6">See our latest transformations on Instagram</p>
          <a
            href="https://www.instagram.com/powerwashbrosltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#1E90FF] hover:text-[#1E90FF]/80 font-semibold transition-colors"
          >
            @powerwashbrosltd
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-900"
            >
              {/* Prioritize thumbnail for video/albums if available, or just media_url */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.media_type === "VIDEO" && post.thumbnail_url ? post.thumbnail_url : post.media_url}
                alt={post.caption || "Instagram post"}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white text-xs md:text-sm line-clamp-2">{post.caption}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="h-5 w-5 text-white drop-shadow-md" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/powerwashbrosltd/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
          >
            <Instagram className="h-5 w-5" />
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
