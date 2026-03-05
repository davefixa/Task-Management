let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks", JSON.stringify(tasks));
}


function addTask(){

let input=document.getElementById("taskInput");
let category=document.getElementById("category").value;
let priority=document.getElementById("priority").value;
let deadline=document.getElementById("deadline").value;

let text=input.value.trim();

if(text==="") return;

let task={
id:Date.now(),
text:text,
category:category,
priority:priority,
deadline:deadline,
completed:false
};

tasks.push(task);

input.value="";

saveTasks();
renderTasks();

}


function deleteTask(id){

tasks=tasks.filter(task=>task.id!==id);

saveTasks();
renderTasks();

}


function completeTask(id){

tasks=tasks.map(task=>{

if(task.id===id){
task.completed=!task.completed;
}

return task;

});

saveTasks();
renderTasks();

}


function renderTasks(){

let taskList=document.getElementById("taskList");
let completedList=document.getElementById("completedList");

let search=document.getElementById("searchTask").value.toLowerCase();

taskList.innerHTML="";
completedList.innerHTML="";

let completed=0;

tasks.forEach(task=>{

if(!task.text.toLowerCase().includes(search)) return;

let li=document.createElement("li");

li.innerHTML=`

<div>

<b>${task.text}</b>

<span class="category">${task.category}</span>

<span class="priority ${task.priority.toLowerCase()}">
${task.priority}
</span>

<br>
<small>📅 ${task.deadline || "No deadline"}</small>

</div>

<div class="buttons">

<button class="complete" onclick="completeTask(${task.id})">✔</button>

<button class="delete" onclick="deleteTask(${task.id})">✖</button>

</div>

`;

if(task.completed){
completed++;
completedList.appendChild(li);
}else{
taskList.appendChild(li);
}

});

document.getElementById("totalTasks").innerText=tasks.length;
document.getElementById("completedTasks").innerText=completed;

let progress=tasks.length?(completed/tasks.length)*100:0;

document.getElementById("progress").style.width=progress+"%";

}


function toggleMode(){

document.body.classList.toggle("dark");

}


renderTasks();
