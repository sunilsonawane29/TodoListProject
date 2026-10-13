
console.log("To-Do List app loaded");

// DOM elements
const errorMessage = document.getElementById("error-message");
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

const taskCounter = document.getElementById("task-counter");
const completedCounter = document.getElementById("completed-counter");
const pendingCounter = document.getElementById("pending-counter");
const clearAllButton = document.getElementById("clear-all-btn");

const STORAGE_KEY = "todo-list-tasks";

// Save tasks to localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(function (li) {
        return {
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        };
    });

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Update counters
function updateTaskCounter() {
    const total = taskList.children.length;
    const completed = taskList.querySelectorAll("li.completed").length;

    taskCounter.textContent = `Total tasks: ${total}`;
    completedCounter.textContent = `Completed: ${completed}`;
    pendingCounter.textContent = `Pending: ${total - completed}`;
}

// Check for duplicate tasks
function taskAlreadyExists(text) {
    return Array.from(taskList.querySelectorAll("li span")).some(
        function (span) {
            return span.textContent.toLowerCase() === text.toLowerCase();
        }
    );
}

// Create a task
function createTask(text, completed = false) {
    const listItem = document.createElement("li");
    const taskLabel = document.createElement("span");
    const deleteButton = document.createElement("button");

    taskLabel.textContent = text;
    deleteButton.textContent = "Delete";
    deleteButton.type = "button";

    if (completed) {
        listItem.classList.add("completed");
    }

    taskLabel.addEventListener("click", function () {
        listItem.classList.toggle("completed");
        updateTaskCounter();
        saveTasks();
    });

    deleteButton.addEventListener("click", function () {
        const confirmed = confirm("Are you sure you want to delete this task?");

        if (confirmed) {
            listItem.remove();
            updateTaskCounter();
            saveTasks();
            errorMessage.textContent = "";
        }
    });

    listItem.appendChild(taskLabel);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

// Add a task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (!text) {
        errorMessage.textContent = "Please enter a task!";
        taskInput.focus();
        return;
    }

    if (taskAlreadyExists(text)) {
        errorMessage.textContent = "This task already exists!";
        taskInput.focus();
        return;
    }

    createTask(text);
    taskInput.value = "";
    errorMessage.textContent = "";

    updateTaskCounter();
    saveTasks();
    taskInput.focus();
});

// Clear all tasks
clearAllButton.addEventListener("click", function () {
    if (taskList.children.length === 0) {
        errorMessage.textContent = "There are no tasks to clear!";
        return;
    }

    if (confirm("Are you sure you want to delete all tasks?")) {
        taskList.innerHTML = "";
        errorMessage.textContent = "";

        updateTaskCounter();
        saveTasks();
        taskInput.focus();
    }
});

// Restore saved tasks
function loadTasks() {
    try {
        const savedTasks = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(savedTasks)) {
            return;
        }

        savedTasks.forEach(function (task) {
            if (
                task &&
                typeof task.text === "string" &&
                task.text.trim() !== "" &&
                typeof task.completed === "boolean" &&
                !taskAlreadyExists(task.text.trim())
            ) {
                createTask(task.text.trim(), task.completed);
            }
        });
    } catch (error) {
        console.error("Could not load saved tasks:", error);
    }

    updateTaskCounter();
}

// Initialize the app
loadTasks();