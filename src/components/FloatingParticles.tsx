import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, EyeOff, Eye } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'heart' | 'petal' | 'sparkle';
  color: string;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsEnabled(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(28, Math.floor(width / 45));
    const particles: Particle[] = [];

    const heartColors = ['#F59EAB', '#E88CA6', '#D65D7A', '#F7B7C6'];
    const petalColors = ['#E28299', '#DE6B87', '#C95370', '#FFAEC0'];
    const sparkleColors = ['#FFD1DC', '#FFE6AA', '#FFF0F5'];

    for (let i = 0; i < particleCount; i++) {
      const typeRand = Math.random();
      const type: 'heart' | 'petal' | 'sparkle' = 
        typeRand < 0.4 ? 'heart' : typeRand < 0.8 ? 'petal' : 'sparkle';
      
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'heart' ? Math.random() * 10 + 8 : type === 'petal' ? Math.random() * 9 + 6 : Math.random() * 3 + 2,
        speedY: type === 'sparkle' ? -(Math.random() * 0.4 + 0.1) : (Math.random() * 0.6 + 0.3),
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type,
        color: type === 'heart' 
          ? heartColors[Math.floor(Math.random() * heartColors.length)] 
          : type === 'petal' 
          ? petalColors[Math.floor(Math.random() * petalColors.length)]
          : sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
      });
    }

    const drawHeart = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // top left curve
      c.bezierCurveTo(-size / 2, -topCurveHeight, -size, topCurveHeight, 0, size);
      // top right curve
      c.bezierCurveTo(size, topCurveHeight, size / 2, -topCurveHeight, 0, topCurveHeight);
      c.fill();
      c.restore();
    };

    const drawPetal = (c: CanvasRenderingContext2D, x: number, y: number, size: number, rot: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.ellipse(0, 0, size * 0.45, size, 0, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const drawSparkle = (c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, alpha: number) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = alpha;
      c.fillStyle = color;
      c.beginPath();
      c.arc(0, 0, size, 0, Math.PI * 2);
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.speedY > 0 && p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.speedY < 0 && p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.color, p.opacity);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, p.opacity);
        } else {
          drawSparkle(ctx, p.x, p.y, p.size, p.color, p.opacity);
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isEnabled]);

  return (
    <>
      {isEnabled && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-10 opacity-70"
          aria-hidden="true"
        />
      )}
      
      {/* Discreet toggle button */}
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className="fixed bottom-5 right-20 z-40 p-2 bg-white/80 hover:bg-white text-[#8B1E3F] backdrop-blur-md border border-[#F5D5DE] rounded-full shadow-sm hover:shadow-romantic transition-all"
        title={isEnabled ? "Pause floating hearts & petals" : "Resume floating hearts & petals"}
        aria-label={isEnabled ? "Disable particles" : "Enable particles"}
      >
        {isEnabled ? <Sparkles className="w-4 h-4" /> : <EyeOff className="w-4 h-4 opacity-60" />}
      </button>
    </>
  );
};
