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
    };
    resetOperation() {
      this.operation = null;
      const elements = Array.from(getAll('.operation')); // 유사배열객체 -> 배열
      elements.forEach((element) => {
        element.classList.remove('active');
      });
    };
  }

  const numberButtons = getAll('.cell_button.number');
  const operationButtons = getAll('.cell_button.operation');
  const computeButton = get('.cell_button.compute');
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


})()
