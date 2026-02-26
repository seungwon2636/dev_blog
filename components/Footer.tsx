import { SquareTerminal, Twitter, Github, Send } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="w-full bg-slate-50 dark:bg-zinc-950 border-t border-gray-200 dark:border-zinc-800 pt-16 pb-8 mt-24">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-12 mb-16">
                <div className="max-w-sm">
                    <div className="flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-500 mb-4">
                        <SquareTerminal className="w-7 h-7" />
                        <span className="text-gray-900 dark:text-white">DevLog</span>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        현대 소프트웨어 엔지니어링에 관한 지식, 튜토리얼, 경험을 공유하는 개발자 커뮤니티 플랫폼입니다.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">구독하기</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        최신 게시글을 이메일로 받아보세요.
                    </p>
                    <div className="flex gap-2">
                        <input
                            type="email"
                            placeholder="이메일 주소"
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm rounded-md px-4 py-2 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        />
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center">
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-zinc-800 text-sm text-gray-500 dark:text-gray-400">
                <p>© {new Date().getFullYear()} DevLog Inc. All rights reserved.</p>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
