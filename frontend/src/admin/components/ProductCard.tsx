"use client"

import { buttonVariants, Button } from "@/components/ui/button"
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import { DELETE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';
import { useMutation } from '@apollo/client';

type ProductType = {
  category : {
    id: string, 
    name: string,
  };
  description: string;
  name: string;
  picture: string;
  price: 49;
  quantity: number;
  id: string;
}

const ProductCard = ({ product }: {product: ProductType}) => {
  const {name, category, description, picture, price, quantity, id} = product;
  const [deleteMaterial, { data, loading, error }] = useMutation(DELETE_MATERIAL_ADMIN);
  const { toast } = useToast()
  const router = useRouter();
  console.log('material id: ', id)
  const handleDelete = () => {
    // console.log('id mat:', id, typeof id)
    deleteMaterial({
      variables: {
        deleteMaterialId: id
      },
      onCompleted: ((data) => {
        console.log('successfully deleted')
        console.log(data)
        toast({
          title: "Delete",
          description: "Product successfully delete",
        });
        router.push("/admin/products")
      }),
      onError:((error) => {
        console.log('Error when try to deleted')
        console.log(error)
      }),
      fetchPolicy: "no-cache",
    })
  }
  return <Card>
    <CardHeader>
      <CardTitle>{name}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex gap-4">
        <img src={picture} width="100"/>
       
        <div className="flex flex-col gap-4">
          <p>{description}</p>
          <p><strong>Category: </strong>{category.name}</p>
          <p><strong>Price: </strong>{price}</p>
          <p><strong>Quantity: </strong>{quantity}</p>
          <CardFooter className="flex self-end justify-end w-full p-0 gap-4">
          
            <Button asChild>
              <Link href={`/admin/products/edit/${id}`} className={buttonVariants({ variant: "outline" })}>
                  Edit
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </CardFooter>
        
        </div>
      
      </div>
      
      
    </CardContent>
  </Card>
}

export default ProductCard