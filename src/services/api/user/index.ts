import axiosPrivate from "../axiosPrivate.js";
import axiosPublic from "../axiosPublic.js";

// 나의 회원 정보 조회
export interface UserInfoResponse {
  nickname: string;
  email: string;
  joinedDate: string;
}
export const getUserInfo = async (): Promise<UserInfoResponse> => {
  const response = await axiosPrivate.get<UserInfoResponse>("/user/me");
  return response.data;
};

// 나의 회원 정보 수정
export interface UpdateUserResponse {
  nickname: string;
  email: string;
}
export const updateUserInfo = async (payload: { nickname: string }): Promise<UpdateUserResponse> => {
  const response = await axiosPrivate.patch<UpdateUserResponse>(`/user/me`, payload);
  return response.data;
};

// 닉네임 사용 가능 여부 조회
export interface CheckNicknameResponse {
  isAvailable: boolean;
  reason: string;
}
export const checkNicknameAvailable = async (payload: { nickname: string }): Promise<CheckNicknameResponse> => {
  const response = await axiosPublic.get<CheckNicknameResponse>(`/user/check-nickname`, {
    params: payload,
  });
  return response.data;
};
