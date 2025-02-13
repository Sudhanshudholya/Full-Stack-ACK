// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBox, faListAlt, faSignOutAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import React from "react";

// const Sidebar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const navigate = useNavigate();

//     const toggleSidebar = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/');
//     };

//     return (
//         <div className="relative h-screen flex flex-col">
//             {/* Sidebar Toggle Button for Mobile */}
//             <button
//                 className="md:hidden p-4 bg-blue-800 text-white fixed z-20"
//                 onClick={toggleSidebar}
//             >
//                 ☰ Menu
//             </button>

//             {/* Overlay for Mobile */}
//             {isOpen && (
//                 <div
//                     className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
//                     onClick={toggleSidebar}
//                 />
//             )}

//             {/* Sidebar */}
//             <div className={`fixed top-0 left-0 z-20 h-full bg-blue-800 text-white shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:w-64 overflow-auto`}>
//                 {/* <div className="p-4 flex items-center justify-center">
//                     <img
//                         src={logo}
//                         alt="ACK Infra Logo"
//                         className="h-12 w-auto"
//                     />
//                 </div> */}

//                 <div className="space-y-1 flex-1 overflow-auto">
//                     {/* Customers Link */}
//                     <Link to="customer-list">
//                         <div className="p-4 hover:bg-blue-700 flex items-center space-x-2">
//                             <FontAwesomeIcon icon={faUsers} />
//                             <span>Customers</span>
//                         </div>
//                     </Link>

//                     {/* Category Link */}
//                     <Link to="category-list">
//                         <div className="p-4 hover:bg-blue-700 flex items-center space-x-2">
//                             <FontAwesomeIcon icon={faListAlt} />
//                             <span>Category</span>
//                         </div>
//                     </Link>

//                     {/* Products Link */}
//                     <Link to="product-list">
//                         <div className="p-4 hover:bg-blue-700 flex items-center space-x-2">
//                             <FontAwesomeIcon icon={faBox} />
//                             <span>Products</span>
//                         </div>
//                     </Link>

                    
//                 </div>

//                 {/* Logout Button */}
//                 <button
//                     onClick={handleLogout}
//                     className="w-full  py-4 bg-gradient-to-r from-blue to-blue text-blue-100 font-semibold rounded-lg shadow-md hover:bg-gradient-to-r position-relative hover:bg-red-800 transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 mt-[273px]"
//                 >
//                     <FontAwesomeIcon icon={faSignOutAlt} />
//                     <span>Log out</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Sidebar;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faListAlt, faSignOutAlt, faUsers, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="relative h-screen flex">
            {/* Sidebar Toggle Button for Mobile */}
            <button
                className="md:hidden p-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white fixed top-4 left-4 z-30 rounded-lg shadow-lg"
                onClick={toggleSidebar}
            >
                <FontAwesomeIcon icon={faBars} size="lg" />
            </button>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-30 h-full w-64 bg-gradient-to-b from-green-900 to-blue-700 text-white shadow-xl transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative`}>
                {/* Logo Section */}
                <div className="p-5 flex items-center justify-center border-b border-blue-500">
                    <h2 className="text-xl font-bold tracking-wide">Admin Panel</h2>
                </div>

                {/* Sidebar Menu */}
                <div className="space-y-2 flex-1 mt-5">
                    <SidebarLink to="customer-list" icon={faUsers} label="Customers" />
                    <SidebarLink to="category-list" icon={faListAlt} label="Category" />
                    <SidebarLink to="product-list" icon={faBox} label="Products" />
                </div>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full py-3 cursor-pointer bg-red-600 hover:bg-red-600 text-white font-semibold flex items-center justify-center space-x-2 mt-6 transition-all duration-300"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Log out</span>
                </button>
            </div>
        </div>
    );
};

// Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
    <Link to={to} className="block px-6 py-3 hover:bg-blue-600 transition-all flex items-center space-x-3">
        <FontAwesomeIcon icon={icon} />
        <span className="text-lg">{label}</span>
    </Link>
);

export default Sidebar;

