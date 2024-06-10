import * as React from "react"
import { GET_USERS } from "@/admin/requetes/queries/users.queries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Page from "@/admin/components/Page";
import Link from "next/link";
import { PencilIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useEffect } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal, Pen, Trash } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>

              
              {data && data.users.map((u: User) => {
                return <>
                  <TableRow >
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
                </>
              })}
              </TableBody>
          </Table>
        </div>
      </div>
  );
};
           
export default UsersAdminPage;

