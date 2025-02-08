// Remove all data from the collections
db.Users.deleteMany({});
db.Todos.deleteMany({});


// Populate the Users collection with essential fields
db.Users.insertMany([
    { 
        user_id: 1, 
        username: "supercoder", 
        email: "supercoder@gmail.com", 
        password_hash: "$2a$10$examplehash1", 
        role: "admin" 
    },
    { 
        user_id: 2, 
        username: "techguru", 
        email: "techguru@hotmail.com", 
        password_hash: "$2a$10$examplehash2", 
        role: "user" 
    },
    { 
        user_id: 3, 
        username: "designwizard", 
        email: "designwizard@outlook.com", 
        password_hash: "$2a$10$examplehash3", 
        role: "user" 
    },
    { 
        user_id: 4, 
        username: "datadynamo", 
        email: "datadynamo@gmail.com", 
        password_hash: "$2a$10$examplehash4", 
        role: "user" 
    },
    { 
        user_id: 5, 
        username: "cloudmaster", 
        email: "cloudmaster@yahoo.com", 
        password_hash: "$2a$10$examplehash5", 
        role: "user" 
    },
    { 
        user_id: 6, 
        username: "codeartist", 
        email: "codeartist@gmail.com", 
        password_hash: "$2a$10$examplehash6", 
        role: "user" 
    },
    { 
        user_id: 7, 
        username: "debuggerking", 
        email: "debuggerking@hotmail.com", 
        password_hash: "$2a$10$examplehash7", 
        role: "admin" 
    },
    { 
        user_id: 8, 
        username: "scriptninja", 
        email: "scriptninja@yahoo.com", 
        password_hash: "$2a$10$examplehash8", 
        role: "user" 
    },
    { 
        user_id: 9, 
        username: "webwarrior", 
        email: "webwarrior@outlook.com", 
        password_hash: "$2a$10$examplehash9", 
        role: "user" 
    },
    { 
        user_id: 10, 
        username: "devgenius", 
        email: "devgenius@hotmail.com", 
        password_hash: "$2a$10$examplehash10", 
        role: "admin" 
    },
    { 
        user_id: 11, 
        username: "taskmaster", 
        email: "taskmaster@hotmail.com", 
        password_hash: "$2a$10$examplehash11", 
        role: "user" 
    },
    { 
        user_id: 12, 
        username: "adminpro", 
        email: "adminpro@yahoo.com", 
        password_hash: "$2a$10$examplehash12", 
        role: "admin" 
    },
    { 
        user_id: 13, 
        username: "user123", 
        email: "user123@hotmail.com", 
        password_hash: "$2a$10$examplehash13", 
        role: "user" 
    },
    { 
        user_id: 14, 
        username: "admin456", 
        email: "admin456@gmail.com", 
        password_hash: "$2a$10$examplehash14", 
        role: "admin" 
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
    },
    { 
        todo_id: 21,
        user_id: 2,
        title: "Prepare presentation",
        description: "Prepare slides for the upcoming meeting",
        status: "pending",
        due_date: new Date("2025-03-20"),
        priority: "high",
        created_at: new Date("2025-02-15")
    },
    { 
        todo_id: 22,
        user_id: 2,
        title: "Update software",
        description: "Update all software to the latest versions",
        status: "pending",
        due_date: new Date("2025-03-25"),
        priority: "medium",
        created_at: new Date("2025-02-20")
    },
    { 
        todo_id: 23,
        user_id: 3,
        title: "Review project plan",
        description: "Review and finalize the project plan",
        status: "pending",
        due_date: new Date("2025-04-05"),
        priority: "high",
        created_at: new Date("2025-03-01")
    },
    { 
        todo_id: 24,
        user_id: 4,
        title: "Organize files",
        description: "Organize and backup important files",
        status: "pending",
        due_date: new Date("2025-03-30"),
        priority: "high",
        created_at: new Date("2025-03-10")
    },
    { 
        todo_id: 25,
        user_id: 5,
        title: "Plan team building",
        description: "Plan a team building activity for the team",
        status: "pending",
        due_date: new Date("2025-04-10"),
        priority: "medium",
        created_at: new Date("2025-03-15")
    },
    { 
        todo_id: 26,
        user_id: 6,
        title: "Write documentation",
        description: "Write documentation for the new feature",
        status: "pending",
        due_date: new Date("2025-04-15"),
        priority: "high",
        created_at: new Date("2025-03-20")
    },
    { 
        todo_id: 27,
        user_id: 7,
        title: "Fix security issues",
        description: "Address security vulnerabilities in the application",
        status: "pending",
        due_date: new Date("2025-02-13"),
        priority: "medium",
        created_at: new Date("2025-01-25")
    },
    { 
        todo_id: 28,
        user_id: 8,
        title: "Prepare budget report",
        description: "Prepare the quarterly budget report",
        status: "pending",
        due_date: new Date("2025-04-25"),
        priority: "medium",
        created_at: new Date("2025-03-30")
    },
    { 
        todo_id: 29,
        user_id: 9,
        title: "Organize training session",
        description: "Organize a training session for new hires",
        status: "pending",
        due_date: new Date("2025-04-30"),
        priority: "high",
        created_at: new Date("2025-04-01")
    },
    { 
        todo_id: 30,
        user_id: 10,
        title: "Review performance metrics",
        description: "Review and analyze performance metrics",
        status: "pending",
        due_date: new Date("2025-05-05"),
        priority: "medium",
        created_at: new Date("2024-04-12")
    }
]);
