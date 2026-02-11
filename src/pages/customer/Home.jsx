import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  AnimatePresence 
} from "framer-motion";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaInstagram,
  FaLeaf,
  FaPlay,
  FaArrowRight,
  FaStar,
  FaTimes,
  FaFacebookF,
  FaYoutube,
  FaEnvelope,
  FaHome,
  FaRoute,
  FaMapMarkerAlt,
  FaGift,
  FaBolt
} from "react-icons/fa";

// --- COMPONENTS ---

// 1. Noise Overlay
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>
);

// 2. 3D Tilt Card (Responsive: Tilts only on Desktop)
const TiltCard = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  };

  const rotateX = useTransform(mouseY, [-200, 200], [10, -10]);
  const rotateY = useTransform(mouseX, [-200, 200], [-10, 10]);

  return (
    <motion.div
      className={`relative transform-gpu perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
    >
      <motion.div style={{ transform: "translateZ(30px)" }} className="h-full w-full">
        {children}
      </motion.div>
    </motion.div>
  );
};

// 3. Marquee
const Marquee = ({ text }) => (
  <div className="relative flex overflow-x-hidden bg-green-900 py-3 md:py-4 text-white transform -rotate-1 origin-left border-y-4 border-yellow-400 z-20">
    <motion.div
      className="flex whitespace-nowrap"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
    >
      {[...Array(4)].map((_, i) => (
        <span key={i} className="mx-4 md:mx-8 text-lg md:text-2xl font-black uppercase tracking-widest flex items-center gap-4">
          {text} <FaStar className="text-yellow-400" />
        </span>
      ))}
    </motion.div>
  </div>
);

// 4. NEW: Live Update / Offer Banner
const LiveUpdateSection = () => {
  return (
    <div className="relative z-30 px-4 md:px-6 -mt-8 md:-mt-12 mb-12">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-1 shadow-2xl shadow-orange-200/50"
      >
        <div className="bg-white rounded-[1.3rem] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* pulsating dot */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live Offer</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex h-16 w-16 bg-orange-100 text-orange-600 rounded-2xl items-center justify-center text-3xl">
              <FaGift />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-black text-gray-900">
                Seasonal Special: <span className="text-orange-500">Alphonso Mangoes</span> 🥭
              </h3>
              <p className="text-gray-500 text-sm md:text-base mt-1">
                The king of fruits is back! Add a box to your subscription today. 
                <span className="font-bold text-green-600"> Limited stock.</span>
              </p>
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2">
            Order Now <FaBolt className="text-yellow-400" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Home() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const yHero = useTransform(scrollYProgress, [0, 0.5], ["0%", "30%"]);

  const [activeImg, setActiveImg] = useState(0);
  const images = ["/assets/aarogya-logo-1.jpeg","/assets/aarogya-harvest-box.jpg"];

  const [activeLocationId, setActiveLocationId] = useState(1);
  const locations = [
    { id: 1, name: "Aparna Serene Park", sub: "Kondapur", x: 20, y: 30 },
    { id: 2, name: "My Home Avatar", sub: "Narsingi", x: 60, y: 20 },
    { id: 3, name: "Rainbow Vistas", sub: "Moosapet", x: 40, y: 60 },
    { id: 4, name: "Lanco Hills", sub: "Manikonda", x: 80, y: 70 },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveImg((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#fdfcf6] min-h-screen font-sans text-slate-900 selection:bg-green-400 selection:text-white overflow-x-hidden">
      <NoiseOverlay />

      {/* ================== HERO SECTION (Responsive) ================== */}
      <section style={{marginTop:"-80px"}} className="relative pt-12 pb-20 md:pt-32 md:pb-20 overflow-hidden">
        {/* Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-200/50 rounded-full blur-[80px]" />
          <div className="absolute top-40 -left-20 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-yellow-200/50 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-md border border-green-200 rounded-full text-green-800 font-bold text-[10px] md:text-xs tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Accepting New Subscriptions
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
              EAT FRESH. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-600">
                LIVE BETTER.
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Premium fruit bowls. Hand-cut at 4 AM. Delivered by 8 AM.
              <span className="block font-bold text-green-700 mt-1">Zero preservatives. 100% Nature.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button onClick={() => navigate("/plans")} className="bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-900 transition-all flex items-center justify-center gap-2">
                Get Started <FaArrowRight />
              </button>
              <button onClick={() => setShowMenu(true)} className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <FaPlay className="text-xs" /> View Menu
              </button>
            </div>
          </motion.div>

          {/* 3D Visual (Stacked on Mobile) */}
          <motion.div style={{ y: yHero }} className="relative perspective-1000 order-1 lg:order-2 w-full max-w-sm lg:max-w-full mx-auto">
             <TiltCard className="w-full aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-yellow-50 rounded-[2rem] md:rounded-[3rem] -rotate-6 shadow-2xl border border-white/50" />
                <div className="absolute inset-3 md:inset-4 bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-inner border-4 border-white/50">
                   {images.map((img, i) => (
                      <motion.img
                        key={img}
                        src={img}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: activeImg === i ? 1 : 0, scale: activeImg === i ? 1 : 1.1 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                   ))}
                   {/* <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 md:p-4 rounded-xl text-white z-20">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm md:text-base">Daily Bowl</span>
                        <span className="text-[10px] md:text-xs bg-green-500 px-2 py-1 rounded text-white font-bold">FRESH</span>
                      </div>
                   </div> */}
                </div>
             </TiltCard>
          </motion.div>
        </div>
      </section>

      {/* ================== LIVE UPDATES (RESPONSIVE) ================== */}
      <LiveUpdateSection />

      {/* ================== MARQUEE ================== */}
      <Marquee text="• NO PRESERVATIVES • DELIVERED BY 8:30 AM • FRESH CUT • 100% NATURAL" />

      {/* ================== FEATURES GRID ================== */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block">The Aarogya Standard</span>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900">
              More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">Fruit.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            {/* 1. FARM TO HOME */}
            <div className="md:col-span-8 group relative bg-[#0a2f1c] rounded-[2rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden text-white border border-white/10">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500 rounded-full blur-[100px] opacity-20" />
                <div className="relative z-10">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 md:mb-6 border border-white/10">
                      <FaLeaf className="text-xl md:text-2xl text-lime-400" />
                   </div>
                   <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">Direct from the <br/>Farmers We Know.</h3>
                   <p className="text-green-100/80 text-sm md:text-lg font-light">No middlemen. Harvested hours ago.</p>
                </div>
            </div>

            {/* 2. MORNING DELIVERY */}
            <div className="md:col-span-4 group bg-white rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-lg shadow-orange-200 animate-pulse" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Before 8:30 AM</h3>
                <p className="text-slate-500 text-xs md:text-sm">We deliver silently while you sleep.</p>
            </div>

            {/* 3. FLEXIBLE */}
            <div className="md:col-span-4 group bg-stone-100 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-stone-200">
               <div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Total Control</h3>
                  <p className="text-slate-500 text-xs md:text-sm">Pause subscription with one tap.</p>
               </div>
               <div className="bg-white rounded-xl p-3 shadow-sm mt-4">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                     <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                  <div className="w-full h-8 bg-stone-100 rounded-full p-1"><div className="h-full w-1/2 bg-green-500 rounded-full" /></div>
               </div>
            </div>

            {/* 4. HYGIENE */}
            <div className="md:col-span-8 group bg-gradient-to-br from-lime-200 to-green-300 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
               <div className="relative z-10 flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-green-950 mb-3">Obsessively Clean.</h3>
                  <p className="text-green-900/80 text-sm md:text-base font-medium">Ozone-purification technology. Food-grade packaging.</p>
               </div>
               <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex flex-col items-center justify-center text-green-900">
                  <FaStar className="text-2xl md:text-3xl text-yellow-500 mb-1" />
                  <span className="text-xl md:text-2xl font-black">100%</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Natural</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== HIGH-TECH LOGISTICS MAP (LIGHT THEME) ================== */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          
          {/* LEFT COLUMN: Data List */}
          <div className="order-2 lg:order-1">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 md:mb-6">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Live Logistics
             </div>
             
             <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 leading-tight text-slate-900">
               Precision <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                 Delivery Network.
               </span>
             </h2>
             <p className="text-slate-500 text-sm md:text-lg mb-8">
               Our proprietary routing algorithm ensures your bowl travels the shortest distance for maximum freshness.
             </p>

             <div className="grid gap-3">
                {locations.map((loc) => (
                  <div 
                    key={loc.id}
                    onMouseEnter={() => setActiveLocationId(loc.id)}
                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between
                      ${activeLocationId === loc.id 
                        ? "bg-white border-green-500 shadow-lg scale-[1.02] z-10" 
                        : "bg-slate-50 border-slate-100 hover:bg-white hover:shadow-sm"}`}
                  >
                     <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg transition-colors
                          ${activeLocationId === loc.id ? "bg-green-600 text-white" : "bg-white border border-slate-200 text-slate-400"}`}>
                           {loc.id}
                        </div>
                        <div>
                           <h4 className={`font-bold text-sm md:text-base transition-colors ${activeLocationId === loc.id ? "text-green-900" : "text-slate-700"}`}>
                             {loc.name}
                           </h4>
                           <p className={`text-xs ${activeLocationId === loc.id ? "text-green-700 font-medium" : "text-slate-500"}`}>
                             Route: {loc.sub} • {activeLocationId === loc.id ? "Tracking..." : "Idle"}
                           </p>
                        </div>
                     </div>
                     
                     {/* Animated Signal Bars (Green) */}
                     {activeLocationId === loc.id && (
                       <motion.div layoutId="signal" className="flex gap-1">
                          <span className="w-1 h-3 bg-green-500 rounded-full animate-[bounce_1s_infinite]"></span>
                          <span className="w-1 h-3 bg-green-500 rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
                          <span className="w-1 h-3 bg-green-500 rounded-full animate-[bounce_1s_infinite_0.4s]"></span>
                       </motion.div>
                     )}
                  </div>
                ))}
             </div>
          </div>

          {/* RIGHT COLUMN: The Light Mode Dashboard Map */}
          <div className="order-1 lg:order-2 relative h-[450px] md:h-[600px] w-full bg-[#f8fafc] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 group">
             
             {/* 1. Technical Grid Background (Light Grey Lines) */}
             <div className="absolute inset-0 opacity-40 pointer-events-none" 
                  style={{ 
                    backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)', 
                    backgroundSize: '40px 40px' 
                  }}>
             </div>
             
             {/* 2. Radar Sweep Effect (Subtle Green) */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-200/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

             {/* 3. The Connecting Route Line */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                   <linearGradient id="tech-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                      <stop offset="50%" stopColor="#15803d" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                   </linearGradient>
                </defs>
                <motion.path 
                  d="M 20 30 L 60 20 L 40 60 L 80 70" 
                  fill="none"
                  stroke="url(#tech-gradient-light)"
                  strokeWidth="0.6"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, ease: "circOut" }}
                />
             </svg>

             {/* 4. Map Nodes (The Locations) */}
             {locations.map((loc) => (
                <div 
                   key={loc.id}
                   className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500"
                   style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                   onClick={() => setActiveLocationId(loc.id)}
                >
                   {/* Sonar Pulse (Active only) */}
                   <AnimatePresence>
                     {activeLocationId === loc.id && (
                       <>
                         <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 4, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 border border-green-500 rounded-full bg-green-500/10" />
                         <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="absolute inset-0 border border-green-400 rounded-full" />
                       </>
                     )}
                   </AnimatePresence>

                   {/* Node Dot */}
                   <motion.div 
                      animate={{ scale: activeLocationId === loc.id ? 1.5 : 1 }}
                      className={`relative z-10 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-colors duration-300 shadow-sm
                        ${activeLocationId === loc.id 
                          ? "bg-green-600 border-white ring-2 ring-green-100" 
                          : "bg-white border-slate-300"}`}
                   />

                   {/* Floating Label Card (Light Glassmorphism) */}
                   <motion.div 
                      className={`absolute left-6 top-1/2 -translate-y-1/2 ml-4 whitespace-nowrap px-4 py-2 rounded-xl border backdrop-blur-md transition-all duration-300 z-20 shadow-lg
                        ${activeLocationId === loc.id 
                          ? "bg-white/90 border-green-200 text-slate-800 opacity-100 translate-x-0" 
                          : "bg-white/40 border-slate-200 text-slate-400 opacity-0 -translate-x-4 pointer-events-none"}`}
                   >
                      <div className="text-[10px] uppercase text-green-600 font-bold tracking-wider mb-0.5">Community</div>
                      <div className="font-bold text-sm">{loc.name}</div>
                      
                      {/* Connecting line to dot */}
                      <div className="absolute top-1/2 -left-4 w-4 h-[1px] bg-green-300"></div>
                      <div className="absolute top-1/2 -left-1 w-1 h-1 bg-green-500 rounded-full transform -translate-y-1/2"></div>
                   </motion.div>
                </div>
             ))}

             {/* 5. Moving Packet/Drone */}
             <motion.div 
                className="absolute z-30 w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-green-200 text-xs font-bold border-2 border-white"
                animate={{ 
                   left: ["20%", "60%", "40%", "80%"], 
                   top: ["30%", "20%", "60%", "70%"] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
             >
                <FaBolt />
             </motion.div>

          </div>
        </div>
      </section>

      {/* ================== FOOTER (RESPONSIVE) ================== */}
      <section className="relative pt-16 pb-10 px-4 md:px-6 bg-[#fdfcf6]">
        <div className="max-w-5xl mx-auto bg-green-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6">Ready to Taste the Difference?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-12">
              <a href="https://wa.me/9392814951" className="bg-white text-green-900 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg flex items-center justify-center gap-2">
                <FaWhatsapp size={20} className="text-green-600"/> WhatsApp Us
              </a>
              <a href="tel:+919392814951" className="bg-green-700/50 backdrop-blur-sm text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg border border-green-500 flex items-center justify-center gap-2">
                <FaPhoneAlt /> Call Now
              </a>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                 { icon: FaInstagram, link: "https://www.instagram.com/aarogya_harvest", color: "hover:bg-pink-600" },
                 { icon: FaYoutube, link: "https://www.youtube.com/@aarogyaharvest", color: "hover:bg-red-600" },
                 { icon: FaFacebookF, link: "https://www.facebook.com/", color: "hover:bg-blue-600" },
                 { icon: FaEnvelope, link: "mailto:aagrogyaharvest@gmail.com", color: "hover:bg-orange-500" },
              ].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 transition-all ${social.color}`}>
                  <social.icon size={18} className="md:text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-slate-400 text-xs md:text-sm mt-8 md:mt-10">© {new Date().getFullYear()} Aarogya Harvest.</div>
      </section>

      {/* ================== MENU MODAL ================== */}
      {showMenu && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-2xl md:rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl relative">
             <button onClick={() => setShowMenu(false)} className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center"><FaTimes /></button>
             <div className="overflow-y-auto h-full p-2 bg-stone-100"><img src="/assets/aarogya-menu-2.png" alt="Menu" className="w-full rounded-xl" /></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}