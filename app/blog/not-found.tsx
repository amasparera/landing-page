import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-4xl font-bold text-gray-100">404 - Artikel Tidak Ditemukan</h1>
        <p className="text-gray-400">Maaf, artikel blog yang Anda cari tidak ditemukan atau telah dipindahkan.</p>
        <Link href="/blog">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-900/20">
            Kembali ke Blog
          </Button>
        </Link>
      </div>
    </div>
  )
}
