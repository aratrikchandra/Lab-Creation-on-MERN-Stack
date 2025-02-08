// Create Users and Todos collections
db.createCollection("Users");
db.createCollection("Todos");

// Populate the Users collection with essential fields
db.Users.insertMany([
    { 
        user_id: 1, 
        username: "supercoder", 
        email: "supercoder@example.com", 
        password_hash: "$2a$10$examplehash1", 
        role: "admin" 
    },
    { 
        user_id: 2, 
        username: "techguru", 
        email: "techguru@example.com", 
        password_hash: "$2a$10$examplehash2", 
        role: "user" 
    },
    { 
        user_id: 3, 
        username: "designwizard", 
        email: "designwizard@example.com", 
        password_hash: "$2a$10$examplehash3", 
        role: "user" 
    },
    { 
        user_id: 4, 
        username: "datadynamo", 
        email: "datadynamo@example.com", 
        password_hash: "$2a$10$examplehash4", 
        role: "user" 
    },
    { 
        user_id: 5, 
        username: "cloudmaster", 
        email: "cloudmaster@example.com", 
        password_hash: "$2a$10$examplehash5", 
        role: "user" 
    },
    { 
        user_id: 6, 
        username: "codeartist", 
        email: "codeartist@example.com", 
        password_hash: "$2a$10$examplehash6", 
        role: "user" 
    },
    { 
        user_id: 7, 
        username: "debuggerking", 
        email: "debuggerking@example.com", 
        password_hash: "$2a$10$examplehash7", 
        role: "user" 
    },
    { 
        user_id: 8, 
        username: "scriptninja", 
        email: "scriptninja@example.com", 
        password_hash: "$2a$10$examplehash8", 
        role: "user" 
    },
    { 
        user_id: 9, 
        username: "webwarrior", 
        email: "webwarrior@example.com", 
        password_hash: "$2a$10$examplehash9", 
        role: "user" 
    },
    { 
        user_id: 10, 
        username: "devgenius", 
        email: "devgenius@example.com", 
        password_hash: "$2a$10$examplehash10", 
        role: "user" 
    }
]);

// Populate the Todos collection with sample tasks
db.Todos.insertMany([
    { 
        todo_id: 1,
        user_id: 2,
        title: "Complete project report",
        description: "Finish the quarterly project report for review",
        status: "pending",
        due_date: new Date("2025-03-15"),
        priority: "high",
        created_at: new Date("2025-01-10")
    },
    { 
        todo_id: 2,
        user_id: 2,
        title: "Buy groceries",
        description: "Milk, eggs, bread, and fruits",
        status: "completed",
        due_date: new Date("2025-02-20"),
        priority: "medium",
        created_at: new Date("2025-01-05")
    },
    { 
        todo_id: 3,
        user_id: 3,
        title: "Schedule team meeting",
        description: "Coordinate with team for weekly sync",
        status: "in progress",
        due_date: new Date("2025-04-12"),
        priority: "high",
        created_at: new Date("2025-02-01")
    },
    { 
        todo_id: 4,
        user_id: 3,
        title: "Research new technologies",
        description: "Look into latest framework updates",
        status: "pending",
        due_date: new Date("2025-05-20"),
        priority: "low",
        created_at: new Date("2025-03-01")
    },
    { 
        todo_id: 5,
        user_id: 4,
        title: "Plan vacation",
        description: "Book flights and hotels for summer vacation",
        status: "pending",
        due_date: new Date("2025-06-01"),
        priority: "medium",
        created_at: new Date("2025-04-15")
    },
    { 
        todo_id: 6,
        user_id: 4,
        title: "Renew gym membership",
        description: "Renew annual gym membership",
        status: "completed",
        due_date: new Date("2025-01-30"),
        priority: "low",
        created_at: new Date("2025-01-01")
    },
    { 
        todo_id: 7,
        user_id: 5,
        title: "Organize workspace",
        description: "Clean and organize home office",
        status: "in progress",
        due_date: new Date("2025-03-25"),
        priority: "medium",
        created_at: new Date("2025-02-10")
    },
    { 
        todo_id: 8,
        user_id: 5,
        title: "Learn new programming language",
        description: "Start learning Rust programming",
        status: "pending",
        due_date: new Date("2025-07-10"),
        priority: "high",
        created_at: new Date("2025-05-01")
    },
    { 
        todo_id: 9,
        user_id: 6,
        title: "Write blog post",
        description: "Write a blog post about AI advancements",
        status: "pending",
        due_date: new Date("2025-08-15"),
        priority: "medium",
        created_at: new Date("2025-06-01")
    },
    { 
        todo_id: 10,
        user_id: 6,
        title: "Update portfolio",
        description: "Add recent projects to personal portfolio",
        status: "completed",
        due_date: new Date("2025-02-28"),
        priority: "high",
        created_at: new Date("2025-01-20")
    },
    { 
        todo_id: 11,
        user_id: 7,
        title: "Fix bugs in app",
        description: "Resolve critical bugs in the main application",
        status: "in progress",
        due_date: new Date("2025-09-05"),
        priority: "high",
        created_at: new Date("2025-07-15")
    },
    { 
        todo_id: 12,
        user_id: 7,
        title: "Attend conference",
        description: "Register and prepare for tech conference",
        status: "pending",
        due_date: new Date("2025-10-10"),
        priority: "medium",
        created_at: new Date("2025-08-01")
    },
    { 
        todo_id: 13,
        user_id: 8,
        title: "Backup data",
        description: "Perform monthly data backup",
        status: "pending",
        due_date: new Date("2025-11-15"),
        priority: "low",
        created_at: new Date("2025-09-10")
    },
    { 
        todo_id: 14,
        user_id: 8,
        title: "Review code",
        description: "Review pull requests for team projects",
        status: "completed",
        due_date: new Date("2025-01-25"),
        priority: "high",
        created_at: new Date("2025-01-01")
    },
    { 
        todo_id: 15,
        user_id: 9,
        title: "Plan team outing",
        description: "Organize team outing for next quarter",
        status: "pending",
        due_date: new Date("2025-12-20"),
        priority: "medium",
        created_at: new Date("2025-10-01")
    },
    { 
        todo_id: 16,
        user_id: 9,
        title: "Update resume",
        description: "Add recent achievements to resume",
        status: "completed",
        due_date: new Date("2025-03-10"),
        priority: "low",
        created_at: new Date("2025-02-01")
    },
    { 
        todo_id: 17,
        user_id: 10,
        title: "Learn Docker",
        description: "Complete Docker course on Udemy",
        status: "in progress",
        due_date: new Date("2025-04-30"),
        priority: "high",
        created_at: new Date("2025-03-15")
    },
    { 
        todo_id: 18,
        user_id: 10,
        title: "Optimize database",
        description: "Optimize database queries for better performance",
        status: "pending",
        due_date: new Date("2025-05-15"),
        priority: "medium",
        created_at: new Date("2025-04-01")
    },
    { 
        todo_id: 19,
        user_id: 2,
        title: "Read a book",
        description: "Finish reading 'Clean Code' by Robert Martin",
        status: "pending",
        due_date: new Date("2025-06-30"),
        priority: "low",
        created_at: new Date("2025-05-01")
    },
    { 
        todo_id: 20,
        user_id: 3,
        title: "Plan birthday party",
        description: "Organize a birthday party for a friend",
        status: "completed",
        due_date: new Date("2025-07-25"),
        priority: "medium",
        created_at: new Date("2025-06-10")
    }
]);
