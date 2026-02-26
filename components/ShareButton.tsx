"use client"

import { useState } from 'react'
import { Share2, Check } from 'lucide-react'

export default function ShareButton() {
    const [copied, setCopied] = useState(false)

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 rounded-full transition-colors border border-gray-200 dark:border-zinc-800 cursor-pointer"
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 dark:text-green-500">복사완료</span>
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4" />
                    <span>공유하기</span>
                </>
            )}
        </button>
    )
}
