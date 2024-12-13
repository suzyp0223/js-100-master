; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  };

  class Stopwatch {
    constructor(element) {
      this.timer = element
      this.defaultTime = '00:00.00'
      this.interval = null
      this.startTime = 0
      this.elapsedTime = 0 // 경과된 시간(정확한 계산 위해)
    }

    // 초단위를 1의자리 => 10의자리로 변경
    addZero(number) {
      if (number < 10) {
        return '0' + number;
      }
      if (number > 99) {
        return number.toString().slice(0, -1); // 밀리세컨드를 두자리 수로 변경 후 끝을 자름.
      }
      return number;
    }


    /* MEMO
    // startTimer() {}
      this.interval = setInterval(startTimer, 10);
       위 코드의 startTimer에 this를 쓰면 글로벌 this가 된다
       그래서 바인딩 해주기 위해
       startTimer(){} 함수를 만들고 this.startTimer.bind(this), 로 코딩한다.
      this.interval = setInterval(this.startTimer.bind(this), 10);
    */

    // 경과된 시간 = 시작 시간 - 현재 시간
    // 시간형식변환: 밀리세컨드 -> 분:초.밀리세컨드 형식변환
    timeToString(time) {
      const date = new Date(time);
      const minutes = date.getUTCMinutes();
      const seconds = date.getUTCSeconds();
      const milliseconds = date.getUTCMilliseconds();
      return `${this.addZero(minutes)}:${this.addZero(seconds)}.${this.addZero(milliseconds)}`
      // return `${(minutes)}:${(seconds)}.${(milliseconds)}`
    }

    print(text) {
      this.timer.innerHTML = text
    }

    startTimer() {
      this.elapsedTime = Date.now() - this.startTime
      // console.log("경과된 시간:", this.elapsedTime);
      const time = this.timeToString(this.elapsedTime)
      this.print(time) // this.timer에서 받은 element를 time인자로 넘김.
    }



    start() {
      clearInterval(this.interval); //clearInterval해야 start계속 눌렀을때 stop가능
      this.startTime = Date.now() - this.elapsedTime
      this.interval = setInterval(this.startTimer.bind(this), 10);
    }
    stop() {
      clearInterval(this.interval);
    }
    reset() {
      clearInterval(this.interval);
      this.print(this.defaultTime);
      this.interval = null
      this.startTime = 0
      this.elapsedTime = 0

      //interval, startTime, elapsedTime초기화 않하면 기존시간이 그대로 나옴.
      console.log("interval:", this.interval);
      console.log("startTime:", this.startTime);
      console.log("elapsedTime:", this.elapsedTime);
    }
  };

  const $startButton = get('.timer_button.start');
  const $stopButton = get('.timer_button.stop');
  const $resetButton = get('.timer_button.reset');
  const $timer = get('.timer');
  const stopwatch = new Stopwatch($timer);

  $startButton.addEventListener('click', () => {
    stopwatch.start();
  });

  $stopButton.addEventListener('click', () => {
    stopwatch.stop();
  });

  $resetButton.addEventListener('click', () => {
    stopwatch.reset();
  });

})();