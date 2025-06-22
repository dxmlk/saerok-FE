// src/components/ProtectedRoute.tsx
import LoginModal from "features/onboarding/components/LoginModal.js";
import { useState, useEffect, JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setShowModal(true);
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!isLoggedIn || showModal) {
    return <LoginModal onClose={() => setShowModal(false)} />;
  }

  return children;
};

export default ProtectedRoute;
