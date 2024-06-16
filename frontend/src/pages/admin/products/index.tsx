import * as React from "react"
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { LIST_MATERIAL } from "@/requetes/queries/material.queries";
import { DELETE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';
import Image from 'next/image'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Eye, Pen, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";


const ProductsAdminPage = () => {
  const { toast } = useToast()
  const [deleteProduct] = useMutation(DELETE_MATERIAL_ADMIN);
  const {data, loading, error } = useQuery(LIST_MATERIAL, {
    fetchPolicy: "no-cache"
  });
  const router = useRouter();
  const handleDelete = (idProduct: string) => {
    deleteProduct({
      variables: {
        deleteMaterialId: idProduct
      },
      onCompleted:((data) => {
        console.log("successfully delete")
        toast({
          title: "Delete",
          description: "Successfully delete"
        })
        router.reload();
      }),
      onError:((error) => {
        console.log("fail error")
        console.log(error)
      }),
      fetchPolicy: "no-cache"
      
    })
  }

  console.log(data)
  return (
    <div className="w-full">
      <h1>Show Products</h1>
      <div className="flex items-cente bg-white py-4">
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Picture</TableHead>
              <TableHead className="w-[300px]">Product ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-[100px] text-right">
                <Link href="/admin/products/create" className={buttonVariants()}>Add</Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

          {data && data.listMaterials.length === 0 &&
            <tr>
              <td colSpan={5} className="text-center py-2">
                No items
              </td>
            </tr>
          }
            
              {data && data.listMaterials.map((m) => {
                return <TableRow key={`material_${m.id}`}>
                    <TableCell className="w-[100px]">
                      {m.picture.includes("http") ? 
                       <img
                          src={m.picture}
                          height={50}
                          width={50}
                          alt={`Picture ${m.name}`}
                        />
                       : 
                        <img
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${m.picture}`}
                          width={50}
                          height={50}
                          alt={`Picture ${m.name}`}
                        />
                      }
                      
                      {/* <p>{m.picture}</p> */}
                    </TableCell>
                    <TableCell className="flex-1">{m.id}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.quantity}</TableCell>
                    <TableCell className="text-left">{m.price}</TableCell>
                    <TableCell className="text-left">{m.category.name}</TableCell>
                    <TableCell className="text-right w-[100px]">
                      <div className="flex flex-end items-center gap-2">
                        <Link href={`/admin/products/${m.id}`} 
                          className={`${buttonVariants({ variant: "outline" })}`}>
                          <Eye />
                        </Link>
                        <Link href={`/admin/products/${m.id}`} className={buttonVariants({ variant: "outline" })}>
                          <Pen />
                        </Link>
                        <Button onClick={() => handleDelete(m.id)} variant="outline" className="">
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductsAdminPage;