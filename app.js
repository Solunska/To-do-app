document.addEventListener("DOMContentLoaded", loadTasks);

const input = document.getElementById("input");
const addButton = document.getElementById("addTask");
const tasks = document.getElementById("tasks");

addButton.addEventListener("click", addToDo);
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addToDo();
});

function addToDo() {
    const todo = input.value.trim();

    if (todo === "") {
        input.value = "";
        return;
    };

    const li = document.createElement("li");
    li.innerHTML = `<div class="todo">${todo}</div>
                    <div class="btn-container">
                        <input class="checkbox" type="checkbox" />
                        <button class="delete">x</button>
                    </div>`;

    tasks.appendChild(li);

    li.querySelector(".delete").addEventListener("click", deleteTodo);
    li.querySelector(".checkbox").addEventListener("click", toggleComplete);

    input.value = "";
    saveTodos();
}

function toggleComplete(event) {
    const todoText = event.target.closest("li").querySelector(".todo");
    todoText.classList.toggle("done");

    saveTodos();
}

function deleteTodo(event) {
    event.target.parentElement.parentElement.remove();

    saveTodos();
}

function saveTodos() {
    const todos = [];
    document.querySelectorAll("#tasks li").forEach(li => {
        todos.push({
            text: li.querySelector(".todo").textContent,
            done: li.querySelector(".todo").classList.contains("done")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTasks() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.innerHTML = `<div class="todo">${todo.text}</div>
                    <div class="btn-container">
                        <input class="checkbox" type="checkbox" />
                        <button class="delete">x</button>
                    </div>`;
        if (todo.done) {
            li.querySelector(".todo").classList.add("done");
            li.querySelector(".checkbox").checked = true;
        }
        li.querySelector(".delete").addEventListener("click", deleteTodo);
        li.querySelector(".checkbox").addEventListener("click", toggleComplete);

        tasks.appendChild(li);
    });
}