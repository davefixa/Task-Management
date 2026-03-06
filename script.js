let tasks = JSON.parse(localStorage.getItem("tasks")) || []

function save(){
localStorage.setItem("tasks",JSON.stringify(tasks))
}

function addTask(){

let text=document.getElementById("taskInput").value
let category=document.getElementById("category").value
let priority=document.getElementById("priority").value
let deadline=document.getElementById("deadline").value

if(text==="") return

tasks.push({
id:Date.now(),
text,
category,
priority,
deadline,
completed:false
})

save()
renderTasks()

}

function renderTasks(){

let list=document.getElementById("taskList")

if(!list) return

list.innerHTML=""

tasks.forEach(task=>{

let li=document.createElement("li")

li.innerHTML=`
<span>${task.text}</span>

<div>
<button onclick="completeTask(${task.id})">✔</button>
<button onclick="deleteTask(${task.id})">✖</button>
</div>
`

list.appendChild(li)

})

updateStats()

}

function completeTask(id){

tasks=tasks.map(t=>t.id===id?{...t,completed:true}:t)

save()
renderTasks()

confetti()

}

function deleteTask(id){

tasks=tasks.filter(t=>t.id!==id)

save()
renderTasks()

}

function searchTask(){

let input=document.getElementById("searchTask").value.toLowerCase()

let list=document.getElementById("taskList")

list.innerHTML=""

tasks.filter(t=>t.text.toLowerCase().includes(input))
.forEach(task=>{

let li=document.createElement("li")

li.innerHTML=task.text

list.appendChild(li)

})

}

function filterTasks(type){

let list=document.getElementById("taskList")

list.innerHTML=""

let filtered=[]

if(type==="all") filtered=tasks
if(type==="completed") filtered=tasks.filter(t=>t.completed)
if(type==="pending") filtered=tasks.filter(t=>!t.completed)

filtered.forEach(task=>{

let li=document.createElement("li")

li.innerHTML=task.text

list.appendChild(li)

})

}

function updateStats(){

let total=tasks.length
let completed=tasks.filter(t=>t.completed).length
let pending=total-completed

let t=document.getElementById("totalTasks")
let c=document.getElementById("completedTasks")
let p=document.getElementById("pendingTasks")

if(t){
t.innerText=total
c.innerText=completed
p.innerText=pending
}

}

function confetti(){

for(let i=0;i<30;i++){

let div=document.createElement("div")

div.className="confetti"

div.style.left=Math.random()*100+"%"

document.body.appendChild(div)

setTimeout(()=>div.remove(),2000)

}

}

renderTasks()

if(document.getElementById("taskChart")){

let completed=tasks.filter(t=>t.completed).length
let pending=tasks.length-completed

new Chart(document.getElementById("taskChart"),{

type:"doughnut",

data:{
labels:["Completed","Pending"],

datasets:[{
data:[completed,pending],
backgroundColor:["#22c55e","#ef4444"]
}]
}

})

  }
function toggleTheme(){

document.body.classList.toggle("light-mode")

}

function clearTasks(){

tasks=[]

save()

renderTasks()

alert("All tasks deleted")

}

function saveUsername(){

let name=document.getElementById("usernameInput").value

localStorage.setItem("username",name)

document.getElementById("displayName").innerText="Hello "+name

}

let savedName=localStorage.getItem("username")

if(savedName && document.getElementById("displayName")){

document.getElementById("displayName").innerText="Hello "+savedName

}
