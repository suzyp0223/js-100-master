; (function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  const $todos = get('.todos');
  const $form = get('.todo_form');
  const $todoInput = get('.todo_input');
  const API_URL = `http://localhost:5501/todos`;


  const createTodoElement = (item) => {
    const { id, content, completed } = item
    const $todoItem = document.createElement('div')
    // 체크 새로고침 후에도 남아있음.
    const isChecked = completed ? 'checked' : '';
    $todoItem.classList.add('item')
    $todoItem.dataset.id = id

    $todoItem.innerHTML = `
            <div class="content">
              <input
                type="checkbox"
                class='todo_checkbox'
                ${isChecked}
              />
              <label>${content}</label>
              <input type="text" value="${content}" />
            </div>
            <div class="item_buttons content_buttons">
              <button class="todo_edit_button">
                <i class="far fa-edit"></i>
              </button>
              <button class="todo_remove_button">
                <i class="far fa-trash-alt"></i>
              </button>
            </div>
            <div class="item_buttons edit_buttons">
              <button class="todo_edit_confirm_button">
                <i class="fas fa-check"></i>
              </button>
              <button class="todo_edit_cancel_button">
                <i class="fas fa-times"></i>
              </button>
            </div>
      `
    return $todoItem;
  }

  const renderAllTodos = (todos) => {
    $todos.innerHTML = '' // 초기화
    // 하나씩 렌더링
    todos.forEach((item) => {
      const todoElement = createTodoElement(item)
      $todos.appendChild(todoElement)
    });
  };

  const getTodos = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((todos) => renderAllTodos(todos))
      .catch(error => console.error(error))
  };

  const addTodo = (e) => {
    e.preventDefault()
    const todo = {
      content: $todoInput.value,
      completed: false,
    };
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    }).then(getTodos)
      .then(() => {
        $todoInput.value = ''
        $todoInput.focus()
      })
      .catch((error) => console.error(error.message));
  };

  const toggleTodo = (e) => {
    if (e.target.className !== 'todo_checkbox') return;
    const $item = e.target.closest('.item');
    // console.log('체크박스와 가장 가까운 $item: ', $item);
    const id = $item.dataset.id;
    const completed = e.target.checked;

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('서버 응답 실패');
        }
        return response.json();
      })
      .then(() => {
        // 서버 응답이 성공적으로 처리된 경우 DOM 유지
        e.target.checked = completed;
      })
      .catch((error) => {
        console.error(error.message);
        // 에러 발생 시 상태 복구
        e.target.checked = !completed;
      });
  };

  const changeEditMode = (e) => {
    const $item = e.target.closest('.item');
    const $label = $item.querySelector('label');
    const $editInput = $item.querySelector('input[type="text"]');
    const $contentButtons = $item.querySelector('.content_buttons');
    const $editButtons = $item.querySelector('.edit_buttons');
    const value = $editInput.value;

    if (e.target.className === 'todo_edit_button') {
      $label.style.display = 'none';
      $editInput.style.display = 'block';
      $contentButtons.style.display = 'none';
      $editButtons.style.display = 'block';
      $editInput.focus(); // 수정버튼 클릭시 input에 커서 포커스이동.
      $editInput.value = '';
      $editInput.value = value;

    };

    if (e.target.className === 'todo_edit_cancel_button') {
      $label.style.display = 'block';
      $editInput.style.display = 'none';
      $contentButtons.style.display = 'block';
      $editButtons.style.display = 'none';
      $editInput.value = $label.innerHTML; //

    }

  };

  const editTodo = (e) => {
    if (e.target.className !== 'todo_edit_confirm_button') return;
    const $item = e.target.closest('.item');
    const id = $item.dataset.id;
    const $editInput = $item.querySelector('input[type="text"]');
    const content = $editInput.value;

    fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    }).then(getTodos)
      .catch((err) => console.error(err))
  };

  const removeTodo = (e) => {
    if (e.target.className !== 'todo_remove_button') return;
    const $item = e.target.closest('.item');
    const id = $item.dataset.id;

    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
      .then(getTodos)
      .catch((err) => console.error(err))

  };

  const init = () => {
    window.addEventListener('DOMContentLoaded', () => {
      getTodos();
    });
    $form.addEventListener('submit', addTodo);
    $todos.addEventListener('click', toggleTodo);
    $todos.addEventListener('click', changeEditMode);
    $todos.addEventListener('click', editTodo);
    $todos.addEventListener('click', removeTodo);
  }
  init()
})()


/** js 작성순서
 * 1. html에서 dom 가져오기
 * 2. 이벤트
 *  변수.addEventListener로 어떤이벤트에 어떤 함수를 붙일지 작성
 * 3. 함수에 동작 작성
 *  구체적인 js 로직
 *  여기서 innerHTML로 ``안에 html작성해서
 *  화면에 뿌리기도함.
 *  매개변수로 들어오는 데이타가 배열인지 객체인지 확인!,
 *  에러처리 필수!
 *
 */
