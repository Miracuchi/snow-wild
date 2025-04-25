import { Arg } from 'type-graphql'
import { Repository } from 'typeorm'
import datasource from '../db'
import Category, {
  AdminUpdateCategoryInput,
  CreateCategoryInput,
} from '../entities/category.entity'

export default class CategoryService {
  db: Repository<Category>
  constructor() {
    this.db = datasource.getRepository(Category)
  }
  async findCategory(id: string) {
    const category = await this.db.findOne({
      where: { id },
      relations: { material: true },
    })
    if (!category) {
      throw new Error("Cette catégorie n'existe pas")
    }
    return category
    // SELECT c.*, m.*
    // FROM categories c
    // LEFT JOIN material m ON c.id = m.categoryId
    // WHERE c.id = "123"

    // LEFT JOIN permet de retourner les catégories qui n'ont pas de matériel
  }
  async listCategories() {
    return this.db.find()
    // SELECT * FROM categories
  }

  async createCategory({ name }: CreateCategoryInput) {
    const newCategory = this.db.create({ name })
    return await this.db.save(newCategory)
    // INSERT INTO categories (name)
    // VALUES ($1)
  }

  async deleteCategory(id: string) {
    const category = (await this.findCategory(id)) as Category
    await this.db.remove(category)
    return { ...category, id }
    // DELETE FROM categories
    // WHERE id = $1
  }

  async find(id: string) {
    const category = await this.db.findOne({
      where: { id },
      relations: { material: true },
    })
    if (!category) {
      throw new Error("La catégorie n'existe pas!")
    }
    return category
  }

  async findCategoryByName(name: string) {
    const category = await this.db.findOne({
      where: { name },
      relations: { material: true },
    })
    return category
  }

  async updateCategory(@Arg('data') data: AdminUpdateCategoryInput) {
    const { id } = data
    const categoryToUpdate = await this.find(id)
    if (!categoryToUpdate) {
      throw new Error('Error, category id not found!')
    }

    const categoryToSave = this.db.merge(categoryToUpdate, {
      ...data,
    })

    return await this.db.save(categoryToSave)
    // UPDATE categorie
    // SET name = $1
    // WHERE id = $2
  }
}
