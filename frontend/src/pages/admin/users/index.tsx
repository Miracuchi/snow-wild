import * as React from "react"
import { GET_USERS } from "@/admin/requetes/queries/users.queries";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"

import { Eye, Pen, Trash } from "lucide-react"
 
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}


const UsersAdminPage = () => {
  const { data, error, loading } = useQuery(GET_USERS);
  console.log(data);

  return (
      <div className="w-full">
        <div className="flex items-cente bg-white py-4">
          <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">User ID</TableHead>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">
                    <Link href="/admin/users/create" className={buttonVariants()}>Add</Link>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

              {data && data.users.map((u: User) => {
                return <TableRow key={`user_${u.id}`}>
                    <TableCell className="flex-1">{u.id}</TableCell>
                    <TableCell>{u.firstName}</TableCell>
                    <TableCell>{u.lastName}</TableCell>
                    <TableCell className="text-left">{u.email}</TableCell>
                    <TableCell className="text-left">{u.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center">
                        <Link href={`/admin/users/${u.id}`} className="px-1">
                          <Eye />
                        </Link>
                        <Link href={`/admin/users/${u.id}`} className="px-1">
                          <Pen />
                        </Link>
                        <Link href={`/admin/users/${u.id}`} className="px-1">
                          <Trash />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
              })}
              </TableBody>
          </Table>
        </div>
      </div>
  );
};
           
export default UsersAdminPage;

