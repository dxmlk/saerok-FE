import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getUserInfo } from "services/api/user/index.js";
// import { refreshAuth } from "services/api/auth/index.js"; // 토큰 갱신 api
import type { User } from "types/auth.js";

interface AuthContextProps {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 최초 mount 시 토큰 확인
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          // 토큰 없으면 비회원
          setUser(null);
        } else {
          // 토큰 있으면 유저 정보 불러오기
          const userInfo = await getUserInfo();
          setUser(userInfo);
        }
      } catch (err: any) {
        setUser(null);
        setError(err?.message || "토큰 인증 오류");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // 로그아웃 처리
  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    setUser(null);
  }, []);

  // 유저정보 리프레시 (토큰 만료 시 refreshAuth 활용)
  const refreshUser = useCallback(async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setUser(null);
        return;
      }
      const userInfo = await getUserInfo();
      setUser(userInfo);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!user,
        user,
        loading,
        error,
        setUser,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 내부에서만 사용하기");
  return ctx;
};
