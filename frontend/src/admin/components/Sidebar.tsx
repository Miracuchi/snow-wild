import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Home, LineChart, Package, Package2, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

import { useRouter } from "next/router";

type LinkType = {
  name: string,
  link: string,
  icon: JSX.Element,
}

const links = [
  {
    name: 'Dashboard',
    link: '/admin/dashboard',
    icon: <Home className="h-4 w-4"/>
  },
  {
    name: 'Users',
    link: '/admin/users',
    icon: <Users className="h-4 w-4"/>
  },
  {
    name: 'Products',
    link: '/admin/products',
    icon: <Package className="h-4 w-4"/>
  },
  {
    name: 'Orders',
    link: '/admin/orders',
    icon: <ShoppingCart className="h-4 w-4"/>
  }
]



const SideBar = () => {
  const router = useRouter()
  const { pathname } = router;
  console.log(pathname)

  return (
    <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">SnowWild</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              { links.map((l) => {
                return (
                  <Link
                    key={`link_${l.name}`}
                    href={l.link}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${pathname.startsWith(l.link) ? 'bg-muted': ''}`}
                  >
                    {l.icon}
                    {l.name}
                  </Link>
                )
              }) }
              <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link>
            </nav>
          </div>
        </div>
      </div>
  )
}

export default SideBar