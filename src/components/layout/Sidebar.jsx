import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../context/AuthContext";

const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-lg ${isActive ? "bg-brand text-white" : "text-gray-700 hover:bg-white"}`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const path = location.pathname;
  
  const isStudent = path.startsWith('/student');
  const isFaculty = path.startsWith('/faculty');
  const isRecruiter = path.startsWith('/recruiter');
  const isAdmin = path.startsWith('/admin');
  
  let title = "SmartHub";
  let subtitle = "Portal";
  let userName = user?.name || "Guest User";
  let menuItems = [];
  
  if (isStudent) {
    subtitle = "Student Portal";
    menuItems = [
      { to: "/student", icon: "📊", label: "Dashboard" },
      { to: "/student/activities/upload", icon: "⬆", label: "Upload Activity" },
      { to: "/student/verification", icon: "✅", label: "Verification" },
      { to: "/student/portfolio", icon: "📁", label: "Portfolio" },
      { to: "/student/resume", icon: "📝", label: "Resume Builder" },
      { to: "/student/profile", icon: "👤", label: "Profile" },
      { to: "/chat", icon: "💬", label: "Chat" }
    ];
  } else if (isFaculty) {
    subtitle = "Faculty Portal";
    menuItems = [
      { to: "/faculty", icon: "📊", label: "Dashboard" },
      { to: "/faculty/approvals", icon: "✅", label: "Approvals" },
      { to: "/faculty/monitoring", icon: "👥", label: "Student Monitoring" },
      { to: "/faculty/activities", icon: "🎯", label: "Activities" },
      { to: "/faculty/reports", icon: "📄", label: "Reports" },
      { to: "/faculty/search", icon: "🔍", label: "Search" },
      { to: "/chat", icon: "💬", label: "Chat" }
    ];
  } else if (isRecruiter) {
    subtitle = "Recruiter Portal";
    menuItems = [
      { to: "/recruiter", icon: "📊", label: "Dashboard" },
      { to: "/recruiter/portfolios", icon: "📁", label: "Portfolios" },
      { to: "/recruiter/jobs", icon: "💼", label: "Job Posting" },
      { to: "/recruiter/shortlist", icon: "⭐", label: "Shortlist" },
      { to: "/recruiter/chat", icon: "💬", label: "Chat" }
    ];
  } else if (isAdmin) {
    subtitle = "Admin Portal";
    menuItems = [
      { to: "/admin", icon: "📊", label: "Dashboard" },
      { to: "/admin/users", icon: "👥", label: "Users" },
      { to: "/admin/control", icon: "🎛️", label: "Master Control" },
      { to: "/admin/data", icon: "💾", label: "Data Management" },
      { to: "/admin/audit", icon: "📋", label: "Audit & Logs" },
      { to: "/admin/settings", icon: "⚙️", label: "Settings" }
    ];
  }
  
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };
  
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}
      <aside className={`fixed lg:sticky top-0 left-0 w-72 bg-white border-r h-screen p-6 z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-brand text-white"><SchoolIcon /></div>
            <div>
              <div className="font-semibold text-lg">{title}</div>
              <div className="text-xs text-gray-400">{subtitle}</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden"><CloseIcon /></button>
        </div>

        <div className="space-y-2">
          {menuItems.map((item) => (
            <NavItem key={item.to} to={item.to} onClick={onClose}>
              {item.icon} {item.label}
            </NavItem>
          ))}
        </div>

        <div className="mt-10 space-y-3">
          <div className="rounded-lg p-3 bg-gray-50">
            <div className="text-xs text-gray-500">Current User</div>
            <div className="font-medium mt-1">{userName}</div>
            {user?.role && (
              <div className="text-xs text-gray-400 capitalize">{user.role}</div>
            )}
          </div>
          <button onClick={handleLogout} className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Logout</button>
        </div>
      </aside>
    </>
  );
}
