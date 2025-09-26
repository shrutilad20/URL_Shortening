import { useState } from "react";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!longUrl) return alert("Please enter a URL");
    try {
      const res = await fetch("http://localhost:8080/shorten", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: longUrl
      });
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-4 transition-all duration-700">
      <h1 className="text-4xl font-bold mb-8 text-purple-700 animate-pulse">🌸 URL Shortener</h1>
      
      <div className="w-full max-w-md p-6 bg-white rounded-3xl shadow-lg flex flex-col gap-4 animate-fadeIn">
        <input
          type="text"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          placeholder="Enter your long URL"
          className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition-all"
        />

        <button
          onClick={handleShorten}
          className="bg-pink-300 hover:bg-pink-400 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
        >
          Shorten URL
        </button>

        {shortUrl && (
          <div className="flex flex-col items-center gap-2 mt-4 p-4 bg-purple-50 rounded-2xl shadow-inner animate-bounce">
            <a href={shortUrl} target="_blank" className="text-blue-600 font-medium hover:underline">
              {shortUrl}
            </a>
            <button
              onClick={handleCopy}
              className={`mt-2 px-4 py-2 rounded-xl text-white font-semibold ${copied ? 'bg-green-400' : 'bg-purple-300'} transition-colors duration-300`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
