import clsx from "clsx";
import { ReactComponent as SaerokImage } from "assets/icons/image/saerok.svg";

interface Props {
  bgColor: "white" | "gray";
  upperText: string;
  lowerText: string;
}

export default function EmptyState({ bgColor, upperText, lowerText }: Props) {
  return (
    <div className={clsx("mt-10 flex flex-col gap-5", bgColor === "white" ? "bg-white" : "bg-background-whitegray")}>
      <div className="font-haru text-subtitle-1-2 text-black">{upperText}</div>
      <div className="font-pretendard text-body-2 text-font-darkgray">{lowerText}</div>
      <div className="flex justify-center mt-88">
        <SaerokImage
          className={clsx(
            "fill-current" /* SVG가 currentColor를 따르도록 */,
            bgColor === "white" ? "text-background-whitegray" : "text-white"
          )}
        />
      </div>
    </div>
  );
}
