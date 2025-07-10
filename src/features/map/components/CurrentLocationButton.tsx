import { ReactComponent as CurrentLocationIcon } from "assets/icons/icon/current-location.svg";

interface CurrentLocationButtonProps {
  onClick: () => void;
}

const CurrentLocationButton = ({ onClick }: CurrentLocationButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="z-40 absolute left-24 flex justify-center items-center w-44 h-44 bg-background-white rounded-full"
      style={{
        filter: "drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))",
        bottom: "calc(120px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <CurrentLocationIcon className="w-24 h-24" />
    </button>
  );
};

export default CurrentLocationButton;
