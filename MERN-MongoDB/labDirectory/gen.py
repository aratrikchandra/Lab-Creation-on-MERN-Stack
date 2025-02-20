import json
import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

def get_random_date(start, end):
    delta = end - start
    random_second = random.randrange(int(delta.total_seconds()))
    return start + timedelta(seconds=random_second)

def get_custom_email(username):
    domains = ["gmail.com", "hotmail.com", "rediffmail.com", "yahoo.com", "outlook.com"]
    return f"{username}@{random.choice(domains)}"

# Generate 20 users
users = []
for i in range(1, 21):
    username = fake.user_name()
    users.append({
        "user_id": i,
        "username": username,
        "email": get_custom_email(username),
        "password_hash": fake.password(),
        "role": "admin" if i % 5 == 1 else "user"
    })

# Generate 50 todos
todos = []
current_date = datetime.now()
for i in range(1, 51):
    user_id = random.randint(1, 20)
    created_at = get_random_date(current_date - timedelta(days=75), current_date)
    due_date = get_random_date(
        created_at + timedelta(days=1),
        created_at + timedelta(days=90)
    )
    # Generate todo-specific title and description
    task_type = fake.random_element(elements=("Work", "Personal", "Learning", "Official"))
    if task_type == "Work":
        title = f"Complete {fake.job().lower()} report"
        description = f"Finish the {fake.job().lower()} report and submit it to {fake.name()} by EOD."
    elif task_type == "Personal":
        title = f"Buy {fake.random_element(elements=('groceries', 'clothes', 'gifts'))}"
        description = f"Purchase {fake.random_element(elements=('milk, eggs, and bread', 'new clothes', 'birthday gifts'))} from {fake.company()}."
    elif task_type == "Learning":
        title = f"Learn {fake.random_element(elements=('Python', 'JavaScript', 'React', 'Machine Learning'))}"
        description = f"Complete the {fake.random_element(elements=('online course', 'tutorial', 'book'))} on {fake.random_element(elements=('Python', 'JavaScript', 'React', 'Machine Learning'))}."
    elif task_type == "Official":
        title = f"Attend {fake.random_element(elements=('meeting', 'conference', 'workshop'))}"
        description = f"Attend the {fake.random_element(elements=('team meeting', 'industry conference', 'workshop'))} at {fake.company()}."

    todos.append({
        "todo_id": i,
        "user_id": user_id,
        "title": title,
        "description": description,
        "status": fake.random_element(elements=("pending", "in progress", "completed")),
        "due_date": due_date.isoformat(),  # ISO 8601 format
        "priority": fake.random_element(elements=("low", "medium", "high")),
        "created_at": created_at.isoformat(),  # ISO 8601 format
    })

# Generate 100 categories
categories = []
for i in range(1, 101):
    categories.append({
        "category_id": i,
        "todo_id": random.randint(1, 50),
        "category_name": fake.random_element(elements=("Work", "Personal", "Learning", "Official")),
        "color_code": fake.hex_color(),
    })

# Save data to files
with open("users.json", "w") as f:
    json.dump(users, f, indent=2)

with open("todos.json", "w") as f:
    json.dump(todos, f, indent=2)

with open("categories.json", "w") as f:
    json.dump(categories, f, indent=2)

print("Data generated and saved to users.json, todos.json, and categories.json")
