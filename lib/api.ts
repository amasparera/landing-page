export const serverUrl = process.env.NEXT_PUBLIC_API_URL || "https://web.amasparera.my.id"
// Fungsi untuk mengambil data blog dari API
export async function fetchBlogPosts({ limit = 100 }: { page?: number, limit?: number }) {
  try {
    const response = await fetch(`${serverUrl}/api/posts?limit=${limit}`, {
      method: "GET",
      next: { revalidate: 60 }, // Revalidate setiap 1 jam
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return { posts: [] } // Return empty array as fallback
  }
}



// Fungsi untuk mengambil detail blog post berdasarkan slug
export async function fetchBlogPostBySlug(slug: string) {
  try {
    const response = await fetch(`${serverUrl}/api/posts/${slug}`, {
      next: { revalidate: 60 }, // Revalidate setiap 1 jam
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error)
    return null
  }
}
