const input = document.getElementById('taskInput');
const button = document.getElementById("addBtn");
const list = document.getElementById('taskList');

button.addEventListener("click", addTask);

function addTask() {
	const text = input.value.trim();

	//sécurité
	if (!text) return;

	createTaskElement(text);
	saveTasks();
	input.value="";
}

function createTaskElement(text, done = false){

	const li = document.createElement("li");


	//checkbox
	const checkBox = document.createElement("input");
	checkBox.type = "checkbox";
	checkBox.checked = done;

	//span
	const span = document.createElement("span");
	span.textContent = text;


	//button supprimer
	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "❌"

	//Style si termine

	if (done) {span.classList.add("done");}

	//event checkboxe
	checkBox.addEventListener("change", () => {
		span.classList.toggle("done");
		saveTasks();
	});

	deleteBtn.addEventListener("click", () => {
		li.remove();
		saveTasks();
	});

	li.append(checkBox, span, deleteBtn);
	list.appendChild(li);

}


function saveTasks(){

	const tasks = [];

	document.querySelectorAll("li").forEach((li) => {

		const text = li.querySelector("span").textContent;
		const done = li.querySelector("input").checked;

		tasks.push({text, done});
	});

	localStarage.setItem("tasks_data", JSON.stringify(tasks));
}

function loadTasks(){
	const task = JSON.parse(localStarage.getItem("tasks_data"));

	task.forEach((li) => {
		createTaskElement(task.text, task.done);
	});
}

loadTasks();
