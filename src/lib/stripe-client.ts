import { loadStripe } from "@stripe/stripe-js";

const getStripePublicKey = () => {
  const key = "pk_test_zqyBP0UemQHWUZ95nnVYKFNz00ZuJ8p9Lb";
  return key;
};

export const stripe = loadStripe(getStripePublicKey());