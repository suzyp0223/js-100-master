

const A3 = async () => {
  const a = 'A3 함수 실행 후 생기는 데이터';
  return a;
};

const B3 = (a) => {
  console.log(`${a}를 이용하는 B3`);
};

A3()
  .then((a) => {
    console.log('A3 실행 성공!');
    B3(a);
    console.log('-----------');
  })
  .catch((err) => {

    console.log(err.message);
  });

const func = async () => {
  const a = await A3();
  console.log('A3 실행 성공!!');
  B3(a);
};
func();