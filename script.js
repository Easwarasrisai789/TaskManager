// Splash Screen Logic
window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("splash-screen").style.display = "none";
      document.getElementById("app").style.display = "block";
    }, 3000); // Show splash screen for 3 seconds
  });
  
  // Task Management Logic
  const taskForm = document.getElementById("taskForm");
  const taskList = document.getElementById("taskList");
  
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission and reload
    const taskName = document.getElementById("taskName").value;
    const taskTime = document.getElementById("taskTime").value;
    const taskDuration = parseInt(document.getElementById("taskDuration").value); // Days duration
  
    if (!taskName || !taskTime || isNaN(taskDuration)) {
      alert("Please fill out all fields correctly.");
      return;
    }
  
    // Create task list item
    const task = document.createElement("li");
    task.innerHTML = `
      <input type="checkbox" class="taskCheckbox" />
      <span>${taskName} - Time: ${taskTime} - Duration: ${taskDuration} day(s)</span>
    `;
    taskList.appendChild(task);
  
    // Set notification at the specific time
    const now = new Date();
    const [hours, minutes] = taskTime.split(":").map(Number);
  
    const notificationStartTime = new Date();
    notificationStartTime.setHours(hours, minutes, 0);
  
    for (let i = 0; i < taskDuration; i++) {
      const notificationTime = new Date(notificationStartTime);
      notificationTime.setDate(now.getDate() + i);
  
      const timeUntilNotification = notificationTime.getTime() - now.getTime();
      if (timeUntilNotification > 0) {
        setTimeout(() => {
          notifyUser(`Task Reminder: ${taskName}`, `It's time to start ${taskName}!`, task);
        }, timeUntilNotification);
      }
    }
  
    // Clear the form
    taskForm.reset();
  });
  
  // Notification Function
  function notifyUser(title, body, task) {
    if (Notification.permission === "granted") {
      const notification = new Notification(title, { body });
      notification.onclick = () => {
        task.querySelector(".taskCheckbox").checked = true; // Automatically tick the checkbox
        notification.close();
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const notification = new Notification(title, { body });
          notification.onclick = () => {
            task.querySelector(".taskCheckbox").checked = true; // Automatically tick the checkbox
            notification.close();
          };
        }
      });
    } else {
      alert(`${title}\n${body}`);
    }
  }
  
  // Service Worker Registration for PWA
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js").then(() => {
      console.log("Service Worker Registered");
    }).catch((error) => {
      console.error("Service Worker Registration Failed:", error);
    });
  }
  