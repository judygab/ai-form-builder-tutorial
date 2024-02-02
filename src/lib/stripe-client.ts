import {
  loadStripe,
  Stripe,
} from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env
        .NEXT_PUBLIC_PUBLISHABLE_KEY ??
        ""
    );
  }

  return stripePromise;
};
