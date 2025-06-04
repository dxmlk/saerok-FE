import SimpleHeader from "components/common/SimpleHeader";
import AutoResizeTextArea from "components/common/textfield/AutoResizeTextArea";
import { useState } from "react";

const FeedbackPage = () => {
  const [text, setText] = useState("");
  return (
    <div className="w-full min-h-[100dvh] bg-white">
      <SimpleHeader title={"의견 보내기"} />
      <div className="px-24 pt-28 flex flex-col justify-end items-end">
        <AutoResizeTextArea
          value={text}
          onChange={setText}
          placeholder="서비스 개선 방안, 추가되었으면 하는 기능, 시스템 오류 등 여러분의 의견을 자유롭게 보내주세요!

‘새록’의 발전에 큰 힘이 됩니다:)"
        />

        <button className="mt-18 py-10 px-15 bg-mainBlue border-none rounded-30.5 flex flex-row items-center gap-8 justify-center">
          <span className="text-body-2 text-background-white">보내기 </span>
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
