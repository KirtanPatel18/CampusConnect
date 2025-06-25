import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = ({ setShowOTP, setFormData, formData }) => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [emailExistsError, setEmailExistsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    if (e.target.name === "email") setEmailExistsError("");
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const checkUserExistance = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/checkUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setEmailExistsError("Email already exists. Please use another.");
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const sendOTP = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) return false;

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    // Simulated server check
    const existingUsers = await checkUserExistance();
    if (!existingUsers) {
      setIsLoading(false);
      return;
    }

    const otpsent = await sendOTP();
    if (!otpsent) return;
    setShowOTP(true);
    setIsLoading(false);

    console.log("Registration successful:", formData);
    // Proceed to actual API call
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google"; // Replace with your backend OAuth URL
  };

  const [focusedFields, setFocusedFields] = useState({
    username: false,
    email: false,
    password: false,
  });

  const handleFocus = (field) => {
    setFocusedFields({ ...focusedFields, [field]: true });
  };

  const handleBlur = (field) => {
    setFocusedFields({ ...focusedFields, [field]: false });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-4">
        <img
          src="/CampusConnect (1) (2).png"
          className="w-14 h-14 mr-2"
          alt="CampusConnect Logo"
        />
        <h2 className="text-3xl font-extrabold text-gray-900 hover:text-blue-600 transition duration-300">
          CampusConnect
        </h2>
      </div>

      <div className="max-w-md w-full border border-gray-300 rounded-lg bg-white px-8 pb-8 pt-5 transition-all duration-300">
        <p className="text-black text-3xl font-semibold mb-8">Sign Up</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="relative mt-4">
            <div className="relative">
              <input
                type="text"
                name="username"
                className={`w-full pt-3 pb-3 px-4 z-0 border border-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200 peer ${
                  formData.username ? "border-blue-500" : ""
                }`}
                value={formData.username}
                onChange={handleChange}
                onFocus={() => handleFocus("username")}
                onBlur={() => handleBlur("username")}
                required
              />
              <label
                className={`absolute left-4 z-10 transition-all duration-200 pointer-events-none ${
                  focusedFields.username || formData.username
                    ? "-top-2 text-xs text-blue-600 bg-white px-2"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                }`}
              >
                Username
              </label>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 peer-focus:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="relative mt-4">
            <div className="relative">
              <input
                type="text"
                name="email"
                className={`w-full pt-3 pb-3 px-4 z-0 border rounded-lg focus:ring-2 outline-none transition-all duration-200 peer ${
                  errors.email || emailExistsError
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-400 focus:ring-blue-500"
                } ${formData.email && !errors.email ? "border-blue-500" : ""}`}
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                required
              />
              <label
                className={`absolute left-4 z-10 transition-all duration-200 pointer-events-none ${
                  focusedFields.email || formData.email
                    ? "-top-2 text-xs text-blue-600 bg-white px-2"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                } ${errors.email || emailExistsError ? "text-red-500" : ""}`}
              >
                Email Address
              </label>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 peer-focus:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email}
              </p>
            )}
            {emailExistsError && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {emailExistsError}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mt-4">
            <div className="relative">
              <input
                type="password"
                name="password"
                className={`w-full pt-3 pb-3 px-4 z-10 border rounded-lg focus:ring-2 outline-none transition-all duration-200 peer ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-400 focus:ring-blue-500"
                } ${formData.password ? "border-blue-500" : ""}`}
                value={formData.password}
                onChange={handleChange}
                onFocus={() => handleFocus("password")}
                onBlur={() => handleBlur("password")}
                required
              />
              <label
                className={`absolute z-10 left-4 transition-all duration-200 pointer-events-none ${
                  focusedFields.password || formData.password
                    ? "-top-2 text-xs text-blue-600 bg-white px-2"
                    : "top-1/2 -translate-y-1/2 text-gray-400"
                } ${errors.password ? "text-red-500" : ""}`}
              >
                Password
              </label>
              <div className="absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-5 h-5 text-gray-400 peer-focus:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
            </div>

            {errors.password && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`flex justify-center w-full text-white py-3.5 rounded-lg font-semibold transition-all duration-300 transform shadow-lg
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:-translate-y-0.5 hover:shadow-blue-200"
    }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              </>
            ) : (
              "Sign Up"
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-lg font-medium text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
              />
              <path
                fill="#34A853"
                d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.565 24 12.255 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"
              />
              <path
                fill="#EA4335"
                d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.69 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => navigate("/login")}
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
