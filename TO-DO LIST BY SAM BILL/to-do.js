let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

let dueWarning = "";
if (task.dueDate) {
  const today = new Date().toISOString().split("T")[0];
  if (task.dueDate < today && !task.done) {
    dueWarning = `<span class="overdue">⚠️ Past Due</span>`;
  }
}


   li.innerHTML = `
  <span onclick="toggleTask(${index})">
    ${task.text} <br>
    <small>🕒 ${task.addedTime || "--"} | 📅 ${task.dueDate || "Not set"} ${dueWarning}</small>
  </span>
 <button onclick="deleteTask(${index})">🗑️ Delete</button>

`;


    list.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const dateInput = document.getElementById("dueDate");
  const text = input.value.trim();
  const due = dateInput.value;

  if (text) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    tasks.push({
      text: text,
      done: false,
      addedTime: time,
      dueDate: due
    });

    input.value = "";
    dateInput.value = "";
    saveTasks();
    renderTasks();
  }
}


function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
const toggleButton = document.getElementById("toggleMode");

// Apply saved mode on load
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark");
}

// Toggle dark mode
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.removeItem("darkMode");
  }
});
