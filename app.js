const taskInput = document.getElementById('task-input'),
    taskBtn = document.getElementById('add-task'),
    taskList = document.getElementById('tasks');

let mode = "create";
let taskIdToEdit = -1;

let tasks = [];

window.onload = loadApp;

taskBtn.onclick = () => {
    if (mode == "create") {
        if (taskInput.value != "") {
            createTask(taskInput.value);
        }
        resetMode();
    } else {
        if (taskInput.value != "") {
            document.getElementById(`task${taskIdToEdit}`).style.cssText = `
                background-color: #e2e2e2;
                color: #000000;
                scale: 1.00;
                transition: 0.3s;
            `
            setTimeout(() => {
                updateTask(taskIdToEdit, taskInput.value);
                resetMode();
            }, 300);
        }
    }
    
}

function loadApp() {
    resetMode();
    if (localStorage.getItem("tasks") === null) {
        localStorage.setItem("tasks", "[]");
    } else {
        console.log(localStorage.getItem("tasks"))
        tasks = JSON.parse(localStorage.getItem("tasks"));
        loadTasks();
    }
}

function loadTasks() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        taskList.innerHTML += `
            <li class="task" id="task${i}">
                <p onclick="toggleDone(${i})">${tasks[i].text}</p>
                <div>
                    <button class="edit" onclick="editTask(${i})">Edit</button>
                    <button class="delete" onclick="deleteTask(${i})">Delete</button>
                </div>
            </li>
        `
        if (tasks[i].done) {
            document.getElementById(`task${i}`).classList.add("done");
        }
    }
}

function createTask(txt) {
    let task = {text: txt, id: tasks.length, done: false}
    tasks.push(task);
    console.log(tasks)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(id) {
    resetMode();
    tasks.splice(id, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function editTask(id) {
    resetMode();
    console.log(tasks[id])
    taskInput.value = tasks[id].text;
    taskBtn.innerText = "Update";
    mode = "update";
    taskIdToEdit = id;
    document.getElementById(`task${id}`).style.cssText = `
        background-color: #282a35;
        color: white;
        scale: 1.07;
        transition: 0.3s;
    `
}

function updateTask(id, txt) {
    tasks[id].text = txt;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function resetMode() {
    mode = "create";
    taskIdToEdit = -1;
    taskInput.value = "";
    taskBtn.innerText = "Add Task";
}

function toggleDone(id) {
    console.log("test")
    document.getElementById(`task${id}`).classList.toggle("done");
    tasks[id].done = !tasks[id].done;
    localStorage.setItem("tasks", JSON.stringify(tasks));
}