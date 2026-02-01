import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col">
      
      {/* ================= HEADER ================= */}
      {/* <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-green-700 tracking-tight">
            Aarogya Harvest
          </h1>
          <button
            onClick={() => navigate("/my-subscription")}
            className="text-sm font-semibold text-green-700 hover:text-green-900"
          >
            My Subscription
          </button>
        </div>
      </header> */}

      {/* ================= HERO ================= */}
      <section className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
              Daily Fruit Subscription 🍎
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
              Fresh Fruit Bowls,
              <br />
              <span className="text-green-600">Delivered Every Morning</span>
            </h2>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Hand-cut fresh fruits prepared every morning and delivered before
              <strong> 8:30 AM</strong>.  
              No daily ordering. No compromises. Just clean, healthy habits.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/plans")}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg"
              >
                View Plans
              </button>

              {/* <button
                onClick={() => navigate("/subscribe")}
                className="border border-green-600 text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50"
              >
                Subscribe Now
              </button> */}
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-xl p-8 border">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Why Aarogya Harvest?
              </h3>

              <ul className="space-y-5 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <span>Freshly cut fruits every single morning</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <span>No preservatives, no added sugar</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <span>Perfect for homes & gated communities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-600 text-xl">✔</span>
                  <span>Pause or resume anytime</span>
                </li>
              </ul>
            </div>

            {/* Decorative Glow */}
            <div className="absolute -z-10 -top-10 -right-10 w-40 h-40 bg-green-200 rounded-full blur-3xl"></div>
          </div>

        </div>
      </section>

      {/* ================= TRUST BAR ================= */}
      <section className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold">100%</p>
            <p className="text-sm opacity-90">Fresh Fruits</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">8:30 AM</p>
            <p className="text-sm opacity-90">Morning Delivery</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">Daily</p>
            <p className="text-sm opacity-90">Cut & Packed</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">Easy</p>
            <p className="text-sm opacity-90">Pause / Resume</p>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Aarogya Harvest · Fresh Fruits, Done Right
        </div>
      </footer>
    </div>
  );
}
