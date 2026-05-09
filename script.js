let tasks = [];

/* =========================
   DOM ELEMENTS
========================= */

const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const filterButtons =
  document.querySelectorAll("[data-filter]");

const clearCompletedBtn =
  document.getElementById("clearCompleted");

const themeToggle =
  document.getElementById("themeToggle");


/* =========================
   EVENTS
========================= */

button.addEventListener("click", addTask);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const filter =
      button.dataset.filter;

    filterTasks(filter);
  });
});

clearCompletedBtn.addEventListener(
  "click",
  clearCompletedTasks
);

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("dark");

  saveTheme();
});


/* =========================
   ADD TASK
========================= */

function addTask() {

  const text =
    input.value.trim();

  if (!text) return;

  const task = {
    id: Date.now(),
    text,
    done: false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  input.value = "";

  input.focus();
}


/* =========================
   RENDER TASKS
========================= */

function renderTasks() {

  list.innerHTML = "";

  tasks.forEach((task) => {

    createTaskElement(task);
  });

  updateTaskCount();
}


/* =========================
   CREATE TASK ELEMENT
========================= */

function createTaskElement(task) {

  const li =
    document.createElement("li");

  /* checkbox */

  const checkbox =
    document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.checked = task.done;

  /* text */

  const span =
    document.createElement("span");

  span.textContent = task.text;

  if (task.done) {
    span.classList.add("done");
  }

  /* delete button */

  const deleteBtn =
    document.createElement("button");

  deleteBtn.textContent = "❌";

  /* =========================
     EVENTS
  ========================= */

  checkbox.addEventListener("change", () => {

    task.done = checkbox.checked;

    saveTasks();
    renderTasks();
  });

  deleteBtn.addEventListener("click", () => {

    tasks = tasks.filter(
      (t) => t.id !== task.id
    );

    saveTasks();
    renderTasks();
  });

  span.addEventListener("dblclick", () => {

    editTask(task);
  });

  /* append */

  li.append(
    checkbox,
    span,
    deleteBtn
  );

  list.appendChild(li);
}


/* =========================
   EDIT TASK
========================= */

function editTask(task) {

  const newText = prompt(
    "Modifier la tâche :",
    task.text
  );

  if (newText === null) return;

  const trimmedText =
    newText.trim();

  if (!trimmedText) return;

  task.text = trimmedText;

  saveTasks();
  renderTasks();
}


/* =========================
   TASK COUNT
========================= */

function updateTaskCount() {

  const total = tasks.length;

  taskCount.textContent =
    `${total} tâche(s)`;
}


/* =========================
   FILTER TASKS
========================= */

function filterTasks(filter) {

  document.querySelectorAll("li")
    .forEach((li) => {

      const checked =
        li.querySelector("input").checked;

      switch (filter) {

        case "active":

          li.style.display =
            checked ? "none" : "flex";

          break;

        case "done":

          li.style.display =
            checked ? "flex" : "none";

          break;

        default:

          li.style.display = "flex";
      }
    });
}


/* =========================
   CLEAR COMPLETED
========================= */

function clearCompletedTasks() {

  tasks = tasks.filter(
    (task) => !task.done
  );

  saveTasks();
  renderTasks();
}


/* =========================
   LOCAL STORAGE
========================= */

function saveTasks() {

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {

  tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  renderTasks();
}


/* =========================
   THEME
========================= */

function saveTheme() {

  const darkMode =
    document.body.classList.contains("dark");

  localStorage.setItem(
    "darkMode",
    darkMode
  );
}

function loadTheme() {

  const darkMode =
    localStorage.getItem("darkMode");

  if (darkMode === "true") {

    document.body.classList.add("dark");
  }
}


/* =========================
   INIT APP
========================= */

loadTheme();
loadTasks();