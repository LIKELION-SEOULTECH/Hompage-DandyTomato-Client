import { create, StateCreator } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface JwtTokens {
    access_token: string
    refresh_token: string
}

interface AuthState {
    accessToken: string
    refreshToken: string
    setTokens: (tokens: JwtTokens) => void
    logout: () => void
}

export const useAuthZustandStore = create<AuthState>()(
    persist(
        ((set: Parameters<StateCreator<AuthState>>[0]) => ({
            accessToken: '',
            refreshToken: '',
            setTokens: (tokens: JwtTokens) => {
                set({
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token
                })
            },
            logout: () => {
                set({ accessToken: '', refreshToken: '' })
            }
        })) as StateCreator<AuthState>,
        {
            name: 'auth-storage', // localStorage에 저장될 키 이름
            storage: createJSONStorage(() => localStorage), // 사용할 스토리지 (여기서는 localStorage)
            partialize: state =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) =>
                        ['accessToken', 'refreshToken'].includes(key)
                    )
                ) as AuthState
        }
    )
)
