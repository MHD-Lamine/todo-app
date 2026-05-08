const taskCount = document.getElementById("taskCount");
const filterButtons = document.querySelectorAll("[data-filter]");
const clearCompletedBtn = document.getElementById("clearCompleted");

const input = document.getElementById('taskInput');
const button = document.getElementById("addBtn");
const list = document.getElementById('taskList');

button.addEventListener("click", addTask);

function addTask() {

	const text = input.value.trim();

	// sécurité
	if (!text) return;

	createTaskElement(text);
	saveTasks();

	input.value = "";
}

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


function createTaskElement(text, done = false) {

	const li = document.createElement("li");

	// checkbox
	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.checked = done;

	// span
	const span = document.createElement("span");
	span.textContent = text;

	span.addEventListener("dblclick", () => {
		editTask(span);
	});

	// bouton supprimer
	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "❌";

	// style si terminé
	if (done) {
		span.classList.add("done");
	}

	// événement checkbox
	checkBox.addEventListener("change", () => {
		span.classList.toggle("done");
		saveTasks();
	});

	// événement suppression
	deleteBtn.addEventListener("click", () => {
		li.remove();
		saveTasks();
		//updateTaskCount();
	});

	li.append(checkBox, span, deleteBtn);
	list.appendChild(li);

	updateTaskCount();
}

function saveTasks() {

	const tasks = [];

	document.querySelectorAll("li").forEach((li) => {

		const text = li.querySelector("span").textContent;
		const done = li.querySelector("input").checked;

		tasks.push({ text, done });
	});

	localStorage.setItem("tasks_data", JSON.stringify(tasks));
}

function loadTasks() {

	const tasks = JSON.parse(localStorage.getItem("tasks_data")) || [];

	tasks.forEach((task) => {
		createTaskElement(task.text, task.done);
	});
}

function editTask(span){

	const oldText = span.textContent;

	const newText = prompt("Modifier la tâche :", oldText);

	// sécurité
	if (newText === null) return;

	const trimmedText = newText.trim();

	if (!trimmedText) return;

	span.textContent = trimmedText;

	saveTasks();

}

function updateTaskCount(){

const total = document.querySelectorAll("li").length;

taskCount.textContent = `${total} tâche(s)`;

}

function filterTasks(filter){

	document.querySelectorAll("li").forEach((li) => {
		const checked = li.querySelector("input").checked;

		switch(filter){
			case "active":
				li.style.display = checked ? "none" : "flex";
				break;

			case "done":
				li.style.display = checked ? "flex" : "none";

			default: 
				li.style.display = "flex";
		}
	});
}

function clearCompletedTasks() {

  document.querySelectorAll("li")
    .forEach((li) => {

      const checked =
        li.querySelector("input").checked;

      if (checked) {
        li.remove();
      }
    });

  saveTasks();
  updateTaskCount();
}


loadTasks();