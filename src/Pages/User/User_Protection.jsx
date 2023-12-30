import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User_Protection = () => {
  const navigate = useNavigate();
  const { userInfo: user, logout } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "siswa") {
        navigate("/");
      }
    }, 5000); // 5000 milliseconds = 5 detik

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (logout) {
      navigate("/");
    }
  }, [logout, navigate]);
};

export default User_Protection;
