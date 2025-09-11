import Link from 'next/link';
import Layout from "../layouts/Main";
import { useEffect } from 'react';
// Remove the import statement
// import { initializeSDK } from '@pier39/web-sdk';

// Use require instead
// ts-ignore
// const { initializeSDK } = require('pier39-web-sdk');

// console.log('initializeSDK', initializeSDK);

// const sdk = initializeSDK({
//   storeId: 'cdc94fec-19fd-49d9-bc08-a1b7b615f7dd',
//   isTestMode: false,
//   environment: 'development',
// });

const ThankYouPage = () => {
  const orderNumber = '#2024-0123';
  const customerEmail = 'customer@example.com';

  useEffect(() => {
    // Check if P39 is available in the window object
    if (typeof window !== 'undefined' && (window as any).P39) {
      console.log('P39', (window as any).P39);
      (window as any).P39.showPlacement('d812af97-3bf7-43d4-bf5f-e212369dfddc',{
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
            <h3 className="cart__title">Thank you for your order!</h3>
          </div>

          <div className="block">
            <div style={{ textAlign: 'center', padding: '2rem', gap: '10px' }}>
              <h2 style={{ fontSize: '20px', marginBottom: '2rem' }}>Order Confirmed</h2>
              <p style={{ fontSize: '20px', marginBottom: '2rem' }}>Order number: {orderNumber}</p>
              <p style={{ fontSize: '16px', marginBottom: '2rem' }}>We'll send you a confirmation email with your order details.</p>

              <div id="persona" style={{ width: '600px', height: '400px' }}></div>
              
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
