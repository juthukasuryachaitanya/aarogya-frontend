import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const images = [
    "/assets/aarogya-logo-1.jpeg",
    "/assets/aarogya-menu.jpeg",
    "/assets/aarogya-plan-prices.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

  {/* ================= TRUST BAR ================= */}
  <section className="bg-gradient-to-r from-green-600 to-green-700 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          ["Subscription Model", "Consistency"],
          ["Daily Routine", "Habit-driven"],
          ["Reliable Operations", "Predictable"],
          ["Customer Control", "No lock-in"],
        ].map(([title, value], i) => (
          <div key={i}>
            <p className="text-xs sm:text-sm font-semibold uppercase opacity-90">
              {title}
            </p>
            <p className="text-base sm:text-lg font-bold">{value}</p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ================= HERO ================= */}
  <section className="flex-1 flex items-center">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 grid md:grid-cols-2 gap-10 items-center">

      {/* Left Content */}
      <div>
        <span className="inline-block mb-4 px-4 py-1 text-xs sm:text-sm font-semibold text-green-700 bg-green-100 rounded-full">
          Daily Fruit Subscription 🍎
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Fresh Fruit Bowls,
          <br />
          <span className="text-green-600">Delivered Every Morning</span>
        </h2>

        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl">
          Hand-cut fresh fruits prepared every morning and delivered before
          <strong> 8:30 AM</strong>. No daily ordering. No compromises.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/plans")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg"
          >
            View Plans
          </button>

          <button
            onClick={() => setShowMenu(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg"
          >
            Menu
          </button>
        </div>
      </div>

      {/* Right Visual Card */}
      <div className="relative h-64 sm:h-72 md:h-[420px] overflow-hidden rounded-3xl shadow-xl">
        {images.map((img, index) => (
          <img
            key={img}
            src={img}
            alt="Aarogya Slide"
            className={`
              absolute inset-0 w-full h-full object-contain
              transition-all duration-1000 ease-in-out
              ${index === current
                ? "opacity-100 translate-x-0 scale-100"
                : "opacity-0 translate-x-8 scale-105"}
            `}
          />
        ))}
      </div>
    </div>
  </section>

  {/* ================= WHY SECTION ================= */}
  <section className="px-4 sm:px-6">
    <div className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 text-center">
        Why <span className="text-green-600">Aarogya Harvest</span>?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          ["Fresh Every Morning", "Prepared daily, never stored"],
          ["100% Natural", "No preservatives or added sugar"],
          ["Hygienic Preparation", "Clean, safe & sealed packing"],
          ["Morning Delivery", "Delivered before 8:30 AM"],
          ["Flexible Subscription", "Pause or resume anytime"],
          ["6 Days a Week Delivery", "A consistent weekday routine"],
          ["Community Friendly", "Perfect for gated communities"],
          ["Reliable Quality", "Consistent taste & freshness"],
        ].map(([title, desc], i) => (
          <div
            key={i}
            className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-green-50 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold shadow">
              ✓
            </div>
            <div>
              <p className="font-semibold text-gray-900">{title}</p>
              <p className="text-sm text-gray-600 mt-1">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* ================= DELIVERY AREAS ================= */}
  <section style={{marginTop:"20px"}} className="bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <h3 className="text-22l font-extrabold text-gray-900 text-center mb-3">
        Currently Delivering n
      </h3>

      <p className="text-center text-gray-600 mb-12">
        We are actively serving select gated communities in Hyderabad
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {[1,2,3,4,5,6].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
              📍
            </div>
            <p className="font-semibold text-gray-900">Aparna Serene Park</p>
            <p className="text-sm text-gray-600 mt-1">Kondapur, Hyderabad</p>
          </div>
        ))}
      </div>
    </div>
  </section>

{/* ================= CONTACT SECTION ================= */}
<section className="bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">

    <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-3">
      Get in Touch
    </h3>

    <p className="text-center text-gray-600 mb-10 sm:mb-14">
      Questions, subscriptions, or community onboarding — we’re happy to help.
    </p>

    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">

      {/* ===== Contact Details Card ===== */}
      <div className="bg-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition">
        <p className="font-semibold text-gray-900 mb-6">
          Contact Details
        </p>

        <div className="space-y-5 text-gray-700">

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <FaPhoneAlt size={16} />
            </div>
            <span className="font-medium break-all">
              +91 9392814951
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <FaWhatsapp size={18} />
            </div>
            <span className="font-medium break-all">
              +91 9392814951
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <FaEnvelope size={16} />
            </div>
            <span className="font-medium break-all">
              aagrogyaharvest@gmail.com
            </span>
          </div>

        </div>
      </div>

      {/* ===== WhatsApp CTA Card ===== */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-6 text-white shadow-lg flex flex-col justify-between">
        <div>
          <p className="font-semibold text-lg mb-2">
            Prefer WhatsApp?
          </p>
          <p className="text-sm opacity-90">
            Fastest way to start or manage your subscription.
          </p>
        </div>

        <a
          href="https://wa.me/9392814951"
          target="_blank"
          rel="noreferrer"
          className="mt-6 bg-white text-green-700 text-center py-3 rounded-xl font-semibold hover:bg-green-50 transition"
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* ===== Social Media Card ===== */}
      <div className="bg-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-xl transition text-center">
        <p className="font-semibold text-gray-900 mb-6">
          Follow Us
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
            className="w-12 h-12 rounded-full bg-green-100 text-green-600
                       flex items-center justify-center
                       hover:bg-green-600 hover:text-white
                       transition-all duration-300"
          >
            <FaFacebookF size={18} />
          </a>

          <a
            href="https://www.instagram.com/aarogya_harvest?igsh=MXRvdjM3OXo1NnplNA=="
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="w-12 h-12 rounded-full bg-green-100 text-green-600
                       flex items-center justify-center
                       hover:bg-green-600 hover:text-white
                       transition-all duration-300"
          >
            <FaInstagram size={18} />
          </a>

          <a
            href="https://www.youtube.com/@aarogyaharvest"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
            className="w-12 h-12 rounded-full bg-green-100 text-green-600
                       flex items-center justify-center
                       hover:bg-green-600 hover:text-white
                       transition-all duration-300"
          >
            <FaYoutube size={18} />
          </a>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          Updates, menus & behind-the-scenes
        </p>
      </div>

    </div>
  </div>
</section>

  {/* ================= FOOTER ================= */}
  <footer className="bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 text-center text-sm text-white-500">
      © {new Date().getFullYear()} Aarogya Harvest · Fresh Fruits, Done Right
    </div>
  </footer>
 {/* ================= MENU MODAL ================= */}
{showMenu && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">

    {/* Modal container */}
    <div className="relative bg-white rounded-3xl shadow-2xl
                    w-full max-w-5xl h-[90vh]
                    flex flex-col">

      {/* Close button */}
      <button
        onClick={() => setShowMenu(false)}
        className="absolute top-4 right-4 w-10 h-10 rounded-full
                   flex items-center justify-center
                   text-gray-600 hover:text-gray-900
                   hover:bg-gray-100 transition"
        aria-label="Close menu"
      >
        ✕
      </button>

      {/* Title */}
      <h3 className="text-2xl font-bold text-center mt-6 mb-4 text-gray-900">
        Our Menu
      </h3>

      {/* Image area */}
      <div className="flex-1 flex items-center justify-center px-4 pb-6">
        <img
          src="/assets/aarogya-menu-2.png"
          alt="Aarogya Menu"
          className="max-h-full max-w-full object-contain rounded-xl"
        />
      </div>

    </div>
  </div>
)}

</div>

  );
}
