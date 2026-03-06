let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){
let input = document.getElementById("taskInput");
let priority = document.getElementById("priority").value;
let deadline = document.getElementById("deadline").value;

if(input.value.trim() === "") return;

tasks.push({
text:input.value.trim(),
priority:priority,
deadline:deadline,
completed:false
});

input.value = "";
document.getElementById("priority").value = "none";
document.getElementById("deadline").value = "";

saveTasks();
renderTasks();
}

function renderTasks(){
let list = document.getElementById("taskList");
list.innerHTML = "";

tasks.forEach((task, index) => {
let li = document.createElement("li");
li.className = task.completed ? "completed" : "";

let content = `
<div class="text">
<b>${task.text}</b>
${task.priority !== "none" ? `<span class="priority-${task.priority}">(${task.priority})</span>` : ""}
${task.deadline ? ` • 📅 ${task.deadline}` : ""}
</div>
`;

li.innerHTML = content + `
<div>
<button class="small" onclick="toggleComplete(${index})">✔</button>
<button class="small" onclick="deleteTask(${index})">✖</button>
</div>
`;
list.appendChild(li);
});
}

function toggleComplete(i){
tasks[i].completed = !tasks[i].completed;
saveTasks();
renderTasks();
}

function deleteTask(i){
tasks.splice(i,1);
saveTasks();
renderTasks();
}

function searchTask(){
let val = document.getElementById("searchTask").value.toLowerCase();
let items = document.querySelectorAll("#taskList li");

items.forEach(item => {
item.style.display = item.textContent.toLowerCase().includes(val) ? "" : "none";
});
}

renderTasks();
