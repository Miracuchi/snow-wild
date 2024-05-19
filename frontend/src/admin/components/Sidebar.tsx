import Link from "next/link"

const Sidebar = () => {
  return (
    <div className="flex flex-col py-2">
      <Link href="/admin">
        Dashboard
      </Link>
      <Link href="/admin/users">
        Users
      </Link>
      <Link href="/admin/materials">
        Materials
      </Link>
      <Link href="/admin/materials">
        Reservations
      </Link>
      <Link href="/admin/categories">
        Categories
      </Link>
    </div>
  )
}

export default Sidebar