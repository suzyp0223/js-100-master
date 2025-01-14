; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  };

  const getAll = (target) => {
    return document.querySelectorAll(target)
  };

  class Calculator {
    constructor(element) {
      this.element = element;
      this.currentValue = '';  // 현재 보이는 값
      this.prevValue = '';  // 전 값
      this.operation = null;  // 연산자
    };

    // reset() {
    //   this.currentValue = '';  // 현재 보이는 값
    //   this.prevValue = '';  // 전 값
    //   this.resetOperation();
    // };

    allClearButton() {
      rentValue = '';  // 현재 보이는 값
      this.prevValue = '';  // 전 값
      this.res
    };

    clear() {
      // 현재 보이는 값일 때
      if (this.currentValue) {
        this.currentValue = '';
        return;
      }

      // 연산자 누른 후
      if (this.operation) {
        this.resetOperation();
        this.currentValue = this.prevValue;
        return;
      }

      // 연산자 누르고 숫자누른 후
      if (this.prevValue) {
        this.prevValue = '';
      }
    };


    appendNumber(number) {
      // . 점이 한번만 클릭되게 cell_button number가 '.' 점이면 리턴
      if (number === '.' && this.currentValue.includes('.')) return;
      this.currentValue = this.currentValue.toString() + number.toString();
    };
    setOperation(operation) {
      this.resetOperation(); // 초기화 하고 아래서 operation활성화 해야 한번만 눌림.
      this.operation = operation;
      this.prevValue = this.currentValue;
      this.currentValue = '';

      const elements = Array.from(getAll('.operation'));
      const element = elements.filter((element) =>
        element.innerText.includes(operation)
      )[0]

      element.classList.add('active');
    };
    updateDisplay() {
      if (this.currentValue) {
        this.element.value = this.currentValue;
        return;
      };
      // 이전값 있으면 화면에 계속 표기
      if (this.prevValue) {
        this.element.value = this.prevValue;
        return;
      }
      this.element.value = 0;
    };
    resetOperation() {
      this.operation = null;
      const elements = Array.from(getAll('.operation')); // 유사배열객체 -> 배열
      elements.forEach((element) => {
        element.classList.remove('active');
      });
    }
    compute() {
      let computation;
      const prev = parseFloat(this.prevValue);
      const current = parseFloat(this.currentValue);
      if (isNaN(prev) || isNaN(current)) return;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentValue = computation.toString();
      this.prevValue = '';
      this.resetOperation();
    }
  }

  const numberButtons = getAll('.cell_button.number');
  const operationButtons = getAll('.cell_button.operation');
  const computeButton = get('.cell_button.compute');
  const clearButton = get('.cell_button.clear');
  // const allClearButton = get('.cell_button.all_clear');
  const allClearButton = getAll('.cell_button.all_clear');
  const display = get('.display');

  const calculator = new Calculator(display);

  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });

  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.setOperation(button.innerText);
      calculator.updateDisplay();

    });
  });

  computeButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });

  clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });

  // allClearButton.addEventListener('click', () => {
  //   calculator.reset();
  //   calculator.updateDisplay();
  // });
  allClearButton.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.clear();
      calculator.updateDisplay();
    });
  });


})()
