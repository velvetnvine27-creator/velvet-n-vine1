import React from 'react';
import { Link } from 'react-router-dom';
import FlowerSVG from '../components/FlowerSVG';

export default function CartPage({ cart, removeFromCart, clearCart }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to order from Velvet n Vine:\n\n` +
    cart.map(item => `• ${item.name} × ${item.qty} = ₹${item.price * item.qty}`).join('\n') +
    `\n\nTotal: ₹${total}\n\nPlease confirm availability!`
  );

  if (cart.length === 0) {
    return (
      <div style={{
        paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: '2rem',
      }}>
        <div style={{ fontSize: '5rem', marginBottom: '1.5rem', animation: 'float 4s ease-in-out infinite' }}>🛍️</div>
        <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.5rem', color: 'var(--text-dark)', marginBottom: '1rem', fontWeight: 300 }}>
          Your cart is empty
        </h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem', fontSize: '1.05rem' }}>
          Discover our beautiful handcrafted flowers!
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link to="/shop" style={{
            background: 'linear-gradient(135deg, var(--lavender-500), var(--lavender-700))',
            color: 'white', padding: '14px 32px', borderRadius: '50px',
            fontWeight: 600, fontSize: '1rem',
          }}>Shop Now</Link>
          <Link to="/bouquet-builder" style={{
            border: '2px solid var(--lavender-400)',
            color: 'var(--lavender-600)', padding: '14px 32px', borderRadius: '50px',
            fontWeight: 600, fontSize: '1rem',
          }}>Build a Bouquet</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--lavender-50), var(--lavender-200))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--lavender-200)',
      }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-dark)' }}>
          Your Cart
        </h1>
        <p style={{ color: 'var(--text-mid)', marginTop: '0.5rem' }}>
          {cart.length} item{cart.length !== 1 ? 's' : ''} ready to bloom 🌸
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Cart items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          {cart.map(item => (
            <div key={item.cartId} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '1.5rem',
              border: '1px solid var(--lavender-200)',
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              boxShadow: '0 2px 12px rgba(155,126,200,0.08)',
            }}>
              <div style={{ flexShrink: 0 }}>
                {item.svg
                  ? <FlowerSVG type={item.svg} color={item.color} size={60} />
                  : <div style={{ fontSize: '3.5rem' }}>{item.emoji || '💐'}</div>
                }
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', color: 'var(--text-dark)', marginBottom: '0.3rem' }}>
                  {item.name}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '0.3rem' }}>
                  {item.description}
                </p>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--lavender-600)' }}>
                  ₹{item.price} × {item.qty} = <span style={{ color: 'var(--lavender-700)' }}>₹{item.price * item.qty}</span>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.cartId)}
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  background: '#fee2e2',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >✕</button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid var(--lavender-200)',
          boxShadow: '0 4px 20px rgba(155,126,200,0.1)',
        }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            Order Summary
          </h3>
          {cart.map(item => (
            <div key={item.cartId} style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '0.6rem', fontSize: '0.9rem', color: 'var(--text-mid)',
            }}>
              <span>{item.name} × {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <div style={{
            borderTop: '2px solid var(--lavender-100)',
            marginTop: '1rem', paddingTop: '1rem',
            display: 'flex', justifyContent: 'space-between',
            fontSize: '1.3rem', fontWeight: 700, color: 'var(--lavender-700)',
          }}>
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div style={{ marginTop: '0.8rem', padding: '0.8rem', background: 'var(--lavender-50)', borderRadius: '10px', fontSize: '0.82rem', color: 'var(--text-mid)' }}>
            📦 Delivery charges as applicable · 🤝 Payment on delivery
          </div>

          <a
            href={`https://wa.me/918056024034?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              marginTop: '1.5rem',
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: 'white',
              padding: '16px',
              borderRadius: '50px',
              textAlign: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 6px 25px rgba(37,211,102,0.3)',
            }}
          >
            📱 Order via WhatsApp
          </a>

          <button
            onClick={clearCart}
            style={{
              display: 'block', width: '100%',
              marginTop: '0.8rem',
              background: 'transparent',
              color: 'var(--text-light)',
              padding: '12px',
              borderRadius: '50px',
              border: '1px solid var(--lavender-200)',
              fontSize: '0.9rem',
              cursor: 'pointer',
            }}
          >Clear Cart</button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/shop" style={{ color: 'var(--lavender-600)', fontWeight: 500 }}>← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}
