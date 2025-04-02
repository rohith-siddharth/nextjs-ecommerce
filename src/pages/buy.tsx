import Link from 'next/link';
import Layout from "../layouts/Main";
import { useEffect } from 'react';


const ThankYouPage = () => {
  const orderNumber = '#2024-0123';
  const customerEmail = 'customer@example.com';
  const orderTotal = 100; // Replace with actual order total

  useEffect(() => {
    // Check if P39 is available the window object
    if (typeof window !== 'undefined' && (window as any).P39) {
      (window as any).P39.showPlacement({
        email: customerEmail,
        // any other attributes you want to pass
      });
    }

    // Cleanup function to remove placement when component unmounts
    // return () => {
    //   if (typeof window !== 'undefined' && (window as any).P39) {
    //     (window as any).P39.removePlacement();
    //   }
    // };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <Layout>
      <section className="cart">
        <div className="container">
          <div className="cart__intro">
            <h3 className="cart__title">Thank you</h3>
          </div>

          <div className="block">
            <div style={{ textAlign: 'center', padding: '2rem', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '2rem' }}>Order Confirmed</h2>
              <p style={{ fontSize: '20px', marginBottom: '2rem' }}>Order number: {orderNumber}</p>
              <p style={{ fontSize: '16px', marginBottom: '2rem' }}>We'll send you a confirmation email with your order details.</p>
              
              <div style={{ marginTop: '3rem' }}>
                <Link href="/" className="btn btn--rounded btn--yellow">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYouPage;
