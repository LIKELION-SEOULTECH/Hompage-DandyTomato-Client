import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface JwtTokens {
    access_token: string
    refresh_token: string
}

interface AuthState {
    accessToken: string
    refreshToken: string
    email: string
    setTokens: (tokens: JwtTokens) => void
    setEmail: (email: string) => void
    logout: () => void
    login: () => void
    isLogin: () => boolean
}

export const useAuthZustandStore = create<AuthState>()(
    persist(
        ((set, get) => ({
            accessToken: '',
            refreshToken: '',
            email: '',
            setTokens: (tokens: JwtTokens) => {
                set({
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token
                })
            },
            setEmail: (email: string) => {
                set({ email })
            },
            logout: () => {
                set({ accessToken: '', refreshToken: '', email: '' })
            },
            login: () => {
                set({ accessToken: '123', refreshToken: '123', email: '123' })
            },
            isLogin: () => {
                return !!get().accessToken
            }
        })) as StateCreator<AuthState>,
        {
            name: 'auth-storage', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage), // 사용할 스토리지 (여기서는 localStorage)
            partialize: state =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        ['accessToken', 'refreshToken', 'email'].includes(key)
                    )
                ) as AuthState
        }
    )
)
