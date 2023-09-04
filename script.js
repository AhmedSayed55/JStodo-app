const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

document.addEventListener('DOMContentLoaded', function() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    const todos = JSON.parse(storedTodos);
    todos.forEach(function(todo) {
      addTodoItem(todo.task, todo.completed);
    });
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim() !== '') {
    addTodoItem(input.value);
    input.value = '';
  }
});

function addTodoItem(task, completed = false) {
  const todoItem = document.createElement('li');
  todoItem.className = 'todo-item';
  
  const checkbox = document.createElement('input');
  checkbox.className = 'checkbox'
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.addEventListener('change', function() {
    updateTodoStatus(todoItem, checkbox.checked);
  });
  
  const span = document.createElement('span');
  span.className = 'task';
  span.innerText = task;
  
  const button = document.createElement('button');
  button.className = 'deleteButton';
  button.innerText = 'Delete';
  button.addEventListener('click', function() {
    todoItem.remove();
    updateLocalStorage();
  });
  
  todoItem.appendChild(checkbox);
  todoItem.appendChild(span);
  todoItem.appendChild(button);
  
  todoList.appendChild(todoItem);
  
  updateLocalStorage();
}

function updateTodoStatus(todoItem, completed) {
  if (completed) {
    todoItem.classList.add('completed');
  } else {
    todoItem.classList.remove('completed');
  }
  
  updateLocalStorage();
}

function updateLocalStorage() {
  const todos = Array.from(todoList.querySelectorAll('.todo-item')).map(function(todoItem) {
    const span = todoItem.querySelector('span');
    const checkbox = todoItem.querySelector('input[type="checkbox"]');
    return { task: span.innerText, completed: checkbox.checked };
  });
  localStorage.setItem('todos', JSON.stringify(todos));
}