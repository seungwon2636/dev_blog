'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Editor from '@/components/Editor'
import { createClient } from '@/utils/supabase/client'
import { createPost } from './actions'

export default function WritePage() {
    const router = useRouter()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isSaving, setIsSaving] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('제목과 본문을 모두 입력해주세요.')
            return
        }

        setIsPublishing(true)
        try {
            // action 호출
            const result = await createPost({ title, content })
            if (result.success) {
                router.push('/')
            } else {
                alert(result.error || '게시글 발행에 실패했습니다.')
            }
        } catch (err) {
            console.error(err)
            alert('오류가 발생했습니다.')
        } finally {
            setIsPublishing(false)
        }
    }

    const handleSaveDraft = () => {
        setIsSaving(true)
        setTimeout(() => {
            setIsSaving(false)
        }, 1000)
        // 임시저장 로직은 필요에 따라 추가
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                <div className="flex items-center gap-4">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        DevBlog
                    </Link>
                    <div className="flex items-center text-sm text-gray-400">
                        <span>임시보관함</span>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-medium">새 글 작성</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-400 flex items-center">
                        {isSaving ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                저장 중...
                            </>
                        ) : '모든 변경사항이 저장됨'}
                    </div>
                    <button
                        onClick={handleSaveDraft}
                        disabled={isSaving || isPublishing}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        임시저장
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {isPublishing ? '발행 중...' : '발행하기'}
                    </button>

                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden ml-2 cursor-pointer">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </header>

            {/* Editor Main Content */}
            <main className="flex-grow flex flex-col overflow-hidden">
                {/* Title Input Area */}
                <div className="px-10 py-8 shrink-0">
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full text-4xl font-bold placeholder-gray-300 text-gray-900 border-none outline-none bg-transparent"
                    />
                </div>

                {/* MD Editor */}
                <div className="flex-grow overflow-hidden">
                    <Editor value={content} onChange={setContent} />
                </div>
            </main>
        </div>
    )
}
