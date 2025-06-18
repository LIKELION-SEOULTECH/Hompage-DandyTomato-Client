import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import axios from 'axios'
import StickerRain from './test'
const queryClient = new QueryClient()
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode_toggle'

export default function App() {
    const [user, setUser] = useState<{ name: string; age: number } | null>(null)

    async function fetchUser() {
        const { data } = await axios.get('/api/user')
        setUser(data)
    }
    if (!user)
        return (
            <>
                <button onClick={fetchUser}>click</button>
                <p>로딩 중...</p>
            </>
        )

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    {/* <div className="p-4 text-xl">
                <p className="user-name">이름: {user.name}</p>
                <p>나이: {user.age}</p>
                <WithMockServer />
            </div> */}
                    <StickerRain />
                    <ModeToggle />
                    {/* <h1 className="text-4xl font-bold">App.tsx</h1> */}
                </ThemeProvider>
            </QueryClientProvider>
        </>
    )
}
