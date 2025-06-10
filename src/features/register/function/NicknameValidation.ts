export const validateNickname = (nickname: string) => {
  // 1. 최소 2자 이상, 9글자 이하
  if (nickname.length < 2 || nickname.length > 9) {
    return "닉네임은 2자 이상 9자 이하로 입력해주세요.";
  }

  // 2. 특수문자 제외, 한글, 영문, 숫자만 허용
  const regExp = /^[a-zA-Z0-9가-힣]+$/;
  if (!regExp.test(nickname)) {
    return "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.";
  }

  // 3. 공백 금지
  if (/\s/.test(nickname)) {
    return "닉네임에 공백을 사용할 수 없습니다.";
  }

  // 4. 자모음 조합 불허 (예: 'ㄱ', 'ㅢ' 같은 자모음만 있는 경우)
  const forbiddenCharacters = /[ㄱ-ㅎㅏ-ㅣ]/;
  if (forbiddenCharacters.test(nickname)) {
    return "자모음만으로 구성된 닉네임은 사용할 수 없습니다.";
  }

  // 5. '새록', 'saerok' 금지
  if (nickname == "saerok" || nickname == "새록") {
    return "사용할 수 없는 닉네임입니다.";
  }

  // 6. 유효성 검사를 통과했을 때
  return null; // null은 유효한 닉네임을 의미
};
