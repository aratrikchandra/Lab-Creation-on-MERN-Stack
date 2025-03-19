const fs = require('fs');

function modifyTodos() {
    // Load the current todos.json file
    const todos = JSON.parse(fs.readFileSync('./Data/todos.json', 'utf-8'));

    // Get the current date
    const currentDate = new Date();

    // Iterate over each todo and update the fields
    todos.forEach(todo => {
        // Set `created_at` to the current time
        todo.created_at = new Date().toISOString(); // ISO format for MongoDB

        // Calculate a random `due_date` within the next 6 months
        const sixMonthsFromNow = new Date();
        sixMonthsFromNow.setMonth(currentDate.getMonth() + 6);

        const randomDueDate = new Date(
            currentDate.getTime() +
            Math.random() * (sixMonthsFromNow.getTime() - currentDate.getTime())
        );

        todo.due_date = randomDueDate.toISOString(); // ISO format for MongoDB
    });

    // Save the updated todos back to the JSON file
    fs.writeFileSync('./Data/todos.json', JSON.stringify(todos, null, 2)); // Pretty-print with 2 spaces
    console.log('Todos updated with new created_at and due_date fields.');
}

// Run the function
modifyTodos();
