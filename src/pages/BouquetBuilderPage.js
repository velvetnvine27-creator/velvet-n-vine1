import React, { useState, useRef, useCallback } from 'react';
import { FLOWERS, CATEGORIES } from '../data/flowers';
import FlowerSVG from '../components/FlowerSVG';

function DraggableFlower({ item, onDrag, onRemove }) {
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startItemPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startItemPos.current = { x: item.x, y: item.y };

    const onMouseMove = (e) => {
      if (!isDragging.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      onDrag(item.uid, startItemPos.current.x + dx, startItemPos.current.y + dy);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    startItemPos.current = { x: item.x, y: item.y };

    const onTouchMove = (e) => {
      const t = e.touches[0];
      const dx = t.clientX - startPos.current.x;
      const dy = t.clientY - startPos.current.y;
      onDrag(item.uid, startItemPos.current.x + dx, startItemPos.current.y + dy);
    };

    const onTouchEnd = () => {
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: item.x,
        top: item.y,
        cursor: 'grab',
        userSelect: 'none',
        animation: item.justAdded ? 'popIn 0.4s ease forwards' : 'none',
        transform: `rotate(${item.rotation}deg)`,
        zIndex: item.z,
        filter: 'drop-shadow(0 4px 8px rgba(100,70,150,0.25))',
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <FlowerSVG type={item.svg} color={item.color} size={item.size} />
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(item.uid); }}
        style={{
          position: 'absolute', top: -8, right: -8,
          width: 20, height: 20,
          background: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          fontSize: '0.65rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0,
          transition: 'opacity 0.2s',
          lineHeight: 1,
          padding: 0,
        }}
        className="remove-btn"
      >✕</button>
      <style>{`.remove-btn { opacity: 0; } div:hover > .remove-btn { opacity: 1 !important; }`}</style>
    </div>
  );
}

// Bouquet canvas with wrap + stem
function BouquetCanvas({ bouquetItems, onDrag, onRemove }) {
  const canvasRef = useRef(null);

  return (
    <div
      ref={canvasRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        background: 'linear-gradient(160deg, rgba(245,240,255,0.9) 0%, rgba(237,229,255,0.6) 100%)',
        borderRadius: '24px',
        border: '2px dashed var(--lavender-300)',
        overflow: 'hidden',
      }}
    >
      {/* Bouquet wrap decoration */}
      {bouquetItems.length > 0 && (
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
          <svg width="200" height="160" viewBox="0 0 200 160">
            {/* Wrap paper */}
            <path d="M60,20 L20,160 L180,160 L140,20 Z" fill="rgba(245,235,220,0.7)" />
            <path d="M60,20 L20,160 L100,140 Z" fill="rgba(230,220,205,0.5)" />
            <path d="M140,20 L180,160 L100,140 Z" fill="rgba(230,220,205,0.5)" />
            {/* Ribbon */}
            <path d="M85,130 Q100,125 115,130 L120,160 L80,160 Z" fill="rgba(200,180,232,0.8)" />
            <ellipse cx="100" cy="130" rx="18" ry="8" fill="rgba(167,139,250,0.7)" />
            {/* Bow loops */}
            <ellipse cx="80" cy="125" rx="12" ry="7" transform="rotate(-20,80,125)" fill="rgba(196,163,241,0.9)" />
            <ellipse cx="120" cy="125" rx="12" ry="7" transform="rotate(20,120,125)" fill="rgba(196,163,241,0.9)" />
            <circle cx="100" cy="125" r="5" fill="rgba(167,139,250,1)" />
          </svg>
        </div>
      )}

      {/* Flowers */}
      {bouquetItems.map(item => (
        <DraggableFlower
          key={item.uid}
          item={item}
          onDrag={onDrag}
          onRemove={onRemove}
        />
      ))}

      {/* Empty state */}
      {bouquetItems.length === 0 && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: 'var(--text-light)',
          pointerEvents: 'none',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.4 }}>💐</div>
          <div style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.6 }}>Add flowers to start your bouquet</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.4, marginTop: '0.5rem' }}>← Pick from the panel on the left</div>
        </div>
      )}
    </div>
  );
}

export default function BouquetBuilderPage({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [bouquetItems, setBouquetItems] = useState([]);
  const [uidCounter, setUidCounter] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [bouquetName, setBouquetName] = useState('');

  const filteredFlowers = FLOWERS.filter(f => activeCategory === 'all' || f.category === activeCategory);

  const addFlowerToBouquet = (flower) => {
    const uid = uidCounter;
    setUidCounter(c => c + 1);

    // Spiral placement for natural look
    const angle = (uid * 137.5 * Math.PI) / 180;
    const radius = 30 + uid * 15;
    const centerX = 180;
    const centerY = 150;
    const x = centerX + Math.cos(angle) * Math.min(radius, 120) - 30;
    const y = centerY + Math.sin(angle) * Math.min(radius, 80) - 30;

    const newItem = {
      uid,
      ...flower,
      x: Math.max(10, Math.min(340, x)),
      y: Math.max(10, Math.min(320, y)),
      rotation: Math.random() * 40 - 20,
      size: 55 + Math.random() * 20,
      z: uid + 10,
      justAdded: true,
    };

    setBouquetItems(prev => [...prev, newItem]);
    setTimeout(() => {
      setBouquetItems(prev => prev.map(item =>
        item.uid === uid ? { ...item, justAdded: false } : item
      ));
    }, 500);
  };

  const handleDrag = useCallback((uid, newX, newY) => {
    setBouquetItems(prev => prev.map(item =>
      item.uid === uid ? { ...item, x: newX, y: newY } : item
    ));
  }, []);

  const handleRemove = useCallback((uid) => {
    setBouquetItems(prev => prev.filter(item => item.uid !== uid));
  }, []);

  const clearBouquet = () => setBouquetItems([]);

  const totalPrice = bouquetItems.reduce((sum, item) => sum + item.price, 0);

  const handleOrderBouquet = () => {
    if (bouquetItems.length === 0) return;
    const bouquetProduct = {
      id: `bouquet-${Date.now()}`,
      name: bouquetName || 'Custom Bouquet',
      price: totalPrice + 100, // assembly fee
      emoji: '💐',
      color: '#c084fc',
      category: 'custom',
      description: `Custom bouquet with ${bouquetItems.length} flowers: ${bouquetItems.map(i => i.name).join(', ')}`,
    };
    addToCart(bouquetProduct);
    setOrderPlaced(true);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--lavender-100), var(--lavender-300))',
        padding: '4rem 2rem 3rem',
        textAlign: 'center',
        borderBottom: '1px solid var(--lavender-200)',
      }}>
        <div style={{ fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--lavender-700)', fontWeight: 600, marginBottom: '0.8rem' }}>
          Custom Bouquet Studio
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300, color: 'var(--text-dark)', marginBottom: '0.8rem' }}>
          Build Your Bouquet
        </h1>
        <p style={{ color: 'var(--text-mid)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
          Select flowers from the left, then drag them around on the canvas to create your perfect arrangement.
        </p>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '320px 1fr', gap: '2rem', alignItems: 'start' }}>

        {/* Left panel: flower picker */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          border: '1px solid var(--lavender-200)',
          boxShadow: '0 4px 20px rgba(155,126,200,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--lavender-100)' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', color: 'var(--text-dark)', marginBottom: '1rem' }}>
              🌸 Choose Flowers
            </h3>
            {/* Category filter */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '50px',
                    border: activeCategory === cat ? 'none' : '1px solid var(--lavender-300)',
                    background: activeCategory === cat
                      ? 'linear-gradient(135deg, var(--lavender-400), var(--lavender-600))'
                      : 'transparent',
                    color: activeCategory === cat ? 'white' : 'var(--text-mid)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Flower list */}
          <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.5rem' }}>
            {filteredFlowers.map(flower => (
              <div
                key={flower.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.75rem 1rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  marginBottom: '2px',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--lavender-50)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <FlowerSVG type={flower.svg} color={flower.color} size={44} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{flower.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--lavender-500)', fontWeight: 600 }}>₹{flower.price}</div>
                </div>
                <button
                  onClick={() => addFlowerToBouquet(flower)}
                  style={{
                    width: 32, height: 32,
                    borderRadius: '50%',
                    border: 'none',
                    background: 'linear-gradient(135deg, var(--lavender-400), var(--lavender-600))',
                    color: 'white',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >+</button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bouquet canvas */}
        <div>
          {/* Canvas */}
          <BouquetCanvas
            bouquetItems={bouquetItems}
            onDrag={handleDrag}
            onRemove={handleRemove}
          />

          {/* Instructions */}
          <div style={{
            display: 'flex', gap: '1.5rem', marginTop: '1rem',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {[['➕', 'Click + to add'], ['🖱️', 'Drag to rearrange'], ['✕', 'Hover & click X to remove']].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                <span>{icon}</span><span>{text}</span>
              </div>
            ))}
          </div>

          {/* Bouquet summary */}
          {bouquetItems.length > 0 && (
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '1.8rem',
              marginTop: '1.5rem',
              border: '1px solid var(--lavender-200)',
              boxShadow: '0 4px 20px rgba(155,126,200,0.1)',
            }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.4rem', marginBottom: '1.2rem', color: 'var(--text-dark)' }}>
                💐 Your Bouquet
              </h3>

              {/* Flower count summary */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                gap: '0.6rem', marginBottom: '1.5rem',
              }}>
                {Object.values(
                  bouquetItems.reduce((acc, item) => {
                    if (!acc[item.id]) acc[item.id] = { ...item, count: 0 };
                    acc[item.id].count++;
                    return acc;
                  }, {})
                ).map(({ id, name, color, svg, count, price }) => (
                  <div key={id} style={{
                    background: 'var(--lavender-50)',
                    borderRadius: '12px',
                    padding: '0.6rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    border: '1px solid var(--lavender-200)',
                  }}>
                    <FlowerSVG type={svg} color={color} size={28} />
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dark)', lineHeight: 1.2 }}>{name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>×{count} · ₹{price * count}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Name your bouquet */}
              <input
                type="text"
                placeholder="✏️ Name your bouquet (optional)"
                value={bouquetName}
                onChange={e => setBouquetName(e.target.value)}
                style={{
                  width: '100%', padding: '12px 18px',
                  borderRadius: '50px',
                  border: '1.5px solid var(--lavender-300)',
                  background: 'var(--lavender-50)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  color: 'var(--text-dark)',
                  marginBottom: '1.2rem',
                  boxSizing: 'border-box',
                }}
              />

              {/* Price breakdown */}
              <div style={{ borderTop: '1px solid var(--lavender-100)', paddingTop: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                  <span>Flowers ({bouquetItems.length})</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--text-mid)' }}>
                  <span>Assembly & wrapping</span>
                  <span>₹100</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: 'var(--lavender-700)', marginTop: '0.5rem', borderTop: '1px solid var(--lavender-200)', paddingTop: '0.6rem' }}>
                  <span>Total</span>
                  <span>₹{totalPrice + 100}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={handleOrderBouquet}
                  style={{
                    flex: 1,
                    padding: '14px',
                    borderRadius: '50px',
                    border: 'none',
                    background: orderPlaced
                      ? 'linear-gradient(135deg, #4ade80, #22c55e)'
                      : 'linear-gradient(135deg, var(--lavender-500), var(--lavender-700))',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: '0 6px 25px rgba(155,126,200,0.35)',
                  }}
                >
                  {orderPlaced ? '✓ Added to Cart!' : '🛍️ Add Bouquet to Cart'}
                </button>
                <button
                  onClick={clearBouquet}
                  style={{
                    padding: '14px 20px',
                    borderRadius: '50px',
                    border: '1.5px solid var(--lavender-300)',
                    background: 'white',
                    color: 'var(--text-mid)',
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                  }}
                >Clear</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .builder-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
