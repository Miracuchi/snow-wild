import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { CREATE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';
import { SkiSizes } from '../../constantes';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { CategoryType, SizeType } from '@/types';
import { Label } from '@/components/ui/label';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';
import FormHook from './FormHook';

type FormDataType = {
    category: string;
    name: string;
    description: string,
    picture: File,
    avaibleSizes: string[],
    sizes: SizeType[]
}

const FormCreate = () => {
  const { data, loading, error} = useQuery(LIST_CATEGORIES);
  const inputFile = useRef(null);
  const file = new File([], '');
  const [formState, setFormState] = useState<FormDataType>({
    category: "",
    name:"",
    description: "",
    picture: file,
    avaibleSizes: [],
    sizes: [],
  })

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log('submit');
    console.log(formState)
  }

  const handleChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleClickSize = (size: SizeType) => {
    console.log('size: ', size)
    if(!formState.sizes.some((e:SizeType) => e.label === size.label)) {
      console.log('formState.sizes: ', formState.sizes)
      setFormState({
        ...formState,
        sizes: [...formState.sizes, {label: size.label, quantity:0}],
      })
    } else {
      let copyArr = formState.sizes.filter((s) => s.label !== size.label );
      console.log('copyArr: ', copyArr)
      setFormState({
        ...formState,
        sizes: copyArr,
      })
    }
    console.log('formState.sizes: ', formState.sizes)
  }

  const handleChangeQuantity = (e, size) => {
    console.log(e.target.value)
    console.log(size)
    let copySize = formState.sizes.find((s) => s.label === size.label)
    console.log('copy size: ', copySize);
    if(copySize) {
      copySize.quantity = e.target.value
      setFormState({
        ...formState,
        sizes: [...formState.sizes, copySize]
      }) 
    } else {
      setFormState({
        ...formState,
        sizes: [size]
      }) 
    }
    
  }

  return (
    <Card className="w-[400px] mx-auto">
      <CardHeader>
        Create New Product
      </CardHeader>
      <CardContent>
        <FormHook />
        
      </CardContent>
      {/* <form onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleChange(e)} className="grid gap-4">


        <CardContent>
          <div className="mb-3">
            <Label>Name product</Label>
            <Input name="name" value={formState.name} />
          </div>

          <div className="mb-3">
            <Label>Category of Product</Label>
            <Select name="category">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category " />
              </SelectTrigger>

              <SelectContent>
                {data && data.categories.map((c: CategoryType) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mb-3">
            <Label>Description</Label>
            <Textarea name="description" value={formState.description} placeholder="A short description" />
          </div>


          {formState?.category?.length > 0 && formState.category === 'ski' && SkiSizes && (
            <div className="mb-3">
              <Label>Select sizes</Label>
              <ToggleGroup type="multiple" variant="outline" className="justify-start flex-wrap">
                {SkiSizes?.map((size: SizeType) => (
                  <ToggleGroupItem 
                    key={size?.label} 
                    value={size?.label} 
                    aria-label="Toggle bold"
                    name="avaibleSizes"
                    className={'bg-gray-200 hover:bg-gray-600'}
                    onClick={() => {
                      handleClickSize(size)
                      // field.value.concat(size)
                      
                      // field.onChange(field.value.push({label: size.label, quantity: 0}))
                    }}
                  >
                    {size.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <div>
              {formState?.sizes && formState?.sizes.length > 0 && (
                formState.sizes.map((size, index) => (
                  <div 
                    key={size.label}
                  >
                    item : {size.label} 
                    quantity: {size.quantity}
                    <Input
                      type="number"
                      value={size.quantity}
                      name={size.label}
                      onChange={(e) => handleChangeQuantity(e, size)}
                    />
                  </div>
                ))
              )}
              </div>
            </div>
          )}
          
          

          <div className="mb-3">
            <Label>Import a picture</Label>
            <Input 
              type="file" 
              placeholder="http://image.jpg"
              ref={inputFile}
              className="w-full"
              name="picture"
              //onChange={(e) => form.setValue('picture', `${"http://".concat(e.target.value)}`)}
            />
          </div>

          
          
        
      </CardContent>
      <CardFooter>
        <Button type="submit">
          ADD
        </Button>
      </CardFooter> */}

    </Card>
  )
}

export default FormCreate;
