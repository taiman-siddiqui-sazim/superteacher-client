import React, { useState } from "react";

import { FaClock, FaBell, FaBars, FaPlus } from "react-icons/fa";

import { useLogout } from "@/shared/hooks/useLogout";

const Navbar = ({
  notifications = 0,
  setIsDialogOpen,
}: {
  notifications?: number;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { logout } = useLogout();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center space-x-6">
        <FaPlus className="text-xl cursor-pointer" title="Add" onClick={() => setIsDialogOpen(true)} />
        <FaClock className="text-xl" />
        <div className="relative">
          <FaBell className="text-xl" />
          {notifications > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>
        <FaBars className="text-xl cursor-pointer" onClick={toggleMenu} />
      </div>
      {isExpanded && (
        <div className="absolute top-16 right-0 bg-gray-800 text-white p-4 rounded shadow-lg">
          <ul>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Profile</li>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer">Settings</li>
            <li className="py-2 px-4 hover:bg-gray-700 cursor-pointer" onClick={logout}>Logout</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
