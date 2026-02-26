import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { Search, SquareTerminal } from 'lucide-react'

export default async function Navbar() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return (
        <nav className="w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
                    <SquareTerminal className="w-7 h-7" />
                    <span className="text-gray-900 dark:text-white">DevLog</span>
                </Link>

                <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="게시글 검색..."
                        className="w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-500">{user.email}</span>
                            <Link href="/write" className="text-sm font-medium hover:text-gray-600 transition-colors">
                                글쓰기
                            </Link>
                            <form action="/auth/signout" method="post">
                                <button className="text-sm text-red-500 font-medium hover:text-red-600 transition-colors">
                                    로그아웃
                                </button>
                            </form>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth" className="text-sm font-medium px-4 py-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                                로그인
                            </Link>
                            <Link href="/auth?mode=signup" className="text-sm font-medium px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}
