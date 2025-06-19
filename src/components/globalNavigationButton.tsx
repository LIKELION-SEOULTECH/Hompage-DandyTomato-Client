import {
    NavigationMenu,
    NavigationMenuTrigger,
    NavigationMenuLink,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList
} from '@/components/ui/navigation-menu'
import { Link } from 'react-router-dom'

export default function GlobalNavigationButton() {
    return (
        <div className="fixed top-64 z-50 flex w-screen justify-between px-64">
            <NavigationMenu className="">
                <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/">ABOUT US</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/archive">ARCHIVE</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/members">MEMBERS</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-sub-seoultech-red hover:text-pri-white rounded-50 text-sub-seoultech-red px-30 py-10">
                        <Link to="/recruit">RECRUIT</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <NavigationMenu className="">
                <NavigationMenuList className="text-20 text-sub-seoultech-blue rounded-50 flex cursor-pointer items-center justify-center gap-4 border-2 border-[oklch(36%_0.083495_245.3/0.2)] bg-[oklch(92.2%_0.005498_275/0.5)] px-6 py-6 font-bold">
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/signup">SIGN UP</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="hover:bg-sub-seoultech-blue hover:text-pri-white rounded-50 px-30 py-10">
                        <Link to="/login">LOGIN</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
