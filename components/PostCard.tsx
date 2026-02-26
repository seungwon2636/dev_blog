import Image from 'next/image'
import Link from 'next/link'
import { Bookmark, Share2 } from 'lucide-react'

export type Post = {
    id: string
    title: string
    summary: string
    content: string
    thumbnail_url: string | null
    category_id: string | null
    read_time: number
    author_name: string
    author_avatar_url: string | null
    created_at: string
    categories?: {
        name: string
        id: string
    } | null
}

const getCategoryColor = (name?: string) => {
    switch (name) {
        case '프론트엔드': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400'
        case '아키텍처': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
        case 'CSS': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
        case 'React': return 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-400'
        case 'DevOps': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
        case 'Wasm': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
    }
}

export default function PostCard({ post }: { post: Post }) {
    const date = new Date(post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <Link href={`/posts/${post.id}`} className="group flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100 dark:bg-zinc-800">
                {post.thumbnail_url ? (
                    <Image
                        src={post.thumbnail_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-400 bg-zinc-800">
                        <span className="font-mono text-xs opacity-50 p-4 block break-all text-green-400">
                            {post.title.includes('WebAssembly') ? '01010111 01100001 01110011 01101101...' : 'No Image'}
                        </span>
                    </div>
                )}
                {post.categories?.name && (
                    <div className="absolute top-4 left-4">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${getCategoryColor(post.categories.name)}`}>
                            {post.categories.name}
                        </span>
                    </div>
                )}
            </div>
            <div className="flex flex-col flex-1 p-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center gap-2">
                    <span>{date}</span>
                    <span>•</span>
                    <span>{post.read_time}분 소요</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-6 flex-1">
                    {post.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        {post.author_avatar_url ? (
                            <Image
                                src={post.author_avatar_url}
                                alt={post.author_name}
                                width={24}
                                height={24}
                                className="rounded-full bg-gray-100"
                            />
                        ) : (
                            <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-xs font-bold text-gray-500">
                                {post.author_name.charAt(0)}
                            </div>
                        )}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {post.author_name}
                        </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <button className="hover:text-blue-500 transition-colors">
                            <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="hover:text-blue-500 transition-colors">
                            <Share2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
