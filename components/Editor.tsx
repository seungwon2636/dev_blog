'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

const MDEditor = dynamic(
    () => import('@uiw/react-md-editor').then((mod) => mod.default),
    { ssr: false }
)

interface EditorProps {
    value: string
    onChange: (val: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
    return (
        <div data-color-mode="light" className="w-full h-full">
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || '')}
                height="100%"
                preview="live"
                hideToolbar={false}
                className="w-full h-full border-t border-gray-200 shadow-none !rounded-none"
                textareaProps={{
                    placeholder: "당신의 이야기를 적어보세요..."
                }}
            />
        </div>
    )
}
