import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (user, path = "/") => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(path);
    }
  }, [user]);
};
