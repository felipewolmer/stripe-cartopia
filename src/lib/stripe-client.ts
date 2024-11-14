import { loadStripe } from "@stripe/stripe-js";

const getStripePublicKey = () => {
  const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  if (!key) {
    console.error("Stripe public key not found. Please set VITE_STRIPE_PUBLIC_KEY in your environment variables.");
    return "pk_test_dummy"; // This will cause Stripe to fail gracefully with a proper error message
  }
  return key;
};

export const stripe = loadStripe(getStripePublicKey());