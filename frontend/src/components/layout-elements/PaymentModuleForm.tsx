import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

function PaymentModuleForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_FRONT_URL}/payment/success`,
      },
    });

    if (result.error) {
      // window.location.href = `${process.env.NEXT_PUBLIC_FRONT_URL}/payment/canceled`;
      console.log(result.error.message);
    }
  };
  const deleteLS = () => {
    localStorage.removeItem("reservation");
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        onClick={deleteLS}
        disabled={!stripe || !elements}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
      >
        {stripe || elements ? "Procéder au paiement" : "Veuillez patienter"}
      </button>
    </form>
  );
}

export default PaymentModuleForm;
