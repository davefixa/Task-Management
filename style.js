let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){

const input=document.getElementById("taskInput");
const text=input.value.trim();

if(text==="") return;

const task={
id:Date.now(),
text:text,
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

const taskList=document.getElementById("taskList");
const completedList=document.getElementById("completedList");

taskList.innerHTML="";
completedList.innerHTML="";

let total=tasks.length;
let completed=0;

tasks.forEach(task=>{

const li=document.createElement("li");

li.innerHTML=`
<span>${task.text}</span>

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

document.getElementById("totalTasks").textContent=total;
document.getElementById("completedTasks").textContent=completed;

}

renderTasks();
