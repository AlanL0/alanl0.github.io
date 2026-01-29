function App() {
  const handleResume = () => window.open('/img/Master-Resume.pdf', '_blank');
  const handleContact = () => (window.location.href = 'mailto:alomo@uci.com');
  const handleGitHub = () => window.open('https://github.com/AlanL0', '_blank');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 md:p-16 gap-16">
      <header className="text-center">
        <h1 className="font-typewriter text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase mb-0">Alan Lo</h1>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-6xl justify-items-center">
        <div
          className="w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-white/20 hover:border-white hover:bg-gray-800/50 cursor-pointer flex items-center justify-center shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden"
          onClick={handleResume}
        >
          <span className="text-4xl md:text-5xl font-bold z-10 relative group-hover:scale-110 transition-transform">Resume</span>
        </div>
        <div
          className="w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-white/20 hover:border-white hover:bg-gray-800/50 cursor-pointer flex items-center justify-center shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden"
          onClick={handleContact}
        >
          <span className="text-4xl md:text-5xl font-bold z-10 relative group-hover:scale-110 transition-transform">Contact</span>
        </div>
        <div
          className="w-80 h-80 md:w-96 md:h-96 rounded-3xl bg-gray-900/50 backdrop-blur-sm border border-white/20 hover:border-white hover:bg-gray-800/50 cursor-pointer flex items-center justify-center shadow-2xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-500 group relative overflow-hidden"
          onClick={handleGitHub}
        >
          <span className="text-4xl md:text-5xl font-bold z-10 relative group-hover:scale-110 transition-transform">GitHub</span>
        </div>
      </main>
    </div>
  );
}

export default App;