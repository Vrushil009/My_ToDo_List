function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;
  
    const task = {
      text: taskText,
      completed: false
    };
  
    renderTask(task);
    saveTask(task);
    taskInput.value = '';
  }
  
  function renderTask(task) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = "flex flex-col md:flex-row md:items-center md:justify-between break-words bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-4 py-3 rounded-md w-full overflow-hidden";
  
    const content = document.createElement('div');
    content.className = "flex flex-col sm:flex-row sm:items-start gap-2 mb-2 sm:mb-0 w-full";
  
    const checkboxWrapper = document.createElement('div');
    checkboxWrapper.className = "flex-shrink-0 flex items-start pt-1";
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "form-checkbox text-blue-600 h-5 w-5 min-w-[1.25rem]";
    checkbox.checked = task.completed;
    checkboxWrapper.appendChild(checkbox);
  
    const span = document.createElement('span');
    span.className = "break-words break-all flex-1 text-sm sm:text-base";
    span.textContent = task.text;
    if (task.completed) {
      span.classList.add('line-through', 'opacity-60');
    }
  
    checkbox.addEventListener('change', () => {
      span.classList.toggle('line-through');
      span.classList.toggle('opacity-60');
      task.completed = checkbox.checked;
      updateTasksInStorage();
    });
  
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '✕';
    deleteBtn.className = "text-red-500 hover:text-red-700 font-bold text-lg ml-auto md:ml-4";
    deleteBtn.onclick = () => {
      li.remove();
      deleteTask(task);
    };
  
    content.appendChild(checkboxWrapper);
    content.appendChild(span);
    li.appendChild(content);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  }
  
  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function updateTasksInStorage() {
    const listItems = document.querySelectorAll('#taskList li');
    const tasks = Array.from(listItems).map(li => {
      const text = li.querySelector('span').textContent;
      const completed = li.querySelector('input[type="checkbox"]').checked;
      return { text, completed };
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function deleteTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskToRemove.text);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(renderTask);
  }
  
  window.onload = loadTasks;
  
  // Theme toggle logic
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('change', () => {
      document.documentElement.classList.toggle('dark', themeToggle.checked);
      localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
    });
    // Set theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.remove('dark');
      themeToggle.checked = false;
    } else {
      document.documentElement.classList.add('dark');
      themeToggle.checked = true;
    }
  }