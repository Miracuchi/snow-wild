/**-----------------------
 * *   Page de paiement (Payment Page)
 *  L'idée ici est de simuler une situation de panier à payer.
 * Gardez à l'esprit que vous ne devrez JAMAIS vous fier au calcul du front pour demander à stripe une instance
 * de paiement.
 * Dans l'ordre, vous calculerez ici le montant total pour que le client ait un visuel dessus.
 * Puis, vous enverrez à votre back la quantité et la référence (l'id par exemple) à votre back.
 * Et votre back RECALCULERA le montant total à partir de là.
 * Puis, votre back demandera à Stripe de générer une instance de paiement via son API.
 * Il faut installer cette fois ces modules sur le front :
 * npm install --save @stripe/react-stripe-js @stripe/stripe-js
 * Il nous faut utiliser la clé publique que stripe vous fourni.
 * Je mets ça dans notre fichier d'environnement.
 *
 * Pour illustrer l'exemple, j'ai prévu un faux panier json que je partagerai avec le back et le front.
 *
 * Il faut installer le module de stripe côté BACKEND (attention) => npm i stripe
 * La clé secrète de stripe obtenue depuis le dashboard stripe doit également être côté backend
 *
 *------------------------**/
import { useCart } from "@/contexts/CartContext";
import { formatMoney } from "@/lib/utilities";
import { CREATE_SESSION } from "@/requetes/queries/payment.queries";
import { Reservation } from "@/types/reservation";
import PaymentModule from "@/user/components/payment-stripe/PaymentModule";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

interface Prices {
  subtotal: number;
  totalTax: number;
  shipping: number;
  total: number;
}

function ReservationPaiementStep() {
  const { addToCart, cart, removeFromCart } = useCart();
  const reservationId = localStorage.getItem("reservationId");
  const reservationObject = localStorage.getItem("reservation");
  const usableReservationObject: Reservation =
    reservationObject && JSON.parse(reservationObject);

  const calculatePrices = (): Prices => {
    const taxRate = 0.2; // 20% taxe par défaut
    const shippingCost = 0.0; // frais d'envoi par défaut

    const subtotal =
      cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0) ||
      usableReservationObject.reservationMaterials.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

    const totalTax = subtotal * taxRate;
    const total = subtotal + totalTax + shippingCost;

    return {
      subtotal,
      totalTax,
      shipping: shippingCost,
      total,
    };
  };
  const prices = calculatePrices();

  const [getStripeSession, { data }] = useLazyQuery(CREATE_SESSION);
  console.log(data);

  const handleGetStripeSession = () => {
    getStripeSession({
      variables: {
        data:
          cart.length > 0
            ? cart.map(({ id, quantity }) => ({ id, quantity }))
            : usableReservationObject.reservationMaterials.map((item) => ({
                id: item.material.id,
                quantity: item.quantity,
              })),
        reservationId:
          cart.length > 0 ? reservationId : usableReservationObject.id,
      },
      onError(error) {
        console.log(error);
      },
    });
  };
  useEffect(() => {
    handleGetStripeSession();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24">
      <div className=" h-screen w-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl text-neutral-950 font-bold mb-4">Panier</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-lg border-4 border-blue-300 p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Size</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Quantity</th>
                      <th className="text-left font-semibold">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((d) => (
                      <tr key={d.id}>
                        <td className="py-4">
                          <div className="flex items-center">
                            {/*<img className="object-cover h-full " src={d.picture} alt={d.name} />*/}
                            <span className="font-semibold">{d.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center">
                            {/*<img className="object-cover h-full " src={d.picture} alt={d.name} />*/}
                            <span className="font-semibold">
                              {d.selectedSize}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">{formatMoney(d.price)}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="text-center w-8">
                              {d.quantity}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          {formatMoney(d.price * d.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tbody>
                    {usableReservationObject &&
                      usableReservationObject.reservationMaterials.map((d) => (
                        <tr key={d.id}>
                          <td className="py-4">
                            <div className="flex items-center">
                              {/*<img className="object-cover h-full " src={d.picture} alt={d.name} />*/}
                              <span className="font-semibold">
                                {d.material.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              {/*<img className="object-cover h-full " src={d.picture} alt={d.name} />*/}
                              <span className="font-semibold">{d.size}</span>
                            </div>
                          </td>
                          <td className="py-4">{formatMoney(d.price)}</td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <span className="text-center w-8">
                                {d.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="py-4">{formatMoney(d.price)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4 rounded-lg shadow-lg border-4 border-blue-300 ">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Résumé</h2>
                <div className="flex justify-between mb-2">
                  <span>Sous-total</span>
                  <span>{formatMoney(prices.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>{formatMoney(prices.totalTax)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Frais de livraison</span>
                  <span>{formatMoney(prices.shipping)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    {formatMoney(prices.total)}
                  </span>
                </div>

                <PaymentModule
                  clientSecret={data?.createSession?.client_secret}
                />

                {/* {cart.length > 0 && (
                  <PaymentModule
                    clientSecret={data?.createSession?.client_secret}
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ReservationPaiementStep;
