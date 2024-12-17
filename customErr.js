const obj = {};
let result2 = '';
try {
  result2 = obj.property.a;
} catch (err) {
  result2 = '모름'; // 기본값
  console.dir(err); //err객체 값을 보기위해 dir
} finally {
  console.log(`result = ${result2}`);
}

// 유저에게 에러처럼 보이게 커스텀
try {
  throw new Error('이건 커스텀 에러입니다');
} catch (err) {
  console.dir(err);
  // console.log(err);
}
T