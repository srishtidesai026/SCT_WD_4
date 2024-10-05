// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoDate = document.getElementById("todoDate");
const todoTime = document.getElementById("todoTime");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents default Enter key behavior
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim();
    const date = todoDate.value;
    const time = todoTime.value;

    if (newTask !== "") {
        todo.push({ text: newTask, date, time, disabled: false });
        saveToLocalStorage();
        todoInput.value = "";
        todoDate.value = ""; // Reset date input
        todoTime.value = ""; // Reset time input
        displayTasks();
    }
}

function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled ? "checked" : ""}>
                <p id="todo-${index}" class="${item.disabled ? "disabled" : ""}" onclick="editTask(${index})">${item.text} <span class="todo-date">${item.date} ${item.time}</span></p>
            </div>
        `;
        li.querySelector(".todo-checkbox").addEventListener("change", () =>
            toggleTask(index)
        );
        todoList.appendChild(li);
    });
    todoCount.textContent = todo.length;
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function() {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}