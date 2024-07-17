import { GET_MATERIAL_BY_ID } from "@/requetes/queries/material.queries";
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries";
import { useRouter } from "next/router";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, useWatch, FieldErrors, ControllerRenderProps, FieldValues, useFieldArray } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { SkiSizes, SnowboardSizes, BootsSizes, ClothSizes } from '@/pages/admin/constantes';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoryType } from "@/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ControlledInput from "@/admin/components/ControlledInput";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const formSchema = z.object({
  category: z.string(),
  sizes: z.string().array(),
  name: z.string().min(2, { message: "Name should be more than 2 carac"}),
  avaibleSizes: z.array(z.object({ size: z.string(), quantity: z.number()})),
  description: z.string().min(1, { message: "Product should have a description" }),
  picture: z.instanceof(File),
  price: z.string().transform((v) => Number(v)||0)
})

type FormSchema = z.infer<typeof formSchema>;

const EditProductAdmin = () => {
  const router = useRouter();
  const { data, loading, error} = useQuery(LIST_CATEGORIES);
  const [getMaterial] = useLazyQuery(GET_MATERIAL_BY_ID);
  const [loadedData, setLoadedData] = useState({});
  

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

  const watchCategory = watch('category');
  const watchSizes = watch('sizes');
  const watchAvaibleSizes = watch('avaibleSizes');
  
  useEffect(() => {
    if(router.query.id) {
      console.log(router.query.id)
      getMaterial({
        variables: {
          findMaterialByIdId: router.query.id
        },
        onCompleted: data => {
          console.log("success")
          console.log('useEffect data: ', data)
          form.setValue('name', data.findMaterialById.name);
          form.setValue('description', data.findMaterialById.description);
          form.setValue('price', data.findMaterialById.price);
          form.setValue('category', data.findMaterialById.category.name);
          console.log(form.getValues('category'))
          let sizesArr = data.findMaterialById.sizes.map((s) => s.size);
          console.log('sizes: ',form.setValue('sizes', sizesArr))
          setLoadedData(data);
        },
        onError: (error) => {
          console.log("error")
          console.log(error)
        },
      })
    
    }

  }, [router.query.id, getMaterial, form])

  
  


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

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log('submit data:')
  }

  return data && (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <Card>
          <CardHeader>
            <h1>Edit Product</h1>
          </CardHeader>

          <CardContent>
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
              name="category"
              render={({ field }) => (
                <FormItem
                  className="mb-3"
                >
                  <FormLabel>Category</FormLabel>
                  <Select

                    defaultValue={data?.findMaterialById?.category?.name}
                    onValueChange={(value) => { 
                      handleChangeCategory(value, field) 
                    }}
                  >
                  
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue 
                          placeholder={loadedData?.findMaterialById?.category?.name} 
                          defaultValue={loadedData?.findMaterialById?.category?.name} 
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent
                    
                    >
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

          {watchCategory && watchCategory === 'ski' && (
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
                          console.log('values in sizes: ', form.getValues('sizes'))
                          console.log(form.getValues('sizes').includes(s))
                          return (
                            <ToggleGroupItem 
                              key={`toggle_${s + index}`} 
                              value={s} 
                              aria-label="Toggle bold"
                              className={!form.getValues('sizes').includes(s) ? 'bg-gray-400 text-black' : 'bg-black text-white'}
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
                              <FormControl>
                                <div className="flex items-center justify-strat">
                                  <div className='flex items-center justify-center text-white text-sm bg-gray-950 rounded-md h-9 px-3 w-14 mr-4'>{field.value.size}</div>
                                  <ControlledInput 
                                    initialValue={field.value.quantity}
                                    field={field}
                                  />
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

        {watchCategory && watchCategory === 'snowboard' && (
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

        {watchCategory && watchCategory === 'accessory' && (
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

          

          </CardContent>
          
          <CardFooter>
            <Button type="submit">Update</Button>
          </CardFooter>

       
        </Card>
      </form>
    </Form>
  )
}
  

export default EditProductAdmin;