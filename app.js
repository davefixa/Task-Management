const taskInput = document.getElementById("taskInput")

const dueDate = document.getElementById("dueDate")

const category = document.getElementById("category")

const taskList = document.getElementById("taskList")

let tasks = JSON.parse(localStorage.getItem("easytasks")) || []



function openApp(){

document.getElementById("landing").style.display="none"

document.getElementById("app").style.display="block"

render()

}



function save(){

localStorage.setItem("easytasks",JSON.stringify(tasks))

}



function addTask(){

if(taskInput.value.trim()=="") return

tasks.push({

text:taskInput.value,

date:dueDate.value,

category:category.value,

completed:false

})

taskInput.value=""

save()

render()

}



function render(){

taskList.innerHTML=""

tasks.forEach((task,index)=>{

let li=document.createElement("li")

if(task.completed) li.classList.add("completed")

li.innerHTML=`

<div class="taskInfo">

<b>${task.text}</b>

<small>${task.category} | ${task.date}</small>

</div>

<div class="buttons">

<button class="complete" onclick="toggleTask(${index})">✓</button>

<button class="delete" onclick="deleteTask(${index})">✕</button>

</div>

`

taskList.appendChild(li)

})

updateStats()

}



function toggleTask(index){

tasks[index].completed=!tasks[index].completed

save()

render()

}



function deleteTask(index){

tasks.splice(index,1)

save()

render()

}



function updateStats(){

document.getElementById("totalTasks").innerText=tasks.length

let completed = tasks.filter(t=>t.completed).length

document.getElementById("completedTasks").innerText=completed

document.getElementById("pendingTasks").innerText=tasks.length-completed

                                                }
