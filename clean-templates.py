import os
import re

# git push .u origin

# Define the directory path you want to search in (assuming "templates" is a subdirectory of the current directory)
directory_path = os.path.abspath('templates')

# Initialize an empty list to store filenames along with their directory paths
files_with_embed_path = []

# Regular expression pattern to match the embed statement
embed_pattern = re.compile(r'{%\s*embed\s+"([^"]+)"')

# Function to check if a file contains a specific embed statement and extract the path
def extract_embed_path(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        match = embed_pattern.search(content)
        if match:
            embed_path = match.group(1)
            return embed_path
    return None

# Recursive function to check Twig files
def check_and_add_files(root, filename):
    file_path = os.path.join(root, filename)

    embed_path = extract_embed_path(file_path)
    if embed_path:
        files_with_embed_path.append((file_path, embed_path))

        # Handle paths in the embed statement for navigation
        subpage_path = os.path.abspath(os.path.join(directory_path, '..', embed_path))
        if os.path.exists(subpage_path):
            check_and_add_files(os.path.dirname(subpage_path), os.path.basename(subpage_path))

# List all files in the directory and its subdirectories
for root, _, files in os.walk(directory_path):
    for filename in files:
        if filename.endswith('.twig'):
            check_and_add_files(root, filename)

# Print the list of filenames along with their corresponding embed paths
print("Embed paths found in Twig files:")
for file_path, embed_path in files_with_embed_path:
    print(f"File: {file_path}")
    print(f"Embed Path: {embed_path}\n")
