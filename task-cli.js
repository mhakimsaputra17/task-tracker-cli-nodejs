// task-cli.js

const fs = require('fs');
const readline = require('readline');
const path = require('path');

// File to store tasks
const tasksFile = path.join(__dirname, 'tasks.json');

// Initialize tasks file if it doesn't exist
if (!fs.existsSync(tasksFile)) {
    fs.writeFileSync(tasksFile, '[]', 'utf8');
}

// Read existing tasks from file
function readTasks() {
    const data = fs.readFileSync(tasksFile, 'utf8');
    return JSON.parse(data);
}

// Write tasks to file
function writeTasks(tasks) {
    fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2), 'utf8');
}

// Generate unique ID
function generateId(tasks) {
    return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

// Get command-line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        addTask(args[1]);
        break;
    case 'update':
        updateTask(parseInt(args[1]), args[2]);
        break;
    case 'delete':
        deleteTask(parseInt(args[1]));
        break;
    case 'mark-in-progress':
        markTaskStatus(parseInt(args[1]), 'in-progress');
        break;
    case 'mark-done':
        markTaskStatus(parseInt(args[1]), 'done');
        break;
    case 'list':
        listTasks(args[1]);
        break;
    default:
        console.log('Invalid command. Available commands are: add, update, delete, mark-in-progress, mark-done, list');
}

// Function to add a new task
function addTask(description) {
    if (!description) {
        console.log('Please provide a description for the task.');
        return;
    }

    const tasks = readTasks();
    const newTask = {
        id: generateId(tasks),
        description: description,
        status: 'todo',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    writeTasks(tasks);
    console.log(`Task added successfully (ID: ${newTask.id})`);
}

// Function to update a task's description
function updateTask(id, description) {
    if (!id || !description) {
        console.log('Please provide both task ID and new description.');
        return;
    }

    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.description = description;
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task ${id} updated successfully.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}

// Function to delete a task
function deleteTask(id) {
    if (!id) {
        console.log('Please provide the task ID to delete.');
        return;
    }

    let tasks = readTasks();
    const initialLength = tasks.length;
    tasks = tasks.filter((t) => t.id !== id);
    if (tasks.length < initialLength) {
        writeTasks(tasks);
        console.log(`Task ${id} deleted successfully.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}

// Function to mark a task's status
function markTaskStatus(id, status) {
    if (!id) {
        console.log('Please provide the task ID.');
        return;
    }

    const tasks = readTasks();
    const task = tasks.find((t) => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        writeTasks(tasks);
        console.log(`Task ${id} marked as ${status}.`);
    } else {
        console.log(`Task with ID ${id} not found.`);
    }
}

// Function to list tasks
function listTasks(status) {
    const tasks = readTasks();
    let filteredTasks = tasks;

    if (status) {
        if (['todo', 'in-progress', 'done'].includes(status)) {
            filteredTasks = tasks.filter((t) => t.status === status);
        } else {
            console.log(`Invalid status '${status}'. Valid statuses are: todo, in-progress, done.`);
            return;
        }
    }

    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
    } else {
        filteredTasks.forEach((task) => {
            console.log(`ID: ${task.id}`);
            console.log(`Description: ${task.description}`);
            console.log(`Status: ${task.status}`);
            console.log(`Created At: ${task.createdAt}`);
            console.log(`Updated At: ${task.updatedAt}`);
            console.log('---------------------------');
        });
    }
}