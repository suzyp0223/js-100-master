;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let timerId;

  const throttle = (callback, time) => {
    if (timerId) return;
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

    const scrollTop = document.documentElement.scrollTop;
    const width = (scrollTop / height) * 100
    $progressBar.style.width = width + '%';

  };

  window.addEventListener('scroll', () => throttle(onScroll, 100));
  // window.addEventListener('scroll', () => onScroll());
})()
