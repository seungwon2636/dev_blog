import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ShareButton from '@/components/ShareButton'
import { Clock, Bookmark } from 'lucide-react'

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

export default async function PostDetail(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const { id } = params;

    const supabase = await createClient()

    const { data: post } = await supabase
        .from('posts')
        .select('*, categories(id, name)')
        .eq('id', id)
        .single()

    if (!post) {
        notFound()
    }

    const date = new Date(post.created_at).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <div className="flex flex-col min-h-screen bg-[#FDFDFD] dark:bg-zinc-950 font-sans text-gray-900 dark:text-zinc-100">
            <Navbar />

            <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12 md:py-16 flex flex-col items-center">
                <article className="w-full">
                    <header className="mb-10 text-center flex flex-col items-center">
                        {post.categories?.name && (
                            <span className={`px-4 py-1.5 text-sm font-bold rounded-full mb-8 tracking-wide ${getCategoryColor(post.categories.name)}`}>
                                {post.categories.name}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-8 leading-tight text-gray-900 dark:text-white max-w-3xl">
                            {post.title}
                        </h1>

                        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl mx-auto border-t border-b border-gray-100 dark:border-zinc-800 py-6 mt-4">
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                {post.author_avatar_url ? (
                                    <Image
                                        src={post.author_avatar_url}
                                        alt={post.author_name}
                                        width={48}
                                        height={48}
                                        className="rounded-full bg-gray-100 border-2 border-white dark:border-zinc-800 shadow-sm"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-lg font-bold text-gray-500 border-2 border-white dark:border-zinc-800 shadow-sm">
                                        {post.author_name.charAt(0)}
                                    </div>
                                )}
                                <div className="text-left">
                                    <div className="font-semibold text-gray-900 dark:text-white text-lg">
                                        {post.author_name}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-2">
                                        <time>{date}</time>
                                        <span className="opacity-50">•</span>
                                        <span className="flex items-center">
                                            <Clock className="w-3.5 h-3.5 mr-1" />
                                            {post.read_time}분 소요
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-2.5 text-gray-500 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full transition-colors border border-gray-200 dark:border-zinc-800 shadow-sm" title="북마크">
                                    <Bookmark className="w-4 h-4" />
                                </button>
                                <ShareButton />
                            </div>
                        </div>
                    </header>

                    {post.thumbnail_url ? (
                        <div className="relative w-full aspect-[21/9] mb-12 sm:mb-16 rounded-3xl overflow-hidden shadow-md bg-gray-100 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800">
                            <Image
                                src={post.thumbnail_url}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 896px"
                            />
                        </div>
                    ) : (
                        <div className="relative w-full aspect-[21/9] mb-12 sm:mb-16 rounded-3xl overflow-hidden shadow-md bg-zinc-900 flex items-center justify-center border border-zinc-800">
                            <span className="font-mono text-xl md:text-2xl opacity-40 p-4 block break-all text-green-400">
                                {post.title.includes('WebAssembly') ? '01010111 01100001 01110011 01101101...' : 'No Image Format'}
                            </span>
                        </div>
                    )}

                    <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-300">
                        {post.content.split('\n').map((paragraph: string, idx: number) => (
                            <p key={idx} className="mb-8">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    )
}
