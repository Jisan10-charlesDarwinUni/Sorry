import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactPlayer from 'react-player';
import FloatingHearts from './components/FloatingHearts';

export default function App() {
  const [started, setStarted] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [denyPos, setDenyPos] = useState({ x: 0, y: 0 });

  const handleDenyHover = () => {
    // Keep it somewhat within bounds but moving wildly
    const rangeX = typeof window !== 'undefined' ? window.innerWidth / 3 : 150; 
    const rangeY = typeof window !== 'undefined' ? window.innerHeight / 3 : 150;
    
    setDenyPos({ 
      x: (Math.random() - 0.5) * rangeX * 2, 
      y: (Math.random() - 0.5) * rangeY * 2 
    });
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden font-sans"
      style={{
        background: 'radial-gradient(circle at 20% 30%, #F8BBD0 0%, transparent 40%), radial-gradient(circle at 80% 70%, #B3E5FC 0%, transparent 40%), linear-gradient(135deg, #FCE4EC 0%, #E1F5FE 100%)'
      }}
    >
      {/* Floating Hearts Animation */}
      <FloatingHearts burst={accepted} />

      {/* Hidden Audio Player */}
      {started && (
        <div className="hidden">
          <ReactPlayer
            url="https://youtu.be/r35ev9q_bEo?si=HDfuQoFxcrgwrBZ3"
            playing={true}
            loop={true}
            volume={0.6}
            width="0"
            height="0"
            playsinline={true}
            config={{
              youtube: {
                playerVars: { 
                  autoplay: 1, 
                  controls: 0,
                  showinfo: 0,
                  modestbranding: 1
                }
              }
            }}
          />
        </div>
      )}

      {/* Content Container */}
      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="start-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5 } }}
            className="z-10 flex h-full w-full cursor-pointer flex-col items-center justify-center p-8 active:scale-95 transition-transform"
            onClick={() => setStarted(true)}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-full bg-white/40 px-8 py-4 shadow-sm backdrop-blur-md transition-colors hover:bg-white/60"
            >
              <span className="font-serif text-xl tracking-widest text-slate-600 sm:text-2xl">
                Tap to open...
              </span>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="apology-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="z-10 flex w-[90%] max-w-[600px] flex-col items-center justify-center rounded-[40px] border border-white/30 bg-white/15 px-10 py-[60px] text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.05)] backdrop-blur-[20px]"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="m-0 font-serif text-5xl italic tracking-[-1px] text-[#D81B60] sm:text-6xl md:text-[64px]"
            >
              Sorry Anta Apu{' '}
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block"
              >
                💔
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 3 }}
            >
              <p className="mt-4 text-lg font-light uppercase tracking-[2px] text-[#64B5F6] md:text-[20px]">
                Please forgive me...
              </p>
            </motion.div>

            <div className="mt-12 flex min-h-[60px] w-full flex-col items-center justify-center relative">
              <AnimatePresence mode="wait">
                {!accepted ? (
                  <motion.div
                    key="buttons"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, delay: 4 }}
                    className="flex w-full items-center justify-center gap-4 sm:gap-6"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setAccepted(true)}
                      className="rounded-full bg-[#D81B60] px-8 py-3 text-lg font-medium text-white shadow-[0_8px_16px_rgba(216,27,96,0.3)] transition-colors hover:bg-[#C2185B]"
                    >
                      Accept ❤️
                    </motion.button>
                    <motion.button
                      animate={{ x: denyPos.x, y: denyPos.y }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      onMouseEnter={handleDenyHover}
                      onTouchStart={handleDenyHover}
                      onClick={handleDenyHover}
                      className="relative rounded-full border border-white/40 bg-white/30 px-8 py-3 text-lg font-medium text-[#D81B60] shadow-sm backdrop-blur-md transition-colors hover:bg-white/40"
                    >
                      Deny 😢
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="popup"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', bounce: 0.5 }}
                    className="mt-2 rounded-3xl border border-white/50 bg-white/60 px-8 py-6 shadow-xl backdrop-blur-xl"
                  >
                    <p className="font-serif text-3xl font-medium italic text-[#D81B60]">Yayyy 💖</p>
                    <p className="mt-2 text-lg uppercase tracking-wider text-slate-600">Thank you Anta Apu!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
