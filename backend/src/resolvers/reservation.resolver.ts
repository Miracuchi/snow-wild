import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Reservation, {
  CreateReservationInput,
  ReservationDeleted,
} from "../entities/reservation.entity";
import ReservationService from "../services/reservation.service";
import ReservationMaterialService from "../services/reservation_material.service";

@Resolver()
export default class ReservationResolver {
  @Query(() => [Reservation])
  async reservations() {
    return await new ReservationService().listReservations();
  }

  // Create Query to get One Reaservation by ID

  // Create Query to get One Reaservation by ID user

  // Create Mutaion add one reseervation

  @Mutation(() => Reservation) //prévoir un object type de retour
  async createReservation(
    @Arg("data") data: CreateReservationInput
  ): Promise<Reservation> {
    const newReservation = await new ReservationService().createReservation(
      data
    );
    const materialsPromises = data.materials.map((material) => {
      const dataToResMat = {
        reservation: newReservation, //  {id: ...}
        quantity: material.quantity,
        material: { id: material.materialId },
      };
      return new ReservationMaterialService().createResMat(dataToResMat);
    });

    const reservationMaterials = await Promise.all(materialsPromises);

    newReservation.reservationMaterials = reservationMaterials;
    return newReservation;
  }

  @Mutation(() => ReservationDeleted)
  async deleteReservation(@Arg("id") id: string) {
    const { id: idReservation, ...reservation } =
      await new ReservationService().deleteReservation(id);
    console.log("BUEEEENO", reservation);

    return { ...reservation };
  }
}
