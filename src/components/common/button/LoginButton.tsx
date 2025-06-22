import { useNavigate } from "react-router-dom";
import { ReactComponent as LoginIcon } from "assets/icons/icon/login.svg";

const LoginButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="active:opacity-70 transition-opacity duration-100 rounded-30.5 bg-font-mainBlue w-168 h-44 flex items-center justify-center gap-3 cursor-pointer"
      onClick={() => navigate("/login")}
    >
      <LoginIcon className="stroke-white w-24 h-24" />
      <span className="text-body-2 text-background-white ">로그인 / 회원가입</span>
    </button>
  );
};

export default LoginButton;
