const fs = require('fs').promises;
console.log('fs: initialized\n', fs);

const to = app.plugins.plugins['templater-obsidian'];
console.log('tp: initiliazed\n', to);

const mm = app.plugins.plugins["metadata-menu"].api;
console.log('mm: initialized\n', mm);

// Gets the tag from the file Tags.md in the Information folder. Also, slices the # so that the YAML frontmatter is sane.
// TO DO
// remedy absolute path variable to tp.app.vault
// update fs to tp
// tp whitespace control
async function getTag(tp) {
    try {
        console.log('getTag: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const tagsFilePath = '/home/df/Obsidian/math/Information/Tags.md';
        const fileContent = await fs.readFile(tagsFilePath, 'utf8');
        const tags = fileContent.split('\n').filter(line => line.startsWith('#')).map(tag => tag.trim());
        console.log('getTag: tags ', tags);
        
        const chosenTag = await tp.system.suggester(tags, tags);
        const chosenTagSliced = chosenTag.slice(1).trim(); // Necessary for YAML frontmatter to be formatted correctly.
        console.log('getTag: returning chosenTag');
        return chosenTagSliced;

    } catch (err) {
        console.error('Error reading tags file:', err);
        return '\ngetTag: unknown tag';
    };
};

// Gets the subject from the Subjects folder using tp.system.suggester().
// TO DO
// remedy absolute path variable to tp.app.vault
// add multiple subjects at note creation
async function getSubject(tp) {
    try {
        console.log('getSubject: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const subjectFilePath = '/home/df/Obsidian/math/Zettelkasten/Subjects/';

        const files = await fs.readdir(subjectFilePath);
        const subjects = files.map(file => file.replace('.md', ''));
        console.log('getSubject: subjects ', subjects);
        
        const chosenSubject = await tp.system.suggester(subjects, subjects);
        console.log('getSubject: returning chosenSubject');
        return chosenSubject;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetSubject: unknown subject';
    };
};

// Gets the reference from the References folder using tp.system.suggester().
// TO DO
// remedy absolute path variable to tp.app.vault
// add functionality to use [[REFERENCE#SECTION^HEX]] linking structure using tp.file.include for the contents of the reference.
async function getReference(tp) {
    try {
        console.log('getReference: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const referenceFilePath = '/home/df/Obsidian/math/Zettelkasten/References/';

        const files = await fs.readdir(referenceFilePath);
        const references = files.map(file => file.replace('.md', ''));
        console.log('getReference: references ', references);
        
        const chosenReference = await tp.system.suggester(references, references);
        console.log('getReference: returning chosenReference');
        return chosenReference;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetReference: unknown reference';
    };
};

async function createSubject(tp, mm, filepath, tag, id, title) {

};

// Creates a new reference. Called by generateFrontmatter if tag is #reference. Calls on Metadata Menu to insert a payload of frontmatter to the note.
// TO DO
// input, error handling
async function createReference(tp, mm, filePath, genMeta) { // , tag, id, title, subject, alias) {
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
	
    console.log('createReference: posting values at:\n', filePath);
    try {
        await mm.postValues(filePath, fieldsPayload);
        console.log('createReference: payload posted');
    } catch (err) {
        console.error("createReference: error posting payload", err);
    };
};

// Creates a new institution file on #institution tag selection in getTag
// TO TO
// Figure out how to reconcile this function with calling the #institution tag.
async function createInstitution(tp, tag, id, title) {

};

// Generates the frontmatter for a new note by tag
// TO DO
// link to createReference
// institution
async function generateFrontmatter(tp, mm, filePath, tag) {
    console.log('generateFrontmatter: starting');
    console.log('generateFrontmatter: filepath:\n', filePath);
    
    const id = tp.file.creation_date("YYYYMMDDHHMMss");
    console.log('generateFrontmatter: id ', id);

    console.log('generateFrontmatter: tag ', tag);
    console.log('generateFrontmatter: checking tag case');

    const subject = await getSubject(tp);
    console.log('generateFrontmatter: returned subject\n', subject);

    const alias = await tp.system.prompt("Alias: ");
    console.log('generateFrontmatter: returned alias:\n', alias);

    console.log(`generateFrontmatter: generating mm fields payload for ${tag}.`);
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
    console.log('generateFrontmatter: payload:\n', fieldsPayload);

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
            console.log('generateFrontmatter: returned reference\n', reference);
            fieldsPayload = fieldsPayload.concat([{name: "reference", payload: {value: `[[${reference}]]`}}]);
            console.log('generateFrontmatter: posting values at:\n', filePath);
            try {
                await mm.postValues(filePath, fieldsPayload);
                console.log('generateFrontmatter: payload posted');
            } catch (err) {
                console.error("generateFrontmatter: error posting payload", err);
            };
            break;
        case 'institution':
            console.error('generateFrontmatter: createInstitution not yet implemented');
            break;
        case 'person':
            console.log('generateFrontmatter: person not defined yet');
            break;
        case 'reference':
            await createReference(tp, mm, filePath, fieldsPayload);
            // console.log('generateFrontmatter: reference under construction');
            break;
        case 'subject':
            console.log('generateFrontmatter: subject not defined yet');
            break;
        default:
            console.log('generateFrontmatter: returning unknown');
            return '\ngenerateFrontmatter: unknown';
        };
};

// Generates body of note by tag
// TO DO
async function generateBody(tp, tag) {
    console.log('generateBody: starting');
    let body; 
    console.log('generateBody: checking tag case: ', tag);
    console.log(`generateBody: updating body to ${tag}`);
    // tags alphabetized
    switch (tag) {
        case 'axiom':
            body = `### Fact:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'concept':
            body = `### Explanation:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'corollary':
            body = `### Insight:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'definition':
            body = `### Definition:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'formula':
            body = `### Formula:\n\n\n### Derivation:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'institution':
            body - `### Notes:\n`
            break;
        case 'lemma':
            body = `### Statement:\n\n\n### Proof:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'person':
            body = `### Bio:\n`;
            break;
        case 'proof':
            body = `### Hypothesis:\n\n\n### Supporting Arguments:\n\n\n### Proof:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'reference':
            body = `### Contents\n`;
            break;
        case 'subject':
            body = `### Explanation:\n\n\n### Links:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        case 'theorem':
            body = `### Statement:\n\n\n### Proof:\n\n\n### Questions:\n\n\n### Comments:\n`;
            break;
        default:
            console.log('generateBody: returning unknown');
            break;
    };
    console.log('generateBody: returning body');
    console.log('generateBody:\n', body);
    return body;
};

// Moves the titular note to the correct folder based on tag type.
// TO DO
async function moveToLocation(tp, tag, title) {
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
        case 'subject':
            folderChoice = "Subjects";
            break;
        case 'person':
            folderChoice = "People";
            break;
        case 'institution':
            folderChoice = "Institutions";
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

// Main function which handles calling functions in the correct order and handles moving the note to the correct folder upon completion
// TO DO
// unique title check, debug console error filename already exists
async function main(tp) {
    console.log('main: starting');

    console.log('main: getting title');
    const title = await tp.system.prompt("Title: ", "");
    console.log('main: title ', title);
    
    console.log('main: renaming');
    await tp.file.rename(title);

    console.log('main: calling getTag');
    const tag = await getTag(tp);
    console.log('main: returned chosen tag ', tag);
 
    console.log('main: moving to location');
    filePath = await moveToLocation(tp, tag, title);
    console.log('main: returned file path:', filePath);
    
    console.log('main: letting frontmatter');
    let frontmatter;
    console.log('main: calling generateFrontmatter');
    frontmatter = await generateFrontmatter(tp, mm, filePath, tag, title);

    console.log('main: metadata menu conversion');

    console.log('main: letting body');
    let body;
    console.log('main: calling generateBody');
    body = await generateBody(tp, tag);
    tp.config.active_file;
	tp.file.cursor_append(body);

    // console.log('main: getting current content')
    // const currentContent = await tp.file.content;
    // console.log('main: current content:\n', currentContent)


    // console.log('main: pulling up file content');
    // let content = frontmatter + body
    // console.log('main: content:\n', content)
    // tp.file.content = content;

    // content = frontmatter + body;
    // console.log('main: writing frontmatter and body to .md file with fs.');
    // content = await writeToFile(tp, active_file, tag, title, frontmatter, body);
    // console.log('main: content written');
    // console.log('main: content\n', content);

    // console.log('main: moving to correct note in Obsidian');

    console.log('main: completed');
};

module.exports = main;
