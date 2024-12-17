; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let timerId;

  // throttle: 일정한 주기마다 이벤트를 발생시키는 방법
  // 예시) 스크롤 이벤트
  const throttle = (callback, time) => {
    if (timerId) return;
    // 한번 실행 후 초기화 하는 코드
    timerId = setTimeout(() => {
      callback();
      timerId = undefined;
    }, time);
  };

  const $progressBar = get('.progress-bar');

  const onScroll = () => {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // 스크롤 높이
    const scrollTop = document.documentElement.scrollTop;
    const width = (scrollTop / height) * 100
    $progressBar.style.width = width + '%';

  };

  window.addEventListener('scroll', () => throttle(onScroll, 100));
  // window.addEventListener('scroll', () => onScroll());
})()
