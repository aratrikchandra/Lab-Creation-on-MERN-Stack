#!/usr/bin/python3
import os
import subprocess
from pymongo import MongoClient

OUTPUT_DIR = './outputs'
SOLUTION_DIR = './solution'
DATABASE_URL = "localhost:27018/TaskMaster"
INIT_SCRIPT = "./populate.js"  # Resets the DB to its initial state
PORT = 27018

def print_and_save_documents(collection, output_file_path):
    documents = list(collection.find({}, {'_id': 0}))
    with open(output_file_path, 'w') as file:
        for document in documents:
            file.write(str(document) + '\n')

def execute_mongo_script(database_url, script_path, output_file):
    if output_file:
        script_content = open(script_path).read().replace('\n', ' ')
        command = f'mongosh --host localhost --port 27018 TaskMaster --quiet --eval "{script_content}" > {output_file}'
    else:
        command = f'mongosh --host localhost --port 27018 TaskMaster {script_path}'
    process = os.popen(command)
    output = process.read()
    process.close()
    return output

def main():
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    
    client = MongoClient("localhost", PORT)
    db = client.TaskMaster

    # Test 1: query1.js (read query for user todos)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query1.js"), os.path.join(OUTPUT_DIR, "output1.txt"))
    
    # Test 2: query2.js (query for medium priority todos in next 30 days)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query2.js"), os.path.join(OUTPUT_DIR, "output2.txt"))
    
    # Test 3: query3.js (read query for admin users)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query3.js"), os.path.join(OUTPUT_DIR, "output3.txt"))
    
    # Test 4: query4.js (read query for todos in 'Work' category)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query4.js"), os.path.join(OUTPUT_DIR, "output4.txt"))

    
    # Test 5: query5.js (update todos' priority)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query5.js"), "")
    print_and_save_documents(db.Todos, os.path.join(OUTPUT_DIR, "output5.txt"))
    
    # Test 6: query6.js (update specific user details)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query6.js"), "")
    print_and_save_documents(db.Users, os.path.join(OUTPUT_DIR, "output6.txt"))
    
    # Test 7: query7.js (update category color_code)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query7.js"), "")
    print_and_save_documents(db.Categories, os.path.join(OUTPUT_DIR, "output7.txt"))
    
    # Test 8: query8.js (delete todos that are completed or older than 60 days)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query8.js"), "")
    print_and_save_documents(db.Todos, os.path.join(OUTPUT_DIR, "output8.txt"))
    
    # Test 9: query9.js (delete users with a hotmail email)
    execute_mongo_script(DATABASE_URL, INIT_SCRIPT, "")
    execute_mongo_script(DATABASE_URL, os.path.join(SOLUTION_DIR, "query9.js"), "")
    print_and_save_documents(db.Users, os.path.join(OUTPUT_DIR, "output9.txt"))
    
    client.close()
    print("Ideal outputs generated successfully.")

if __name__ == "__main__":
    main()
