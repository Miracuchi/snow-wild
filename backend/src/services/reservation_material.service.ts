import {
  ReservationMaterial,
  CreateReservationMaterialInput,
} from "./../entities/reservation_material.entity";
import { Repository } from "typeorm";
import datasource from "../db";
import Reservation from "../entities/reservation.entity";

export default class ReservationMaterialService {
  db: Repository<ReservationMaterial>;
  constructor() {
    this.db = datasource.getRepository(ReservationMaterial);
  }

  async listReservationsMaterial() {
    return this.db.find();
  }

  async findReservationMaterial(id: string) {
    const reservationMaterial = await this.db.findOne({
      where: { id },
      relations: { material: true, reservation: true },
    });
    if (!reservationMaterial) {
      throw new Error("Le reservation material n'existe pas");
    }
    return reservationMaterial;
  }
  async createResMat(data: {
    reservation: Reservation;
    quantity: number;
    material: {
      id: string;
    };
  }) {
    const newReservationMaterial = this.db.create({ ...data });

    const reservationmaterial = await this.db.save(newReservationMaterial);

    return await this.findReservationMaterial(reservationmaterial.id);
  }
}
