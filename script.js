console.log("To-Do List app loaded");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();
    if (taskText === "") {
    return;
}

    const listItem = document.createElement("li");

const taskLabel = document.createElement("span");
taskLabel.textContent = taskText;

taskLabel.addEventListener("click", function () {
    listItem.classList.toggle("completed");
});

listItem.appendChild(taskLabel);
    taskList.appendChild(listItem);

    taskInput.value = "";
});
