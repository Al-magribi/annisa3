import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Teacher_Protection = () => {
  const navigate = useNavigate();
  const { userInfo: user, logout } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user?.role !== "guru") {
        navigate("/");
      }
    }, 2000); // 2000 milliseconds = 2 detik

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  useEffect(() => {
    if (logout) {
      navigate("/");
    }
  }, [logout, navigate]);
};

export default Teacher_Protection;
