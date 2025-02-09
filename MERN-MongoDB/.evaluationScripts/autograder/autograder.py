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

NUM_TEST_CASES = 7
test_ids = [1, 2, 3, 4, 5, 6, 7]
maximum_marks = [1, 1, 1, 1, 1, 1, 1]

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
    result = subprocess.run(['mongod', '--port', str(port), '--dbpath', NEW_DB_PATH, '--fork', '--logpath', LOG_PATH, '--bind_ip_all'])
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
            client = MongoClient(f'localhost', port)
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
            break
        except (errors.AutoReconnect, errors.ServerSelectionTimeoutError) as e:
            print(f"Failed to shutdown MongoDB on port {port}: {e}")
            time.sleep(1)
        except Exception as e:
            print(f"Unexpected error occurred while shutting down MongoDB on port {port}: {e}")
            break
        
def print_and_save_documents(collection, output_file_path):
    with open(output_file_path, 'w') as file:
         for document in collection.find({}, {'_id': 0}):
            file.write(str(document) + '\n')

def execute_mongo_script(database_url, script_path, output_file):
    if output_file == "":
        command = f'mongosh --host localhost --port 27018 TaskMaster {script_path}'
    else:
        command = f'mongosh --host localhost --port 27018 TaskMaster --quiet --eval "{open(script_path).read()}" > {output_file}'
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

    results = [{
        'testid': test_ids[i],
        'maximum_marks': maximum_marks[i],
        'score': 0,
        'message': FAIL_MESSAGE
    } for i in range(NUM_TEST_CASES)]

    if not wait_for_mongodb_to_start(port):
        if process is not None:
            try:
                stop_mongodb_instance(port)
            finally:
                print(f"Stopped MongoDB instance at port {port}")
        return

    client = MongoClient('localhost', 27018)
    db = client.TaskMaster

    output_file_path = "output.txt"
    database_url = "localhost:27018/TaskMaster"

    # Check if Users and Todos collections exist
    collection_list = db.list_collection_names()
    required_collections = ['Users', 'Todos']
    missing_collections = [col for col in required_collections if col not in collection_list]
    if missing_collections:
        for result in results:
            result['message'] = f"Collections {', '.join(missing_collections)} do not exist in database TaskMaster."
        with open(RESULT_FILE, "w", encoding="utf-8") as f:
            json.dump({'data': results}, f, indent=4)
        client.close()
        stop_mongodb_instance(port)
        return

    # Test Cases 2-7
    for i in range(0, NUM_TEST_CASES):
        init_script_path = "./populate.js"  # Path to the JavaScript file containing the MongoDB commands
        execute_mongo_script(database_url, init_script_path, "")  # To reset database

        if i == 0:
            check = False
            try:
                script_path = f'{QUERY_DIR}/query1.js'
                execute_mongo_script(database_url, script_path, output_file_path)
                file_path = f'{OUTPUT_DIR}/output1.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')
        elif i == 1:
            check = False
            try:
                script_path = f'{QUERY_DIR}/query2.js'
                execute_mongo_script(database_url, script_path, output_file_path)
                file_path = f'{OUTPUT_DIR}/output2.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

        elif i == 2:
            try:
                script_path = f'{QUERY_DIR}/query3.js'
                execute_mongo_script(database_url, script_path, output_file_path)
                file_path = f'{OUTPUT_DIR}/output3.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

        elif i == 3:
            try:
                execute_mongo_script(database_url, init_script_path, "")
                collection = db.Todos
                script_path = f'{QUERY_DIR}/query4.js'
                execute_mongo_script(database_url, script_path, "")
                print_and_save_documents(collection, output_file_path)
                file_path = f'{OUTPUT_DIR}/output4.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

        elif i == 4:
            try:
                execute_mongo_script(database_url, init_script_path, "")
                collection = db.Users
                script_path = f'{QUERY_DIR}/query5.js'
                execute_mongo_script(database_url, script_path, "")
                print_and_save_documents(collection, output_file_path)
                file_path = f'{OUTPUT_DIR}/output5.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

        elif i == 5:
            try:
                execute_mongo_script(database_url, init_script_path, "")
                collection = db.Todos
                script_path = f'{QUERY_DIR}/query6.js'
                execute_mongo_script(database_url, script_path, "")
                print_and_save_documents(collection, output_file_path)
                file_path = f'{OUTPUT_DIR}/output6.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

        elif i == 6:
            try:
                execute_mongo_script(database_url, init_script_path, "")
                collection = db.Users
                script_path = f'{QUERY_DIR}/query7.js'
                execute_mongo_script(database_url, script_path, "")
                print_and_save_documents(collection, output_file_path)
                file_path = f'{OUTPUT_DIR}/output7.txt'
                check = compare_files(output_file_path, file_path)
            finally:
                if check == True:
                    print("Success")
                    results[i]['score'] = 1
                    results[i]['message'] = SUCCESS_MESSAGE
                else:
                    print('Not success')

    client.close()
    with open(RESULT_FILE, "w", encoding="utf-8") as f:
        json.dump({'data': results}, f, indent=4)

if __name__ == "__main__":
    main()
