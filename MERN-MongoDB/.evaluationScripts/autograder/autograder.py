#!/usr/bin/python3
import json
import os
import subprocess
import time
from pymongo import MongoClient, errors

OUTPUT_DIR = './outputs'
QUERY_DIR = './submission'
RESULT_FILE = '../evaluate.json'

SUCCESS_MESSAGE = "Test case passed :)"
FAIL_MESSAGE = "Test case failed!"

NUM_TEST_CASES = 9
test_ids = list(range(1, 10))
maximum_marks = [1] * 9

NEW_DB_PATH = '/data/db27018'
LOG_PATH = f'{NEW_DB_PATH}/mongod.log'

def is_mongodb_running(port=27018):
    try:
        client = MongoClient(f"mongodb://localhost:{port}/", serverSelectionTimeoutMS=1000)
        client.admin.command('ping')
        return True
    except errors.ConnectionFailure:
        return False

def start_mongo_instance(port):
    os.makedirs(NEW_DB_PATH, exist_ok=True)
    result = subprocess.run(['mongod', '--port', str(port), '--dbpath', NEW_DB_PATH,
                               '--fork', '--logpath', LOG_PATH, '--bind_ip_all'])
    if result.returncode != 0:
        print(f"Failed to start mongod on port {port}")
        exit(1)
    else:
        print(f"MongoDB instance started on port {port}")

    client = MongoClient('localhost', port)
    for _ in range(5):
        try:
            client.admin.command('ping')
            print(f"MongoDB instance on port {port} is ready")
            return result
        except errors.ConnectionFailure:
            print(f"Waiting for MongoDB instance on port {port} to be ready...")
            time.sleep(2)
    print(f"MongoDB instance on port {port} is not ready after waiting")
    exit(1)

def wait_for_mongodb_to_start(port, timeout=10):
    start_time = time.time()
    while True:
        try:
            client = MongoClient('localhost', port)
            client.admin.command('ping')
            client.close()
            print(f"MongoDB started on port {port}")
            return True
        except Exception as e:
            if time.time() - start_time > timeout:
                print(f"Failed to connect to MongoDB on port {port} within timeout period.")
                return False
            time.sleep(1)

def stop_mongodb_instance(port):
    client = MongoClient('localhost', port)
    retries = 3
    for _ in range(retries):
        try:
            client.admin.command('shutdown')
            print(f"MongoDB instance on port {port} shut down successfully")
            return
        except errors.ServerSelectionTimeoutError as e:
            # If we hit a timeout, assume the instance has already shut down.
            print(f"Server selection timeout reached while attempting shutdown on port {port}. Assuming instance is down.")
            return
        except errors.ConnectionFailure as e:
            # If connection is refused, consider it as already shut down.
            if "Connection refused" in str(e):
                print(f"MongoDB instance on port {port} appears to be already shut down (connection refused).")
                return
            else:
                print(f"Failed to shutdown MongoDB on port {port}: {e}")
                time.sleep(1)
        except Exception as e:
            print(f"Unexpected error occurred while shutting down MongoDB on port {port}: {e}")
            return

def print_and_save_documents(collection, output_file_path):
    documents = list(collection.find({}, {'_id': 0}))
    with open(output_file_path, 'w') as file:
         for document in documents:
            file.write(str(document) + '\n')

def execute_mongo_script(database_url, script_path, output_file):
    if output_file:
        # Replace newlines for proper command line processing.
        script_content = open(script_path).read().replace('\n', ' ')
        command = f'mongosh --host localhost --port 27018 TaskMaster --quiet --eval "{script_content}" > {output_file}'
    else:
        command = f'mongosh --host localhost --port 27018 TaskMaster {script_path}'
    process = os.popen(command)
    output = process.read()
    process.close()
    return output

def compare_files(file1_path, file2_path):
    with open(file1_path, 'r') as file1, open(file2_path, 'r') as file2:
        file1_contents = file1.read().strip()
        file2_contents = file2.read().strip()
        return file1_contents == file2_contents

def main():
    port = 27018
    process = None
    if is_mongodb_running(port):
        print(f"MongoDB is already running on port {port}")
    else:
        print(f"MongoDB is not running on port {port}, starting new instance...")
        process = start_mongo_instance(port)

    if not wait_for_mongodb_to_start(port):
        if process is not None:
            try:
                stop_mongodb_instance(port)
            finally:
                print(f"Stopped MongoDB instance on port {port}")
        exit(1)

    init_script_path = "./populate.js"
    database_url = "localhost:27018/TaskMaster"
    output_file_path = "output.txt"

    
    execute_mongo_script(database_url, init_script_path, "")
    client = MongoClient('localhost', port)
    db = client.TaskMaster

    # Check for required collections: Users, Todos, and Categories
    collection_list = db.list_collection_names()
    required_collections = ['Users', 'Todos', 'Categories']
    missing_collections = [col for col in required_collections if col not in collection_list]
    if missing_collections:
        results = []
        for t in test_ids:
            results.append({
                'testid': t,
                'maximum_marks': 1,
                'score': 0,
                'message': f"Collections {', '.join(missing_collections)} do not exist in database TaskMaster."
            })
        with open(RESULT_FILE, "w", encoding="utf-8") as f:
            json.dump({'data': results}, f, indent=4)
        client.close()
        stop_mongodb_instance(port)
        exit(1)

    # Generate ideal outputs before evaluation
    print("Generating ideal outputs using generate_outputs.py ...")
    subprocess.run(['python3', 'generate_outputs.py'], check=True)
    
    results = [{
        'testid': test_ids[i],
        'maximum_marks': maximum_marks[i],
        'score': 0,
        'message': FAIL_MESSAGE
    } for i in range(NUM_TEST_CASES)]
    
    
    # Test cases 1-4: Read/aggregation queries
    for i in range(4):
        # Reset the database for each test.
        execute_mongo_script(database_url, init_script_path, "")
        script_path = f'{QUERY_DIR}/query{i+1}.js'
        if i < 3:
            execute_mongo_script(database_url, script_path, output_file_path)
        else:
            execute_mongo_script(database_url, script_path, "")
            print_and_save_documents(db.Todos, output_file_path)
        expected_file = f'{OUTPUT_DIR}/output{i+1}.txt'
        check = compare_files(output_file_path, expected_file)
        if check:
            print(f"Test case {test_ids[i]} Success")
            results[i]['score'] = 1
            results[i]['message'] = SUCCESS_MESSAGE
        else:
            print(f"Test case {test_ids[i]} Not success")
    
    # Test cases 5-9: Update and delete queries (final state check)
    update_tests = [
        (4, f'{QUERY_DIR}/query5.js', db.Todos, f'{OUTPUT_DIR}/output5.txt'),
        (5, f'{QUERY_DIR}/query6.js', db.Users, f'{OUTPUT_DIR}/output6.txt'),
        (6, f'{QUERY_DIR}/query7.js', db.Categories, f'{OUTPUT_DIR}/output7.txt'),
        (7, f'{QUERY_DIR}/query8.js', db.Todos, f'{OUTPUT_DIR}/output8.txt'),
        (8, f'{QUERY_DIR}/query9.js', db.Users, f'{OUTPUT_DIR}/output9.txt')
    ]
    for idx, script, collection, expected_file in update_tests:
        execute_mongo_script(database_url, init_script_path, "")
        execute_mongo_script(database_url, script, "")
        print_and_save_documents(collection, output_file_path)
        check = compare_files(output_file_path, expected_file)
        if check:
            print(f"Test case {test_ids[idx]} Success")
            results[idx]['score'] = 1
            results[idx]['message'] = SUCCESS_MESSAGE
        else:
            print(f"Test case {test_ids[idx]} Not success")
    
    client.close()
    with open(RESULT_FILE, "w", encoding="utf-8") as f:
        json.dump({'data': results}, f, indent=4)
    stop_mongodb_instance(port)

if __name__ == "__main__":
    main()
