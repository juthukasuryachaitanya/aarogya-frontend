import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Standard UI Icons (FontAwesome)
import {
  FaPhoneAlt, FaWhatsapp, FaEnvelope, FaFacebookF, FaInstagram, FaYoutube,
  FaCheck, FaCrown, FaAppleAlt, FaSeedling, FaTimes, FaStar, 
  FaLeaf, FaShoppingBasket, FaTag, FaInfoCircle, FaCalendarAlt, FaMoneyBillWave, 
  FaBoxOpen
} from "react-icons/fa";

// --- MOCK DATA FOR PLANS ---
const plans = [
  {
    id: "lite",
    name: "Aarogya Lite",
    price: 1499,
    displayPrice: "1,499",
    unit: "/ mo",
    qty: "240g",
    qtyLabel: "bowl",
    ideal: "For Beginners",
    icon: FaSeedling,
    color: "text-green-600",
    gradient: "from-green-50 to-emerald-50",
    border: "border-green-100",
    btnColor: "bg-green-600 hover:bg-green-700",
    points: [
      "fresh Regular fruits (5 varieties)",
      "Light healthy portion",
      "Perfect daily habit starter",
      "Menu keeps changing everyday"
    ],
    details: "The perfect entry point for health-conscious individuals. Enjoy a daily mix of seasonal favorites like Watermelon, Papaya, and Musk Melon.",
    sampleMenu: ["Imported Apple", "Pomegranate", "Banana", "Papaya","Guava","Watermelon","grapes","Muskmelon","Pineapple","Orange"]
  },
  {
    id: "classic",
    name: "Aarogya Classic",
    price: 1999,
    displayPrice: "1,999",
    unit: "/ mo",
    qty: "390g",
    qtyLabel: "bowl",
    ideal: "Most Popular",
    popular: true,
    icon: FaAppleAlt,
    color: "text-orange-500",
    gradient: "from-orange-50 to-amber-50",
    border: "border-orange-100",
    btnColor: "bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-lg",
    points: [
      "Balanced fruit mix (5 varieties)",
      "Seasonal fruits varies season to season",
      "Ideal nutrition boost",
      "Best value for money"
    ],
    details: "Our best-selling plan. Designed for balanced nutrition, offering a wide variety of both seasonal staples and exotic treats like Kiwi and Dragon Fruit.",
    sampleMenu: ["Pomegranate", "Imported Apple", "Guava", "Custard Apple", "Pineapple","Jackfruits","Sapota","Mango","Orange","Grapes-Black(seedless)","Grapes-Green","Carrot","Beetroot","Cucumber","Sprouts"]
  },
  {
    id: "premium",
    name: "Aarogya Premium",
    price: 2499,
    displayPrice: "2,499",
    unit: "/ mo",
    qty: "560g",
    qtyLabel: "bowl",
    ideal: "Max Nutrition",
    icon: FaCrown,
    color: "text-purple-600",
    gradient: "from-purple-50 to-fuchsia-50",
    border: "border-purple-100",
    btnColor: "bg-gray-900 hover:bg-black",
    points: [
      "Premium Selection (5+ varieties)",
      "Daily Exotic fruits included",
      "Maximum fruit variety & quantity",
      "Priority customer support"
    ],
    details: "For those who compromise on nothing. Experience the luxury of daily exotic fruits, larger portions, and our widest variety of nutrient-dense options.",
    sampleMenu: ["Pears", "Dragon Fruit", "Imported Apple", "Kiwi", "Pomegranate","Avocado","Soaked Almonds", "Dates", "Walnuts", "Cashews","Jackfruits","Sapota","Mango","Orange","Grapes-Black(seedless)","Grapes-Green","Carrot","Beetroot","Cucumber","Sprouts","Papaya","Guava","Watermelon","Muskmelon","Pineapple"]
  },
  {
    id: "whole",
    name: "Whole Basket",
    displayPrice: "Wholesale",
    unit: "Rates",
    qty: "Min 2KG",
    qtyLabel: "order",
    ideal: "For Families",
    icon: FaShoppingBasket,
    color: "text-blue-600",
    gradient: "from-blue-50 to-cyan-50",
    border: "border-blue-100",
    btnColor: "bg-blue-600 hover:bg-blue-700",
    points: [
      "Buy individual fruits by Kg/Dozen",
      "Beat Market Prices",
      "Wash & eat at your convenience",
      "Weekly bulk delivery"
    ],
    details: "Love cutting your own fruit? Order farm-fresh whole fruits by the kilo at wholesale rates. Perfect for large families or storing fruits for the whole week.",
    sampleMenu: [],
    policy: {
      minOrder: "2KG",
      delivery: "Fixed: Sunday & Thursday",
      paymentTerms: [
        "50% Advance at Booking",
        "Remaining 50% at Delivery",
        "Order confirmed after advance payment"
      ]
    }
  }
];

// --- MARKET RATES DATA (Updated with Images) ---
const marketRates = [
  { 
    name: "Imported Apple", 
    marketPrice: 300, 
    ourPrice: 230, 
    unit: "kg", 
    img: "/assets/apple.png" 
  },
  { 
    name: "Pomegranate", 
    marketPrice: 300, 
    ourPrice: 230, 
    unit: "kg", 
    img: "/assets/pomegranate.png"
  },
  { 
    name: "Pineapple(depends on size)", 
    marketPrice: 80, 
    ourPrice: 60, 
    unit: "pc", 
    img: "/assets/pineapple.png"
  },
  { 
    name: "Papaya", 
    marketPrice: 60, 
    ourPrice: 40, 
    unit: "kg", 
    img: "/assets/papaya.png"
  },
  { 
    name: "Watermelon", 
    marketPrice: 50, 
    ourPrice: 35, 
    unit: "kg", 
    img: "/assets/watermelon.png"
  },
  { 
    name: "Guava", 
    marketPrice: 120, 
    ourPrice: 80, 
    unit: "kg", 
    img: "/assets/guava.png"
  },
  { 
    name: "Sapota", 
    marketPrice: 70, 
    ourPrice: 50, 
    unit: "kg", 
    img: "/assets/sapota.png"
  },
  { 
    name: "Muskmelon", 
    marketPrice: 50, 
    ourPrice: 35, 
    unit: "kg", 
    img: "/assets/muskmelon.png"
  },
  { 
    name: "Orange", 
    marketPrice: 100, 
    ourPrice: 75, 
    unit: "kg", 
    img: "/assets/orange.png"
  },
  { 
    name: "Black Grapes", 
    marketPrice: 220, 
    ourPrice: 170, 
    unit: "kg", 
    img: "/assets/grapes-black.png"
  },
  { 
    name: "Green Grapes", 
    marketPrice: 160, 
    ourPrice: 120, 
    unit: "kg", 
    img: "/assets/grapes-green.png"
  },
  { 
    name: "Pears", 
    marketPrice: 450, 
    ourPrice: 350, 
    unit: "kg", 
    img: "/assets/pears.png"
  },
  { 
    name: "Kiwi(depends on size)", 
    marketPrice: 50, 
    ourPrice: 30, 
    unit: "pc", 
    img: "/assets/kiwi.png"
  },
  { 
    name: "Dragon Fruit(depends on size)", 
    marketPrice: 130, 
    ourPrice: 100, 
    unit: "pc", 
    img: "/assets/dragon-fruit.png"
  },
  { 
    name: "Avocado(depends on size)", 
    marketPrice: 180, 
    ourPrice: 140, 
    unit: "pc", 
    img: "/assets/avacado.png"
  },
];

const testimonials = [
  { name: "Suresh K.", text: "The freshness is unmatched. My morning routine is finally fixed!", rating: 5 },
  { name: "Priya M.", text: "Love the Classic plan. The exotic fruits are a nice surprise.", rating: 5 },
  { name: "Rahul D.", text: "Timely delivery every single day. Highly recommend.", rating: 4 },
];

export default function Plans() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <div className="min-h-screen font-sans selection:bg-green-200 bg-[#fdfcf6] text-slate-800">
      
      {/* ================= HEADER SECTION ================= */}
      <div style={{marginTop:"-90px"}} className="relative pt-28 pb-20 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-green-200/20 rounded-[100%] blur-3xl -z-10 animate-pulse"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">
          <span className="inline-block py-1.5 px-4 rounded-full bg-white border border-green-200 text-green-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">Simple, Transparent Pricing</span>
          <h1 style={{marginTop:"-20px"}} className="text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-6">Invest in your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Health.</span></h1>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed">Zero chopping. Zero waste. Just fresh, hand-picked fruits and mixed varieties delivered to your doorstep every morning.</p>
        </motion.div>
      </div>

      {/* ================= PRICING CARDS ================= */}
      <div style={{marginTop:"-40px"}} className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isPop = plan.popular;
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -10 }}
                className={`relative group bg-white rounded-[2.5rem] transition-all duration-500 flex flex-col overflow-hidden cursor-pointer h-full ${isPop ? "shadow-2xl shadow-orange-500/20 border-2 border-orange-100 z-10 scale-105" : "shadow-xl border border-gray-100 hover:shadow-2xl hover:border-green-100"}`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className={`absolute inset-0 bg-gradient-to-b ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
                {isPop && <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl z-20 tracking-wider">MOST POPULAR</div>}
                <div className="p-6 md:p-8 flex-1 relative z-10 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl bg-white shadow-sm border ${plan.border} flex items-center justify-center text-xl ${plan.color}`}><Icon /></div>
                    <div className="text-right"><span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.ideal}</span></div>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    {plan.id !== 'whole' && <span className="text-lg font-bold text-slate-400">₹</span>}
                    <span className={`text-4xl font-black tracking-tighter ${isPop ? 'text-slate-900' : 'text-slate-800'}`}>{plan.displayPrice}</span>
                    <span className="text-slate-400 font-medium text-xs">{plan.unit}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 border border-slate-100 backdrop-blur-sm mb-6 w-fit">
                      <FaLeaf className="text-green-500 text-xs" /><span className="text-slate-900 font-bold text-sm">{plan.qty}</span><span className="text-slate-400 text-xs">{plan.qtyLabel}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-600 leading-relaxed">
                        <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${isPop ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}><FaCheck size={8} /></div>{point}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 text-sm ${plan.btnColor}`}>View Details</button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ================= LIVE MARKET RATES ================= */}
      <section className="py-12 bg-white border-y border-slate-100 mb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-100 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-pink-600 text-white p-4 rounded-2xl shadow-lg transform -rotate-3"><FaTag size={28} /></div>
            </div>
            <div>
              <div className="flex flex-col md:flex-row items-center gap-3 mb-1">
                <h3 className="text-2xl md:text-3xl font-black text-slate-900">Beat Market Prices</h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 border border-green-200 text-xs font-black uppercase tracking-widest shadow-sm"><FaCheck className="mr-1.5" size={10} /> Guaranteed Savings</span>
              </div>
              <p className="text-slate-500 text-base md:text-lg max-w-2xl">We guarantee our prices are <span className="font-bold text-slate-900 ">significantly lower at Minimum 20% off</span> than your local market rates.</p>
            </div>
        </div>
        <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="flex gap-4 overflow-x-auto pb-6 px-6 snap-x hide-scrollbar">
              {marketRates.map((item, index) => {
                  // DYNAMIC DISCOUNT CALCULATION
                  const discount = Math.round(((item.marketPrice - item.ourPrice) / item.marketPrice) * 100);
                  
                  return (
                    <div key={index} className="snap-center shrink-0 w-48 p-5 rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-100/50 flex flex-col items-center justify-between text-center relative overflow-hidden hover:border-green-300 transition-all group">
                      
                      {/* Dynamic Discount Badge */}
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-xl z-10 shadow-sm">
                        -{discount}%
                      </div>
                      
                      {/* Image Container */}
                      <div className="w-20 h-20 mb-3 flex items-center justify-center p-2">
                          <img 
                            src={item.img} 
                            alt={item.name} 
                            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                               e.target.onerror = null; 
                               e.target.src = "https://cdn-icons-png.flaticon.com/512/3081/3081986.png"; 
                            }}
                          />
                      </div>

                      <h4 className="font-black text-slate-800 text-md leading-tight mb-3 h-10 flex items-center justify-center">{item.name}</h4>
                      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-xl border border-green-100 w-full justify-center">
                          <div className="flex flex-col items-end"><span className="text-[10px] text-red-400 line-through decoration-red-400 font-bold opacity-70">₹{item.marketPrice}</span></div>
                          <div className="text-xl font-black text-green-700 leading-none">₹{item.ourPrice}</div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-2">per {item.unit}</span>
                    </div>
                  );
              })}
            </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      {/* <div style={{marginTop:"-70px"}} className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
           <h3 className="text-center text-2xl font-bold text-slate-900 mb-12">Trusted by 500+ Neighbors</h3>
           <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                 <div key={i} className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                    <div className="flex text-yellow-400 text-sm mb-4">{[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}</div>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wide">- {t.name}</p>
                 </div>
              ))}
           </div>
        </div>
      </div> */}

      {/* ================= CONTACT SECTION ================= */}
      <div style={{marginTop:"-70px"}} className="py-24 px-4 sm:px-6 relative">
         <div className="max-w-4xl mx-auto relative">
            <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center relative overflow-hidden border border-slate-100">
               <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -translate-x-1/2 -translate-y-1/2"></div>
               <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 translate-x-1/2 translate-y-1/2"></div>
               <div className="relative z-10">
                  <div className="inline-block p-3 rounded-2xl bg-slate-50 mb-6"><FaPhoneAlt className="text-2xl text-slate-700" /></div>
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Have questions before subscribing?</h2>
                  <p className="text-slate-500 text-lg mb-10 max-w-xl mx-auto">Not sure which plan fits your diet? Need to customize for allergies? Chat with our nutrition expert directly.</p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <a href="https://wa.me/9392814951" target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-3"><FaWhatsapp size={24} /> Chat on WhatsApp</a>
                     <a href="tel:+919392814951" className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-100 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3"><FaPhoneAlt size={18} className="text-slate-400" /> +91 9392 814 951</a>
                  </div>
                  <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-center gap-6">
                     <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">Connect with us</span>
                     <div className="flex gap-4">
                        {[{ icon: FaInstagram, link: "https://www.instagram.com/aarogya_harvest", color: "text-pink-600 bg-pink-50" }, { icon: FaFacebookF, link: "https://www.facebook.com/", color: "text-blue-600 bg-blue-50" }, { icon: FaYoutube, link: "https://www.youtube.com/@aarogyaharvest", color: "text-red-600 bg-red-50" }, { icon: FaEnvelope, link: "mailto:aagrogyaharvest@gmail.com", color: "text-orange-600 bg-orange-50" }].map((social, i) => (
                           <a key={i} href={social.link} target="_blank" rel="noreferrer" className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:-translate-y-1 ${social.color}`}><social.icon size={20} /></a>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* ================= PLAN DETAILS MODAL ================= */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedPlan(null)} />
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl custom-scrollbar">
              <div className={`p-8 bg-gradient-to-r ${selectedPlan.gradient} relative overflow-hidden`}>
                <button onClick={() => setSelectedPlan(null)} className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-20"><FaTimes /></button>
                <div className="relative z-10 flex gap-6 items-center">
                   <div className={`w-20 h-20 rounded-2xl bg-white shadow-sm flex items-center justify-center text-3xl ${selectedPlan.color}`}><selectedPlan.icon /></div>
                   <div><h2 className="text-3xl font-black text-slate-900">{selectedPlan.name}</h2><p className="text-slate-500 font-medium">{selectedPlan.ideal}</p></div>
                </div>
              </div>
              <div className="p-8">
                 <div className="mb-8"><h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Description</h4><p className="text-slate-600 leading-relaxed">{selectedPlan.details}</p></div>
                 
                 {/* --- WHOLESALE POLICY SECTION (Dynamic) --- */}
                 {selectedPlan.policy && (
                    <div className="mb-8 p-6 bg-blue-50 rounded-2xl border border-blue-100">
                       <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-4 flex items-center gap-2"><FaInfoCircle /> Aarogya Wholesale Policy</h4>
                       <div className="space-y-4">
                          <div className="flex items-start gap-4">
                             <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0"><FaBoxOpen /></div>
                             <div><span className="block text-xs font-bold text-blue-400 uppercase">Minimum Order</span><span className="font-bold text-slate-800">{selectedPlan.policy.minOrder}</span></div>
                          </div>
                          <div className="flex items-start gap-4">
                             <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0"><FaCalendarAlt /></div>
                             <div><span className="block text-xs font-bold text-blue-400 uppercase">Delivery Days</span><span className="font-bold text-slate-800">{selectedPlan.policy.delivery}</span></div>
                          </div>
                          <div className="flex items-start gap-4">
                             <div className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center shadow-sm shrink-0"><FaMoneyBillWave /></div>
                             <div>
                                <span className="block text-xs font-bold text-blue-400 uppercase">Payment Policy</span>
                                <ul className="text-sm text-slate-700 space-y-1 mt-1">{selectedPlan.policy.paymentTerms.map((term, idx) => (<li key={idx} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-400 rounded-full"/> {term}</li>))}</ul>
                             </div>
                          </div>
                       </div>
                    </div>
                 )}

                 {/* Hide sample menu for wholesale to reduce clutter */}
                 {!selectedPlan.policy && (
                   <div className="mb-8">
                      <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">What's in the bowl? (Sample)</h4>
                      <div className="flex flex-wrap gap-2">{selectedPlan.sampleMenu.map((item, i) => (<span key={i} className="px-3 py-1.5 bg-stone-100 text-slate-700 rounded-lg text-sm font-medium border border-stone-200">{item}</span>))}</div>
                   </div>
                 )}

                 <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div><span className="block text-xs text-slate-400 font-bold uppercase">Total Price</span><div className="flex items-baseline gap-1"><span className="text-3xl font-black text-slate-900">{selectedPlan.id !== 'whole' && "₹"}{selectedPlan.displayPrice}</span><span className="text-sm text-slate-500">{selectedPlan.unit}</span></div></div>
                    <a href={`https://wa.me/919392814951?text=Hi, I am interested in the ${selectedPlan.name} plan. Can you please share more details?`} target="_blank" rel="noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">Contact Now <FaWhatsapp size={22} /></a>
                 </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="bg-white border-t border-slate-100 py-8 text-center text-slate-400 text-sm"><p>© {new Date().getFullYear()} Aarogya Harvest. Freshness Delivered.</p></footer>
    </div>
  );
}