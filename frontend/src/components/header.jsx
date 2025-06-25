import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="mx-auto px-20">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-default">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <span className="ml-2 text-xl font-bold text-gray-800" onClick={() => navigate("/")}>
              CampusConnect
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {isLoggedIn && (<><a href="#features" className="text-gray-600 hover:text-indigo-600">
              Features
            </a>
            <a href="#events" className="text-gray-600 hover:text-indigo-600">
              Events
            </a>
            <a href="/ResourcesPage" className="text-gray-600 hover:text-indigo-600">
              Resources
            </a>
            <a href="/ForumsPage" className="text-gray-600 hover:text-indigo-600">
              Forums
            </a></>)}

            {!isLoggedIn ? (
              <>
                <button
                  className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 whitespace-nowrap"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 whitespace-nowrap"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/profilePage")}>
                <img
                  src="/defaultProfile.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-indigo-600 hover:border-indigo-800 transition"
                />
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
