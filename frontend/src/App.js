import { useState } from "react";
import QuickCut from "./assets/QuickCut.png";

function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [customAlias, setCustomAlias] = useState(""); // <-- Added state for custom alias
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) return alert("Please enter a URL");
    try {
      const res = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, customAlias }),
      });

      if (res.status === 409) {
        alert("Custom alias already taken. Please choose another one.");
        return;
      }

      const data = await res.text();
      setShortUrl(data);
      setCopied(false);
    } catch (err) {
      alert("Error shortening URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="flex items-center gap-2">
          <img src={QuickCut} alt="QuickCut Logo" className="h-15 w-20" />
          <span className="text-2xl font-bold text-purple-600">QuickCut</span>
        </div>
        <div className="space-x-6 text-gray-600 font-medium">
          <a href="#features" className="hover:text-purple-600">Features</a>
          <a href="#how" className="hover:text-purple-600">How it Works</a>
          <a href="#contact" className="hover:text-purple-600">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-purple-700 mb-4">
          Shorten Your Links in Seconds 🚀
        </h2>
        <p className="text-lg md:text-xl text-gray-700 mb-8">
          Paste your long URL below and get a short, shareable link instantly.
        </p>

        {/* Input + Custom Alias + Button */}
        <div className="w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4">
          <input
            type="text"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            placeholder="Enter your long URL"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="text"
            value={customAlias}
            onChange={(e) => setCustomAlias(e.target.value)}
            placeholder="Optional: Customize your short URL"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={handleShorten}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md"
          >
            Shorten
          </button>
        </div>

        {/* Shortened Link Result */}
        {shortUrl && (
          <div className="mt-6 p-4 bg-purple-50 rounded-xl shadow flex flex-col items-center">
            <a
              href={shortUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className={`mt-3 px-4 py-2 rounded-xl text-white font-semibold ${
                copied ? "bg-green-400" : "bg-purple-400"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-center">
        <h3 className="text-3xl font-bold text-purple-700 mb-8">Why Choose QuickCut?</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          <div className="p-6 bg-purple-50 rounded-xl shadow">
            <h4 className="text-xl font-semibold mb-2">🔗 Simple & Fast</h4>
            <p>Shorten your links in just one click. No signup needed.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl shadow">
            <h4 className="text-xl font-semibold mb-2">⚡ Reliable</h4>
            <p>Fast redirection and highly reliable service.</p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl shadow">
            <h4 className="text-xl font-semibold mb-2">📱 Mobile Friendly</h4>
            <p>Works seamlessly on phones, tablets, and desktops.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 text-center">
        <h3 className="text-3xl font-bold text-purple-700 mb-8">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="text-lg font-semibold">1. Paste</h4>
            <p className="text-gray-600">Enter your long URL in the box.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="text-lg font-semibold">2. Shorten</h4>
            <p className="text-gray-600">Click the button to generate a short link.</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow">
            <h4 className="text-lg font-semibold">3. Share</h4>
            <p className="text-gray-600">Use your new short link anywhere.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-6 bg-white text-center border-t">
        <p className="text-gray-600">
          © 2025 QuickCut. Built with ❤️ using React & Tailwind.
        </p>
      </footer>
    </div>
  );
}

export default HomePage;
