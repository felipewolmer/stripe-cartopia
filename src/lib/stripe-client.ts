import { loadStripe } from "@stripe/stripe-js";

const getStripePublicKey = () => {
  const key = "pk_test_zqyBP0UemQHWUZ95nnVYKFNz00ZuJ8p9Lb";
  if (!key) {
    throw new Error('Stripe public key is not configured');
  }
  return key;
};

export const stripe = loadStripe(getStripePublicKey()).catch(error => {
  console.error('Error loading Stripe:', error);
  throw error;
});