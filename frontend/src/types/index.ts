import { SkiSizes, SnowboardSizes, BootsSizes, ClothSizes, StickSizes } from "@/pages/admin/constantes";

export type CategoryType = {
  id: string;
  name: string;
}

export type SizeType = string;

enum MaterialSizes {
  SkiSizes,
  SnowboardSizes,
}

export enum MaterialCategories {
  SKI = "ski",
  SNOWBOARD = "sknowboard",
  BOOTS = "boots",
  STICK = "stick",
  ACCESSORY = "accessory",
}