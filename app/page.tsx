import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import CategoryFilter from '@/components/CategoryFilter'
import PostList from '@/components/PostList'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export const revalidate = 0

export default async function Home(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = await props.searchParams
  const supabase = await createClient()

  const categoryId = typeof searchParams.category === 'string' ? searchParams.category : undefined
  const page = typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1
  const limit = 6 // Grid is 3 columns, so 6 is 2 rows
  const offset = (page - 1) * limit

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name, icon')
    .order('created_at', { ascending: true })

  // Fetch single featured post
  const { data: featuredPostData } = await supabase
    .from('posts')
    .select('*, categories(id, name)')
    .eq('is_featured', true)
    .limit(1)
    .single()

  const featuredPost = featuredPostData || null;

  // Fetch regular posts
  let query = supabase
    .from('posts')
    .select('*, categories(id, name)', { count: 'exact' })
    .eq('is_featured', false)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (categoryId) {
    query = query.eq('category_id', categoryId)
  }

  const { data: posts, count } = await query

  const totalPages = count ? Math.ceil(count / limit) : 1

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-zinc-950 font-sans text-gray-900 dark:text-zinc-100">
      <Navbar />

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-start">

        {/* Featured Post Hero section */}
        {!categoryId && page === 1 && featuredPost && (
          <div className="w-full bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-3xl p-10 md:p-14 mb-16 shadow-sm">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500"></span>
                추천 게시글
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight max-w-3xl text-gray-900 dark:text-white">
                {featuredPost.title}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
                {featuredPost.summary}
              </p>
              <div className="flex items-center gap-6">
                <Link
                  href={`/posts/${featuredPost.id}`}
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white px-6 py-3 rounded-xl font-medium transition-colors"
                >
                  지금 읽기
                </Link>
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {featuredPost.read_time}분 소요
                </div>
              </div>
            </div>
          </div>
        )}

        <CategoryFilter
          categories={categories || []}
          activeCategoryId={categoryId}
        />

        <PostList
          posts={posts || []}
          currentPage={page}
          totalPages={totalPages}
          categoryId={categoryId}
        />
      </main>

      <Footer />
    </div>
  )
}
