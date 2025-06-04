import { ReactComponent as ExclamationIcon } from "assets/icons/button/exclamation.svg";

const Profile = () => {
  return (
    <>
      <div className="flex flex-col gap-16 font-pretendard">
        <div className="flex flex-row gap-4 justify-start items-center">
          <div className="w-30 h-30 rounded-full border-2 border-mainBlue bg-white flex items-center justify-center">
            <ExclamationIcon className="fill-mainBlue w-8" />
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
