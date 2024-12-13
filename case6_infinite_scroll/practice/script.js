; (function () {
  'use strict'

  /** MEMO
   * 1. post API로 데이터 가져오기 (함수)
   * 2. 데이터 보여주기 (함수)
   * 2. 10개씩 끊기 (API_URL변수끝에 {$limit})
   * 3. 스크롤 끝 감지 (함수)
   *
   */
  const get = (target) => {
    return document.querySelector(target)
  }
  
  let currentPage = 1;
  let total = 10;
  const limit = 10;
  const end = 100;

  const $posts = get('.posts');
  const $loader = get('.loader');

  const getPost = async (page, limit) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('에러 발생!!');
    };
    return await response.json();
  };

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div');
      $post.classList.add('post');
      $post.innerHTML = `
        <div class="header">
          <div class="id">${post.id}</div>
          <div class="title">${post.title}</div>
        </div>
        <div class="body">
        ${post.body}
        </div>
      `
      $posts.appendChild($post);
    });
  };

  const showLoader = () => {
    $loader.classList.add('show');
  };

  const hideLoader = () => {
    $loader.classList.remove('show');
  };

  // 데이터 가져오기 post API
  const loadPost = async (page, limit) => {
    showLoader();
    try {
      const response = await getPost(page, limit);
      showPosts(response)
    } catch (error) {
      console.log(error.message);
    } finally {
      hideLoader();
    }
  };

  // 스크롤 끝 감지
  const onScroll = () => {
    // 데이터 박스가 화면끝에 5px정도 닿으면 데이터 추가로 불러온다.
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (total === end) {
      window.removeEventListener('scroll', onScroll);
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      currentPage++;
      total += 10;
      loadPost(currentPage, limit); //노드포스트 불러옴.
    };

  };

  window.addEventListener('DOMContentLoaded', () => {
    loadPost(currentPage, limit);
    window.addEventListener('scroll', onScroll);
  });

})()
