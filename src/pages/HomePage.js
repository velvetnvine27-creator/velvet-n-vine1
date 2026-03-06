import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FlowerSVG from '../components/FlowerSVG';

function FloatingFlower({ type, color, size, x, y, delay, duration }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      animation: `float ${duration}s ease-in-out ${delay}s infinite`,
      opacity: 0.35,
      pointerEvents: 'none',
    }}>
      <FlowerSVG type={type} color={color} size={size} />
    </div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const floatingFlowers = [
    { type: 'rose', color: '#f9a8d4', size: 55, x: 5, y: 15, delay: 0, duration: 5 },
    { type: 'daisy', color: '#ffffff', size: 45, x: 90, y: 10, delay: 1, duration: 6 },
    { type: 'tulip', color: '#a78bfa', size: 50, x: 12, y: 65, delay: 0.5, duration: 7 },
    { type: 'lily', color: '#c084fc', size: 48, x: 85, y: 70, delay: 2, duration: 5.5 },
    { type: 'lavender', color: '#8b5cf6', size: 42, x: 50, y: 5, delay: 1.5, duration: 6.5 },
    { type: 'carnation', color: '#fb923c', size: 40, x: 78, y: 40, delay: 0.3, duration: 4.8 },
  ];

  const testimonials = [
    { name: 'Dhanush S', text: 'Absolutely gorgeous! The pink rose bouquet is perfect — my room smells fresh just seeing it!', stars: 5 },
    { name: 'Saai Kumaran', text: 'Got a custom bouquet for my mom\'s birthday. She cried — in the best way. Worth every rupee!', stars: 5 },
    { name: 'Rohan S.', text: 'These last forever! Real flowers die but these just get more beautiful with time.', stars: 5 },
  ];

  return (
    <div>
      {/* Hero */}
      <section ref={heroRef} style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f0ff 0%, #ede5ff 40%, #e8d5f5 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '70px',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200,180,232,0.3), transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.2), transparent 70%)',
        }} />

        {/* Floating flowers */}
        {floatingFlowers.map((f, i) => <FloatingFlower key={i} {...f} />)}

        <div style={{
          maxWidth: '1200px', margin: '0 auto', padding: '2rem',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          alignItems: 'center', gap: '4rem', width: '100%',
        }}>
          {/* Text */}
          <div style={{
            animation: visible ? 'fadeUp 0.8s ease forwards' : 'none',
            opacity: visible ? 1 : 0,
          }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(200,180,232,0.3)',
              border: '1px solid rgba(200,180,232,0.5)',
              borderRadius: '50px',
              padding: '6px 18px',
              fontSize: '0.8rem',
              color: 'var(--lavender-700)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '1.5rem',
            }}>✨ Handcrafted with Love</div>

            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 7vw, 5.5rem)',
              fontWeight: 300,
              lineHeight: 1.1,
              color: 'var(--text-dark)',
              marginBottom: '1.5rem',
            }}>
              Flowers That<br />
              <em style={{ color: 'var(--lavender-600)', fontStyle: 'italic' }}>Never Fade.</em>
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-mid)',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              maxWidth: '440px',
            }}>
              Exquisite pipe cleaner bouquets, twisted and sculpted by hand. 
              Each petal crafted with intention — because beautiful things should last forever.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/shop" style={{
                background: 'linear-gradient(135deg, var(--lavender-500), var(--lavender-700))',
                color: 'white',
                padding: '15px 36px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                boxShadow: '0 8px 30px rgba(155,126,200,0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
              >
                Shop Now →
              </Link>
              <Link to="/bouquet-builder" style={{
                background: 'transparent',
                color: 'var(--lavender-600)',
                padding: '15px 36px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                border: '2px solid var(--lavender-400)',
                transition: 'all 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { e.target.style.background = 'var(--lavender-100)'; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                🌸 Build a Bouquet
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem' }}>
              {[['200+', 'Happy Customers'], ['50+', 'Flower Types'], ['100%', 'Handmade']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontSize: '1.8rem', fontFamily: 'Cormorant Garamond', fontWeight: 600, color: 'var(--lavender-600)' }}>{num}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual */}
          <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            animation: visible ? 'fadeUp 0.8s 0.3s ease both' : 'none',
          }}>
            <div style={{
              width: '380px', height: '380px',
              background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.8), rgba(220,190,255,0.4))',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 20px 80px rgba(155,126,200,0.3)',
              border: '1px solid rgba(200,180,232,0.4)',
              animation: 'float 6s ease-in-out infinite',
            }}>
              {/* Central big flower arrangement */}
              <div style={{ fontSize: '120px', filter: 'drop-shadow(0 8px 20px rgba(155,126,200,0.4))' }}>💐</div>
              {/* Orbiting flowers */}
              {[
                { type: 'rose', color: '#f9a8d4', size: 50, angle: 0 },
                { type: 'lily', color: '#c084fc', size: 45, angle: 72 },
                { type: 'daisy', color: '#fbbf24', size: 42, angle: 144 },
                { type: 'tulip', color: '#a78bfa', size: 48, angle: 216 },
                { type: 'sunflower', color: '#fbbf24', size: 46, angle: 288 },
              ].map(({ type, color, size, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const orbitR = 150;
                return (
                  <div key={type} style={{
                    position: 'absolute',
                    left: '50%', top: '50%',
                    transform: `translate(calc(-50% + ${Math.cos(rad) * orbitR}px), calc(-50% + ${Math.sin(rad) * orbitR}px))`,
                    animation: `float ${4 + angle / 100}s ease-in-out ${angle / 200}s infinite`,
                  }}>
                    <FlowerSVG type={type} color={color} size={size} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section style={{
        background: 'linear-gradient(135deg, var(--lavender-600), var(--lavender-800))',
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap',
      }}>
        {[
          ['🌿', 'Everlasting', 'Never wilts, never fades'],
          ['✋', 'Handcrafted', 'Every petal twisted by hand'],
          ['🎁', 'Gift Ready', 'Beautifully packaged'],
          ['💜', 'Custom Orders', 'Design your dream bouquet'],
        ].map(([icon, title, sub]) => (
          <div key={title} style={{ textAlign: 'center', color: 'white', minWidth: '160px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{icon}</div>
            <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{title}</div>
            <div style={{ opacity: 0.7, fontSize: '0.8rem' }}>{sub}</div>
          </div>
        ))}
      </section>

      {/* Best Sellers Preview */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--lavender-500)', fontWeight: 600, marginBottom: '0.8rem',
          }}>Our Collection</div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: 'var(--text-dark)', fontWeight: 300 }}>
            Best Loved Flowers
          </h2>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '2rem',
        }}>
          {[
            { type: 'rose', color: '#f9a8d4', name: 'Pink Rose', price: 120, badge: '❤️ Most Loved' },
            { type: 'lily', color: '#c084fc', name: 'Lavender Lily', price: 150, badge: '✨ Bestseller' },
            { type: 'sunflower', color: '#fbbf24', name: 'Sunflower', price: 110, badge: '🌟 Popular' },
            { type: 'tulip', color: '#a78bfa', name: 'Purple Tulip', price: 100, badge: '💜 Fan Fav' },
          ].map(({ type, color, name, price, badge }) => (
            <div key={name} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              textAlign: 'center',
              border: '1px solid var(--lavender-200)',
              boxShadow: '0 4px 20px rgba(155,126,200,0.1)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 50px rgba(155,126,200,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,126,200,0.1)';
            }}
            >
              <div style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'var(--lavender-100)',
                color: 'var(--lavender-700)',
                fontSize: '0.72rem', fontWeight: 600,
                padding: '4px 10px', borderRadius: '50px',
              }}>{badge}</div>
              <div style={{ marginBottom: '1.5rem', animation: 'float 5s ease-in-out infinite' }}>
                <FlowerSVG type={type} color={color} size={90} />
              </div>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>
                {name}
              </h3>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--lavender-600)', marginBottom: '1.2rem' }}>
                ₹{price}
              </div>
              <Link to="/shop" style={{
                display: 'block',
                background: 'linear-gradient(135deg, var(--lavender-300), var(--lavender-500))',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '50px',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}>View in Shop</Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/shop" style={{
            color: 'var(--lavender-600)',
            fontWeight: 600,
            fontSize: '1rem',
            borderBottom: '2px solid var(--lavender-300)',
            paddingBottom: '2px',
          }}>
            View All Flowers →
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--lavender-50), var(--lavender-100))',
        padding: '6rem 2rem',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🌸</div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
            A Little About Us
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--text-mid)', marginBottom: '1rem' }}>
            Velvet n Vine was born from a simple love — the love of flowers that stay. 
            Every bouquet is twisted, shaped, and sculpted entirely by hand using premium pipe cleaners.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.9, color: 'var(--text-mid)' }}>
            These aren't just flowers. They're memories that never fade, milestones that never wilt, 
            and tokens of love that last a lifetime.
          </p>
          <div style={{ marginTop: '2rem', fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--lavender-600)' }}>
            — Made with love, in Chennai 💜
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '6rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300, color: 'var(--text-dark)' }}>
            What Our Customers Say
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {testimonials.map(({ name, text, stars }) => (
            <div key={name} style={{
              background: 'white',
              borderRadius: '20px',
              padding: '2rem',
              border: '1px solid var(--lavender-200)',
              boxShadow: '0 4px 20px rgba(155,126,200,0.08)',
              position: 'relative',
            }}>
              <div style={{ fontSize: '2rem', color: 'var(--lavender-300)', fontFamily: 'serif', position: 'absolute', top: '1rem', right: '1.5rem' }}>"</div>
              <div style={{ color: '#fbbf24', fontSize: '1.1rem', marginBottom: '1rem' }}>{'★'.repeat(stars)}</div>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>"{text}"</p>
              <div style={{ fontWeight: 600, color: 'var(--lavender-700)', fontSize: '0.9rem' }}>— {name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: 'linear-gradient(135deg, var(--lavender-500), var(--lavender-800))',
        padding: '5rem 2rem',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Cormorant Garamond',
          fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
          fontWeight: 300,
          color: 'white',
          marginBottom: '1rem',
        }}>
          Ready to Build Your Perfect Bouquet?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
          Pick from our collection or design something uniquely yours.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" style={{
            background: 'white',
            color: 'var(--lavender-700)',
            padding: '15px 36px',
            borderRadius: '50px',
            fontWeight: 700,
            fontSize: '1rem',
          }}>Shop Single Flowers</Link>
          <Link to="/bouquet-builder" style={{
            background: 'transparent',
            color: 'white',
            padding: '15px 36px',
            borderRadius: '50px',
            fontWeight: 600,
            fontSize: '1rem',
            border: '2px solid rgba(255,255,255,0.6)',
          }}>🌸 Build a Bouquet</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--lavender-800)',
        color: 'rgba(255,255,255,0.7)',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.5rem', color: 'white', marginBottom: '0.5rem' }}>
          Velvet n Vine
        </div>
        <div style={{ fontSize: '0.8rem', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.5)' }}>by Shruti</div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <a href="https://wa.me/918056024034" style={{ color: 'rgba(255,255,255,0.7)' }}>📱 WhatsApp</a>
          <a href="https://instagram.com/velvetnvine" style={{ color: 'rgba(255,255,255,0.7)' }}>📸 Instagram</a>
          <Link to="/contact" style={{ color: 'rgba(255,255,255,0.7)' }}>✉️ Contact</Link>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
          © 2025 Velvet n Vine by Shruti · Made with 💜 in Chennai
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
