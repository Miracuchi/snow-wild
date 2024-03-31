import { Repository } from "typeorm";
import datasource from "../db";
import Reservation, {
  CreateReservationInput,
  StatutReservation,
} from "../entities/reservation.entity";

export default class ReservationService {
  db: Repository<Reservation>;
  constructor() {
    this.db = datasource.getRepository(Reservation);
  }

  async listReservations() {
    return this.db.find();
  }

  async find(id: string) {
    const reservation = await this.db.findOne({
      where: { id },
      relations: { reservationMaterials: true, user: true },
    });
    return reservation;
  }

  async createReservation(data: CreateReservationInput) {
    const { materials, ...otherData } = data;
    const total_price_by_row = materials.map((material) => {
      return material.unit_price * material.quantity;
    });

    function sum(accumulator: any, currentValue: any) {
      return accumulator + currentValue;
    }

    const final_price = total_price_by_row.reduce(sum);
    const dataIntermediaire = {
      ...otherData,
      final_price,
      statut: StatutReservation.AWAITING,
    };
    const newReservation = this.db.create({ ...dataIntermediaire });

    const creatResa = await this.db.save(newReservation);

    return creatResa;
  }

  async deleteReservation(id: string) {
    console.log("Hello World", id);

    const reservationToDelete = (await this.find(id)) as Reservation;
    console.log("HELLOOOOOOOOOOOOOOO: =====>", reservationToDelete);

    await this.db.remove(reservationToDelete);
    return { ...reservationToDelete, id };
  }
}
