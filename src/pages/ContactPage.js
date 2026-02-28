import React, { useState } from 'react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi Shruti! I'm ${form.name}.\n\n${form.message}\n\nMy phone: ${form.phone}`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    setSent(true);
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--lavender-50), var(--lavender-200))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--lavender-200)',
      }}>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '1rem' }}>
          Get in Touch
        </h1>
        <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
          Have a custom order in mind? Want to know more? We'd love to hear from you!
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Contact info */}
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2rem', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '2rem' }}>
            Let's Connect
          </h2>
          {[
            { icon: '📱', label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210' },
            { icon: '📸', label: 'Instagram', value: '@velvetnvine', href: 'https://instagram.com/velvetnvine' },
            { icon: '📍', label: 'Location', value: 'Tamil Nadu, India', href: null },
          ].map(({ icon, label, value, href }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '1.2rem',
              marginBottom: '1.5rem',
              padding: '1.2rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid var(--lavender-200)',
              boxShadow: '0 2px 10px rgba(155,126,200,0.06)',
            }}>
              <div style={{
                width: 50, height: 50,
                background: 'linear-gradient(135deg, var(--lavender-100), var(--lavender-200))',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', flexShrink: 0,
              }}>{icon}</div>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--lavender-600)', fontWeight: 600, fontSize: '1rem' }}>{value}</a>
                  : <div style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{value}</div>
                }
              </div>
            </div>
          ))}

          <div style={{
            background: 'linear-gradient(135deg, var(--lavender-100), var(--lavender-200))',
            borderRadius: '16px',
            padding: '1.5rem',
            textAlign: 'center',
            marginTop: '2rem',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏰</div>
            <div style={{ fontWeight: 600, color: 'var(--text-dark)', marginBottom: '0.3rem' }}>Response Time</div>
            <div style={{ color: 'var(--text-mid)', fontSize: '0.9rem' }}>Usually within a few hours on WhatsApp!</div>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          border: '1px solid var(--lavender-200)',
          boxShadow: '0 4px 20px rgba(155,126,200,0.1)',
        }}>
          <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', color: 'var(--text-dark)', marginBottom: '1.5rem', fontWeight: 400 }}>
            Send a Message
          </h3>
          <form onSubmit={handleSubmit}>
            {[
              { key: 'name', label: 'Your Name', placeholder: 'Priya Sharma', type: 'text' },
              { key: 'phone', label: 'Phone / WhatsApp', placeholder: '+91 9876543210', type: 'tel' },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key} style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '0.4rem' }}>
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1.5px solid var(--lavender-200)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: 'var(--text-dark)',
                    background: 'var(--lavender-50)',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--lavender-400)'}
                  onBlur={e => e.target.style.borderColor = 'var(--lavender-200)'}
                />
              </div>
            ))}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-mid)', marginBottom: '0.4rem' }}>
                Your Message
              </label>
              <textarea
                placeholder="Tell us about your dream bouquet, occasion, colour preferences..."
                value={form.message}
                onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--lavender-200)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  color: 'var(--text-dark)',
                  background: 'var(--lavender-50)',
                  resize: 'vertical',
                  fontFamily: 'Inter, sans-serif',
                  boxSizing: 'border-box',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--lavender-400)'}
                onBlur={e => e.target.style.borderColor = 'var(--lavender-200)'}
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '50px',
                border: 'none',
                background: sent
                  ? 'linear-gradient(135deg, #25D366, #128C7E)'
                  : 'linear-gradient(135deg, var(--lavender-500), var(--lavender-700))',
                color: 'white',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 6px 25px rgba(155,126,200,0.3)',
              }}
            >
              {sent ? '✓ Opening WhatsApp...' : '📱 Send via WhatsApp'}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
