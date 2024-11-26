document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskTableBody = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
  
    // Load the splash screen and hide it after a few seconds
    setTimeout(function () {
      document.getElementById("splash-screen").style.display = "none";
      document.getElementById("app").style.display = "block";
    }, 3000); // Show splash screen for 3 seconds
  
    // Load tasks from localStorage and display them in the table
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      taskTableBody.innerHTML = ''; // Clear current table rows
  
      tasks.forEach((task, index) => {
        const row = taskTableBody.insertRow();
  
        row.innerHTML = `
          <td>${task.name}</td>
          <td>${task.time}</td>
          <td>${task.duration}</td>
          <td>${task.createdAt}</td>
          <td><input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleCompletion(${index})"></td>
        `;
      });
    }
  
    // Save tasks to localStorage
    function saveTasks(tasks) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Handle task form submission
    taskForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const taskName = document.getElementById("taskName").value;
      const taskTime = document.getElementById("taskTime").value;
      const taskDuration = document.getElementById("taskDuration").value;
  
      if (!taskName || !taskTime || !taskDuration) {
        alert("Please fill in all fields");
        return;
      }
  
      // Get current date and time for task creation
      const createdAt = new Date().toLocaleString();
  
      // Create task object
      const newTask = {
        name: taskName,
        time: taskTime,
        duration: taskDuration,
        createdAt: createdAt,
        completed: false,
      };
  
      // Get existing tasks from localStorage
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
      // Add new task to the array
      tasks.push(newTask);
  
      // Save updated task list to localStorage
      saveTasks(tasks);
  
      // Reset form fields
      taskForm.reset();
  
      // Reload the tasks to show the new one in the table
      loadTasks();
    });
  
    // Toggle task completion status
    window.toggleCompletion = function (index) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks[index].completed = !tasks[index].completed;
      saveTasks(tasks);
      loadTasks(); // Reload the table to reflect the changes
    };
  
    // Initial load of tasks
    loadTasks();
  });
  
