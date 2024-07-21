import React, { useState, useRef } from 'react';
import { useQuery, useMutation } from "@apollo/client"
import { LIST_CATEGORIES } from "@/requetes/queries/category.queries"
import { CREATE_MATERIAL_ADMIN } from '@/requetes/mutations/material.mutations';
import { SkiSizes } from '../../constantes';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { CategoryType, SizeType } from '@/types';
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

  return (
    <FormHook />
  )
}

export default FormCreate;
