import React, { useEffect, useRef } from 'react';
import { z } from "zod";
import { useForm, SubmitHandler, useWatch, FieldErrors, ControllerRenderProps, FieldValues, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@apollo/client"
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { CREATE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';

import { Input } from "@/components/ui/input";
import ControlledInput from '@/admin/components/ControlledInput';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from '@/components/ui/textarea';
import { CategoryType, SizeType } from '@/types';
import { SkiSizes, SnowboardSizes, BootsSizes, ClothSizes } from '@/pages/admin/constantes';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import axios from 'axios';

// const sizeSchema = z.object({
//   label: z.string(),
//   quantity: z.number(),
// });

const formSchema = z.object({
  category: z.object({ name: z.string(), id: z.string()}),
  sizes: z.string().array(),
  name: z.string().min(2, { message: "Name should be more than 2 carac"}),
  avaibleSizes: z.array(z.object({ size: z.string(), quantity: z.number()})),
  description: z.string().min(1, { message: "Product should have a description" }),
  picture: z.instanceof(File),
  price: z.string().transform((v) => Number(v)||0)
})



type FormSchema = z.infer<typeof formSchema>;

const FormHook = () => {
  const router = useRouter();
  const { data, loading, error} = useQuery(LIST_CATEGORIES);
  const [createMaterial] = useMutation(CREATE_MATERIAL_ADMIN);
  const inputFileRef = useRef<{fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined}>(null);

  const form = useForm<FormSchema>({ 
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: {name: '', id: ''},
      sizes: [],
      name: '',
      avaibleSizes: [],
      description: '',
      picture: new File([], ''),
      price: 0,
    }       ,
    mode: 'onChange',
  });

  const { watch } = form;
  const { fields } = useFieldArray({ name: "avaibleSizes", control: form.control });

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    const formData = new FormData();

    formData.append("file", inputFileRef?.current?.files[0], inputFileRef?.current?.files[0]?.name);
    console.log('formData: ', formData)
    
    axios.post(`${process.env.NEXT_PUBLIC_IMAGE_URL}/upload`, formData)
    .then((result) => {
      console.log('result', result)

      
      if (result?.data?.status == "success") {
        let testData = {
          ...data,
          category: { 
            id: data.category.id,
          },
          picture: result.data.filename,
          sizes: data.avaibleSizes,
        }
        delete testData['avaibleSizes'];
        console.log('testData: ', testData)
        
        console.log('data: ', data);
        delete data['avaibleSizes'];
        // console.log(testData)
        createMaterial({
          variables: {
            data: {
              ...testData,
            },
          },
        }).then((res) => {
          console.log('res: =======>',res)
          if(res.data) {
            router.push("/admin/products")
          };
        }).catch((err) => {
          console.log('err ===>', err)
        }) 
        
      }
    });
  };

  const watchCategory = watch('category');
  const watchSizes = watch('sizes');
  const watchAvaibleSizes = watch('avaibleSizes');

  const handleClickSize = (field:ControllerRenderProps<FieldValues, "sizes">, size: string) => {
    if( !watchSizes.includes(size) ) {
      form.setValue('sizes', [...watchSizes, size]);
      form.setValue('avaibleSizes', [...watchAvaibleSizes, {size: size, quantity: 0}])
    } else {
      let filtredSizes = watchSizes.filter((s) =>  s !== size)
      let filtredAvaibleSizes = watchAvaibleSizes.filter((s) =>  s.size !== size)
      form.setValue('sizes', filtredSizes);
      form.setValue('avaibleSizes', filtredAvaibleSizes);
    }
    console.log('in form ======>', form.getValues('sizes'))
  }

  const findNameOfCategorie = (id:string) => {
    let cat = data.categories.find((el: CategoryType) => el.id === id);
    return cat.name;
  }

  const handleChangeCategory = (value, field:ControllerRenderProps<FieldValues, "category">) => {
    let name = findNameOfCategorie(value)
    if(name) {
      field.onChange({ name: name, id: value })
    } 
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
      <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem 
              className="mb-3"
              onChange={(e) => { field.onChange(e.target?.value)}}>
              <FormLabel>Product&apos;s name</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem 
              className="mb-3"
              onChange={(e) => { field.onChange(e.target?.value)}}>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />

        <FormField 
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem
              className="mb-3"
            >
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="flex items-center mb-3">
                  <Input
                    {...field}
                    type="number"
                    placeholder="100" 
                    className="w-full"
                  />
                  <span
                    className="ml-4"
                  > €</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField 
          control={form.control}
          name="picture"
          render={({ field }) => (
            <FormItem
              className="mb-3"
            >
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input 
                  type="file"
                  placeholder="image.jpeg" 
                  className="w-full"
                  ref={inputFileRef}
                />
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
              className="mb-3"
             
            >
              <FormLabel>Category</FormLabel>
              <Select 
                onValueChange={(value) => { 
                  handleChangeCategory(value, field) 
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {!loading && data?.categories.map((c: CategoryType, index) => {
                      return (
                        <SelectItem 
                          key={`category_${c.id}_${index}`}
                          value={c.id}
                        >
                          {c.name}
                        </SelectItem>
                      )
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {<p className="text-red-500">{form.getFieldState('category').error?.message}</p>}

              <FormMessage />
            </FormItem>
          )}
        />

        {watchCategory && watchCategory.name === 'ski' && (
          <>
            <div className="mb-3">
              <Label>Select sizes</Label>
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem 
                    className="mb-3"
                    {...field}
                  >
                    <FormControl>
                      <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap">
                        {SkiSizes?.map((s: string, index: number) => {
                          return (
                            <ToggleGroupItem 
                              key={`toggle_${s + index}`} 
                              value={s} 
                              aria-label="Toggle bold"
                              className={'hover:border-gray-950 selected: bg-gray-950 selected: text-white'}
                              onClick={() => handleClickSize(field, s)}
                            >
                              {s}
                            </ToggleGroupItem>
                          )
                        })}
                      </ToggleGroup>
                    </FormControl>
                    
                  </FormItem>
                )}
              />
            </div>

            {watchSizes.length > 0 && (
              <>
                <div>
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`avaibleSizes.${index}`}
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Quantity per size(s)</FormLabel>
                              <FormDescription />
                              <FormControl>
                                <div className="flex items-center justify-strat">
                                  <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14 mr-4'>{field.value.size}</div>
                                  <ControlledInput 
                                    initialValue={field.value.quantity}
                                    field={field}
                                  />
                                  {/* <Input
                                    onChange={(e) => field.onChange({label: field.value.label, quantity:Number(e.target.value)})}
                                  /> */}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}}
                      
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        
       
        {watchCategory && watchCategory.name === 'snowboard' && (
          <>
            <div className="mb-3">
              <Label>Select sizes</Label>
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem 
                    className="mb-3"
                    {...field}
                  >
                    <FormControl>
                      <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap">
                        {SnowboardSizes?.map((s: string, index: number) => {
                          return (
                            <ToggleGroupItem 
                              key={`toggle_${s + index}`} 
                              value={s} 
                              aria-label="Toggle bold"
                              className={'hover:border-gray-950 selected: bg-gray-950 selected: text-white'}
                              onClick={() => handleClickSize(field, s)}
                            >
                              {s}
                            </ToggleGroupItem>
                          )
                        })}
                      </ToggleGroup>
                    </FormControl>
                    
                  </FormItem>
                )}
              />
            </div>

            {watchSizes.length > 0 && (
              <>
                <div>
                  {fields.map((field, index) => (
                    <FormField
                      control={form.control}
                      key={field.id}
                      name={`avaibleSizes.${index}`}
                      render={({ field }) => {
                        return (
                          <>
                            <FormItem>
                              <FormLabel>Quantity per size(s)</FormLabel>
                              <FormDescription />
                              <FormControl>
                                <div className="flex items-center justify-strat">
                                  <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14 mr-4'>{field.value.size}</div>
                                  <ControlledInput 
                                    initialValue={field.value.quantity}
                                    field={field}
                                  />
                                  {/* <Input
                                    onChange={(e) => field.onChange({label: field.value.label, quantity:Number(e.target.value)})}
                                  /> */}
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          </>
                        )}}
                      
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}


        {watchCategory && watchCategory.name === 'boots' && (
          <>
          <div className="mb-3">
            <Label>Select sizes</Label>
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem 
                  className="mb-3"
                  {...field}
                >
                  <FormControl>
                    <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap">
                      {BootsSizes?.map((s: string, index: number) => {
                        return (
                          <ToggleGroupItem 
                            key={`toggle_${s + index}`} 
                            value={s} 
                            aria-label="Toggle bold"
                            className={'hover:border-gray-950 selected: bg-gray-950 selected: text-white'}
                            onClick={() => handleClickSize(field, s)}
                          >
                            {s}
                          </ToggleGroupItem>
                        )
                      })}
                    </ToggleGroup>
                  </FormControl>
                  
                </FormItem>
              )}
            />
          </div>

          {watchSizes.length > 0 && (
            <>
              <div>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`avaibleSizes.${index}`}
                    render={({ field }) => {
                      return (
                        <>
                          <FormItem>
                            <FormLabel>Quantity per size(s)</FormLabel>
                            <FormDescription />
                            <FormControl>
                              <div className="flex items-center justify-strat">
                                <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14 mr-4'>{field.value.size}</div>
                                <ControlledInput 
                                  initialValue={field.value.quantity}
                                  field={field}
                                />
                                {/* <Input
                                  onChange={(e) => field.onChange({label: field.value.label, quantity:Number(e.target.value)})}
                                /> */}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}}
                    
                  />
                ))}
              </div>
            </>
          )}
        </>
        )}

        {watchCategory && watchCategory.name === 'accessory' && (
          <>
          <div className="mb-3">
            <Label>Select sizes</Label>
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem 
                  className="mb-3"
                  {...field}
                >
                  <FormControl>
                    <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap">
                      {ClothSizes?.map((s: string, index: number) => {
                        return (
                          <ToggleGroupItem 
                            key={`toggle_${s + index}`} 
                            value={s} 
                            aria-label="Toggle bold"
                            className={'hover:border-gray-950 selected: bg-gray-950 selected: text-white'}
                            onClick={() => handleClickSize(field, s)}
                          >
                            {s}
                          </ToggleGroupItem>
                        )
                      })}
                    </ToggleGroup>
                  </FormControl>
                  
                </FormItem>
              )}
            />
          </div>

          {watchSizes.length > 0 && (
            <>
              <div>
                {fields.map((field, index) => (
                  <FormField
                    control={form.control}
                    key={field.id}
                    name={`avaibleSizes.${index}`}
                    render={({ field }) => {
                      return (
                        <>
                          <FormItem>
                            <FormLabel>Quantity per size(s)</FormLabel>
                            <FormDescription />
                            <FormControl>
                              <div className="flex items-center justify-strat">
                                <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14 mr-4'>{field.value.size}</div>
                                <ControlledInput 
                                  initialValue={field.value.quantity}
                                  field={field}
                                />
                                {/* <Input
                                  onChange={(e) => field.onChange({label: field.value.label, quantity:Number(e.target.value)})}
                                /> */}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        </>
                      )}}
                    
                  />
                ))}
              </div>
            </>
          )}
        </>
        )}

        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
}

export default FormHook;