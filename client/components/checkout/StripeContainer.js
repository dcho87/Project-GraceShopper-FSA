import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51KQJrpBYSL4J9mPmBZhcQOmYxoPK2n26ip7oQmKKVlQPkWW045Zwgqmxhot6VfBRxX3TxvPQhJEnI14Lu2JPEckI00fgjL5Lcy";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}
