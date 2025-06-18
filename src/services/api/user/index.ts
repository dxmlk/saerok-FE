import axiosPrivate from "../axiosPrivate";

export interface UserResponse {
  nickname: string;
  email: string;
  joinedDate: string;
}

// 현재 로그인된 사용자 정보 조회
export const getUserInfo = async (): Promise<UserResponse> => {
  const response = await axiosPrivate.get<UserResponse>("/user/me");
  return response.data;
};
