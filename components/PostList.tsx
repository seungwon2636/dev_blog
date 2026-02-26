import PostCard, { type Post } from './PostCard'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PostList({
    posts,
    currentPage,
    totalPages,
    categoryId,
}: {
    posts: Post[]
    currentPage: number
    totalPages: number
    categoryId?: string
}) {
    const getPageUrl = (page: number) => {
        const params = new URLSearchParams()
        if (categoryId) params.set('category', categoryId)
        params.set('page', page.toString())
        return `/?${params.toString()}`
    }

    // Generate page numbers block
    const renderPagination = () => {
        if (totalPages <= 1) return null;

        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            const isCurrent = currentPage === i;
            pages.push(
                <Link
                    key={i}
                    href={getPageUrl(i)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${isCurrent
                            ? 'bg-blue-600 text-white border border-blue-600'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-800'
                        }`}
                >
                    {i}
                </Link>
            )
        }

        return (
            <div className="flex items-center justify-center gap-2 mt-16 pb-8">
                {currentPage > 1 ? (
                    <Link
                        href={getPageUrl(currentPage - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                ) : (
                    <span className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-700">
                        <ChevronLeft className="w-5 h-5" />
                    </span>
                )}

                <div className="flex items-center gap-2">
                    {pages}
                    {/* Visual mockup had an ellipsis ... and then 8, 9 depending on total pages, keeping it simple here but preserving the block UI */}
                </div>

                {currentPage < totalPages ? (
                    <Link
                        href={getPageUrl(currentPage + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-md bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Link>
                ) : (
                    <span className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-50 border border-gray-200 text-gray-300 cursor-not-allowed dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-700">
                        <ChevronRight className="w-5 h-5" />
                    </span>
                )}
            </div>
        )
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>

            {renderPagination()}
        </div>
    )
}
