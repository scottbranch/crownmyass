'use client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
type props = {
  priceId: string;
};
const PurchaseButton = ({ priceId }: props) => {
  const handleSubmit = async () => {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
    );
    if (!stripe) {
      return;
    }
    try {
      const response = await axios.post('/api/stripe/checkout', {
        priceId: priceId,
      });
      const data = response.data;
      if (!data.ok) throw new Error('Something went wrong');
      await stripe.redirectToCheckout({
        sessionId: data.result.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button onClick={handleSubmit}>Add Credits</button>
    </div>
  );
};
export default PurchaseButton;
