import { Home, Package, Package2, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
type LinkType = {
  name: string;
  link: string;
  icon: JSX.Element;
};

const links = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    name: "Users",
    link: "/admin/users/list",
    icon: <Users className="h-4 w-4" />,
  },
  {
    name: "Products",
    link: "/admin/products/list",
    icon: <Package className="h-4 w-4" />,
  },
  {
    name: "Reservations",
    link: "/admin/reservations/list",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    name: "Categories",
    link: "/admin/categories/list",
    icon: <Package2 className="h-4 w-4" />,
  },
];

const Navigation = () => {
  const router = useRouter();
  const { pathname } = router;
  return (
    <>
      {links.map((l) => {
        return (
          <Link
            key={`link_${l.name}`}
            href={l.link}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
              pathname.startsWith(l.link) ? "bg-muted" : ""
            }`}
          >
            {l.icon}
            {l.name}
          </Link>
        );
      })}
    </>
  );
};

export default Navigation;
