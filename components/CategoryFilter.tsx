import Link from 'next/link'
import { Check, Cloud, Database, FileJson } from 'lucide-react'

type Category = {
    id: string
    name: string
    icon?: string | null
}

const iconMap: Record<string, React.ReactNode> = {
    js: <span className="font-bold text-xs bg-yellow-400 text-black px-1 rounded mr-1">JS</span>,
    rust: <span className="font-bold text-xs bg-orange-500 text-white px-1 rounded mr-1">R</span>,
    cloud: <Cloud className="w-4 h-4 mr-1 text-blue-500" />,
    database: <Database className="w-4 h-4 mr-1 text-gray-500" />
}

export default function CategoryFilter({
    categories,
    activeCategoryId,
}: {
    categories: Category[]
    activeCategoryId?: string
}) {
    return (
        <div className="flex items-center justify-between mb-8 w-full">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white whitespace-nowrap mr-6">최신 게시글</h2>
            <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap w-full justify-end hide-scroll-bar">
                <Link
                    href="/"
                    className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex items-center transition-colors border ${!activeCategoryId
                            ? 'bg-gray-900 text-white border-transparent dark:bg-white dark:text-black'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800'
                        }`}
                >
                    {(!activeCategoryId) && <Check className="w-4 h-4 mr-1" />} 전체
                </Link>
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/?category=${category.id}`}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex items-center transition-colors border ${activeCategoryId === category.id
                                ? 'bg-gray-900 text-white border-transparent dark:bg-white dark:text-black'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800'
                            }`}
                    >
                        {activeCategoryId === category.id && <Check className="w-4 h-4 mr-1" />}
                        {category.icon && !activeCategoryId && iconMap[category.icon]}
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}
