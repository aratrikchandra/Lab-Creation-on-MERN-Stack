#!/bin/bash

# Run the Python script to generate JSON files
python3 gen.py

# Run the MongoDB JavaScript file
mongosh localhost:27017/TaskMaster populate.js

echo "Database populated successfully!"
