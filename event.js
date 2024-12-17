const [count] = document.getElementsByTagName('span');
const countUpButton = document.getElementById('count-up-button');

countUpButton.onclick = (event) => {
  console.log("event", event);
  if (isNaN(Number(count.innerHTML))) return;
  count.innerHTML = Number(count.innerHTML) + 1;
};

count.onmouseover = () => {
  count.style.backgroundColor = 'gray';
  count.style.color = 'white';
};

count.onmouseout = () => {
  count.style.backgroundColor = 'transparent';
  count.style.color = 'black';
};

const input = document.getElementsByTagName('input')[0];
input.onfocus = () => {
  input.value = '자동 입력';
};

const input2 = document.getElementsByTagName('input')[1];
const result = document.getElementById('result');

input2.onchange = (event) => {
  result.innerHTML = event.target.value;
  // event.target -> 이벤트가 발생한 DOM
  // event.target은 현재 이벤트가 발생한
  // input2란 노드 거기엔 value란 값이 들어있음.
}

const test = document.getElementById('test');

new Array(10).fill(0).forEach((_, index) => {

  test.addEventListener('click', () => {
    console.log(`test clicked ${index + 1} `);
  });
});
