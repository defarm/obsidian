// INITS
const fs = require('fs').promises;
console.log('fs: initialized\n', fs);

const to = app.plugins.plugins['templater-obsidian'];
console.log('tp: initiliazed\n', to);

const mm = app.plugins.plugins["metadata-menu"].api;
console.log('mm: initialized\n', mm);

// GET FUNCTIONS
async function getTag(tp) {
    // Gets the tag from the file Tags.md in the Information folder. Also, slices the # so that the YAML frontmatter is sane.
    // TO DO
    // remedy absolute path variable to tp.app.vault
    // update fs to tp
    try {
        console.log('getTag: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const tagsFilePath = '/home/df/Obsidian/math/Information/Tags.md';
        const fileContent = await fs.readFile(tagsFilePath, 'utf8');
        const tags = fileContent.split('\n').filter(line => line.startsWith('#')).map(tag => tag.trim());
        console.log('getTag: tags ', tags);
        
        const chosenTag = await tp.system.suggester(tags, tags);
        const chosenTagSliced = chosenTag.slice(1).trim();
        console.log('getTag: returning chosenTag');
        return chosenTagSliced;

    } catch (err) {
        console.error('Error reading tags file:', err);
        return '\ngetTag: unknown tag';
    };
};
async function getSubject(tp) {
    // Gets the subject from the Subjects folder using tp.system.suggester().
    // TO DO
    // remedy absolute path variable to tp.app.vault
    // add multiple subjects at note creation
    try {
        console.log('getSubject: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const subjectFilePath = '/home/df/Obsidian/math/Zettelkasten/Subjects/';

        const files = await fs.readdir(subjectFilePath);
        const subjects = files.map(file => file.replace('.md', ''));
        console.log('getSubject: subjects\n', subjects);
        
        const chosenSubject = await tp.system.suggester(subjects, subjects);
        console.log('getSubject: returning chosenSubject');
        return chosenSubject;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetSubject: unknown subject';
    };
};
async function getReference(tp) {
    // Gets the reference from the References folder using tp.system.suggester().
    // TO DO
    // remedy absolute path variable to tp.app.vault
    // add functionality to use [[REFERENCE#SECTION^HEX]] linking structure using tp.file.include for the contents of the reference.
    try {
        console.log('getReference: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const referenceFilePath = '/home/df/Obsidian/math/Zettelkasten/References/';

        const files = await fs.readdir(referenceFilePath);
        const references = files.map(file => file.replace('.md', ''));
        console.log('getReference: references\n', references);
        
        const chosenReference = await tp.system.suggester(references, references);
        console.log('getReference: returning chosenReference');
        return chosenReference;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetReference: unknown reference';
    };
};
async function getCourse(tp) {
    // Gets the course from the Courses folder using tp.system.suggester().
    // TO DO
    // remedy absolute path variable to tp.app.vault
    try {
        console.log('getCourse: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const courseFilePath = '/home/df/Obsidian/math/Zettelkasten/Courses/';

        const files = await fs.readdir(courseFilePath);
        const courses = files.map(file => file.replace('.md', ''));
        console.log('getCourse: courses\n', courses);

        const chosenCourse = await tp.system.suggester(courses, courses);
        console.log('getCourse: returning chosenCourse');
        return chosenCourse
    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetCourse: unknown course';
    }
};

// FRONTMATTER
async function generalFrontmatter(tp, mm, filePath, tag) {
    // Create frontmatter for every new note. Calls special frontmatter functions by tag.
    console.log('generalFrontmatter: starting');
    console.log('generalFrontmatter: filepath:\n', filePath);
    
    const id = tp.file.creation_date("YYYYMMDDHHMMss");
    console.log('generalFrontmatter: id ', id);

    console.log('generalFrontmatter: tag ', tag);
    console.log('generalFrontmatter: checking tag case');

    const subject = await getSubject(tp);
    console.log('generalFrontmatter: returned subject\n', subject);

    const alias = await tp.system.prompt("Alias: ");
    console.log('generalFrontmatter: returned alias:\n', alias);

    console.log(`generalFrontmatter: generating mm fields payload for ${tag}.`);
    fieldsPayload = [
        {
            name: "tags",
            payload: { value: tag }
        },
        {
            name: "id",
            payload: { value: id }
        },
        {
            name: "subject",
            payload: { value: `[[${subject}]]`}
        },
        {
            name: "alias",
            payload: {value: alias}
        }
    ];
    console.log('generalFrontmatter: payload:\n', fieldsPayload);

    switch (tag) {
        case 'axiom':
        case 'concept':
        case 'corollary':
        case 'definition':
        case 'formula':
        case 'lemma':
        case 'proof':
        case 'theorem':
            reference = await getReference(tp);
            console.log('generalFrontmatter: returned reference\n', reference);
            fieldsPayload = fieldsPayload.concat([{name: "reference", payload: {value: `[[${reference}]]`}}]);
            console.log('generalFrontmatter: posting values at:\n', filePath);
            try {
                await mm.postValues(filePath, fieldsPayload);
                console.log('generalFrontmatter: payload posted');
            } catch (err) {
                console.error("generalFrontmatter: error posting payload", err);
            };
            break;
        case 'assignment':
            await assignmentFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'course':
            console.error(`generalFrontmatter: ${tag}Frontmatter not yet implemented!`);
            // await courseFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'institution':
            console.error(`generalFrontmatter: ${tag}Frontmatter not yet implemented!`);
            // await institutionFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'person':
            await personFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'research':
            console.error(`generalFrontmatter: ${tag}Frontmatter not yet implemented!`)
            // await projectFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'reference':
            await referenceFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        case 'subject':
            console.error(`generalFrontmatter: ${tag}Frontmatter not yet implemented!`)
            // await subjectFrontmatter(tp, mm, filePath, fieldsPayload);
            break;
        default:
            console.log('generalFrontmatter: returning unknown');
            return '\generalFrontmatter: unknown';
        };
};

// SPECIAL FRONTMATTER
async function assignmentFrontmatter(tp, mm, filePath, genMeta) {
    // Creates a new assignment. Called by generalFrontmatter if tag is #assignment. Calls on Metadata Menu to insert a payload of frontmatter to the note.
    fieldsPayload = [
        {
            name: "Course",
            payload: {value: await getCourse(tp)}
        },
        {
            name: "Source",
            payload: {value: await getReference(tp)}
        },
        {
            name: "Page",
            payload: {value: await tp.system.prompt("Page:")}
        }
    ];

    fieldsPayload = genMeta.concat(fieldsPayload)

    console.log('assignmentFrontmatter: posting values at:\n', filePath);
    try {
        await mm.postValues(filePath, fieldsPayload);
        console.log('assignmentFrontmatter: payload posted');
    } catch (err) {
        console.error("assignmentFrontmatter: error posting payload", err);
    };
};
async function courseFrontmatter(tp, mm, filePath, tag, id, title) {
    // Creates a new course. Called by generalFrontmatter if tag is #course. Calls on Metadata Menu to insert a payload of frontmatter to the note.
};
async function institutionFrontmatter(tp, tag, filePath, genMeta) {
    // Creates a new institution. Called by generalFrontmatter if tag is #institution. Calls on Metadata Menu to insert a payload of frontmatter to the note.
};
async function personFrontmatter(tp, mm, filePath, genMeta) {
        // Creates a new person. Called by generalFrontmatter if tag is #person. Calls on Metadata Menu to insert a payload of frontmatter to the note.
    fieldsPayload = [
        {
            name: "Birthdate",
            payload: {value: await tp.system.prompt("Birthdate:")}
        },
        {
            name: "Deathdate",
            payload: {value: await tp.system.prompt("Deathdate:")}
        },
        {
            name: "Country of Origin",
            payload: {value: await tp.system.prompt("Country of Origin:")}
        },
        {
            name: "Notable Works",
            payload: {value: await tp.system.prompt("Notable Works:")}
        }
    ];

	fieldsPayload = genMeta.concat(fieldsPayload)
	
    console.log('personFrontmatter: posting values at:\n', filePath);
    try {
        await mm.postValues(filePath, fieldsPayload);
        console.log('personFrontmatter: payload posted');
    } catch (err) {
        console.error("personFrontmatter: error posting payload", err);
    };
};
async function referenceFrontmatter(tp, mm, filePath, genMeta) {
    // Creates a new reference. Called by generalFrontmatter if tag is #reference. Calls on Metadata Menu to insert a payload of frontmatter to the note.
    fieldsPayload = [
        {
            name: "Attribution",
            payload: {value: await tp.system.prompt("Attribution:")}
        },
        {
            name: "Copyright",
            payload: {value: await tp.system.prompt("Copyright:")}
        },
        {
            name: "Medium",
            payload: {value: await tp.system.prompt("Medium:")}
        },
        {
            name: "Date of Entry",
            payload: {value: await tp.file.creation_date("YYYY-MM-DD")}
        },
        {
            name: "Publisher",
            payload: {value: await tp.system.prompt("Publisher:")}
        },
        {
            name: "Edition",
            payload: {value: await tp.system.prompt("Edition:")}
        },
        {
            name: "ISBN",
            payload: {value: await tp.system.prompt("ISBN:")}
        },
        {
            name: "Website Name",
            payload: {value: await tp.system.prompt("Website Name:")}
        },
        {
            name: "Website URL",
            payload: {value: await tp.system.prompt("Website URL:")}
        },
        {
            name: "Publication",
            payload: {value: await tp.system.prompt("Publication:")}
        },
        {
            name: "Vol No",
            payload: {value: await tp.system.prompt("Vol No:")}
        },
        {
            name: "Issue",
            payload: {value: await tp.system.prompt("Issue:")}
        },
        {
            name: "Contact",
            payload: {value: ""}
        },
        {
            name: "Download Date",
            payload: {value: ""}
        },
        {
            name: "License",
            payload: {value: ""}
        },
    ];

	fieldsPayload = genMeta.concat(fieldsPayload)
	
    console.log('referenceFrontmatter: posting values at:\n', filePath);
    try {
        await mm.postValues(filePath, fieldsPayload);
        console.log('referenceFrontmatter: payload posted');
    } catch (err) {
        console.error("referenceFrontmatter: error posting payload", err);
    };
};
async function researchFrontmatter(tp, mm, filePath, genMeta) {
    // Creates a new research project. Called by generalFrontmatter if tag is #research. Calls on Metadata Menu to insert a payload of frontmatter to the note.
};
async function subjectFrontmatter(tp, mm, filePath, tag, id, title) {
    // Creates a new subject. Called by generalFrontmatter if tag is #subject. Calls on Metadata Menu to insert a payload of frontmatter to the note.
};

// BODY
async function appendBody(tp, tag, title) {
    // Reads from /Templates/Bodies for adding to new note by tag.
    console.log('appendBody: starting');
    console.log('appendBody: checking tag case: ', tag);
    
    const bodyFilePath = `/Templates/Bodies/${tag}.md`;

    if (await tp.file.exists(bodyFilePath)) {
        const bodyTemplate = await app.vault.read(await tp.file.find_tfile(bodyFilePath));

        const contentStartIndex = bodyTemplate.indexOf('---', bodyTemplate.indexOf('---') + 3) + 3;
        const bodyContent = bodyTemplate.substring(contentStartIndex).trim();
        console.log("appendBody: bodyContent:\n", bodyContent);

        const tf = await tp.file.find_tfile(title);
        console.log("appendBody: tfile:\n", tf);

        const newNote = await app.vault.read(tf);
        console.log("appendBody: newNote:\n", newNote);
        const updatedNote = newNote + bodyContent;
        await app.vault.modify(tf, updatedNote);
    } else {
        console.log('appendBody: TFile not found:\n', bodyFilePath);
    }
};

// MOVE
async function moveToLocation(tp, tag, title) {
    // Moves new note to the correct location
    console.log('moveToLocation: starting');

    let folderChoice;
    switch (tag) {
        case 'axiom':
        case 'concept':
        case 'corollary':
        case 'definition':
        case 'formula':
        case 'lemma':
        case 'proof':
        case 'theorem':
            folderChoice = "Atomica";
            break;
        case 'assignment':
            folderChoice = "Assignments";
            break;
        case 'course':
            folderChoice = "Courses";
            break;
        case 'institution':
            folderChoice = "Institutions";
            break;
        case 'person':
            folderChoice = "People";
            break;
        case 'research':
            folderChoice = "Research"
            break;
        case 'subject':
            folderChoice = "Subjects";
            break;
        case 'reference':
            folderChoice = "References";
            break;
        default:
            console.log('moveToLocation: location unknown');
            return '\nmoveToLocation: unknown file path or tag for folderChoice';
    };
    const filePath = await `/Zettelkasten/${folderChoice}/${title}`.replace(".md", "");
    
    try {
        await tp.file.move(filePath);
        console.log('moveToLocation: moved to:\n', filePath);
        return tp.file.path(filePath);
    } catch (err) {
        console.error("error writing to the file; invalid tag or path: ", err);
    };
};

// MAIN
async function main(tp) {
    // Calls functions in correct order.
    console.log('main: starting');

    console.log('main: calling getTag');
    const tag = await getTag(tp);
    console.log('main: returned chosen tag ', tag);

    console.log('main: getting title');
    const title = await tp.system.prompt("Title: ", "");
    console.log('main: title ', title);
    
    console.log('main: renaming');
    await tp.file.rename(title);
 
    console.log('main: moving to location');
    filePath = await moveToLocation(tp, tag, title);
    console.log('main: returned file path:', filePath);

    console.log('main: calling generateBody');
    await appendBody(tp, tag, title);

    console.log('main: letting frontmatter');
    console.log('main: calling generalFrontmatter');
    await generalFrontmatter(tp, mm, filePath, tag, title);

    console.log('main: metadata menu conversion');

    console.log('main: completed');
};

module.exports = main;
