document.addEventListener('DOMContentLoaded', function () {
  const taskForm = document.getElementById('taskForm');
  const taskInput = document.getElementById('taskInput');
  const taskList = document.getElementById('taskList');

  // Function to create a new task item
  function createTaskItem(taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    return taskItem;
  }

  // Function to add a new task to the list
  function addTask(taskText) {
    const taskItem = createTaskItem(taskText);
    taskList.appendChild(taskItem);
    saveTasksToLocalStorage();
  }

  // Function to check if a task already exists
  function isDuplicate(taskText) {
    const tasks = taskList.querySelectorAll('li');
    return Array.from(tasks).some(taskItem => taskItem.textContent.trim().toLowerCase() === taskText.trim().toLowerCase());
  }

  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }
    if (isDuplicate(taskText)) {
      alert('Task already exists.');
      return;
    }
    addTask(taskText);
    taskInput.value = '';
  }

  // Function to remove a task from the list
  function removeTask(taskItem) {
    taskItem.remove();
    saveTasksToLocalStorage();
  }

  // Function to mark/unmark a task as completed
  function toggleCompleted(taskItem) {
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage();
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(taskItem => {
      tasks.push({
        text: taskItem.textContent,
        completed: taskItem.classList.contains('completed')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks from local storage
  function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      tasks.forEach(task => {
        const taskItem = createTaskItem(task.text);
        if (task.completed) {
          taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
      });
    }
  }

  taskForm.addEventListener('submit', handleSubmit);

  taskList.addEventListener('click', function (event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === 'LI') {
      toggleCompleted(clickedElement);
    } else if (clickedElement.tagName === 'BUTTON') {
      const taskItem = clickedElement.parentElement;
      removeTask(taskItem);
    }
  });

  // Load tasks from local storage on page load
  loadTasksFromLocalStorage();
});
