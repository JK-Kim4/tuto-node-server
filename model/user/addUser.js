/* addUser.js
* 사용자 로그인 및 세션 관리를 위해 사용 
*/

// crypto : express 프로젝트 생성 시 설치되는 의존
const crypto = require('crypto');
// salt : 암호화에 사용될 key를 생성한다.
// 암호화 함수 규칙 : 오늘 날짜와 랜덤으로 생성될 인수를 곱한 수를 반올림 하여 문자열로 반환
const salt = () => (Math.round((new Date().valueOf() * Math.random()))) + "";
// salt 값과 입력된 password값을 사용하여 hash 함수 (sha512)로 암호화
const getCrypto = (_salt, password) => (crypto.createHash('sha512').update(password + _salt).digest('hex'));

// AddUser class는 회원 가입 시 입력되는 데이터를 객체화 하기 위해 사용
class AddUser {
    constructor(data){
        this.salt = salt();
        this.userid = data.userid;
        this.password = getCrypto(this.salt, data.password);
        this.name = data.name;
    }
}


// 위에 작성된 appUser.js파일을 다른 js파일에서 import 할 경우
// data를 받아 appUser객체를 생성하여 사용할 수 있도록 설정
module.exports = (data) => new AddUser(data);