"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

import { useQuery, useMutation } from "@apollo/client"
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { CREATE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRef } from "react"
import { useRouter } from "next/router"

type CategoryType = {
  id: string;
  name: string;
}

const MAX_UPLOAD_SIZE = 200000;
const ACCEPTED_FILE_TYPES = [
  'image/jpg',
  'image/jpeg',
  'image/png',
];

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters.",
    }),
    price: z.string().transform((v) => Number(v)||0),
    quantity: z.string().transform((v) => Number(v)||0),
    category: z.string(),
    description: z.string().min(2, {
      message: "Description must be at least 2 characters.",
    }),
    picture: z.instanceof(File),
    // file: z.instanceof(File)
    // .refine((file) => {
    //   return !file || file.size <= MAX_UPLOAD_SIZE;
    // }, `File size must be less than ${MAX_UPLOAD_SIZE}MB`)
    // .refine((file) => {
    //   return ACCEPTED_FILE_TYPES.includes(file.type);
    // }, 'File must be a ...'),
});


 
const CreateProductAdmin = () => {
  const { data, loading, error} = useQuery(LIST_CATEGORIES)
  // 1. Define your form.
  const [createMaterial] = useMutation(CREATE_MATERIAL_ADMIN);
  
  const MAX_FILE_SIZE = 2000000
  const ACCEPTED_IMAGE_TYPES = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
  ]

  const inputFile = useRef(null);
  const inputPicture = useRef(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      quantity: 0,
      category: "",
      description: "",
      picture: new File([], ''),
      // file: new File([], ''),
    },
  })

  // console.log('initial file field: ', form.getFieldState("file"))
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {

    const formData1 = {   
      "category": {
        "id": values.category
      },
      "description": values.description,
      "name": values.name,
      "picture": values.picture,
      "price": values.price,
      "quantity": values.quantity
    }

    console.log('values: ', values)

    if(values?.picture) {
      console.log('j ai une image')
      const formData = new FormData();
      console.log(values.picture[0])
      console.log(inputFile?.current?.files[0])
      formData.append("file", inputFile?.current?.files[0], inputFile?.current?.files[0]?.name);
      axios.post(`${process.env.NEXT_PUBLIC_IMAGE_URL}/upload`, formData)
      .then((result) => {
        console.log(result)
        if (result?.data.status == "success") {
          createMaterial({
            variables: {
              data: {
                ...values,
                category: { 
                  id: values.category 
                },
                picture: result.data.filename,
              },
            },
          })
          .then((res) => {
            console.log('res: ',res)
            if(res.data) {
              router.push("/admin/products")
            };
          })
        }
      })
    }
    // const test = await createMaterial({
    //   variables: { 
    //     data: formData2
    //   },
    //   onCompleted: (res) => {
    //     console.log('res: ', res)
    //     // setTimeout(() => {
    //     //   router.push(`${routes.journey.pathname}/${res?.createJourney.id}`);
    //     // }, 1500);
    //   },
    //   onError: (err) => console.error("error", err),
    // });
    // console.log(test)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create a new product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name product" {...field} className="w-full"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {!loading && data && data.categories.map((c: CategoryType) => {
                                return (
                                  <SelectItem 
                                    key={`category_${c.id}`}
                                    value={c.id}
                                  >
                                    {c.name}
                                  </SelectItem>
                                )
                              })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="100" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <FormField 
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="A short description" />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Tabs defaultValue="file" className="w-full">
                  <FormLabel>Picture</FormLabel>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger 
                      value="url"
                      // onClick={(e) => form.resetField('file')} 
                    >
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="file">FILE</TabsTrigger>
                  </TabsList>
                  {/* <TabsContent value="url">
                    <FormField 
                      control={form.control}
                      name="picture"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="string" 
                              placeholder="http://image.jpg" 
                              {...field}
                              ref={inputPicture}
                              className="w-full"
                              //onChange={(e) => form.setValue('picture', `${"http://".concat(e.target.value)}`)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </TabsContent> */}
                  <TabsContent value="file">
                    <FormField 
                      control={form.control}
                      name="picture"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              type="file"
                              placeholder="image.jpeg" 
                              // onChange={(e) => field.onChange(
                              //   e.target.files?.[0], 
                              //   // console.log(e.target.files?.[0]), 
                              //   form.setValue('picture', { e.target.files?.[0]} ),
                              // )}
                              className="w-full"
                              ref={inputFile}
                          />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="py-4">
                <Button type="submit" >Submit</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default CreateProductAdmin;