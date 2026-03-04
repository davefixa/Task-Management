function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.setAttribute("data-id", task.id);
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <div class="task-buttons">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;

        addDragEvents(li);
        taskList.appendChild(li);
    });
}


let draggedItem = null;

function addDragEvents(item) {
    item.addEventListener("dragstart", () => {
        draggedItem = item;
        setTimeout(() => item.style.display = "none", 0);
    });

    item.addEventListener("dragend", () => {
        setTimeout(() => {
            item.style.display = "flex";
            draggedItem = null;
            updateTaskOrder();
        }, 0);
    });

    item.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    item.addEventListener("drop", () => {
        if (draggedItem !== item) {
            taskList.insertBefore(draggedItem, item);
        }
    });
}

function updateTaskOrder() {
    const newTasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        const id = Number(li.getAttribute("data-id"));
        const task = tasks.find(t => t.id === id);
        newTasks.push(task);
    });
    tasks = newTasks;
    saveTasks();
}
