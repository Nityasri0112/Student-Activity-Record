import React from "react";
import dayjs from "dayjs";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";

export default function Header({ onMenuClick }) {
  const { user } = useAuth();
  const dateStr = dayjs().format("dddd, D MMMM YYYY");
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden"><MenuIcon /></button>
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold">Smart Student Hub</h1>
          {user && (
            <p className="text-sm text-gray-600">Welcome back, {user.name}!</p>
          )}
        </div>
      </div>
      <div className="bg-gray-100 px-3 py-2 rounded-full text-xs lg:text-sm text-gray-600 hidden sm:block">{dateStr}</div>
    </div>
  );
}
