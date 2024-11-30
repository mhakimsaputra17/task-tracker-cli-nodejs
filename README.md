# Task Tracker CLI Application

## Overview

Task Tracker is a simple command-line interface (CLI) application that allows you to track and manage your tasks directly from the terminal. You can add new tasks, update existing ones, delete tasks, and change their status to keep track of your progress.

## Features

- **Add Tasks**: Create new tasks with a description.
- **Update Tasks**: Modify the description of existing tasks.
- **Delete Tasks**: Remove tasks from the list.
- **Mark Tasks**: Change the status of tasks to `todo`, `in-progress`, or `done`.
- **List Tasks**: Display all tasks or filter them by their status.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your system.

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mhakimsaputra17/task-tracker-cli-nodejs.git
   cd task-tracker-cli-nodejs
   ```

2. **Set Up**

   No additional setup is needed. The application uses only built-in Node.js modules (`fs` and `path`).

## Usage

Run the application using the `node` command followed by `task-cli.js` and the desired command.

### Adding a New Task

```bash
node task-cli.js add "Task description"
```

**Example:**

```bash
node task-cli.js add "Buy groceries"
```

### Updating a Task

```bash
node task-cli.js update <task_id> "New task description"
```

**Example:**

```bash
node task-cli.js update 1 "Buy groceries and cook dinner"
```

### Deleting a Task

```bash
node task-cli.js delete <task_id>
```

**Example:**

```bash
node task-cli.js delete 1
```

### Marking a Task as In Progress

```bash
node task-cli.js mark-in-progress <task_id>
```

**Example:**

```bash
node task-cli.js mark-in-progress 1
```

### Marking a Task as Done

```bash
node task-cli.js mark-done <task_id>
```

**Example:**

```bash
node task-cli.js mark-done 1
```

### Listing All Tasks

```bash
node task-cli.js list
```

### Listing Tasks by Status

```bash
node task-cli.js list <status>
```

**Statuses:** `todo`, `in-progress`, `done`

**Examples:**

```bash
node task-cli.js list todo
node task-cli.js list in-progress
node task-cli.js list done
```

## Task Properties

Each task has the following properties:

- **id**: Unique identifier for the task.
- **description**: A short description of the task.
- **status**: The status of the task (`todo`, `in-progress`, `done`).
- **createdAt**: The date and time when the task was created.
- **updatedAt**: The date and time when the task was last updated.

## Data Storage

- Tasks are stored in a `tasks.json` file in the same directory as `task-cli.js`.
- The file is created automatically if it does not exist.
- The application uses the built-in `fs` module to read and write to the file.

## Error Handling

- The application checks for missing or invalid inputs and provides appropriate messages.
- If a task ID does not exist, it informs the user.
- Validates status inputs when listing tasks by status.

## Notes

- The application uses only standard Node.js modules without any external libraries.
- Ensure you run the commands from the project directory to access the `tasks.json` file correctly.

## Contributing

Contributions are welcome! If you have suggestions or find issues, please open an issue or create a pull request.

## License

This project is licensed under the MIT License.