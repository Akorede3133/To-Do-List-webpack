/* eslint-disable import/no-cycle */
import './style.css';
import populateTasks from './interface.js';

window.addEventListener('DOMContentLoaded', () => {
  populateTasks();
});