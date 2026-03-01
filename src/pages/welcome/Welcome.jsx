import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const PortalCard = ({ title, description, icon, path, gradient }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      onClick={() => navigate(path)}
      className={`relative overflow-hidden bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105 group`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
      <div className="relative z-10">
        <div className="text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">{icon}</div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-white/80 text-xs sm:text-sm">{description}</p>
      </div>
    </div>
  );
};

const Welcome = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-indigo-900/80 z-10"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-students-studying-in-library-5361/1080p.mp4" type="video/mp4" />
          {/* Fallback gradient if video doesn't load */}
        </video>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 z-10 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="p-2 hover:bg-white/20 rounded-lg transition"
          >
            {menuOpen ? <CloseIcon className="text-white" /> : <MenuIcon className="text-white" />}
          </button>
          <div className="flex items-center gap-2">
            <SchoolIcon className="text-white" />
            <span className="text-white font-semibold hidden sm:inline">SmartHub</span>
          </div>
          <div className="w-10"></div>
        </div>
      </nav>
      
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMenuOpen(false)} />}
      
      <div className={`fixed top-16 left-4 w-64 bg-white/10 backdrop-blur-xl shadow-xl z-50 transition-all duration-300 rounded-lg ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        <div className="p-4">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 p-3 hover:bg-white/20 rounded text-white transition">
              <HelpOutlineIcon />
              <span>Help & Support</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-white/20 rounded text-white transition">
              <span>📞</span>
              <span>Contact Us</span>
            </button>
            <button className="w-full flex items-center gap-3 p-3 hover:bg-white/20 rounded text-white transition">
              <span>📚</span>
              <span>Documentation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex flex-col pt-16">
        <div className="container mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col justify-center">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 rounded-2xl bg-white/20 backdrop-blur-md text-white shadow-2xl">
                <SchoolIcon style={{ fontSize: window.innerWidth < 640 ? 40 : 60 }} />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 sm:mb-4 drop-shadow-2xl px-4">SmartHub</h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-2 sm:mb-3 font-light px-4">Unified Platform for Academic Excellence</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto px-4">Streamline student achievements, faculty management, and recruitment processes</p>
          </div>

          {/* Portal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto mb-8 sm:mb-12 px-4">
            <PortalCard
              title="Student"
              description="Track achievements and build your portfolio"
              icon="🎓"
              path="/login/student"
              gradient="from-blue-500 to-cyan-500"
            />
            
            <PortalCard
              title="Faculty"
              description="Approve activities and monitor progress"
              icon="🏫"
              path="/login/faculty"
              gradient="from-green-500 to-emerald-500"
            />
            
            <PortalCard
              title="Recruiter"
              description="Access verified profiles and post jobs"
              icon="💼"
              path="/login/recruiter"
              gradient="from-purple-500 to-pink-500"
            />
            
            <PortalCard
              title="Admin"
              description="Manage system and oversee operations"
              icon="⚙️"
              path="/login/admin"
              gradient="from-red-500 to-orange-500"
            />
          </div>

          {/* Features Section */}
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📊</div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Real-time Tracking</h3>
                  <p className="text-xs sm:text-sm text-white/70">Monitor achievements and activities instantly</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">✅</div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Verification System</h3>
                  <p className="text-xs sm:text-sm text-white/70">Faculty-verified certificates and portfolios</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🤝</div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base">Direct Communication</h3>
                  <p className="text-xs sm:text-sm text-white/70">Secure chat between all stakeholders</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-4 sm:py-6 text-white/60 text-xs sm:text-sm px-4">
          © 2024 SmartHub. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Welcome;
