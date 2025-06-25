import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const VerifyOtpPage = ({ onBack, formData }) => {
  const navigate = useNavigate();
  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);

  useEffect(() => {
    const timer =
      countdown > 0 &&
      setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleInputChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      // Only allow numbers
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value.slice(-1); // Take last character entered
      setOtpDigits(newOtpDigits);

      // Auto-focus next input
      if (value && index < 3) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/sendOTP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setCountdown(60);
      } else {
        setMessage("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  const registerUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const otp = otpDigits.join("");
    console.log(otp);
    try {
      const response = await fetch("http://localhost:5000/api/v1/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
        credentials: "include",
      });

      const data = await response.json();
      if (data.success) {
        await registerUser();
        setIsLoading(false);
        navigate("/login");
      } else {
        setIsLoading(false);
        setMessage("❌ Incorrect OTP. Please try again.");
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("Something went wrong. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-xl mt-10 relative">
      <button
        onClick={() => onBack(false)}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
      <form onSubmit={handleVerify} className="space-y-5">
        <div className="flex justify-center space-x-4">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border-2 text-center text-xl rounded-md focus:outline-none focus:border-green-500"
              autoFocus={index === 0}
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={otpDigits.some((digit) => digit === "")}
          className="flex justify-center w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
            "Verify"
          )}
        </button>

        <div className="text-center">
          {countdown > 0 ? (
            <span className="text-gray-500">Resend OTP in {countdown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Resend OTP
            </button>
          )}
        </div>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.startsWith("🎉") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyOtpPage;
