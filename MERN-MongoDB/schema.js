// Connect to the MongoDB server
const db = connect('localhost:27017/TaskMaster');

// Create the TaskMaster database (if it doesn't already exist)
db = db.getSiblingDB('TaskMaster');

// Create the Users collection
db.createCollection('Users', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["user_id", "username", "email", "password_hash", "role"],
            properties: {
                user_id: {
                    bsonType: "int",
                    description: "Unique identifier for each user"
                },
                username: {
                    bsonType: "string",
                    description: "Unique username for login"
                },
                email: {
                    bsonType: "string",
                    description: "Unique email for communication"
                },
                password_hash: {
                    bsonType: "string",
                    description: "Hashed password for security"
                },
                role: {
                    bsonType: "string",
                    enum: ["admin", "user"],
                    description: "Role of the user: admin or user"
                }
            }
        }
    }
});

// Create the Todos collection
db.createCollection('Todos', {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["todo_id", "user_id", "title", "status", "due_date", "priority", "created_at"],
            properties: {
                todo_id: {
                    bsonType: "int",
                    description: "Unique identifier for each todo"
                },
                user_id: {
                    bsonType: "int",
                    description: "Reference to the user who owns the todo"
                },
                title: {
                    bsonType: "string",
                    description: "Short description of the todo task"
                },
                description: {
                    bsonType: "string",
                    description: "Detailed description of the todo task"
                },
                status: {
                    bsonType: "string",
                    enum: ["pending", "in progress", "completed"],
                    description: "Current status of the todo"
                },
                due_date: {
                    bsonType: "date",
                    description: "Deadline for the todo task"
                },
                priority: {
                    bsonType: "string",
                    enum: ["low", "medium", "high"],
                    description: "Priority level of the todo"
                },
                created_at: {
                    bsonType: "date",
                    description: "Timestamp when the todo was created"
                }
            }
        }
    }
});

// Print success message
print("TaskMaster database and collections (Users, Todos) created successfully.");