const input = document.getElementById('taskInput');
const button = document.getElementById("addBtn");
const list = document.getElementById('taskList');

button.addEventListener("click", addTask);

function addTask() {
	const text = input.value.trim();

	//sécurité
	if (!text) return;

	createTaskElement(text);
	input.value="";
}

function createTaskElement(text){

	const li = document.createElement("li");

	li.textContent = text;

	list.appendChild(li);

}

