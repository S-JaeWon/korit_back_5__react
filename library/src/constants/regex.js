export const REGEX = { // https://www.wrapuppro.com/programing/view/MIw5kPB3ao2YJVx
    username: {
        regexr: /^[A-Za-z0-9]{5,10}$/,
        text: "영문자, 숫자 조합 5~10자리 이어야 합니다."
    },
    password: {
        regexr: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/,
        text: "영문자와 숫자, 특수문자 조합으로 8~128자리 이어야 합니다."
    },
    name: {
        regexr: /[가-힣]{2,}/,
        text: "최소 두 글자의 한글로 표시해주세요."
    },
    email: {
        regexr: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
        text: "이메일 형식이어야 합니다."
    }
};