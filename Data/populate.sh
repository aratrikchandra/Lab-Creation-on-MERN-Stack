#!/bin/bash

# Run the Python script to generate JSON files
python3 gen.py

# Run the JavaScript file
node load_data.js

echo "Database populated successfully!"
