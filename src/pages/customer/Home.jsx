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
  FaUserFriends,
  FaTint,
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
  FaBolt,
  FaCarrot,
  FaAppleAlt,
  FaLocationArrow,
  FaTractor, 
  FaWarehouse, 
  FaWater, 
  FaTruck
} from "react-icons/fa";

// --- COMPONENTS ---

// 1. Noise Overlay
const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
    <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
  </div>
);

// 2. 3D Tilt Card
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

// 4. Live Update Carousel (Sticky Version)
const LiveUpdateSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const offers = [
    {
      id: 1,
      title: "Seasonal Special: Alphonso Mangoes",
      subtitle: "The king of fruits is back! Add a box to your subscription.",
      highlight: "Limited Stock",
      icon: <FaGift />,
      iconBg: "bg-orange-100 text-orange-600",
      highlightColor: "text-orange-500",
      btnText: "Order Now",
      gradient: "from-orange-500 to-red-500",
      shadow: "shadow-orange-200/50"
    },
    {
      id: 2,
      title: "Refer a Neighbor, Get ₹100",
      subtitle: "Invite your friends to Aarogya Harvest and earn credits.",
      highlight: "Credits Added Instantly",
      icon: <FaUserFriends />,
      iconBg: "bg-blue-100 text-blue-600",
      highlightColor: "text-blue-500",
      btnText: "Refer Now",
      gradient: "from-blue-400 to-indigo-500",
      shadow: "shadow-blue-200/50"
    },
    {
      id: 3,
      title: "New: Cold-Pressed Juices",
      subtitle: "100% pure fruit juice. No sugar, no water added.",
      highlight: "Try a Sample",
      icon: <FaTint />,
      iconBg: "bg-green-100 text-green-600",
      highlightColor: "text-green-500",
      btnText: "Add to Plan",
      gradient: "from-green-400 to-emerald-600",
      shadow: "shadow-green-200/50"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offers.length]);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    } else if (info.offset.x > 50) {
      setCurrentIndex((prev) => (prev - 1 + offers.length) % offers.length);
    }
  };

  const currentOffer = offers[currentIndex];

  return (
    <div className="sticky top-20 md:top-24 z-40 px-4 md:px-6 -mt-8 md:-mt-12 mb-12 pointer-events-none">
      <motion.div 
        layout
        className={`max-w-5xl mx-auto bg-gradient-to-r ${currentOffer.gradient} rounded-3xl p-1 shadow-2xl ${currentOffer.shadow} transition-colors duration-500 pointer-events-auto backdrop-blur-xl relative`}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-[1.3rem] relative overflow-hidden">
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Live Updates</span>
          </div>

          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 cursor-grab active:cursor-grabbing"
              >
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`hidden md:flex h-16 w-16 min-w-[4rem] rounded-2xl items-center justify-center text-3xl ${currentOffer.iconBg}`}>
                    {currentOffer.icon}
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h3 className="text-2xl font-black text-gray-900 leading-tight">
                      {currentOffer.title.split(":")[0]}
                      {currentOffer.title.includes(":") && ": "}
                      <span className={currentOffer.highlightColor}>
                        {currentOffer.title.split(":")[1]}
                      </span>
                    </h3>
                    <p className="text-gray-500 text-sm md:text-base mt-1">
                      {currentOffer.subtitle}{" "}
                      <span className="font-bold text-slate-800 whitespace-nowrap">
                        {currentOffer.highlight}
                      </span>
                    </p>
                  </div>
                </div>
                <button className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-transform active:scale-95 flex items-center justify-center gap-2 shrink-0">
                  {currentOffer.btnText} <FaBolt className="text-yellow-400" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-6 bg-gray-800" : "w-1.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 5. ANIMATED MENU COMPONENT
const AnimatedMenu = () => {
  const menuCategories = [
    {
      title: "Regular & Premium Fruits",
      icon: <FaAppleAlt />,
      items: ["Apple", "Pineapple", "Kiwi", "Dragonfruit", "Pomegranate", "Grapes", "Muskmelon", "Lychee", "Orange", "Guava"],
      theme: "bg-red-50 border-red-100 text-red-800",
      tagTheme: "bg-white text-red-600 border-red-200"
    },
    {
      title: "Veggies & Sprouts",
      icon: <FaCarrot />,
      items: ["Cucumber", "Carrot", "Beetroot", "Sprouts", "Boiled Healthy Mix"],
      theme: "bg-green-50 border-green-100 text-green-800",
      tagTheme: "bg-white text-green-600 border-green-200"
    },
    {
      title: "Dry Fruits",
      icon: <FaLeaf />, 
      items: ["Soaked Almonds", "Dates", "Walnuts", "Cashews (Kaju)", "Figs (Anjeer)", "Pistachios"],
      theme: "bg-amber-50 border-amber-100 text-amber-800",
      tagTheme: "bg-white text-amber-600 border-amber-200"
    }
  ];

  const container = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemAnim = { hidden: { y: 20, opacity: 0 }, show: { y: 0, opacity: 1 } };

  return (
    <div className="p-6 md:p-8">
      <div className="text-center mb-8">
        <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600 mb-4 shadow-sm"><FaLeaf size={24} /></div>
        <h3 className="text-3xl font-black text-slate-900 mb-2">Our Fresh Menu</h3>
        <p className="text-slate-500">Handpicked goodness, prepared daily at 4 AM.</p>
      </div>
      <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6">
        {menuCategories.map((cat, idx) => (
          <motion.div key={idx} variants={itemAnim} className={`rounded-3xl p-6 border-2 ${cat.theme} relative overflow-hidden group hover:shadow-md transition-all`}>
            <div className="absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500 select-none grayscale">{cat.icon}</div>
            <div className="relative z-10">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-3"><span className="text-2xl">{cat.icon}</span> {cat.title}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((food, i) => (
                  <span key={i} className={`px-3 py-1.5 rounded-xl text-sm font-bold border shadow-sm ${cat.tagTheme}`}>{food}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-8 text-center bg-stone-100 p-4 rounded-xl border border-stone-200">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">* Menu items subject to seasonal availability</p>
      </div>
    </div>
  );
};

// 6. FRESHNESS TIMELINE COMPONENT (NEW)
const FreshnessTimeline = () => {
  const steps = [
    {
      time: "Yesterday, 4:00 PM",
      title: "Harvested with Care",
      desc: "Fruits picked directly from partner farms only when fully ripe.",
      icon: <FaTractor />,
      color: "bg-orange-100 text-orange-600 border-orange-200"
    },
    {
      time: "Today, 3:00 AM",
      title: "Arrives at Kitchen",
      desc: "Fresh stock reaches our central kitchen. Quality checked instantly.",
      icon: <FaWarehouse />,
      color: "bg-blue-100 text-blue-600 border-blue-200"
    },
    {
      time: "Today, 4:30 AM",
      title: "Ozone Wash & Cut",
      desc: "Purified using Ozone technology. Hand-cut by hygiene-certified staff.",
      icon: <FaWater />,
      color: "bg-cyan-100 text-cyan-600 border-cyan-200"
    },
    {
      time: "Today, 6:00 AM",
      title: "Out for Delivery",
      desc: "Packed in temperature-controlled vans to maintain crunch.",
      icon: <FaTruck />,
      color: "bg-green-100 text-green-600 border-green-200"
    },
    {
      time: "Today, 8:00 AM",
      title: "At Your Doorstep",
      desc: "Silent delivery. Wake up to a bowl of pure health.",
      icon: <FaHome />,
      color: "bg-emerald-100 text-emerald-600 border-emerald-200"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-green-600 font-bold uppercase tracking-widest text-xs">The 24-Hour Cycle</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2">
            Freshness You Can <span className="text-green-600">Track.</span>
          </h2>
        </div>

        <div className="relative">
          {/* Vertical Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 md:translate-x-0"></div>

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 relative ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                
                {/* Time Badge (Desktop: Opposite Side) */}
                <div className={`md:w-1/2 flex ${i % 2 !== 0 ? "md:justify-start" : "md:justify-end"} pl-16 md:pl-0 md:px-10`}>
                   <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                     {step.time}
                   </span>
                </div>

                {/* Center Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-4 border-white shadow-xl flex items-center justify-center z-10 bg-white">
                   <div className={`w-full h-full rounded-full flex items-center justify-center text-xl ${step.color}`}>
                      {step.icon}
                   </div>
                </div>

                {/* Content Card */}
                <div className="md:w-1/2 pl-16 md:pl-0 md:px-10">
                  <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 hover:border-green-200 transition-colors shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900">{step.title}</h3>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed">{step.desc}</p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
    { id: 1, name: "Aparna Serene Park", sub: "Kondapur", x: 20, y: 35 },
    { id: 2, name: "My Home Avatar", sub: "Narsingi", x: 50, y: 25 },
    { id: 3, name: "Rainbow Vistas", sub: "Moosapet", x: 80, y: 35 },
    { id: 4, name: "Lanco Hills", sub: "Manikonda", x: 50, y: 65 },
  ];

  useEffect(() => {
    const timer = setInterval(() => setActiveImg((p) => (p + 1) % images.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-[#fdfcf6] min-h-screen font-sans text-slate-900 selection:bg-green-400 selection:text-white">
      <NoiseOverlay />

      {/* ================== HERO SECTION ================== */}
      <section style={{marginTop:"-52px"}} className="relative pt-12 pb-20 md:pt-32 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-green-200/50 rounded-full blur-[80px]" />
          <div className="absolute top-40 -left-20 w-[200px] md:w-[500px] h-[200px] md:h-[500px] bg-yellow-200/50 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full relative z-10 grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 md:space-y-8 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/60 backdrop-blur-md border border-green-200 rounded-full text-green-800 font-bold text-[10px] md:text-xs tracking-wider uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Accepting New Subscriptions
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
              EAT FRESH. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-lime-500 to-green-600">LIVE BETTER.</span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Premium fruit bowls, Hand-cut, Delivered by 8:30 AM. <span className="block font-bold text-green-700 mt-1">Zero preservatives. 100% Nature.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button onClick={() => navigate("/plans")} className="bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-900 transition-all flex items-center justify-center gap-2">Get Started <FaArrowRight /></button>
              <button onClick={() => setShowMenu(true)} className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg border border-slate-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"><FaPlay className="text-xs" /> View Menu</button>
            </div>
          </motion.div>
          <motion.div style={{ y: yHero }} className="relative perspective-1000 order-1 lg:order-2 w-full max-w-sm lg:max-w-full mx-auto">
             <TiltCard className="w-full aspect-square relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100 to-yellow-50 rounded-[2rem] md:rounded-[3rem] -rotate-6 shadow-2xl border border-white/50" />
                <div className="absolute inset-3 md:inset-4 bg-white rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-inner border-4 border-white/50">
                   {images.map((img, i) => (
                      <motion.img key={img} src={img} initial={{ opacity: 0 }} animate={{ opacity: activeImg === i ? 1 : 0, scale: activeImg === i ? 1 : 1.1 }} transition={{ duration: 0.8 }} className="absolute inset-0 w-full h-full object-cover" />
                   ))}
                </div>
             </TiltCard>
          </motion.div>
        </div>
      </section>

      <LiveUpdateSection />
      <Marquee text="• NO PRESERVATIVES • DELIVERED BY 8:30 AM • FRESH CUT • 100% NATURAL" />

      {/* ================== FEATURES GRID ================== */}
      <section className="py-16 md:py-24 px-4 md:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-green-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-2 block">The Aarogya Standard</span>
            <h2 className="text-3xl md:text-6xl font-black text-slate-900">More Than Just <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-500">Fruit.</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
            <div className="md:col-span-8 group relative bg-[#0a2f1c] rounded-[2rem] p-6 md:p-10 flex flex-col justify-between overflow-hidden text-white border border-white/10">
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green-500 rounded-full blur-[100px] opacity-20" />
                <div className="relative z-10">
                   <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-4 md:mb-6 border border-white/10"><FaLeaf className="text-xl md:text-2xl text-lime-400" /></div>
                   <h3 className="text-2xl md:text-4xl font-bold mb-3 leading-tight">Direct from the <br/>Farmers We Know.</h3>
                   <p className="text-green-100/80 text-sm md:text-lg font-light">No middlemen. Harvested hours ago.</p>
                </div>
            </div>
            <div className="md:col-span-4 group bg-white rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-4 md:mb-6 rounded-full bg-gradient-to-tr from-yellow-300 to-orange-400 shadow-lg shadow-orange-200 animate-pulse" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Before 8:30 AM</h3>
                <p className="text-slate-500 text-xs md:text-sm">We deliver silently while you sleep.</p>
            </div>
            <div className="md:col-span-4 group bg-stone-100 rounded-[2rem] p-6 md:p-8 flex flex-col justify-between border border-stone-200">
               <div><h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Total Control</h3><p className="text-slate-500 text-xs md:text-sm">Pause subscription with one tap.</p></div>
               <div className="bg-white rounded-xl p-3 shadow-sm mt-4">
                  <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-bold text-slate-400 uppercase">Status</span><div className="w-2 h-2 rounded-full bg-green-500" /></div>
                  <div className="w-full h-8 bg-stone-100 rounded-full p-1"><div className="h-full w-1/2 bg-green-500 rounded-full" /></div>
               </div>
            </div>
            <div className="md:col-span-8 group bg-gradient-to-br from-lime-200 to-green-300 rounded-[2rem] p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
               <div className="relative z-10 flex-1 text-center md:text-left"><h3 className="text-2xl md:text-3xl font-bold text-green-950 mb-3">Obsessively Clean.</h3><p className="text-green-900/80 text-sm md:text-base font-medium">Ozone-purification technology. Food-grade packaging.</p></div>
               <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 bg-white/20 backdrop-blur-xl border border-white/40 rounded-full flex flex-col items-center justify-center text-green-900">
                  <FaStar className="text-2xl md:text-3xl text-yellow-500 mb-1" /><span className="text-xl md:text-2xl font-black">100%</span><span className="text-[10px] font-bold uppercase tracking-widest">Natural</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================== SMART CITY DELIVERY MAP ================== */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-200 bg-sky-50 text-sky-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span> Live Network
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Smart Delivery. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">
                Optimized Routes.
              </span>
            </h2>
            <p className="text-slate-500 text-sm md:text-lg">
              Real-time logistics ensuring maximum freshness from our kitchen to your gate.
            </p>
          </div>

          <div className="relative w-full h-[550px] md:h-[650px] bg-[#f8fafc] rounded-[2.5rem] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-200 group">
             
             {/* 1. CITY STREET PATTERN */}
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/map-cubes.png')]"></div>
             
             {/* 2. ROUTE VISUALIZATION */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                   <linearGradient id="city-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0" />
                      <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                   </linearGradient>
                </defs>
                <motion.path 
                  d="M 20 35 L 50 25 L 80 35 L 50 65 L 20 35" 
                  fill="none"
                  stroke="url(#city-gradient)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                />
             </svg>

             {/* 3. PINS ON MAP */}
             {locations.map((loc) => (
                <motion.div 
                   key={loc.id}
                   className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                   style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                   onClick={() => setActiveLocationId(loc.id)}
                   animate={{ scale: activeLocationId === loc.id ? 1.1 : 1 }}
                >
                   <div className="relative flex flex-col items-center group">
                      <AnimatePresence>
                        {activeLocationId === loc.id && (
                          <motion.div initial={{ scale: 0, opacity: 0.5 }} animate={{ scale: 3, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute w-full h-full bg-sky-400 rounded-full opacity-20" />
                        )}
                      </AnimatePresence>

                      <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.15)] border-2 transition-colors duration-300
                         ${activeLocationId === loc.id ? "bg-sky-600 border-white text-white scale-110" : "bg-white border-slate-100 text-slate-400 hover:text-sky-500"}`}>
                         <FaMapMarkerAlt className="text-sm md:text-xl" />
                      </div>

                      <div className={`hidden md:block absolute top-full mt-3 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shadow-lg border transition-all
                         ${activeLocationId === loc.id ? "bg-white border-sky-100 text-sky-700 opacity-100 translate-y-0" : "bg-white/50 border-transparent text-slate-400 opacity-0 -translate-y-2"}`}>
                         {loc.name}
                         <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-t border-l border-sky-100 transform rotate-45"></div>
                      </div>
                   </div>
                </motion.div>
             ))}

             {/* 4. MOVING DRONE ICON */}
             <motion.div 
                className="absolute z-20 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.4)] border border-emerald-100 text-emerald-600 text-lg"
                animate={{ 
                   left: ["20%", "50%", "80%", "50%", "20%"], 
                   top: ["35%", "25%", "35%", "65%", "35%"] 
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
             >
                <FaLocationArrow className="-rotate-45" />
             </motion.div>

             {/* 5. SIDEBAR OVERLAY (DESKTOP) */}
             <div className="hidden md:flex absolute top-6 bottom-6 left-6 w-72 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-xl flex-col p-5 overflow-y-auto custom-scrollbar z-30">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 pl-1">Active Routes</h3>
                <div className="space-y-2">
                   {locations.map((loc) => (
                      <div 
                         key={loc.id}
                         onMouseEnter={() => setActiveLocationId(loc.id)}
                         className={`p-3 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-3
                            ${activeLocationId === loc.id 
                               ? "bg-white border-sky-200 shadow-md translate-x-1" 
                               : "bg-transparent border-transparent hover:bg-slate-50"}`}
                      >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeLocationId === loc.id ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"}`}>
                            {loc.id}
                         </div>
                         <div>
                            <h4 className={`font-bold text-xs ${activeLocationId === loc.id ? "text-slate-900" : "text-slate-500"}`}>{loc.name}</h4>
                            <p className="text-[10px] text-slate-400">{loc.sub}</p>
                         </div>
                      </div>
                   ))}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                   <div className="bg-sky-50 rounded-xl p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-white text-sky-500 rounded-full flex items-center justify-center shadow-sm text-xs"><FaBolt/></div>
                      <div>
                         <p className="text-xs font-bold text-sky-900">Route Optimized</p>
                         <p className="text-[10px] text-sky-600">Updated just now</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* 6. CAROUSEL OVERLAY (MOBILE) */}
             <div className="md:hidden absolute bottom-0 left-0 right-0 z-30 pb-6 pt-12 bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent">
                <div className="flex overflow-x-auto gap-3 px-4 snap-x hide-scrollbar">
                   {locations.map((loc) => (
                      <div 
                         key={loc.id}
                         onClick={() => setActiveLocationId(loc.id)}
                         className={`snap-center shrink-0 w-[80%] bg-white p-3 rounded-2xl border shadow-lg transition-all duration-300 flex items-center gap-3
                            ${activeLocationId === loc.id ? "border-sky-400 ring-2 ring-sky-100" : "border-slate-100"}`}
                      >
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activeLocationId === loc.id ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400"}`}>
                            <FaHome />
                         </div>
                         <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-slate-900 truncate">{loc.name}</h4>
                            <div className="flex items-center gap-2 mt-0.5">
                               <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-500">{loc.sub}</span>
                               {activeLocationId === loc.id && <span className="text-[9px] font-bold text-sky-600 uppercase tracking-wide animate-pulse">Live</span>}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* ================== NEW: FRESHNESS TIMELINE ================== */}
      <FreshnessTimeline />

      {/* ================== FOOTER ================== */}
      <section className="relative pt-16 pb-10 px-4 md:px-6 bg-[#fdfcf6]">
        <div className="max-w-5xl mx-auto bg-green-800 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6">Ready to Taste the Difference?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 md:mb-12">
              <a href="https://wa.me/9392814951" className="bg-white text-green-900 px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg flex items-center justify-center gap-2"><FaWhatsapp size={20} className="text-green-600"/> WhatsApp Us</a>
              <a href="tel:+919392814951" className="bg-green-700/50 backdrop-blur-sm text-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg border border-green-500 flex items-center justify-center gap-2"><FaPhoneAlt /> Call Now</a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[{ icon: FaInstagram, link: "https://www.instagram.com/aarogya_harvest", color: "hover:bg-pink-600" }, { icon: FaYoutube, link: "https://www.youtube.com/@aarogyaharvest", color: "hover:bg-red-600" }, { icon: FaFacebookF, link: "https://www.facebook.com/", color: "hover:bg-blue-600" }, { icon: FaEnvelope, link: "mailto:aagrogyaharvest@gmail.com", color: "hover:bg-orange-500" }].map((social, i) => (
                <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/10 transition-all ${social.color}`}><social.icon size={18} className="md:text-xl" /></a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center text-slate-400 text-xs md:text-sm mt-8 md:mt-10">© {new Date().getFullYear()} Aarogya Harvest. Freshness Delivered.</div>
      </section>

      {/* ================== MENU MODAL ================== */}
      {showMenu && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-lg">
          <motion.div initial={{ scale: 0.8, rotateX: 20 }} animate={{ scale: 1, rotateX: 0 }} className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl relative flex flex-col">
              <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setShowMenu(false)} className="w-10 h-10 bg-white/80 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition-all shadow-md backdrop-blur-md"><FaTimes /></button>
              </div>
              <div className="overflow-y-auto h-full bg-[#fdfcf6] custom-scrollbar"><AnimatedMenu /></div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}