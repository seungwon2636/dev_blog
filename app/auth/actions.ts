'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export type AuthState = {
    error: string | null;
    message: string | null;
    success?: boolean;
    type?: 'login' | 'signup';
}

export async function login(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: '이메일 또는 비밀번호가 올바르지 않습니다.', message: null }
    }

    revalidatePath('/', 'layout')
    return { error: null, message: null, success: true, type: 'login' }
}

export async function signup(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        if (error.message.includes('User already registered')) {
            return { error: '이미 등록된 이메일입니다.', message: null }
        }
        return { error: '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.', message: null }
    }

    revalidatePath('/', 'layout')
    return {
        error: null,
        message: '회원가입이 완료되었습니다. 로그인해주세요.',
        success: true,
        type: 'signup'
    }
}
