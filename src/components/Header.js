// import React from 'react';
// import { Link } from 'react-router-dom';

// export default function Header() {
//   return (
//     <header className="bg-indigo-600 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="flex justify-between items-center">
//           <Link to="/" className="text-2xl font-bold hover:text-indigo-100 transition-colors">
//             MoneyTips AI
//           </Link>
//           <nav className="hidden md:block">
//             <ul className="flex space-x-8">
//               <li>
//                 <Link to="/dashboard" className="hover:text-indigo-200 transition-colors font-medium">
//                   Dashboard
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/chat" className="hover:text-indigo-200 transition-colors font-medium">
//                   Chat
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/budget" className="hover:text-indigo-200 transition-colors font-medium">
//                   Budget
//                 </Link>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
import React from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold hover:text-indigo-100 transition-colors whitespace-nowrap"
          >
            MoneyTips AI
          </Link>

          {/* Search Bar (Simplified) */}
          <div className="relative flex-1 max-w-xl mx-4 hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="w-5 h-5 text-gray-300" />
            </div>
            <input
              type="text"
              placeholder="Ask about money tips..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-indigo-500 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white focus:bg-indigo-700 transition-colors"
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              to="/dashboard" 
              className="hover:text-indigo-200 transition-colors font-medium hidden md:inline-block"
            >
              Dashboard
            </Link>
            <Link 
              to="/chat" 
              className="hover:text-indigo-200 transition-colors font-medium hidden md:inline-block"
            >
              Chat
            </Link>
            <Link 
              to="/budget" 
              className="hover:text-indigo-200 transition-colors font-medium hidden md:inline-block"
            >
              Budget
            </Link>
            <Link 
              to="/chat" 
              className="md:hidden text-indigo-200 hover:text-white"
            >
              <FiSearch className="w-6 h-6" />
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}