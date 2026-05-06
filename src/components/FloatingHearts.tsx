import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface HeartData {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingHearts({ burst = false }: { burst?: boolean }) {
  const [hearts, setHearts] = useState<HeartData[]>([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = Array.from({ length: burst ? 80 : 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position 0-100%
      size: Math.random() * 20 + 10, // Size between 10-30px
      duration: burst ? Math.random() * 3 + 3 : Math.random() * 5 + 5, // Animation duration faster on burst
      delay: burst ? Math.random() * 2 : Math.random() * 5, // Animation delay shorter on burst
    }));
    setHearts(newHearts);
  }, [burst]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-[-10%] text-[#F06292] opacity-40"
          style={{ left: `${heart.x}%` }}
          initial={{ y: '10vh', opacity: 0, scale: 0.5 }}
          animate={{
            y: '-110vh',
            opacity: [0, 0.7, 0.7, 0],
            scale: [0.5, 1, 1.2, 1],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Heart fill="currentColor" size={heart.size} strokeWidth={1} />
        </motion.div>
      ))}
    </div>
  );
}
