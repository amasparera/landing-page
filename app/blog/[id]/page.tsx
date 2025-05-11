import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { fetchBlogPostBySlug, serverUrl } from "@/lib/api"



export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const post = await fetchBlogPostBySlug(id)
  const postData = post.post || null

  console.log("BlogPostPage", post)
  if (!post) {
    notFound()
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110">
                AP
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Amas Parera
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/#about"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Tentang Saya
            </Link>
            <Link
              href="/#services"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Layanan
            </Link>
            <Link
              href="/#experience"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Pengalaman
            </Link>
            <Link href="/blog" className="text-sm font-medium text-blue-400 transition-colors duration-300">
              Blog
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/#contact">
              <Button className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20">
                Hubungi Saya
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container py-12">
        <div className="flex items-center gap-2 mb-8">
          <Link href="/blog">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              <span className="sr-only">Back to blog</span>
            </Button>
          </Link>
        </div>

        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-100 mb-4">{postData.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(postData.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{postData.readTime || "5 menit baca"}</span>
              </div>
              {postData.author && (
                <div className="text-sm text-gray-400">
                  By <span className="text-blue-400">{postData.author}</span>
                </div>
              )}
            </div>
            {postData.tags && postData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {postData.tags.map((tag: any) => (
                  <span key={tag.id || tag} className="text-xs bg-gray-800 text-blue-400 px-2 py-1 rounded-full">
                    {tag.name || tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="relative h-64 md:h-96 w-full mb-8 overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30"></div>
            <Image
              priority
              src={postData.image ? serverUrl + '/storage/' + postData.image : "/placeholder.svg?height=400&width=800"}
              width={800}
              height={400}
              alt={postData.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="prose prose-invert max-w-none prose-headings:text-gray-100 prose-p:text-gray-300 prose-a:text-blue-400 prose-strong:text-gray-200 prose-code:bg-gray-800 prose-code:text-gray-300 prose-pre:bg-gray-800 prose-pre:text-gray-300 prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-md prose-pre:p-4"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </article>
      </main>

      <footer className="w-full border-t border-gray-800 py-6 bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-500">© 2025 Amas Parera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
