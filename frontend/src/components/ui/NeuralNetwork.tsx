'use client';

import { useEffect, useRef } from 'react';

// Sinir ağları animasyonu için bileşen
const NeuralNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const nodesRef = useRef<Array<{x: number, y: number, vx: number, vy: number, connections: number[]}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas boyutlarını ayarla
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();

    // Sinir ağı düğümleri
    const nodeCount = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 20000));
    const nodes: Array<{x: number, y: number, vx: number, vy: number, connections: number[]}> = [];

    // Düğümleri oluştur
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        connections: []
      });
    }

    // Bağlantıları oluştur
    nodes.forEach((node, i) => {
      nodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 150) {
            node.connections.push(j);
          }
        }
      });
    });

    nodesRef.current = nodes;

    // Animasyon fonksiyonu
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Canvas'ı temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Düğümleri güncelle
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        // Sınırları kontrol et ve yön değiştir
        if (node.x < 0 || node.x > canvas.width) {
          node.vx *= -1;
          node.x = Math.max(0, Math.min(canvas.width, node.x));
        }
        if (node.y < 0 || node.y > canvas.height) {
          node.vy *= -1;
          node.y = Math.max(0, Math.min(canvas.height, node.y));
        }
      });

      // Bağlantıları çiz
      ctx.lineWidth = 1;
      nodes.forEach((node) => {
        node.connections.forEach(connectionIndex => {
          const otherNode = nodes[connectionIndex];
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          
          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.stroke();
          }
        });
      });

      // Düğümleri çiz
      nodes.forEach(node => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
        
        // Düğüm etrafında hafif glow efekti
        ctx.shadowColor = 'rgba(59, 130, 246, 0.3)';
        ctx.shadowBlur = 8;
        ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Animasyonu başlat
    animate();

    // Event listener'ları ekle
    window.addEventListener('resize', resizeCanvas);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 select-none"
      style={{ 
        zIndex: 0, 
        pointerEvents: 'none',
        userSelect: 'none',
        touchAction: 'none'
      }}
    />
  );
};

export default NeuralNetwork;
