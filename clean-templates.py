import os
import re

# Define the directory path you want to search in (assuming "templates" is a subdirectory of the current directory)
directory_path = os.path.abspath('templates')

# Initialize an empty list to store filenames along with their directory paths
files_with_embed_or_include = []

# Function to check if a file contains specific embed or include statements and extract the paths
def extract_embed_and_include_paths(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
        # Regular expression pattern to match the specific embed patterns
        specific_embed_pattern = re.compile(r'{%\s*embed\s+"@compounds/([^"]+)"')
        specific_embed_pattern2 = re.compile(r'{%\s*embed\s+"@elements/([^"]+)"')

        # Find specific embed patterns
        specific_embed_matches = specific_embed_pattern.findall(content)
        specific_embed_matches2 = specific_embed_pattern2.findall(content)
        
        for embed_path in specific_embed_matches:
            files_with_embed_or_include.append((file_path, f'Specific Embed Path: @compounds/{embed_path}'))
        for embed_path in specific_embed_matches2:
            files_with_embed_or_include.append((file_path, f'Specific Embed Path: @elements/{embed_path}'))
        
        # Find regular embed and include statements
        regular_embed_and_include_pattern = re.compile(r'{%\s*(embed|include)\s+"([^"]+)"')
        regular_embed_and_include_matches = regular_embed_and_include_pattern.findall(content)
        for stmt_type, path in regular_embed_and_include_matches:
            files_with_embed_or_include.append((file_path, f'{stmt_type.capitalize()} Path: {path}'))

# Recursive function to check Twig files
def check_and_add_files(root, filename):
    file_path = os.path.join(root, filename)
    extract_embed_and_include_paths(file_path)

    # Open the file and check for included subpages
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        lines = content.split('\n')
        for line in lines:
            if '{% include' in line:
                subpage = line.split('"')[1]  # Extract the subpage filename from the include tag

                # Handle paths that start with @compounds or @elements
                if subpage.startswith('@compounds') or subpage.startswith('@elements'):
                    subpage = subpage.replace('@elements/', '01-elements/').replace('@compounds/', '02-compounds/')
                    subpage_path = os.path.abspath(os.path.join(directory_path, '..', 'components', subpage))
                    if os.path.exists(subpage_path):
                        # Check the subpage for embed and include statements
                        check_and_add_files(os.path.dirname(subpage_path), os.path.basename(subpage_path))
                else:
                    # Handle other paths by going to the highest level and then into components
                    highest_level_path = os.path.abspath(os.path.join(directory_path, '..'))
                    components_path = os.path.abspath(os.path.join(highest_level_path, 'components'))
                    subpage_path = os.path.abspath(os.path.join(components_path, subpage))
                    if os.path.exists(subpage_path):
                        # Check the subpage for embed and include statements
                        check_and_add_files(os.path.dirname(subpage_path), os.path.basename(subpage_path))

# List all files in the directory and its subdirectories
for root, _, files in os.walk(directory_path):
    for filename in files:
        if filename.endswith('.twig'):
            check_and_add_files(root, filename)

# Print the list of filenames along with their corresponding embed or include paths
print("Embed and Include paths found in Twig files:")
for file_path, path_info in files_with_embed_or_include:
    print(f"File: {file_path}")
    print(f"{path_info}\n")
