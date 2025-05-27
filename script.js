let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const dueDateInput = document.getElementById("due-date");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (taskText) {
    tasks.push({ text: taskText, completed: false, dueDate });
    saveTasks();
    renderTasks();
    taskForm.reset();
  }
});

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function sortTasks(order) {
  tasks.sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return order === "asc"
      ? new Date(a.dueDate) - new Date(b.dueDate)
      : new Date(b.dueDate) - new Date(a.dueDate);
  });
  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskEl = document.createElement("div");
    taskEl.className = `task${task.completed ? " completed" : ""}`;

    const span = document.createElement("span");
    span.textContent = `✅ ${task.text}${task.dueDate ? ` (📅 ${task.dueDate})` : ""}`;

    const controls = document.createElement("div");
    controls.className = "task-controls";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = task.completed ? "↩️ Undo" : "✔️ Done";
    completeBtn.onclick = () => toggleComplete(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️ Delete";
    deleteBtn.onclick = () => deleteTask(index);

    controls.appendChild(completeBtn);
    controls.appendChild(deleteBtn);
    taskEl.appendChild(span);
    taskEl.appendChild(controls);

    taskList.appendChild(taskEl);
  });
}

renderTasks();
