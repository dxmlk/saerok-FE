export const validateNickname = (nickname: string) => {
  if (nickname.length < 2 || nickname.length > 9) {
    return "닉네임은 2자 이상 9자 이하로 입력해주세요.";
  }

  const regExp = /^[a-zA-Z0-9가-힣]+$/;
  if (!regExp.test(nickname)) {
    return "닉네임은 한글, 영문, 숫자만 사용할 수 있습니다.";
  }

  if (/\s/.test(nickname)) {
    return "닉네임에 공백을 사용할 수 없습니다.";
  }

  const forbiddenCharacters = /[ㄱ-ㅎㅏ-ㅣ]/;
  if (forbiddenCharacters.test(nickname)) {
    return "자모음만으로 구성된 닉네임은 사용할 수 없습니다.";
  }

  if (nickname == "saerok" || nickname == "새록") {
    return "사용할 수 없는 닉네임입니다.";
  }

  return null;
};
