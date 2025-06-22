const clientId = import.meta.env.production.VITE_CLIENT_ID;
const redirectUrl = encodeURIComponent(import.meta.env.production.VITE_REDIRECT_URL);

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code`;
