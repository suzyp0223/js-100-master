; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target);
  }

  class Carousel {
    constructor(carouselElement) {
      this.carouselElement = carouselElement;
      this.itemClassName = 'carousel_item';
      this.items = this.carouselElement.querySelectorAll('.carousel_item');

      this.totalItems = this.items.length;  // 5
      this.current = 0;
      this.isMoving = false;
    }

    // 케러셀 초기화
    initCarousel() {
      if (this.isMoving) return;
      this.items[0].classList.add('active');
      this.items[1].classList.add('next');
      this.items[this.totalItems - 1].classList.add('prev');
    }

    // 연속동작 금지
    disabledInteraction() {
      this.isMoving = true;
      setTimeout(() => {
        this.isMoving = false;
      }, 500);
    }

    // 왼,오 화살표 버튼 클릭시 이벤트 발생
    setEventListener() {
      this.prevButton = this.carouselElement.querySelector(
        '.carousel_button--prev'
      )
      this.nextButton = this.carouselElement.querySelector(
        '.carousel_button--next'
      )

      this.prevButton.addEventListener('click', () => {
        this.movePrev();
      });
      this.nextButton.addEventListener('click', () => {
        this.moveNext();
      });
    }

    moveCarouselTo() {
      if (this.isMoving) return;
      this.disabledInteraction();
      let prev = this.current - 1;
      let next = this.current + 1;

      if (this.current === 0) {
        prev = this.totalItems - 1
      } else if (this.current === this.totalItems - 1) {
        next = 0;
      }

      // ' active'클래스 붙이기 -띄어쓰기 필수
      for (let i = 0; i < this.totalItems; i++) {
        if (i === this.current) {
          this.items[i].className = this.itemClassName + ' active';
        } else if (i === prev) {
          this.items[i].className = this.itemClassName + ' prev';
        } else if (i === next) {
          this.items[i].className = this.itemClassName + ' next';
        } else {
          this.items[i].className = this.itemClassName;
        }
      }
    }

    moveNext() {
      if (this.isMoving) return;
      // 총개수 5개라 -1로 4로 인덱스4와 동일하면 0으로 만듬.
      if (this.current === this.totalItems - 1) {
        this.current = 0
      } else {
        this.current++

        this.moveCarouselTo()
      }
    }

    movePrev() {
      if (this.isMoving) return;
      // 현재0이면 4로 만들어서 이전으로 못감.
      if (this.current === 0) {
        this.current = this.totalItems - 1
      } else {
        this.current--
      }

      this.moveCarouselTo()
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const carouselElement = get('.carousel');
    const carousel = new Carousel(carouselElement);

    carousel.initCarousel();
    carousel.setEventListener();
  })
})()
