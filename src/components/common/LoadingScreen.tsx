import { useEffect, useState } from "react";
import { ReactComponent as FootPrintIcon } from "assets/icons/image/footprint.svg";

const footprints = [
  { left: 0, bottom: 0, rotate: 0, opacity: 1.0 },
  { left: 49, bottom: 75.99, rotate: 33.12, opacity: 0.7 },
  { left: 150, bottom: 88.14, rotate: 22.07, opacity: 0.6 },
  { left: 132, bottom: 190.7, rotate: 10.56, opacity: 0.4 },
  { left: 231, bottom: 205.91, rotate: -20.97, opacity: 0.4 },
  { left: 215, bottom: 309.73, rotate: 22.07, opacity: 0.25 },
];

const ANIMATION_INTERVAL = 1000; // ms, 각 발자국 등장 간격
const LOOP_DELAY = 1000; // ms, 한 loop 끝나고 쉬는 시간

const LoadingScreen = () => {
  const [visible, setVisible] = useState(Array(footprints.length).fill(false));

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    function startAnimation() {
      setVisible(Array(footprints.length).fill(false)); // 전부 안 보이게

      timeouts.push(
        setTimeout(() => {
          footprints.forEach((_, idx) => {
            timeouts.push(
              setTimeout(() => {
                setVisible((prev) => {
                  const copy = [...prev];
                  copy[idx] = true;
                  return copy;
                });
              }, ANIMATION_INTERVAL * idx)
            );
          });

          // loop 재시작
          timeouts.push(
            setTimeout(
              () => {
                startAnimation();
              },
              ANIMATION_INTERVAL * footprints.length + LOOP_DELAY
            )
          );
        }, 400) // fade out 시간(transition과 일치)
      );
    }

    startAnimation();

    // 언마운트 시 타임아웃 모두 해제
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full h-[100dvh] flex justify-center items-center flex-col gap-28">
      <div className="font-pretendard text-center text-[25px] font-bold whitespace-pre-line">
        {`요청하신 정보를
불러오는 중이에요.`}
      </div>
      <div style={{ position: "relative", width: 315.04, height: 390.59 }}>
        {footprints.map((f, idx) => (
          <FootPrintIcon
            key={idx}
            style={{
              position: "absolute",
              left: f.left,
              bottom: f.bottom,
              transform: `rotate(${f.rotate}deg)`,
              opacity: visible[idx] ? f.opacity : 0,
              transition: "opacity 1s cubic-bezier(0.2,0.6,0.3,1)",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;
