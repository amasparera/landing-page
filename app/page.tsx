"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Rocket, Monitor, Code, Users, Mail, Linkedin, Github, ExternalLink, PhoneIncomingIcon } from "lucide-react"
import { fetchBlogPosts, serverUrl } from "@/lib/api"

// Ubah fungsi LandingPage menjadi async
export default function LandingPage() {
  // Refs for animation sections
  const aboutRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const blogRef = useRef<HTMLElement>(null)

  // Fetch blog posts
  const [blogPosts, setBlogPosts] = useState<any[]>([])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const fetchPosts = async () => {
    const posts = await fetchBlogPosts({ limit: 3 });
    console.log("BlogPosts", posts);
    setBlogPosts(posts.posts || []);
  };


  useEffect(() => {
    fetchPosts();
  }, [])


  // Animation on scroll
  useEffect(() => {


    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            entry.target.classList.remove("opacity-0")
            entry.target.classList.remove("translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    const sections = document.querySelectorAll(".animate-on-scroll")
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])


  return (
    <div className="flex min-h-[100dvh] flex-col font-sans bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/profile.jpg?height=50&width=50"
                  width={50}
                  height={50}
                  alt="Contact Illustration"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Amas Parera
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Tentang Saya
            </Link>
            <Link
              href="#services"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Layanan
            </Link>
            <Link
              href="#experience"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Pengalaman
            </Link>
            <Link
              href="#blog"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors duration-300"
            >
              Kontak
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {/* <Link href="/login"> */}
            {/* <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800">
                Login
              </Button> */}
            {/* </Link> */}
            {/* <Button className="hidden md:flex bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20">
              Hubungi Saya
            </Button> */}
            <Button variant="ghost" size="icon" className="md:hidden text-gray-300 hover:text-white">
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
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full h-screen py-12 md:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-950 relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="container px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600">
                    Mobile ,Web & Desktop Developer | Building Fast and Scalable Apps
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Membantu Anda membangun aplikasi mobile dan web yang cepat, responsif, dan user-friendly.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="#contact">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20 animate-pulse-slow"
                    >
                      Hubungi Saya
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 animate-pulse-slow"></div>
                <video
                  src="/original-1.mp4"
                  // width={550}
                  // height={550}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative mx-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          ref={aboutRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Tentang Saya
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed mx-auto">
                  Saya Amas Parera, seorang Flutter Developer & Web Developer (React.js & Laravel) yang belajar secara
                  otodidak. Saya memiliki semangat tinggi untuk menciptakan aplikasi mobile dan web yang cepat,
                  responsif, dan skalabel. Saya percaya bahwa pengembangan aplikasi bukan hanya soal kode, tetapi juga
                  soal performa, user experience, dan skalabilitas.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400">Flutter & Dart</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Untuk Android, iOS, Web, Mac, Windows</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400">React.js</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Frontend modern dan responsif</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400">Laravel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Backend scalable dan aman</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1">
                <CardHeader className="pb-2">
                  <CardTitle className="text-blue-400">Fast Learner</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">Cepat belajar teknologi baru</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          ref={servicesRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Layanan
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  Solusi pengembangan aplikasi yang komprehensif untuk kebutuhan bisnis Anda
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2">
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                      <Rocket className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                      Pengembangan Aplikasi Mobile (Flutter)
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Membangun aplikasi mobile yang cepat dan responsif untuk Android dan iOS dengan Flutter. Solusi
                    cross-platform yang efisien dan hemat biaya.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                      <Monitor className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                      Pengembangan Web Frontend (React.js)
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Membuat antarmuka web yang modern, interaktif, dan responsif dengan React.js. Fokus pada performa
                    dan pengalaman pengguna yang optimal.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                      <Code className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                      Pengembangan Backend Web (Laravel)
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Mengembangkan backend yang kuat, aman, dan skalabel dengan Laravel. API yang terstruktur dan
                    database yang efisien.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20 hover:-translate-y-1 group">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                      <Users className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                    </div>
                    <CardTitle className="text-gray-100 group-hover:text-blue-300 transition-colors duration-300">
                      Konsultasi & Kolaborasi IT Project
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">
                    Memberikan konsultasi teknis dan berkolaborasi dalam proyek IT. Membantu Anda menemukan solusi
                    terbaik untuk kebutuhan bisnis Anda.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          ref={experienceRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Pengalaman
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  Perjalanan profesional saya dalam pengembangan aplikasi
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-8 py-12">
              <div className="relative pl-8 pb-8 border-l-2 border-blue-900 hover:border-blue-500 transition-colors duration-300 group">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      PT Ada Ide Langsung Jalan
                    </h3>
                    <span className="text-sm text-gray-500">2023 - sekarang</span>
                  </div>
                  <p className="font-medium text-gray-300">Flutter Developer</p>
                  <p className="text-gray-400">
                    Membuat aplikasi laundry, kasir, empowerHR (React.js), workspace internal (Laravel).
                  </p>
                </div>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-blue-900 hover:border-blue-500 transition-colors duration-300 group">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      Freelancer
                    </h3>
                    <span className="text-sm text-gray-500">2023</span>
                  </div>
                  <p className="font-medium text-gray-300">Flutter Developer</p>
                  <p className="text-gray-400">Membuat aplikasi seller kantin, delivery makanan, pemesanan makanan.</p>
                </div>
              </div>
              <div className="relative pl-8 pb-8 border-l-2 border-blue-900 hover:border-blue-500 transition-colors duration-300 group">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      PT Solusi Digital Industri
                    </h3>
                    <span className="text-sm text-gray-500">2022</span>
                  </div>
                  <p className="font-medium text-gray-300">Flutter Developer</p>
                  <p className="text-gray-400">Mengembangkan aplikasi asuransi.</p>
                </div>
              </div>
              <div className="relative pl-8 border-l-2 border-blue-900 hover:border-blue-500 transition-colors duration-300 group">
                <div className="absolute left-[-8px] top-0 h-4 w-4 rounded-full bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      Sindomall SG
                    </h3>
                    <span className="text-sm text-gray-500">2022</span>
                  </div>
                  <p className="font-medium text-gray-300">Flutter Developer</p>
                  <p className="text-gray-400">Mengembangkan aplikasi ecommerce tanaman bunga dan seller Sindomall.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section
          id="blog"
          ref={blogRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-950 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Blog
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  Showcase project yang pernah dikerjakan baik Freelancer maupun di perusahaan
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">

              {blogPosts.map((post: any) => (
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
              }
            </div>
            <div className="flex justify-center mt-8">
              <Link href="/blog">
                <Button className="bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center gap-2 group transition-all duration-300">
                  Lihat Semua Artikel
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
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          ref={contactRef}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  Hubungi Saya
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                  Tertarik untuk bekerja sama? Jangan ragu untuk menghubungi saya
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 group hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">Email</p>
                    <p className="text-gray-400 group-hover:text-blue-400 transition-colors duration-300">
                      amasparera@gmail.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 group hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                    <Linkedin className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/amas-parera-7937ab215"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      linkedin.com/in/amas-parera-7937ab215
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 group hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                    <Github className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">GitHub</p>
                    <a
                      href="https://github.com/amasparera"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      github.com/amasparera
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-2 group hover:bg-gray-800 p-3 rounded-lg transition-all duration-300">
                  <div className="p-2 rounded-lg bg-blue-900/30 w-fit group-hover:bg-blue-900/50 transition-colors duration-300">
                    <PhoneIncomingIcon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-300">WhatsApp</p>
                    <a
                      href="https://wa.me/62859106529112"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-300 flex items-center gap-1"
                    >
                      +62859106529112
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <Image
                    src="/profile.jpg?height=300&width=400"
                    width={400}
                    height={300}
                    alt="Contact Illustration"
                    className="relative rounded-lg"
                  />
                </div>
              </div>
              <Card className="bg-gray-800 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-gray-100">Kirim Pesan</CardTitle>
                  <CardDescription className="text-gray-400">
                    Isi form di bawah ini dan saya akan segera menghubungi Anda kembali.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Nama
                      </label>
                      <Input
                        id="name"
                        placeholder="Masukkan nama Anda"
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        className="bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-300">
                        Pesan
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Masukkan pesan Anda"
                        className="min-h-[120px] bg-gray-700 border-gray-600 text-gray-100 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20"
                    >
                      Kirim Pesan
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-gray-800 py-6 bg-gray-900">
        <div className="container flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm text-gray-500">© 2025 Amas Parera. All rights reserved.</p>
        </div>
      </footer>

      {/* Custom animations CSS */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 10s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
