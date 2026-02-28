import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/bouquet-builder', label: 'Build a Bouquet' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(250,247,255,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(200,180,232,0.3)' : 'none',
      transition: 'all 0.3s ease',
      padding: '0 2rem',
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(135deg, var(--lavender-300), var(--lavender-500))',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '20px',
          }}>💐</div>
          <div>
            <div style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.2rem', fontWeight: 600,
              color: 'var(--lavender-700)',
              lineHeight: 1,
            }}>Velvet n Vine</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--text-light)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>by Shruti</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontSize: '0.9rem',
                fontWeight: location.pathname === link.to ? 600 : 400,
                color: location.pathname === link.to ? 'var(--lavender-600)' : 'var(--text-mid)',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s',
              }}
            >
              {link.label}
              {location.pathname === link.to && (
                <span style={{
                  position: 'absolute', bottom: -2, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, var(--lavender-400), var(--lavender-600))',
                  borderRadius: '1px',
                }} />
              )}
            </Link>
          ))}
          <Link to="/cart" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'linear-gradient(135deg, var(--lavender-300), var(--lavender-500))',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '50px',
            fontSize: '0.85rem',
            fontWeight: 500,
            position: 'relative',
          }}>
            🛍️ Cart
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: -8, right: -8,
                background: '#ef4444', color: 'white',
                borderRadius: '50%', width: 20, height: 20,
                fontSize: '0.7rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{cartCount}</span>
            )}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            fontSize: '1.5rem', color: 'var(--lavender-600)',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(250,247,255,0.98)',
          backdropFilter: 'blur(12px)',
          padding: '1rem 2rem 2rem',
          borderTop: '1px solid var(--lavender-200)',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                color: 'var(--text-dark)',
                borderBottom: '1px solid var(--lavender-100)',
                fontWeight: location.pathname === link.to ? 600 : 400,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/cart" onClick={() => setMenuOpen(false)} style={{
            display: 'block', marginTop: '1rem',
            background: 'linear-gradient(135deg, var(--lavender-400), var(--lavender-600))',
            color: 'white', padding: '12px', borderRadius: '8px',
            textAlign: 'center', fontWeight: 500,
          }}>
            🛍️ Cart ({cartCount})
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
