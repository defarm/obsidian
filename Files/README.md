# Mathematics Second Brain
This is a repository of my mathematical second brain in Obsidian. Included are my notes, sources, and Templater script. This vault also uses plugins.
### Notes:
These notes are meant to provide a view of the emergent structure of mathematics.
### Sources:
Sources originate from my notes, textbooks, assignments, websites, videos, etc.
### Templater Script:
The script is called `main.js` and is found in `/Files/Scripts/Templater/`. The purpose of this script is to offer the user options for creating notes.

> [!INFO]
To use it, you should set a hotkey for the command:
>
**Templater**: Insert Templates/New Note.md
>
as creating a new note from the template also creates an `Untitled` file in `/math`.
#### Title:
Name the note. This is fairly straightforward, I wouldn't recommend any special characters, as I'm not sure how the code will handle it. This may be updated in the future.
#### Tag:
Choose the kind of note to create and where it goes.
###### Atomica:
#axiom #concept #corollary #definition #formula #lemma #proof #theorem
###### Institutions
#institution
###### People
#person
###### References
#reference
###### Subjects
#subject

Feel free to add more tags as you see fit, but understand that the script will not be able to parse anything without being edited. As time goes on, more tags may be added in the file, with additional handling. Due to the `Completr` plugin, a single space is added to the end of a tag once it has been entered. This confuses the script and ends up returning the default case. Because of this, any whitespace in a tag is trimmed.
#### Subject:
Subjects range from Algebra to Topology and act as Maps of Content. There are simple descriptions for each subject. More will likely be added in later updates. You are able to add new subjects using the script.
#### Source:
Sources are any place where I have collected information. Similarly to [[#Subject]], these act as a Map of Content. The script also handles adding new sources.
#### Created Note:
The actual note will be generated and placed into an accompanying folder. You can see where a specific tag will be sent [[Tags|here]].

Each note has a unique ID (YYYYMMDDHHMMss) and title in its properties. Depending on the tag, there may be additional information, such as subject, source, etc.

It should be mentioned that there is only one template called [[New Note]] which contains a Templater function call. All of the formatting for notes are handled by the script.

> [!WARNING]
> This version of the JavaScript uses the Node.js File System (fs) module. I plan to change this to implement Templater's tp.app.vault plugin module to maintain consistency.
> 2023 11 11

### Plugins:
This vault uses the following plugins:
- Completr
	- Just trying this out. Not sure if I'll use it long-term.
- Dataview
	- This is for dashboard in [[Dataview]].
- Latex Suite
	- Mostly used for the shortcuts and some other functionality. Still testing this out.
- Style Settings
	- Works with AnuPpuccin
- Templater
	- For adding new notes.
- Quick Latex for Obsidian
	- Mostly used for the shortcuts and some other functionality. Still testing this out.
### Theme:
This vault uses AnuPpuccin, with some custom CSS.

Mathematics Second Brain © 2023 by David Farmilant is licensed under Attribution-NonCommercial-ShareAlike 4.0 International