import React, { useState } from 'react';
import { FLOWERS, CATEGORIES } from '../data/flowers';
import FlowerSVG from '../components/FlowerSVG';

export default function ShopPage({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [addedIds, setAddedIds] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = FLOWERS.filter(f =>
    (activeCategory === 'all' || f.category === activeCategory) &&
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = (flower) => {
    addToCart(flower);
    setAddedIds(prev => ({ ...prev, [flower.id]: true }));
    setTimeout(() => setAddedIds(prev => ({ ...prev, [flower.id]: false })), 1500);
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--lavender-50), var(--lavender-200))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--lavender-200)',
      }}>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--lavender-500)', fontWeight: 600, marginBottom: '0.8rem' }}>
          Handcrafted Collection
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '1rem' }}>
          Our Flower Shop
        </h1>
        <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
          Each flower is hand-twisted with premium pipe cleaners. Pick your favourites and add them to cart!
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Search + Filter */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="🔍 Search flowers..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              flex: 1, minWidth: '200px',
              padding: '12px 18px',
              borderRadius: '50px',
              border: '1.5px solid var(--lavender-300)',
              background: 'white',
              fontSize: '0.9rem',
              outline: 'none',
              color: 'var(--text-dark)',
            }}
          />
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '50px',
                  border: activeCategory === cat ? 'none' : '1.5px solid var(--lavender-300)',
                  background: activeCategory === cat
                    ? 'linear-gradient(135deg, var(--lavender-400), var(--lavender-600))'
                    : 'white',
                  color: activeCategory === cat ? 'white' : 'var(--text-mid)',
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div style={{ marginBottom: '1.5rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>
          Showing {filtered.length} flower{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-light)', fontSize: '1.1rem' }}>
            No flowers found. Try a different search! 🌸
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.8rem',
          }}>
            {filtered.map(flower => {
              const added = addedIds[flower.id];
              return (
                <div
                  key={flower.id}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1.5px solid var(--lavender-200)',
                    boxShadow: '0 4px 20px rgba(155,126,200,0.08)',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    cursor: 'default',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = '0 16px 45px rgba(155,126,200,0.18)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,126,200,0.08)';
                  }}
                >
                  {/* Category badge */}
                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    background: 'var(--lavender-100)',
                    color: 'var(--lavender-600)',
                    fontSize: '0.7rem', fontWeight: 600,
                    padding: '3px 10px', borderRadius: '50px',
                    textTransform: 'capitalize',
                  }}>{flower.category}</div>

                  {/* Flower SVG */}
                  <div style={{
                    marginBottom: '1.2rem',
                    display: 'flex', justifyContent: 'center',
                    height: '100px', alignItems: 'center',
                    animation: 'float 4s ease-in-out infinite',
                  }}>
                    <FlowerSVG type={flower.svg} color={flower.color} size={85} />
                  </div>

                  <h3 style={{
                    fontFamily: 'Cormorant Garamond',
                    fontSize: '1.3rem',
                    color: 'var(--text-dark)',
                    marginBottom: '0.4rem',
                  }}>{flower.name}</h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-light)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    {flower.description}
                  </p>

                  <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--lavender-600)', marginBottom: '1.2rem' }}>
                    ₹{flower.price}
                  </div>

                  <button
                    onClick={() => handleAdd(flower)}
                    style={{
                      width: '100%',
                      padding: '11px',
                      borderRadius: '50px',
                      border: 'none',
                      background: added
                        ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                        : 'linear-gradient(135deg, var(--lavender-400), var(--lavender-600))',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      transition: 'all 0.3s',
                      transform: added ? 'scale(0.98)' : 'scale(1)',
                    }}
                  >
                    {added ? '✓ Added to Cart!' : '+ Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
