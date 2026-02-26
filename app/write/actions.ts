'use server'

import { createClient } from '@/utils/supabase/server'

export async function createPost(data: { title: string; content: string }) {
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (!user || authError) {
        console.error('Auth error in createPost:', authError)
        return { success: false, error: 'Unauthorized: Session missing or invalid. Please log in again.' }
    }

    // 임의로 텍스트에서 100자 정도를 요약으로 추출
    const summary = data.content.slice(0, 100).replace(/\n/g, ' ') + (data.content.length > 100 ? '...' : '')

    // 기본 썸네일과 기타 기본값 지정
    const thumbnailUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800'
    const readTime = Math.max(1, Math.ceil(data.content.length / 500))

    const { data: post, error } = await supabase
        .from('posts')
        .insert({
            title: data.title,
            summary: summary,
            content: data.content,
            read_time: readTime,
            thumbnail_url: thumbnailUrl,
            // 임시로 관리자 이름과 아바타
            author_name: 'DevLog User',
            author_avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
            is_featured: false,
        })
        .select()
        .single()

    if (error) {
        console.error('Error inserting post:', error)
        return { success: false, error: error.message }
    }

    return { success: true, post }
}
