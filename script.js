
console.log("To-Do List app loaded");

// DOM element declarations
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const completedCounter = document.getElementById("completed-counter");
const pendingCounter = document.getElementById("pending-counter");

// Commit 11 and 12: Update task counts
function updateTaskCounter() {
    const totalTasks = taskList.children.length;
    const completedTasks = taskList.querySelectorAll("li.completed").length;
    const pendingTasks = totalTasks - completedTasks;

    taskCounter.textContent = `Total tasks: ${totalTasks}`;
    completedCounter.textContent = `Completed: ${completedTasks}`;
    pendingCounter.textContent = `Pending: ${pendingTasks}`;
}

// Handle adding tasks
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    // Prevent empty tasks
    if (taskText === "") {
        return;
    }

    const listItem = document.createElement("li");

    const taskLabel = document.createElement("span");
    taskLabel.textContent = taskText;

    // Toggle completed status
    taskLabel.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        updateTaskCounter();
    });

    listItem.appendChild(taskLabel);

    // Delete task
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        listItem.remove();
        updateTaskCounter();
    });

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    // Clear input after adding
    taskInput.value = "";

    updateTaskCounter();
});

// Display counts when page loads
updateTaskCounter();
