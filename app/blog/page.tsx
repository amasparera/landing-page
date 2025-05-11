import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { fetchBlogPosts, serverUrl } from "@/lib/api"


export default async function BlogPage() {
  const data = await fetchBlogPosts({ limit: 99 })
  const posts = data.posts || []

  console.log("BlogPage", data)


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
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to home</span>
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-gray-100">Blog</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.length > 0 ? (
            posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group">
                <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 h-full flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 group-hover:opacity-75 transition-opacity duration-300"></div>
                    <Image
                      src={post.image ? serverUrl + '/storage/' + post.image : "/placeholder.svg?height=200&width=400"}
                      width={400}
                      height={200}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Dibuat tanggal {formatDate(post.created_at)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="text-gray-400 text-ellipsis"
                      dangerouslySetInnerHTML={{ __html: post.content.split(" ").slice(0, 40).join(" ") }}></div>
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag: any) => (
                          <span
                            key={tag.id || tag}
                            className="text-xs bg-gray-700 text-blue-400 px-2 py-1 rounded-full"
                          >
                            {tag.name || tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400">Tidak ada artikel blog yang ditemukan.</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t border-gray-800 py-6 bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-500">© 2025 Amas Parera. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
