'use client';

import { useEffect, useState } from 'react';
import PurchaseButton from '../components/PurchaseButton';

export default function Numbers() {
  const [numbers, setNumbers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNumbers() {
      try {
        const response = await fetch('/api/credits');
        const result = await response.json();

        if (response.ok) {
          setNumbers(result.data);
          console.log('results ', result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchNumbers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const postCredit = async () => {
    try {
      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credits: 25,
          user_id: 'aaaaa',
        }),
      });
      const result = await response.json();

      if (response.ok) {
        console.log('results ', result.data);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Numbers</h1>
      <PurchaseButton priceId="price_1QN1IRDI0RvtAJPNX27cZCRq" />
      <button onClick={postCredit}>post credit row</button>
    </div>
  );
}
