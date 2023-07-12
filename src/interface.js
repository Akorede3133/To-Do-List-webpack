/* eslint-disable no-use-before-define */
import {
  addTaskToTasksArray, deleteTaskFromArray, editTaskDescription, tasks,
} from './add_and_remove.js';
import { addToLocalStorage } from './localstorage.js';

const form = document.querySelector('.todo--form');
const formInput = form.querySelector('input');
const taskContainer = document.querySelector('.list--container');

function populateTasks() {
  taskContainer.innerHTML = '';
  const element = tasks.map((task) => {
    const li = `<li class="list--item">
    <div class="first--flex">
        <input type="checkbox" name="" id="">
        <div class="desc---container">
            <p class="desc">${task.desc}</p>
            <form action="" class="edit--form">
              <input type="text" name="" id="" class="edit--input">
            </form>
        </div>
    </div>
    <div class="second--flex">
      <i class="fa-solid fa-ellipsis-vertical" data--option=${task.index}></i>
      <i class="fa-solid fa-trash-can" data--trash=${task.index}></i>
    </div>
</li>`;
    return li;
  }).join('');
  taskContainer.insertAdjacentHTML('beforeend', element);
  const optionsIcon = document.querySelectorAll('.fa-ellipsis-vertical');
  const deleteIcons = document.querySelectorAll('.fa-trash-can');

  optionsIcon.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      handleEditAndDeleteOptions(e);
    });
  });

  deleteIcons.forEach((icon) => {
    icon.addEventListener('click', (e) => {
      deleteFromUI(e);
      populateTasks();
    });
  });
}
/* **Handle Option menu** */
const handleEditAndDeleteOptions = (e) => {
  const index = e.target.dataset.Option;
  const parent = e.target.parentElement.parentElement;
  const editInput = parent.querySelector('.edit--input');
  const desc = parent.querySelector('.desc').textContent;
  const editForm = parent.querySelector('.edit--form');
  parent.classList.add('hide--desc');
  editInput.value = desc;
  editInput.focus();
  editForm.addEventListener('submit', () => {
    const { value } = editInput;
    editTaskDescription(+index, value);
    populateTasks();
  });
};

const deleteFromUI = (e) => {
  const index = e.target.dataset.Trash;
  deleteTaskFromArray(+index);
  addToLocalStorage();
};

/* **HANDLE TASK SUBMISSION** */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = formInput;
  if (value) {
    addTaskToTasksArray(value);
    populateTasks();
    addToLocalStorage();
    formInput.value = '';
  }
});

export default populateTasks;