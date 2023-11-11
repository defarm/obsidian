const fs = require('fs').promises;
console.log('fs: initialized ', fs);

const tp = app.plugins.plugins['templater-obsidian'];
console.log('tp: initiliazed ', tp);

// Gets the tag from the file Tags.md in the Information folder. Also, slices the # so that the YAML frontmatter is sane.
// TO DO
// remedy absolute path variable to tp.app.vault
async function getTag(tp) {
    try {
        console.log('getTag: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const tagsFilePath = '/home/df/Obsidian/math/Zettelkasten/Information/Tags.md';

        console.log('getTag: tags file path:\n', tagsFilePath);
        console.log('getTag: reading tags file');
        const fileContent = await fs.readFile(tagsFilePath, 'utf8');
        const tags = fileContent.split('\n').filter(line => line.startsWith('#'));
        console.log('getTag: tags ', tags);
        
        const chosenTag = await tp.system.suggester(tags, tags);
        console.log('getTag: chosenTag ', chosenTag);
        console.log('getTag: slicing leading #');
        const chosenTagSliced = chosenTag.slice(1); // Necessary for YAML frontmatter to be formatted correctly.
        console.log('getTag: returning chosenTag');
        return chosenTagSliced;

    } catch (err) {
        console.error('Error reading tags file:', err);
        return '\ngetTag: unknown tag';
    }
}

// Gets the subject from the Subjects folder using tp.system.suggester().
// TO DO
// remedy absolute path variable to tp.app.vault
async function getSubject(tp) {
    try {
        console.log('getSubject: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const absolutePath = '/home/df/Obsidian/math/Zettelkasten/Subjects/';

        console.log('getSubject: absolute path:\n', absolutePath);

        console.log('getSubject: reading fs');
        const files = await fs.readdir(absolutePath);
        const subjects = files.map(file => file.replace('.md', ''));
        console.log('getSubject: subjects ', subjects);
        
        const chosenSubject = await tp.system.suggester(subjects, subjects);
        console.log('getSubject: chosenSubject ', chosenSubject);

        console.log('getSubject: returning chosenSubject');
        return chosenSubject;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetSubject: unknown subject';
    }
}

// Gets the source from the Sources folder using tp.system.suggester().
// TO DO
// remedy absolute path variable to tp.app.vault
async function getSource(tp) {
    try {
        console.log('getSource: starting');

        // !! ABSOLUTE PATH BE SURE TO UPDATE IF THE STRUCTURE CHANGES !! //
        const absolutePath = '/home/df/Obsidian/math/Sources/';
        console.log('getSource: absolute path:\n', absolutePath);

        console.log('getSource: reading fs');
        const files = await fs.readdir(absolutePath);
        const sources = files.map(file => file.replace('.md', ''));
        console.log('getSource: sources ', sources);
        
        const chosenSource = await tp.system.suggester(sources, sources);
        console.log('getSource: chosenSource ', chosenSource);

        console.log('getSource: returning chosenSource');
        return chosenSource;


    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetSource: unknown source';
    }
}

// Creates a new source on #reference tag selection in getTag
// TO DO
// input, error handling
async function createSource(tp, tag, id, title, subject) {
    // for all
    const attribution = ""; // author/s; may need special handling since list
    const copyright = ""; // date
    const medium = ""; // literal
    const dateOfEntry = ""; // date entered into Obsidian

    // if book
    const publisher = ""; // literal
    const edition = ""; // literal
    const isbn = ""; // literal

    // if website
    const siteName = ""; // literal name
    const siteUrl = ""; // literal URL
    
    // if article
    const publication = ""; // literal
    const volumeNo = ""; // literal
    const issue = ""; // literal
    const pageRange = ""; // format: ppX-Y; may need special handling since list (?)
    
    // misc info
    const contact = ""; // literal; most direct; // may need special handling since list (?)
    const downloadDate = ""; // YYYYMMDD
    const license = ""; // from "/Files/Licenses/" (not yet implemented)
    const aliases = ""; // may need special handling since list (?)
    
    const frontmatter = `---\ntags: ${tag}\nid: ${id}\ntitle: ${title}\nsubject: "[[${subject}]]"\nattribution: ${attribution}\ncopyright: ${copyright}\nmedium: ${medium}\ndateOfEntry: ${dateOfEntry}\npublisher: ${publisher}\nedition: ${edition}\nisbn: ${isbn}\nsiteName: ${siteName}\nsiteUrl: ${siteUrl}\npublication: ${publication}\nvolumerNo: ${volumeNo}
    issue: ${issue}\npageRange: ${pageRange}
    contact: ${contact}\ndownloadDate:${downloadDate}\nlicense: ${license}\naliases: ${aliases}\n---\n`;

    return frontmatter
}

// Generates the frontmatter for a new note by tag
// TO DO
// link to createSource
async function generateFrontmatter(tp, tag, title) {
    console.log('generateFrontmatter: starting');

    console.log('generateFrontmatter: creation date as id');
    const id = tp.file.creation_date("YYYYMMDDHHMMss");
    console.log('generateFrontmatter: returned id ', id);

    console.log('generateFrontmatter: tag ', tag);
    console.log('generateFrontmatter: checking tag case');
    
    switch (tag) {
        case 'axiom':
        case 'concept':
        case 'corollary':
        case 'definition':
        case 'formula':
        case 'lemma':
        case 'person':
        case 'proof':
        case 'theorem':
            console.log('generateFrontmatter: calling getSubject');
            const subject = await getSubject(tp);
            console.log('generateFrontmatter: returned subject ', subject);
            console.log('generateFrontmatter: calling getSource');
            const source = await getSource(tp);
            console.log('generateFrontmatter: returned source ', source);    
            console.log(`generateFrontmatter: generating ${tag} frontmatter`);
            const standardFrontmatter = `---\ntags:\n  - ${tag}\nid: ${id}\nsubject: "[[${await subject}]]"\nsource: "[[${await source}]]"\nalias: ""\n---\n`;
            console.log('generateFrontmatter: returning frontmatter');
            return standardFrontmatter;
        case 'subject':
            console.log('generateFrontmatter: generating subject frontmatter');
            const subjectFrontmatter = `---\ntags:\n  - ${tag}\id: ${id}\n---\n`;
            console.log('generateFrontmatter: returning subject frontmatter');
            return subjectFrontmatter;
        case 'person':
            console.log('generateFrontmatter: generating person fronmatter');
            const personFrontmatter = `---\ntags:\n  - ${tag}\id: ${id}\ndob: \ndod: \ninstitution: \nfield: \nwebsite: \ncontact: \n---\n`;
            return personFrontmatter;
        case 'reference':
            console.error('generateFrontmatter: createSource under construction. Exiting!');
            /*
            console.log('generateFrontmatter: reference; calling createSource');
            const referenceFrontmatter = await createSource(tp, tag, id, title, subject);
            console.log('generateFrontmatter: returning reference frontmatter from createSource');
            return referenceFrontmatter;
        */
        default:
            console.log('generateFrontmatter: returning unknown');
            return '\ngenerateFrontmatter: unknown frontmatter';
        }
}

// Generates body of note by tag
async function generateBody(tp, tag) {
    console.log('generateBody: starting');
    console.log('generateBody: checking tag case: ', tag);
    switch (tag) {
        case 'axiom':
            console.log('generateBody: updating body to axiom');
            const axiom = `### Fact:\n`;
            console.log('generateBody: returning axiom');
            return axiom;
        case 'concept':
            console.log('generateBody: updating body to concept');
            const concept = `### Explanation:\n`;
            console.log('generateBody: returning concept');
            return concept;
        case 'corollary':
            console.log('generateBody: updating body to corollary');
            const corollary = `### Insight:\n`;
            console.log('generateBody: returning corollary');
            return corollary;
        case 'definition':
            console.log('generateBody: updating body to definition');
            const definition = `### Definition:\n`;
            console.log('generateBody: returning definition');
            return definition;
        case 'formula':
            console.log('generateBody: updating body to formula');
            const formula = `### Formula:\n\n\n### Derivation:\n`;
            console.log('generateBody: returning formula');
            return formula;
        case 'lemma':
            console.log('generateBody: updating body to lemma');
            const lemma = `### Statement:\n`;
            console.log('generateBody: returning lemma');
            return lemma;
        case 'person':
            console.log('generateBody: updating body to person');
            const person = `### Bio:\n`;
            console.log('generateBody: returning person');
            return person;
        case 'proof':
            console.log('generateBody: updating body to proof');
            const proof = `### Hypothesis:\n\n\n### Supporting Arguments:\n\n\n### Proof:\n`;
            console.log('generateBody: returning proof');
            return proof;
        case 'reference':
            console.log('generateBody: updating body to reference');
            const reference = `### Contents\n`;
            console.log('generateBody: returning reference');
            return reference;
        case 'subject':
            console.log('generateBody: updating body to subject');
            const subject = '### Explanation:\n\n\n### Links:\n';
            console.log('generateBody: returning subject');
            return subject;
        case 'theorem':
            console.log('generateBody: updating body to theorem');
            const theorem = `### Statement:\n`;
            console.log('generateBody: returning theorem');
            return theorem;
        default:
            console.log('generateBody: returning unknown');
            return '\ngenerateBody: unknown body';
    }
}

// Writes the frontmatter and body content to the note being created by tag. Utilizes fs.writeFile.
// TO DO
// reconcile absolute path with tp.app.vault
// add a feature that only allows you to add the notes within Zettelkasten ?
async function writeToFile(tp, tag, title, frontmatter, body) {
    console.log('writeToFile: starting');
    const filePath = `/home/df/Obsidian/math/Zettelkasten/${title}.md`;
    try {
        switch (tag) {
            case 'axiom':
            case 'concept':
            case 'corollary':
            case 'definition':
            case 'formula':
            case 'lemma':
            case 'proof':
            case 'theorem':
                console.log('writeToFile: writing to file with fs.writeFile');
                updatedContent = await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8');
                console.log(`writeToFile: ${tag} file written`);
                return updatedContent;
            case 'subject':
                console.log('writeToFile: writing to file with fs.writeFile');
                updatedContent = await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8');
                console.log(`writeToFile: ${tag} file written`);
                return updatedContent;
            case 'person':
                console.log('writeToFile: writing to file with fs.writeFile');
                updatedContent = await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8');
                console.log(`writeToFile: ${tag} file written`);
                return updatedContent;
            case 'reference':
                console.log('writeToFile: writing to file with fs.writeFile');
                updatedContent = await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8');
                console.log(`writeToFile: ${tag} file written`);
                return updatedContent;
            default:
                console.log('writeToFile: returning unknown');
                return '\nwriteToFile: unknown file path or tag';
        }
    } catch (err) {
        console.error("Error writing to the file: ", err);
    }
}

// Main function which handles calling functions in the correct order and handles moving the note to the correct folder upon completion
// TO DO
// unique title check, debug console error filename already exists
async function main(tp) {
    console.log('main: starting');

    console.log('main: getting title');
    const title = await tp.system.prompt("Title: ", "");
    
    // console.log('main: checking uniqueness of title'); // Not sure where the error is coming from, but it doesn't seem to be breaking the app.
    console.log('main: title ', title);
    
    console.log('main: calling getTag');
    const tag = await getTag(tp);
    console.log('main: returned tag ', tag);
    
    console.log('main: letting frontmatter');
    let frontmatter;
    console.log('main: calling generateFrontmatter');
    frontmatter = await generateFrontmatter(tp, tag);

    console.log('main: letting body');
    let body;
    console.log('main: calling generateBody');
    body = await generateBody(tp, tag);

    console.log('main: pulling up file content');
    let content = tp.file.content;
    
    console.log('main: writing frontmatter and body to .md file with fs.');
    content = await writeToFile(tp, title, frontmatter, body);
    console.log('main: content written');
    
    console.log('main: moving file to correct folder');

    try {
        switch (tag) {
            case 'axiom':
            case 'concept':
            case 'corollary':
            case 'definition':
            case 'formula':
            case 'lemma':
            case 'proof':
            case 'theorem':
                await tp.file.move("/Zettelkasten/" + title);
            case 'subject':
                await tp.file.move("/Zettelkasten/Subjects/" + title);
            case 'person':
                await tp.file.move("/Zettelkasten/People/" + title);
            case 'reference':
                await tp.file.move("/Sources/" + title);
            default:
                console.log('main: returning unknown');
                return '\nmain: unknown file path cannot move file to correct folder';
        }
    } catch (err) {
        console.error("main: error moving the file: ", err);
            }

    console.log('main: completed');
}

module.exports = main;