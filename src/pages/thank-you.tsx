import Link from 'next/link';
import Layout from "../layouts/Main";

const ThankYouPage = () => {
  const orderNumber = '#2024-0123';

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
