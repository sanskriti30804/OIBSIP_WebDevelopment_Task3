let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({
    text,
    completed: false,
    createdAt: new Date().toLocaleString(),
    completedAt: null
  });

  input.value = "";
  saveTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  tasks[index].completedAt = tasks[index].completed ? new Date().toLocaleString() : null;
  saveTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
}

function editTask(index) {
  const updated = prompt("Edit your task:", tasks[index].text);
  if (updated && updated.trim()) {
    tasks[index].text = updated.trim();
    saveTasks();
  }
}

function renderTasks() {
  const pendingList = document.getElementById("pendingList");
  const completedList = document.getElementById("completedList");
  const progress = document.getElementById("progress");
  const stats = document.getElementById("stats");

  pendingList.innerHTML = "";
  completedList.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    info.className = "task-info";
    info.innerHTML = `<strong>${task.text}</strong><small>Added: ${task.createdAt}</small>${
      task.completedAt ? `<small>Completed: ${task.completedAt}</small>` : ""
    }`;

    const actions = document.createElement("div");
    actions.className = "task-actions";
    actions.innerHTML = `
      <button class="complete" onclick="toggleComplete(${index})">
        <ion-icon name="checkmark-done-outline"></ion-icon>
      </button>
      <button class="edit" onclick="editTask(${index})">
        <ion-icon name="pencil-outline"></ion-icon>
      </button>
      <button class="delete" onclick="deleteTask(${index})">
        <ion-icon name="trash-outline"></ion-icon>
      </button>
    `;

    li.appendChild(info);
    li.appendChild(actions);

    if (task.completed) {
      completedList.appendChild(li);
      completedCount++;
    } else {
      pendingList.appendChild(li);
    }
  });

  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);
  progress.style.width = `${percent}%`;
  stats.textContent = `${completedCount} / ${total}`;
}

renderTasks();
