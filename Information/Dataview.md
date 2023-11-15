---
tags:
  - hidden
---
#### Notes
```dataview
TABLE length("Zettelkasten/Subjects")
```
#### Subjects
```dataview
LIST from #subject
WHERE file.name != "Tags"
SORT file.name ASC
```
