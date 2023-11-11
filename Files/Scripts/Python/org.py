#!/bin/python3

import os
import re

directory = "Zettelkasten"

id_pattern = r'ID: (\d{12})'
tag_pattern = r'Tag: #(\w+)'
source_pattern = r'Source: ((?:\[\[[^\]]+\]\](?:, )?)+)'
subject_pattern = r'Subject: ((?:\[\[[^\]]+\]\](?:, )?)+)'

def parse_content(content):
    id_match = re.search(id_pattern, content)
    tag_match = re.search(tag_pattern, content)
    source_matches = re.search(source_pattern, content)
    subject_matches = re.search(subject_pattern, content)

    yaml_frontmatter = '---\n'
    if id_match:
        yaml_frontmatter += f'id: "{id_match.group(1)}"\n'
    if tag_match:
        yaml_frontmatter += f'tags:\n - {tag_match.group(1)}\n'
    if source_matches:
        # Extract all source entries from the match group
        sources = re.findall(r'\[\[[^\]]+\]\]', source_matches.group(1))
        yaml_frontmatter += 'source:\n' + ''.join(f'  - "{src}"\n' for src in sources)
    if subject_matches:
        # Extract all subject entries from the match group
        subjects = re.findall(r'\[\[[^\]]+\]\]', subject_matches.group(1))
        yaml_frontmatter += 'subject:\n' + ''.join(f'  - "{sub}"\n' for sub in subjects)
    yaml_frontmatter += '---\n\n'

    content = re.sub(id_pattern, '', content)
    content = re.sub(tag_pattern, '', content)
    content = re.sub(source_pattern, '', content)
    content = re.sub(subject_pattern, '', content)

    return yaml_frontmatter, content

for filename in os.listdir(directory):
    if filename.endswith('.md') and not filename.startswith('*'):  # Check for markdown files not already marked with an asterisk
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as file:
            content = file.read()

            # Skip files that already have the frontmatter
            if content.startswith('---'):
                continue

            try:
                yaml_frontmatter, rest_of_content = parse_content(content)
                new_content = yaml_frontmatter + rest_of_content
                with open(filepath, 'w', encoding='utf-8') as file_to_write:
                    file_to_write.write(new_content)
            except Exception as e:
                # If there's an error, prepend an asterisk to the filename
                os.rename(filepath, os.path.join(directory, '*' + filename))
                print(f"Error processing {filename}: {e}")