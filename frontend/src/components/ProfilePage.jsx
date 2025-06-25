import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout , userId} = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/dashboard");
  };

  return (
    <>
      <h1>Hello, welcome to your profile!{userId}</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};
