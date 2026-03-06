let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(){

let input = document.getElementById("taskInput");

if(!input) return;

let text = input.value;

if(text === "") return;

tasks.push({
text:text,
done:false
});

input.value="";

saveTasks();

displayTasks();

}

function displayTasks(){

let list = document.getElementById("taskList");

if(!list) return;

list.innerHTML="";

tasks.forEach((task,index)=>{

let li = document.createElement("li");

li.innerHTML =
task.text +
` <button onclick="completeTask(${index})">✔</button>
<button onclick="deleteTask(${index})">✖</button>`;

if(task.done){
li.style.textDecoration="line-through";
}

list.appendChild(li);

});

updateStats();

}

function completeTask(i){

tasks[i].done = !tasks[i].done;

saveTasks();

displayTasks();

}

function deleteTask(i){

tasks.splice(i,1);

saveTasks();

displayTasks();

}

function searchTask(){

let search = document.getElementById("searchInput").value.toLowerCase();

let list = document.getElementById("taskList");

let items = list.getElementsByTagName("li");

for(let i=0;i<items.length;i++){

let txt = items[i].innerText.toLowerCase();

items[i].style.display = txt.includes(search) ? "" : "none";

}

}

function updateStats(){

let total = tasks.length;

let completed = tasks.filter(t=>t.done).length;

let pending = total - completed;

let totalEl = document.getElementById("total");
let completedEl = document.getElementById("completed");
let pendingEl = document.getElementById("pending");

if(totalEl) totalEl.innerText = total;
if(completedEl) completedEl.innerText = completed;
if(pendingEl) pendingEl.innerText = pending;

let progress = document.getElementById("progress");
let text = document.getElementById("progressText");

if(progress){

let percent = total === 0 ? 0 : (completed/total)*100;

progress.style.width = percent + "%";

text.innerText = Math.round(percent) + "%";

}

}

displayTasks();
