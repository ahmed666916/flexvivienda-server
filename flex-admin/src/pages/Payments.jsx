import {loadStripe} from "@stripe/stripe-js";
import {Elements, useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import api from "../api/axios";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function CheckoutInner(){
  const stripe = useStripe(); const elements = useElements();
  const create = async () => {
    const {data} = await api.post("/payments/intent", {amount: 10000}); // $100
    await elements.update({clientSecret: data.clientSecret});
  };
  const pay = async (e) => {
    e.preventDefault();
    const {error} = await stripe.confirmPayment({elements, confirmParams:{}});
    if (error) alert(error.message); else alert("Paid!");
  };
  return (
    <div className="max-w-md">
      <button className="btn btn-outline mb-2" onClick={create}>Create intent</button>
      <form onSubmit={pay}>
        <PaymentElement />
        <button className="btn btn-primary mt-3">Pay</button>
      </form>
    </div>
  );
}

export default function Payments(){
  return <Elements stripe={stripePromise}><CheckoutInner/></Elements>
}
