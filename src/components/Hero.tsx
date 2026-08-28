import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';

const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_125121_afb71ce9-9c64-4c54-90b5-c89c0764c052.png&w=1920&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_135737_0da59642-725b-451a-997b-b0283d95a42a.png&w=1280&q=85";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskLayerRef = useRef<HTMLDivElement>(null);
  const gridPatternRef = useRef<SVGPatternElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -999;
    let targetY = -999;
    let currentX = -999;
    let currentY = -999;
    let targetGridX = 0;
    let targetGridY = 0;
    let currentGridX = 0;
    let currentGridY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        targetGridX = (nx - 0.5) * 16;
        targetGridY = (ny - 0.5) * 16;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      if (currentX === -999) {
        currentX = targetX;
        currentY = targetY;
      } else {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;
      }
      
      currentGridX += (targetGridX - currentGridX) * 0.06;
      currentGridY += (targetGridY - currentGridY) * 0.06;

      if (gridPatternRef.current) {
        gridPatternRef.current.setAttribute('x', currentGridX.toString());
        gridPatternRef.current.setAttribute('y', currentGridY.toString());
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const r = 260;
      const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, r);
      gradient.addColorStop(0, 'rgba(0,0,0,1)');
      gradient.addColorStop(0.4, 'rgba(0,0,0,1)');
      gradient.addColorStop(0.6, 'rgba(0,0,0,0.75)');
      gradient.addColorStop(0.75, 'rgba(0,0,0,0.4)');
      gradient.addColorStop(0.88, 'rgba(0,0,0,0.12)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (maskLayerRef.current) {
        const dataUrl = canvas.toDataURL();
        maskLayerRef.current.style.maskImage = `url(${dataUrl})`;
        maskLayerRef.current.style.webkitMaskImage = `url(${dataUrl})`;
        maskLayerRef.current.style.maskSize = '100% 100%';
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Process", href: "#process" },
    { name: "About", href: "#about" }
  ];

  return (
    <div ref={containerRef} className="relative overflow-hidden h-[100dvh] bg-[#030305] tracking-[-0.02em]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
      
      <canvas ref={canvasRef} className="hidden" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between md:justify-center p-4 sm:p-5">
        <div className="hidden md:flex hero-navbar-pill nav-drop" style={{ animationDelay: '0.1s' }}>
          <a href="#" aria-label="Home">
            <svg className="w-[22px] h-[22px] text-white fill-current mx-1" viewBox="0 0 256 256">
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </a>
          
          <a href="#" className="hero-nav-link active">Home</a>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hero-nav-link">
              {link.name}
            </a>
          ))}
          
          <a href="#contact" className="hero-nav-connect">
            Connect
          </a>
        </div>

        <div className="md:hidden flex w-full justify-between items-center relative z-50">
          <div className="hero-mobile-btn nav-drop" style={{ animationDelay: '0.1s' }}>
            <svg className="w-[22px] h-[22px] text-white fill-current" viewBox="0 0 256 256">
              <path d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z" />
            </svg>
          </div>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="hero-mobile-btn text-white nav-drop" 
            style={{ animationDelay: '0.1s' }}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 right-0 z-40 pt-16 pb-6 px-5 shadow-lg bg-[#0a0a0f] border-b border-white/5">
            <div className="flex flex-col">
              <a 
                href="#"
                onClick={() => setIsMenuOpen(false)}
                className="text-white py-3 border-b border-white/10 text-left text-sm font-medium"
              >
                Home
              </a>
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white/80 py-3 border-b border-white/10 text-left text-sm font-medium hover:text-white"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="mt-4 bg-white text-black text-sm font-semibold px-5 py-3 rounded-full hover:bg-gray-200 transition-colors w-full text-center"
              >
                Connect
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Layer 1: Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full">
          <defs>
            <pattern ref={gridPatternRef} id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Layer 2: Base Image with Ken Burns */}
      <div 
        className="absolute inset-0 z-10 bg-center bg-cover origin-center"
        style={{ 
          backgroundImage: `url(${BG_IMAGE_1})`,
          animation: 'kenBurns 2.4s cubic-bezier(0.22,1,0.36,1) forwards'
        }}
      />

      {/* Layer 3: Reveal Mask */}
      <div 
        ref={maskLayerRef}
        className="absolute inset-0 z-30 bg-center bg-cover pointer-events-none"
        style={{ 
          backgroundImage: `url(${BG_IMAGE_2})`
        }}
      />

      {/* Layer 4: Stats Arcs */}
      <div className="absolute inset-y-0 right-0 pointer-events-none z-40 hidden sm:block">
        <svg viewBox="0 0 380 700" preserveAspectRatio="xMaxYMid meet" className="h-full w-auto">
          <defs>
            <linearGradient id="arc1-grad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="22%" stopColor="white" stopOpacity="0.5" />
              <stop offset="55%" stopColor="white" stopOpacity="0.5" />
              <stop offset="85%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arc2-grad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="22%" stopColor="white" stopOpacity="0.5" />
              <stop offset="55%" stopColor="white" stopOpacity="0.5" />
              <stop offset="85%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="arc3-grad" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="22%" stopColor="white" stopOpacity="0.5" />
              <stop offset="55%" stopColor="white" stopOpacity="0.5" />
              <stop offset="85%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Arc 1 */}
          <g>
            <path 
              d="M -121.5 -29.8 A 330 330 0 0 1 207.2 390.9" 
              fill="none" stroke="url(#arc1-grad)" strokeWidth="1.1" 
              className="arc-line" style={{ '--len': 622 } as React.CSSProperties}
            />
            <g transform="translate(119.2, 62.6)">
              <circle cx="0" cy="0" r="7" fill="none" stroke="white" strokeWidth="1.1" strokeOpacity="0.35" className="arc-ring" style={{ animationDelay: '1.2s' }} />
              <circle cx="0" cy="0" r="3.4" fill="white" className="arc-dot" style={{ animationDelay: '0.9s' }} />
              <g>
                <text x="16" y="4" fill="white" fontSize="32" fontWeight="500" letterSpacing="-1" className="arc-text" style={{ animationDelay: '1.05s' }}>
                  10<tspan fontSize="19" dy="-10">+</tspan>
                </text>
                <text x="18" y="22" fill="white" fillOpacity="0.8" fontSize="8.5" fontWeight="600" letterSpacing="2" className="arc-text" style={{ animationDelay: '1.2s' }}>
                  YEARS REAL
                </text>
              </g>
            </g>
          </g>

          {/* Arc 2 */}
          <g>
            <path 
              d="M 110.8 -27.5 A 395 395 0 0 1 87.5 642.0" 
              fill="none" stroke="url(#arc2-grad)" strokeWidth="1.1" 
              className="arc-line" style={{ '--len': 800, animationDelay: '0.22s' } as React.CSSProperties}
            />
            <g transform="translate(284.7, 313.7)">
              <circle cx="0" cy="0" r="7" fill="none" stroke="white" strokeWidth="1.1" strokeOpacity="0.35" className="arc-ring" style={{ animationDelay: '1.42s' }} />
              <circle cx="0" cy="0" r="3.4" fill="white" className="arc-dot" style={{ animationDelay: '1.12s' }} />
              <g>
                <text x="16" y="4" fill="white" fontSize="32" fontWeight="500" letterSpacing="-1" className="arc-text" style={{ animationDelay: '1.27s' }}>
                  40<tspan fontSize="19" dy="-10">+</tspan>
                </text>
                <text x="18" y="22" fill="white" fillOpacity="0.8" fontSize="8.5" fontWeight="600" letterSpacing="2" className="arc-text" style={{ animationDelay: '1.42s' }}>
                  USE FORMS
                </text>
              </g>
            </g>
          </g>

          {/* Arc 3 */}
          <g>
            <path 
              d="M 336.3 188.7 A 460 460 0 0 1 32.1 737.4" 
              fill="none" stroke="url(#arc3-grad)" strokeWidth="1.1" 
              className="arc-line" style={{ '--len': 691, animationDelay: '0.44s' } as React.CSSProperties}
            />
            <g transform="translate(220.8, 619.6)">
              <circle cx="0" cy="0" r="7" fill="none" stroke="white" strokeWidth="1.1" strokeOpacity="0.35" className="arc-ring" style={{ animationDelay: '1.64s' }} />
              <circle cx="0" cy="0" r="3.4" fill="white" className="arc-dot" style={{ animationDelay: '1.34s' }} />
              <g>
                <text x="16" y="4" fill="white" fontSize="32" fontWeight="500" letterSpacing="-1" className="arc-text" style={{ animationDelay: '1.49s' }}>
                  95<tspan fontSize="19" dy="-10">%</tspan>
                </text>
                <text x="18" y="22" fill="white" fillOpacity="0.8" fontSize="8.5" fontWeight="600" letterSpacing="2" className="arc-text" style={{ animationDelay: '1.64s' }}>
                  REPEAT MEMBERS
                </text>
              </g>
            </g>
          </g>

        </svg>
      </div>

      {/* Layer 5: Hero Text Block */}
      <div className="absolute z-50 bottom-12 sm:bottom-16 md:bottom-24 left-5 sm:left-8 md:left-12 max-w-[300px] sm:max-w-md pointer-events-none">
        <p className="text-[11px] sm:text-xs font-semibold tracking-[0.12em] text-white/90 mb-4 hero-rise" style={{ animationDelay: '0.15s' }}>
          Gateway to your <span className="italic">augmented self</span>
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.08em] text-white mb-6 hero-rise" style={{ animationDelay: '0.3s' }}>
          A window<br />of coming<br />enhancements
        </h1>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-8 hero-rise" style={{ animationDelay: '0.5s' }}>
          A future where carbon fiber, titanium, and human instinct align. Not machine. Not human. Something wonderfully poised between.
        </p>
        
        <button className="group relative overflow-hidden hero-reserve-btn hero-rise" style={{ animationDelay: '0.7s' }}>
          <span className="relative z-10">Reserve Now</span>
          <span className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </button>
      </div>

    </div>
  );
}
