import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FeaturesSection from "./HomeUI/featureSection";
import { EventsSection } from "./HomeUI/eventSection";
import ResourcesAndForumsSection from "./HomeUI/forumAndResource";
import {WorkSection} from "./HomeUI/workSection";
import {Footer} from "./footer";
import { Header } from "./header";

export const HomePage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* navbar */}
{/* 
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="mx-auto px-20">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-default">
              <div className="bg-indigo-600 text-white p-2 rounded-lg">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">
                CampusConnect
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-indigo-600"
              >
                Features
              </a>
              <a href="#events" className="text-gray-600 hover:text-indigo-600">
                Events
              </a>
              <a
                href="/ResourcesPage"
                className="text-gray-600 hover:text-indigo-600"
              >
                Resources
              </a>
              <a href="#cta" className="text-gray-600 hover:text-indigo-600">
                Forums
              </a>

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
      </nav> */}

      <Header/>

      {/* hero section */}

      <section className="relative h-full overflow-hidden">
        {/* Background shapes */}
        <div className="absolute inset-0 bg-[#023047] z-0"></div>

        {/* Content */}
        <div className="relative z-10 max-w-8xl mx-auto px-20 py-24 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="md:col-span-7 text-white">
              <div className="inline-block px-4 py-1 rounded-full bg-teal-600 text-white text-sm font-medium mb-6">
                Student Networking Platform
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Connect. Collaborate.{" "}
                <span className="text-orange-400">Succeed.</span>
              </h1>
              <p className="text-lg opacity-90 max-w-xl mb-8">
                Your all-in-one platform for campus networking, event
                management, and resource sharing. Built by students, for
                students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg text-lg transition">
                  Get Started
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    ></path>
                  </svg>
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg text-lg hover:bg-white/10 transition">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-5 relative">
              <div className="relative p-4 rounded-lg w-[600px] h-[400px]">
                <img
                  src="/campusImage.png"
                  alt="Students collaborating on campus"
                  className="rounded-md w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
      </section>

      {/* featue setion */}
      <FeaturesSection />

      {/* event section */}
      <EventsSection isLoggedIn={isLoggedIn} />

      <ResourcesAndForumsSection isLoggedIn={isLoggedIn} />

      <section className="py-20 bg-[#023047] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-16 bg-[#f8f9fa] skew-y-3 transform origin-top-right"></div>

        {/* Geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-teal-500 rounded-full opacity-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-teal-400 rounded-full opacity-10 animate-pulse"></div>

        <div className="container relative text-center pt-10">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block px-3 py-1 bg-teal-600 text-white rounded-full text-sm font-medium mb-4">
              JOIN NOW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Connect with Your Campus?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of students already using CampusConnect to enhance
              their college experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-md text-lg font-semibold transition"
              >
                Create Account
              </button>
              <button
                type="button"
                className="px-6 py-3 border border-white text-white hover:bg-white/10 rounded-md text-lg font-semibold transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      <WorkSection/>

      <Footer/>
    </div>
  );
};
