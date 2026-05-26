import ReactDOM from 'react-dom/client';
import { useState, useEffect } from 'react';
import { Search, Compass, Send, CheckCircle, Mail, MapPin, Feather, Heart, ArrowRight, X, Sparkles } from 'lucide-react';
import Header from './src/components/Header';
import ProfileCard from './src/components/ProfileCard';
import BlogPostCard from './src/components/BlogPostCard';
import TanyaNatasya from './src/components/TanyaNatasya';
import BangkaBelitungQuiz from './src/components/BangkaBelitungQuiz';
import ItineraryGenerator from './src/components/ItineraryGenerator';
import GuestbookComments from './src/components/GuestbookComments';
import { BLOG_POSTS } from './src/data';

function App() {
  const [activeTab, setActiveTab] = useState('posts');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedPosts, setLikedPosts] = useState<{ [id: string]: boolean }>({});
  const [postsList, setPostsList] = useState(BLOG_POSTS);

  // Contact modal state
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSuccess, setContactSuccess] = useState(false);

  // Load likes from local storage on mount
  useEffect(() => {
    const savedLikes = localStorage.getItem('natasya_app_likes_v1');
    if (savedLikes) {
      try {
        setLikedPosts(JSON.parse(savedLikes));
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  // Handle post liking action
  const handleLikePost = (postId: string) => {
    const isAlreadyLiked = likedPosts[postId];
    const newLikedState = {
      ...likedPosts,
      [postId]: !isAlreadyLiked,
    };

    setLikedPosts(newLikedState);
    localStorage.setItem('natasya_app_likes_v1', JSON.stringify(newLikedState));

    // Update in-memory state of likes
    setPostsList((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: isAlreadyLiked ? post.likes - 1 : post.likes + 1,
          };
        }
        return post;
      })
    );
  };

  // Profile Card contact initiator
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;

    setContactSuccess(true);
    setTimeout(() => {
      setIsContactOpen(false);
      setContactSuccess(false);
      setContactForm({ name: '', email: '', message: '' });
      alert('Pesanmu berhasil terkirim kawan! Natasya akan membalas secepatnya ke emailmu. 🏖️');
    }, 1200);
  };

  // Filter and Search logic
  const filteredPosts = postsList.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const bannerImage = '/src/assets/images/bangka_belitung_beach_1779755568912.png';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FDFBF7] via-white to-[#FDFBF7] text-slate-800 flex flex-col font-sans selection:bg-teal-100">
      {/* Dynamic Navigation Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Jumbotron Section (Only shown on "Cerita & Blog" homepage) */}
      {activeTab === 'posts' && (
        <section id="hero-showcase" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 w-full">
          <div className="relative rounded-[36px] bg-amber-50/40 border border-amber-100 overflow-hidden shadow-xs p-6 sm:p-12 md:flex items-center justify-between gap-8">
            
            {/* Left Narrative Text */}
            <div className="max-w-xl text-left md:w-1/2 flex flex-col justify-center">
              <span className="inline-flex items-center space-x-1.5 text-xs font-mono font-black text-amber-600 bg-amber-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 w-fit">
                <Compass className="h-4 w-4 animate-spin-slow text-amber-500" />
                <span>Eksplorasi Bumi Laskar Pelangi</span>
              </span>
              
              <h1 className="font-sans font-black text-3xl sm:text-5xl text-slate-900 leading-[1.1] tracking-tight text-left">
                Cerita Keindahan <span className="p-1 px-3 bg-gradient-to-r from-teal-500 to-amber-500 text-white rounded-2xl shadow-sm rotate-1 inline-block mt-2">Bangka Belitung</span>
              </h1>
              
              <p className="text-slate-600 text-sm sm:text-base mt-6 leading-relaxed">
                Menyusuri pantai-pantai eksotis dengan batuan granit purba bersejarah, menyesap harum kopi robusta Manggar, hingga mengulas resep andalan masakan pesisir Lempah Kuning. Selamat menikmati catatan harian uji coba saya, kawan!
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={() => setActiveTab('chat')}
                  className="px-5 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-2xl text-xs sm:text-sm font-semibold shadow-md active:scale-95 cursor-pointer transition flex items-center space-x-2"
                >
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>Tanya Natasya AI</span>
                </button>
                <button
                  onClick={() => setActiveTab('trip')}
                  className="px-5 py-3 bg-white hover:bg-amber-50 border border-amber-100/80 text-amber-800 rounded-2xl text-xs sm:text-sm font-semibold active:scale-95 cursor-pointer transition flex items-center space-x-1.5"
                >
                  <span>Mulai Rancang Trip</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Generated Illustration Image */}
            <div className="mt-8 md:mt-0 md:w-1/2 flex items-center justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] overflow-hidden rounded-3xl shadow-lg border-2 border-white">
                <img
                  src={bannerImage}
                  alt="Tanjung Tinggi Belitung Beach"
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </section>
      )}

      {/* Main Body Content with Layout Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Static Sidebar: profile & comments guestbook (Visible on desktop) */}
          <aside className="lg:col-span-4 space-y-8">
            <ProfileCard onContactClick={() => setIsContactOpen(true)} />
            <GuestbookComments />
          </aside>

          {/* Dynamic Content: tabs switcher container */}
          <section className="lg:col-span-8 space-y-6">
            
            {/* TAB: BLOG ARTICLES */}
            {activeTab === 'posts' && (
              <div className="space-y-6 text-left animate-fade-in">
                
                {/* Search & Categories Pills Filter Bar */}
                <div className="bg-white rounded-3xl border border-amber-100 shadow-xs p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Pills selection */}
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { id: 'all', label: 'Semua Artikel' },
                        { id: 'travel', label: 'Travel 🏖️' },
                        { id: 'kuliner', label: 'Kuliner 🍲' },
                        { id: 'budaya', label: 'Budaya ☕' },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer ${
                            selectedCategory === cat.id
                              ? 'bg-teal-600 text-white shadow-xs'
                              : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Search Field Box */}
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Cari cerita kawan..."
                        className="w-full sm:w-64 bg-slate-50 focus:bg-white text-slate-700 text-xs py-2.5 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition"
                      />
                      <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Posts Cards lists */}
                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredPosts.map((post) => (
                      <BlogPostCard
                        key={post.id}
                        post={post}
                        onLike={handleLikePost}
                        isLiked={!!likedPosts[post.id]}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-amber-100/60 p-12 text-center text-slate-400 font-mono text-sm max-w-lg mx-auto">
                    Kawan, maaf cerita yang kamu cari tidak ditemukan. Coba hapus kata pencarian atau cari di kategori yang lainnya ya!
                  </div>
                )}
              </div>
            )}

            {/* TAB: CHATBOT */}
            {activeTab === 'chat' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-3xl">
                  <h3 className="font-sans font-black text-lg text-amber-900 leading-tight">Fitur Baru: Chatbot "Tanya Natasya AI"</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Pengalaman interaktif modern! Manfaatkan asisten pintar bertenaga Gemini model, atau tanyakan langsung untuk memperoleh preset informasi akurat seputar resep masakan, rute pantai, geopark, dan budaya hidup di Bangka Belitung.
                  </p>
                </div>
                <TanyaNatasya />
              </div>
            )}

            {/* TAB: TRIVIA QUIZ */}
            {activeTab === 'quiz' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="bg-teal-50/40 border border-teal-100/50 p-5 rounded-3xl">
                  <h3 className="font-sans font-black text-lg text-teal-900 leading-tight">Asah Otak: Uji Pengetahuanmu! 🧠</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Mainkan tebak-tebakan seru yang saya rancang khusus untuk menguji seberapa jauh kawan mengenal pesona alam, sejarah pertambangan timah, bahasa daerah, serta kuliner legendaris Bangka Belitung.
                  </p>
                </div>
                <BangkaBelitungQuiz />
              </div>
            )}

            {/* TAB: TRIP PLANNER */}
            {activeTab === 'trip' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-3xl">
                  <h3 className="font-sans font-black text-lg text-amber-900 leading-tight">Kurator Itinerary Perjalanan Pintar</h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    Sesuaikan durasi liburanmu (2 Hari atau 3 Hari) beserta fokus petualangan utama untuk memunculkan rancangan rute perjalanan dan checklist liburan Babel impianmu secara gratis!
                  </p>
                </div>
                <ItineraryGenerator />
              </div>
            )}

          </section>
        </div>
      </main>

      {/* Footer Banner brand */}
      <footer className="bg-slate-900 text-white py-12 mt-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="p-1.5 bg-gradient-to-r from-teal-500 to-amber-500 rounded-lg text-white">
              <Compass className="h-4 w-4" />
            </span>
            <span className="font-sans font-bold tracking-tight text-lg">Natasya's Journal</span>
          </div>
          <p className="text-slate-400 text-xs max-w-md mx-auto leading-normal">
            Website uji coba personal blog Natasya—Seorang putri pesisir asal Bangka Belitung yang mempromosikan pariwisata daerah. Seluruh hak cipta dilindungi, tahun 2026.
          </p>
          <div className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">
            Made with Passion 🌴 Tanjung Pandan, Bangka Belitung, Indonesia
          </div>
        </div>
      </footer>

      {/* Profile Contact Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-50 relative text-left">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 rounded-full cursor-pointer transition"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            <h4 className="font-sans font-black text-slate-900 text-lg flex items-center">
              <Mail className="h-5 w-5 mr-2 text-teal-600" />
              <span>Kirim Surat ke Natasya</span>
            </h4>
            <p className="text-slate-500 text-xs mt-1 leading-normal">
              Ada pertanyaan bisnis, undangan kerja sama wisata geopark, atau resep kuliner? Isi surat kawan di bawah ya!
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4 mt-5">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Nama Kawan</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Nama lengkap..."
                  maxLength={30}
                  className="w-full bg-slate-50 text-slate-700 text-sm py-2.5 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Email Anda</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="alamat@email.com..."
                  maxLength={40}
                  className="w-full bg-slate-50 text-slate-700 text-sm py-2.5 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Isi surat kiriman</label>
                <textarea
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Ketik isi pesannya kawan..."
                  rows={4}
                  maxLength={200}
                  className="w-full bg-slate-50 text-slate-700 text-sm py-2.5 px-4 rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={contactSuccess}
                id="btn-submit-contact-form"
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-sm hover:shadow transition cursor-pointer disabled:opacity-50"
              >
                {contactSuccess ? (
                  <>
                    <CheckCircle className="h-4.5 w-4.5 animate-bounce" />
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
