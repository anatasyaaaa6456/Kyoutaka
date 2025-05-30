import { useState, useEffect } from "react";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [playMusic, setPlayMusic] = useState(false);

  // Countdown to January 5, 2035
  useEffect(() => {
    const targetDate = new Date("January 5, 2035 00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % 1000) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Welcome message
  useEffect(() => {
    const name = prompt("Siapa nama kamu?");
    setUserName(name || "Pengunjung");
  }, []);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Play music
  const audioRef = useState(new Audio("https://files.catbox.moe/yrufso.mp3"))[0]; 

  const toggleMusic = () => {
    setPlayMusic(!playMusic);
    if (!playMusic) {
      audioRef.play().catch(() => {});
    } else {
      audioRef.pause();
    }
  };

  const stories = [
    {
      title: "ANTAKA",
      cover: "https://files.catbox.moe/9z4sct.jpg", 
      pdfLink: "https://cloudgood.web.id/file/Cxc4k8q.pdf", 
    },
  ];

  const skills = [
    { name: "Coding", level: 70 },
    { name: "Baca Buku", level: 85 },
    { name: "Menulis Cerita", level: 90 },
    { name: "Gaming", level: 75 },
  ];

  const MenuButton = ({ label }) => (
    <button
      onClick={() => {
        setActiveMenu(label.toLowerCase().replace(/\s+/g, "-"));
        document.getElementById("menu-dropdown").classList.add("hidden");
      }}
      className="block w-full text-left px-4 py-2 hover:bg-purple-700 transition-all duration-300"
    >
      {label}
    </button>
  );

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMessage = { role: "user", text: chatInput };
    const aiResponse = getAIResponse(chatInput);
    setChatLog([...chatLog, userMessage, aiResponse]);
    setChatInput("");
  };

  const getAIResponse = (message) => {
    message = message.toLowerCase();
    let reply = "";

    if (message.includes("hai") || message.includes("halo")) {
      reply = `Halo, ${userName}! Saya Kezz AI. Ada yang bisa saya bantu?`;
    } else if (message.includes("karya")) {
      reply = "Saat ini tersedia satu cerita utama berjudul 'ANTAKA' dalam format PDF.";
    } else if (message.includes("profil") || message.includes("about")) {
      reply = "Kyoutaka, atau Januar Pratama. Moto hidup: 'Bekerja seenak jidat'.";
    } else if (message.includes("kontak")) {
      reply = "WhatsApp: +62 889-8096-3797 | Email: jahraatasya@gmail.com";
    } else if (message.includes("rundown")) {
      reply = `Masih tersisa ${timeLeft.days} hari hingga 5 Januari 2035.`;
    } else if (message.includes("kemampuan")) {
      reply = "Kemampuan: Coding 70%, Baca Buku 85%, Menulis 90%, Gaming 75%";
    } else {
      reply = "Maaf, saya belum bisa memahami itu. Coba tanyakan tentang profil, karya, rundown, kemampuan, kontak, atau komentar.";
    }

    return { role: "ai", text: reply };
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    setComments([
      ...comments,
      { user: userName, text: commentInput, time: new Date().toLocaleTimeString() }
    ]);
    setCommentInput("");
  };

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 text-2xl">⚡</div>
            </div>
            <h1 className="text-3xl font-bold text-red-400 mb-2">KEZZ LOADING...</h1>
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-purple-500 animate-pulse"></div>
            </div>
            <p className="mt-4 text-sm text-gray-400">Mengaktifkan sistem...</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
          {/* Neon Glow CSS */}
          <style>{`
            @keyframes flicker {
              0%, 18%, 22%, 25%, 53%, 57%, 100% { opacity: 1; }
              20%, 24%, 55% { opacity: 0.4; }
            }
            .shadow-glow {
              box-shadow: 0 0 10px #a855f7, 0 0 20px #c084fc;
              animation: flicker 2s infinite;
            }
            .float {
              animation: floatUp 3s ease-in-out infinite;
            }
            @keyframes floatUp {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
          `}</style>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="fixed bottom-4 right-4 z-50 text-red-400 hover:text-red-300 text-2xl"
          >
            {playMusic ? "🔊" : "🔇"}
          </button>

          {/* Navigation Bar */}
          <nav className="p-6 flex justify-between items-center border-b border-red-900 backdrop-blur-md bg-black/70 fixed top-0 left-0 right-0 z-40">
            <h1 className="text-2xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-white to-red-500">
              Kyoutaka / Januar
            </h1>
            <button
              onClick={() =>
                document.getElementById("menu-dropdown").classList.toggle("hidden")
              }
              className="text-2xl font-bold text-red-400"
            >
              &spades;
            </button>
          </nav>

          {/* Dropdown Menu */}
          <div
            id="menu-dropdown"
            className="fixed top-16 right-6 p-2 bg-gray-900 rounded shadow-glow hidden z-40 border border-red-800 min-w-[160px]"
          >
            <ul>
              <li><MenuButton label="Profile" /></li>
              <li><MenuButton label="About Me" /></li>
              <li><MenuButton label="Rundown" /></li>
              <li><MenuButton label="Kemampuan" /></li>
              <li><MenuButton label="Karya" /></li>
              <li><MenuButton label="Bounty" /></li>
              <li><MenuButton label="Kontak" /></li>
              <li><MenuButton label="Chat Kezz AI" /></li>
              <li><MenuButton label="Komentar" /></li>
              <li><MenuButton label="Rekomendasi Kyoutaka" /></li>
              <li><MenuButton label="Saluran WhatsApp" /></li>
            </ul>
          </div>

          {/* Main Content */}
          <main className="container mx-auto p-6 pt-24">
            {activeMenu === "home" && (
              <section className="text-center pt-20">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white animate-pulse">
                  Kyoutaka.html
                </h1>
                <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
                  Selamat datang di dunia cyberpunk dan imajinasi tak terbatas.
                </p>
              </section>
            )}

            {activeMenu === "profile" && (
              <section className="max-w-4xl mx-auto pt-10">
                <div className="flex flex-col md:flex-row items-center gap-10 relative">
                  <img
                    src="https://files.catbox.moe/2ucirg.jpg" 
                    alt="Profile"
                    className="w-40 h-40 rounded-full border-4 border-white shadow-glow object-cover"
                  />

                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold neon-text text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-white">
                      Kyoutaka / Januar Pratama
                    </h2>
                    <p className="text-xl text-red-400 mt-2">Penulis Cyberpunk & Santai Jiwa</p>
                    <p className="mt-4 text-gray-300">
                      Halo semua! Aku Kyoutaka, atau lebih dikenal sebagai Januar.
                      Aku hanya seorang anak yang kebetulan numpang lewat di dunia ini,
                      dengan moto hidup: “Bekerja seenak jidat”.
                    </p>
                    <p className="mt-2 text-gray-400 italic">
                      Aku percaya bahwa hidup ini harus dinikmati dengan santai dan tidak terlalu serius,
                      karena bagaimanapun juga, kita hanya numpang lewat di dunia ini.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {activeMenu === "about-me" && (
              <section className="max-w-3xl mx-auto pt-10">
                <div className="bg-gray-900 p-6 rounded-lg border border-red-800 shadow-glow">
                  <h2 className="text-3xl font-bold mb-4">Tentang Diri Saya</h2>
                  <p className="mb-4">
                    Halo semua! Aku Kyoutaka, atau lebih dikenal sebagai Januar.
                    Aku hanya seorang anak yang kebetulan numpang lewat di dunia ini,
                    dengan moto hidup "Bekerja seenak jidat".
                  </p>
                  <p className="mb-4">
                    Aku tidak terlalu suka dengan rutinitas yang membosankan,
                    dan selalu mencari cara untuk membuat hidupku lebih menarik dan menyenangkan.
                  </p>
                  <p className="text-red-400">
                    Jadi, jika kamu ingin tahu lebih tentang aku,
                    aku adalah seseorang yang suka mencoba hal-hal baru,
                    punya rasa ingin tahu tinggi, dan selalu mencari cara untuk meningkatkan diri.
                    Aku juga suka bersantai, menikmati waktu luang, dan melakukan hal-hal yang membuatku bahagia.
                  </p>
                  <p className="mt-4 text-gray-300">
                    Yoroshiku onegaishimasu! (よろしくお願いします)
                  </p>
                </div>
              </section>
            )}

            {activeMenu === "rundown" && (
              <section className="max-w-xl mx-auto pt-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Hitung Mundur Sampai 5 Januari 2035</h2>
                <div className="inline-flex gap-4 text-2xl font-mono mt-6 bg-gray-900 p-4 rounded shadow-glow">
                  <span>{timeLeft.days}d</span>
                  <span>{timeLeft.hours}h</span>
                  <span>{timeLeft.minutes}m</span>
                  <span>{timeLeft.seconds}s</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">menuju 5 Januari 2035</p>
              </section>
            )}

            {activeMenu === "kemampuan" && (
              <section className="max-w-2xl mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-4">Kemampuan</h2>
                {skills.map((skill, i) => (
                  <div key={i} className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 to-purple-500 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {activeMenu === "karya" && (
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
                {stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 p-4 rounded-lg border border-red-700 hover:border-red-500 transition-all shadow-glow"
                  >
                    <img
                      src={story.cover}
                      alt={story.title}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg font-semibold">{story.title}</h3>
                    <a
                      href={story.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-red-400 hover:text-red-300"
                    >
                      Baca Cerpen (PDF)
                    </a>
                  </div>
                ))}
              </section>
            )}

            {activeMenu === "bounty" && (
              <section className="max-w-xl mx-auto pt-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Poster Bounty</h2>
                <img
                  src="https://files.catbox.moe/8zbj18.jpg" 
                  alt="Bounty Poster"
                  className="mx-auto w-full max-w-sm rounded shadow-lg"
                />
              </section>
            )}

            {activeMenu === "rekomendasi-kyoutaka" && (
              <section className="max-w-3xl mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-4">Rekomendasi Kyoutaka</h2>
                <video controls className="w-full rounded shadow-lg">
                  <source src="https://files.catbox.moe/21kuai.mp4"  type="video/mp4" />
                  Browser Anda tidak mendukung video.
                </video>
              </section>
            )}

            {activeMenu === "kontak" && (
              <section className="max-w-xl mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-4">Kontak Saya</h2>
                <ul className="space-y-2">
                  <li>
                    📱 WhatsApp:{" "}
                    <a href="https://wa.me/6288980963797"  className="text-red-400 hover:underline">
                      +62 889-8096-3797
                    </a>
                  </li>
                  <li>
                    📧 Email:{" "}
                    <a href="mailto:jahraatasya@gmail.com" className="text-red-400 hover:underline">
                      jahraatasya@gmail.com
                    </a>
                  </li>
                </ul>
              </section>
            )}

            {activeMenu === "chat-kezz-ai" && (
              <section className="max-w-2xl mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-4">Chat dengan Kezz AI</h2>
                <div className="bg-gray-900 p-4 h-60 overflow-y-scroll rounded border border-red-700 mb-4">
                  {chatLog.length === 0 && (
                    <div className="text-center text-gray-500 pt-10">Mulailah percakapan dengan Kezz AI...</div>
                  )}
                  {chatLog.map((msg, i) => (
                    <div key={i} className={`mb-3 ${msg.role === "user" ? "text-right" : ""}`}>
                      <span
                        className={`inline-block px-4 py-2 rounded-lg max-w-xs ${
                          msg.role === "user"
                            ? "bg-red-600 text-white"
                            : "bg-gray-800 text-gray-200"
                        }`}
                      >
                        {msg.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Tulis pesan..."
                    className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Kirim
                  </button>
                </div>
              </section>
            )}

            {activeMenu === "komentar" && (
              <section className="max-w-2xl mx-auto pt-10">
                <h2 className="text-2xl font-bold mb-4">Komentar Pengunjung</h2>
                <div className="bg-gray-900 p-4 h-60 overflow-y-scroll rounded border border-red-700 mb-4">
                  {comments.length === 0 && (
                    <div className="text-center text-gray-500 pt-10">Belum ada komentar.</div>
                  )}
                  {comments.map((c, i) => (
                    <div key={i} className="mb-3 text-left">
                      <span className="inline-block px-4 py-2 rounded-lg bg-gray-800 text-gray-200">
                        <strong>{c.user}</strong>: {c.text}{" "}
                        <small className="text-xs text-gray-400">{c.time}</small>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder="Tinggalkan komentar..."
                    className="flex-1 p-2 bg-gray-900 border border-gray-700 rounded focus:outline-none"
                  />
                  <button
                    onClick={handleAddComment}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
                  >
                    Kirim
                  </button>
                </div>
              </section>
            )}

            {activeMenu === "saluran-whatsapp" && (
              <section className="max-w-xl mx-auto pt-10 text-center">
                <h2 className="text-2xl font-bold mb-4">Join ke Saluran WhatsApp</h2>
                <a
                  href="https://whatsapp.com/channel/0029VbALx58E50UfOE5c0C2b" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                >
                  Join ke Saluran
                </a>
              </section>
            )}
          </main>

          {/* Footer */}
          <footer className="p-6 text-center border-t border-red-900 mt-12 text-gray-500">
            <p>&copy; 2025 Andhika Januar Pratama | Powered by Perasaanku padamu 💗</p>
          </footer>
        </div>
      )}
    </>
  );
}

// Loading Screen Component
function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-red-600 border-t-transparent animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-400 text-2xl">⚡</div>
        </div>
        <h1 className="text-3xl font-bold text-red-400 mb-2">KEZZ LOADING...</h1>
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-red-500 to-purple-500 animate-pulse"></div>
        </div>
        <p className="mt-4 text-sm text-gray-400">Mengaktifkan sistem...</p>
      </div>
    </div>
  );
}
