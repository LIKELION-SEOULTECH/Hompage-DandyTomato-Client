import {
    NavigationMenu,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function GlobalNavigationButton() {
    const [isHover, setIsHover] = useState(false)
    const [isSessionHover, setIsSessionHover] = useState(false)
    const isLogin = false
    return (
        <div className="fixed top-64 z-50 flex w-screen justify-between px-64">
            <NavigationMenu className="">
                <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/">ABOUT US</Link>
                    </NavigationMenuItem>
                    <NavigationMenuList
                        className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 flex flex-row items-center gap-64 px-30 py-10 transition-all duration-300"
                        onMouseOver={() => {
                            setIsHover(true)
                        }}
                        onMouseOut={() => {
                            setIsHover(false)
                        }}>
                        ARCHIVE
                        {isHover && (
                            <>
                                <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                    <Link
                                        to="/project"
                                        className="font-pretendard text-16 font-bold">
                                        PROJECTS
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                    <Link
                                        to="/gallery"
                                        className="font-pretendard text-16 font-bold">
                                        GALLERY
                                    </Link>
                                </NavigationMenuItem>
                            </>
                        )}
                    </NavigationMenuList>

                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/members">MEMBERS</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-sub-seoultech-red hover:text-pri-white rounded-50 text-sub-seoultech-red px-30 py-10">
                        <Link to="/recruit">RECRUIT</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            {isLogin ? (
                <NavigationMenu className="">
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuList
                            className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 flex flex-row items-center gap-64 px-30 py-10 transition-all duration-300"
                            onMouseOver={() => {
                                setIsSessionHover(true)
                            }}
                            onMouseOut={() => {
                                setIsSessionHover(false)
                            }}>
                            <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                                <Link to="/session-resources">SESSION</Link>
                            </NavigationMenuItem>
                            {isSessionHover && (
                                <>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session-resources',
                                                search: '?sessionType=pm'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            PM
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session-resources',
                                                search: '?sessionType=design'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            DESIGN
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session-resources',
                                                search: '?sessionType=fe'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            FE
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session-resources',
                                                search: '?sessionType=be'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            BE
                                        </Link>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50">
                                        <Link
                                            to={{
                                                pathname: '/session-resources',
                                                search: '?sessionType=ai'
                                            }}
                                            className="font-pretendard text-16 font-bold">
                                            AI
                                        </Link>
                                    </NavigationMenuItem>
                                </>
                            )}
                        </NavigationMenuList>
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/mypage">MY PAGE</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/logout">LOGOUT</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            ) : (
                <NavigationMenu className="">
                    <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                        <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                            <Link to="/login">LOG IN</Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            )}
        </div>
    )
}
