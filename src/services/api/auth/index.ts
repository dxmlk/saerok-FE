import axiosPublic from "../axiosPublic";

export interface AuthResponse {
  accessToken: string;
  signupStatus: string;
}

// 로그인 상태 유지/자동 로그인 (토큰 재발급)
export const refreshAuth = async (refreshTokenJson: string): Promise<AuthResponse> => {
  const response = await axiosPublic.post("/auth/refresh", {
    refreshTokenJson,
  });
  return response.data;
};

// Kakao 소셜 로그인
export const loginKakao = async (authorizationCode: string): Promise<AuthResponse> => {
  const response = await axiosPublic.post("/auth/kakao/login", {
    authorizationCode,
  });
  return response.data;
};
