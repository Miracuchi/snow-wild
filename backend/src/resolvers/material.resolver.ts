import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import {
  CreateMaterialInput,
  UpdateMaterialInput,
} from '../entities/material.entity'
import MaterialService from '../services/material.service'
import Material from './../entities/material.entity'

@Resolver()
export default class MaterialResolver {
  @Query(() => [Material])
  async listMaterials() {
    const materials = await new MaterialService().listMaterials()
    console.log(materials)
    return materials
  }

  @Query(() => Material)
  async findMaterialById(@Arg('id') id: string) {
    const materials = await new MaterialService().findMaterialById(id)
    return materials
  }

  @Mutation(() => Material)
  async createMaterial(@Arg('data') data: CreateMaterialInput) {
    const newMaterial = await new MaterialService().createMaterial(data)
    return newMaterial
  }

  @Mutation(() => Material)
  async deleteMaterial(@Arg('id') id: string) {
    const deletedMaterial = await new MaterialService().deleteMaterial(id);
    console.log('deletedMaterial: ', deletedMaterial);
    return deletedMaterial
  }

  // const categoryDeleted = await new CategoryService().deleteCategory(id)
  // return categoryDeleted

  @Mutation(() => Material)
  async updateMaterial(@Arg('data') data: UpdateMaterialInput) {
    const { id, ...otherData } = data
    const materialToUpdate = await new MaterialService().updateMaterial(
      id,
      otherData
    )
    return materialToUpdate
  }
}
