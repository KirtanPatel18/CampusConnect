import React, { useState } from "react";
import RegisterPage from "./registration/registrationPage";
import VerifyOtpPage from "./registration/otpVerifyPage";

const Register = () => {

 
  const [showOTP, setShowOTP] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <>
      {!showOTP ? (
        <RegisterPage
          setShowOTP={setShowOTP}
          setFormData={setFormData}
          formData={formData}
        />
      ) : (
        <VerifyOtpPage onBack={setShowOTP} formData={formData} />
      )}
    </>
  );
};

export default Register;
