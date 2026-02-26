'use client'

import { useState, Suspense, useActionState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { login, signup, type AuthState } from './actions'

const initialState: AuthState = {
    error: null,
    message: null,
}

function AuthForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const urlError = searchParams.get('error')
    const urlMessage = searchParams.get('message')

    const [isLogin, setIsLogin] = useState(true)

    const [loginState, loginAction, isLoginPending] = useActionState(login, initialState)
    const [signupState, signupAction, isSignupPending] = useActionState(signup, initialState)

    useEffect(() => {
        if (loginState?.success && loginState.type === 'login') {
            router.push('/')
        }
        if (signupState?.success && signupState.type === 'signup') {
            router.push(`/auth?message=${encodeURIComponent(signupState.message || '')}`)
            setIsLogin(true) // 가입 성공 후 로그인 폼으로 전환
        }
    }, [loginState, signupState, router])

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
    }

    const currentError = isLogin ? loginState?.error : signupState?.error
    const currentMessage = isLogin ? loginState?.message : signupState?.message
    const displayError = currentError || urlError
    const displayMessage = currentMessage || urlMessage

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        {isLogin ? '로그인' : '회원가입'}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {isLogin
                            ? '계속하려면 이메일과 비밀번호를 입력해주세요.'
                            : '새 계정을 만들려면 이메일과 비밀번호를 입력해주세요.'}
                    </p>
                </div>

                <form action={isLogin ? loginAction : signupAction} className="space-y-4">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            이메일
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                비밀번호
                            </label>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>

                    {displayError && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">
                            {displayError}
                        </div>
                    )}
                    {displayMessage && (
                        <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm text-center">
                            {displayMessage}
                        </div>
                    )}

                    <div className="space-y-2 pt-2">
                        {isLogin ? (
                            <button
                                type="submit"
                                disabled={isLoginPending}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full"
                            >
                                {isLoginPending ? '로그인 중...' : '로그인'}
                            </button>
                        ) : (
                            <button
                                type="submit"
                                disabled={isSignupPending}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black text-white hover:bg-black/90 h-10 px-4 py-2 w-full"
                            >
                                {isSignupPending ? '가입 중...' : '회원가입'}
                            </button>
                        )}
                    </div>
                </form>

                <div className="text-center text-sm">
                    {isLogin ? (
                        <p className="text-muted-foreground">
                            계정이 없으신가요?{' '}
                            <button
                                onClick={toggleAuthMode}
                                className="font-medium text-primary hover:underline hover:text-black cursor-pointer"
                            >
                                회원가입
                            </button>
                        </p>
                    ) : (
                        <p className="text-muted-foreground">
                            이미 계정이 있으신가요?{' '}
                            <button
                                onClick={toggleAuthMode}
                                className="font-medium text-primary hover:underline hover:text-black cursor-pointer"
                            >
                                로그인
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthForm />
        </Suspense>
    )
}
