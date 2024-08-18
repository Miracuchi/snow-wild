"use client"

import React, { useEffect, useState, memo } from "react";
import { GET_USERS } from "@/admin/requetes/queries/users.queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { useMutation } from "@apollo/client"
import { DELETE_USER_BY_ADMIN } from '@/admin/requetes/mutations/user.mutations'; 
import { useRouter } from "next/router";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { Eye, Pen, Router, Trash } from "lucide-react"
import { UserType } from "@/types"
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
// import { columns } from "./columns"
import { DataTable } from "@/components/data-table";

const UsersAdminPage = () => {
  let { data, error, loading } = useQuery(GET_USERS, {
    fetchPolicy: "no-cache",
  });
  const [deleteUser] = useMutation(DELETE_USER_BY_ADMIN, {
    fetchPolicy: "no-cache",
    //refetchQueries: [{ query: GET_USERS }],
  });
  const router = useRouter();
  const handleDeleteUser = (id: string) => {
    console.log('id: ', id)
    deleteUser({
    variables: {
      deleteAdminUserId: id,
    },
    onCompleted:(res) => {
      console.log("SUCCESS TO DELETE")
      console.log("res: ", res)
      
      if(res) {
        console.log('data after result: ', data)
        data.users = data.users.filter((u: UserType, index: number) => data.users[index].id !== u.id )
        // router.push("/admin/users")
      }
    },

    onError: (error) => {
      console.log("ERROR", error)
    },
    
  })
  }

  console.log('data:', data);
  console.log('loading:', loading);
  type User = {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
  }
  
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Firstname
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("firstName")}</div>
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Lastname
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("lastName")}</div>
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
                console.log(column.getIsSorted() === "desc")
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            }
          >
            Role
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("role")}</div>
    },
    {
      header: "Action",
      cell: ({ row }) => {
        // console.log('row: ', row)
        // console.log('row.original: ', row.original)
        return (
          <div className="flex lowercase gap-2">
  
           <Link
              className={buttonVariants({ variant: 'default'})}
              href={`/admin/users/${row.original.id}`}
            >
              show
            </Link>
  
            <Link
              className={buttonVariants({ variant: 'default'})}
              href={`/admin/users/edit/${row.original.id}`}
            >
              Edit
            </Link>
  
            <Button
              onClick={() => {
                handleDeleteUser(row.original.id)
              }}
            >
              Delete
            </Button>
            {/* <Link href={`/admin/users/${row.original.id}`}>show</Link>
            <Link href={`/admin/users/edit/${row.original.id}`}>Edit</Link> */}
  
          </div>
        )
      }
    }
  ]
  // useEffect(() => {
  //   getUsers({
  //     variables: {

  //     }
  //   })
  // }, [])

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Some Error Occurred...</p>;
  }

  return data && (
      <div className="w-full">
        <div className="flex items-cente bg-white py-4">
          {data && (
            <DataTable 
              columns={columns} 
              data={data.users}
            />
          )}
          {/* <Table>
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
          </Table> */}
        </div>
      </div>
  );
};
           
export default memo(UsersAdminPage);

