export default function ReferEarn() {
  return (
    <div className="relative h-screen overflow-hidden flex items-center justify-center px-6">

      {/* ===== BACKGROUND LAYERS ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-cream to-green-100" />

      {/* Abstract blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-green-200 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-6rem] left-1/3 w-80 h-80 bg-green-300 rounded-full blur-3xl opacity-40" />

      {/* ===== FOREGROUND CONTENT ===== */}
      <div className="relative w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-2xl p-10 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT – MESSAGE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Refer Friends.<br />
            <span className="text-green-800">Earn ₹100 Each.</span>
          </h1>

          <p className="mt-4 text-lg text-gray-700">
            Help your friends build a healthy fruit habit and
            get rewarded every time they subscribe.
          </p>

          {/* Reward Card */}
          <div className="mt-6 inline-block bg-lightgreen rounded-2xl px-8 py-6 shadow">
            <p className="text-sm text-gray-600">You earn</p>
            <p className="text-5xl font-extrabold text-orange-600">₹100</p>
            <p className="text-sm text-gray-600">
              per successful referral
            </p>
          </div>

          {/* CTA */}
          <button
            className="mt-8 w-full md:w-auto bg-green-800 hover:bg-green-900 text-white px-12 py-4 rounded-2xl text-lg font-semibold transition"
          >
            Share with Friends
          </button>

          <p className="mt-3 text-xs text-gray-600">
            Cashback adjusted in next billing cycle
          </p>
        </div>

        {/* RIGHT – HOW IT WORKS */}
        <div className="bg-white rounded-3xl p-8 shadow-lg flex flex-col justify-center">

          <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-6">
            How It Works
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-cream rounded-xl p-4">
              <span className="text-3xl">📲</span>
              <span className="text-gray-800">
                Share your referral link
              </span>
            </div>

            <div className="flex items-center gap-4 bg-cream rounded-xl p-4">
              <span className="text-3xl">🥗</span>
              <span className="text-gray-800">
                Friend subscribes
              </span>
            </div>

            <div className="flex items-center gap-4 bg-cream rounded-xl p-4">
              <span className="text-3xl">💸</span>
              <span className="text-gray-800">
                ₹100 cashback added
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            No limits · Refer unlimited friends
          </p>
        </div>
      </div>
    </div>
  );
}
