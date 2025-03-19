const fs = require('fs');

function updateExpectedTodos() {
    // Load the todos.json file
    const todos = JSON.parse(fs.readFileSync('./Data/todos.json', 'utf-8'));

    // Load the expected_todos.json file
    const expectedTodos = JSON.parse(fs.readFileSync('./Data/expected_todos.json', 'utf-8'));

    // Create a map of todos with _id as the key for quick lookup
    const todosMap = new Map(todos.map(todo => [todo._id, todo]));

    // Update the created_at and due_date in expectedTodos
    expectedTodos.forEach(expectedTodo => {
        const matchingTodo = todosMap.get(expectedTodo._id);
        if (matchingTodo) {
            // Update created_at and due_date fields
            expectedTodo.created_at = matchingTodo.created_at;
            expectedTodo.due_date = matchingTodo.due_date;
        }
    });

    // Save the updated expectedTodos back to expected_todos.json
    fs.writeFileSync('./Data/expected_todos.json', JSON.stringify(expectedTodos, null, 2)); // Pretty-print with 2 spaces
    console.log('expected_todos.json has been updated with created_at and due_date from todos.json.');
}

// Run the function
updateExpectedTodos();
