//app/subcomponents/HomeComponents/CardParticles.tsx

'use client';
import React, { useEffect, useRef } from 'react';

interface CardParticlesProps {
    count?: number;
    color1?: string;
    color2?: string;
}

const CardParticles: React.FC<CardParticlesProps> = ({
                                                         count = 30,
                                                         color1 = 'rgba(135, 206, 250, 0.6)', // light sky blue
                                                         color2 = 'rgba(255, 255, 255, 0.5)', // soft white
                                                     }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        let particles: { x: number; y: number; r: number; dx: number; dy: number }[] = [];

        const init = () => {
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2 + 0.5,
                dx: (Math.random() - 0.5) * 0.2,
                dy: (Math.random() - 0.5) * 0.2,
            }));
        };

        const animate = () => {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);
            for (let p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = Math.random() > 0.5 ? color1 : color2;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > width) p.dx *= -1;
                if (p.y < 0 || p.y > height) p.dy *= -1;
            }
            requestAnimationFrame(animate);
        };

        init();
        animate();
        window.addEventListener('resize', init);
        return () => window.removeEventListener('resize', init);
    }, [count, color1, color2]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 rounded-2xl opacity-60"
            style={{ pointerEvents: 'none' }}
        />
    );
};

export default CardParticles;
