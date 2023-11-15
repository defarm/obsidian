const fs = require('fs').promises;
console.log('fs: initialized ', fs);

const to = app.plugins.plugins['templater-obsidian'];
console.log('tp: initiliazed ', to);

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

        console.log('getTag: tags file path:\n', tagsFilePath);
        console.log('getTag: reading tags file');
        const fileContent = await fs.readFile(tagsFilePath, 'utf8');
        const tags = fileContent.split('\n').filter(line => line.startsWith('#')).map(tag => tag.trim());
        console.log('getTag: tags ', tags);
        
        const chosenTag = await tp.system.suggester(tags, tags);
        console.log('getTag: chosenTag ', chosenTag);
        console.log('getTag: slicing leading #');
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

        console.log('getSubject: absolute path:\n', subjectFilePath);

        console.log('getSubject: reading fs');
        const files = await fs.readdir(subjectFilePath);
        const subjects = files.map(file => file.replace('.md', ''));
        console.log('getSubject: subjects ', subjects);
        
        const chosenSubject = await tp.system.suggester(subjects, subjects);
        console.log('getSubject: chosenSubject ', chosenSubject);

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
        console.log('getReference: absolute path:\n', referenceFilePath);

        console.log('getReference: reading fs');
        const files = await fs.readdir(referenceFilePath);
        const references = files.map(file => file.replace('.md', ''));
        console.log('getReference: references ', references);
        
        const chosenReference = await tp.system.suggester(references, references);
        console.log('getReference: chosenReference ', chosenReference);

        console.log('getReference: returning chosenReference');
        return chosenReference;

    } catch (err) {
        console.error('Error reading directory:', err);
        return '\ngetReference: unknown reference';
    };
};

// Creates a new reference on #reference tag selection in getTag
// TO DO
// input, error handling
async function createReference(tp, tag, id, title, subject, alias) {
    // for all
    const attribution = await tp.system.prompt("Attribution:"); // author/s; may need special handling since list
    const copyright = await tp.system.prompt("Copyright:") // date
    const medium = await tp.system.prompt("Medium:") // literal
    const dateOfEntry = await tp.file.creation_date("YYYY-MM-DD"); // date entered into Obsidian

    // if book
    const publisher = await tp.system.prompt("Publisher:"); // literal
    const edition = await tp.system.prompt("Edition:"); // literal
    const isbn = await tp.system.prompt("ISBN:"); // literal

    // if website
    const siteName = await tp.system.prompt("Site Name:") // literal name
    const siteUrl = await tp.system.prompt("URL:") // literal URL
    
    // if article
    const publication = await tp.system.prompt("Publication:") // literal
    const volumeNo = await tp.system.prompt("Volume Number:") // literal
    const issue = await tp.system.prompt("Issue:") // literal
    // const pageRange = ""; // format: ppX-Y; may need special handling since list (?)
    
    // misc info
    const contact = ""; // literal; most direct; // may need special handling since list (?)
    const downloadDate = ""; // YYYYMMDD
    const license = ""; // from "/Files/Licenses/" (not yet implemented)
    
    const frontmatter = `---\ntags:\n  - ${await tag}\nid: ${id}\ntitle: ${await title}\nsubject: "[[${await subject}]]"\nattribution: "${await attribution}"\ncopyright: "${await copyright}"\nmedium: "${await medium}"\ndateOfEntry: "${await dateOfEntry}"\npublisher: "${publisher}"\nedition: "${await edition}"\nisbn: "${await isbn}"\nsiteName: "${await siteName}"\nsiteUrl: "${await siteUrl}"\npublication: "${await publication}"\nvolumerNo: "${await volumeNo}"\nissue: "${issue}"\ncontact: "${await contact}"\ndownloadDate: "${await downloadDate}"\nlicense: "${await license}"\nalias: "${await alias}"\n---\n`;

    return frontmatter
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
async function generateFrontmatter(tp, tag, title) {
    // title is called in case 'reference':
    console.log('generateFrontmatter: starting');

    console.log('generateFrontmatter: tp.file.creation_date as id');
    const id = tp.file.creation_date("YYYYMMDDHHMMss");
    console.log('generateFrontmatter: id ', id);

    console.log('generateFrontmatter: tag ', tag);
    console.log('generateFrontmatter: checking tag case');

    console.log('generateFrontmatter: calling getSubject');
    const subject = await getSubject(tp);
    console.log('generateFrontmatter: returned subject\n', subject);

    console.log('generateFrontmatter: getting alias');
    const alias = await tp.system.prompt("Alias: ");
    console.log('generateFronmatter: returned alias\n:', alias);

    let frontMatter;
    console.log(`generateFrontmatter: generating ${tag} frontMatter`);
    // tags alphabetized and divided by cases
    switch (tag) {
        case 'axiom':
        case 'concept':
        case 'corollary':
        case 'definition':
        case 'formula':
        case 'lemma':
        case 'proof':
        case 'theorem':
            console.log('generateFrontmatter: calling getReference');
            const reference = await getReference(tp);
            console.log('generateFrontmatter: returned reference\n', reference);

            frontMatter = `---\ntags:\n  - ${tag}\nid: ${id}\nsubject: "[[${await subject}]]"\nreference: "[[${await reference}]]"\nalias: "${await alias}"\n---\n`;
            break;
        case 'institution':
            console.error('generateFrontmatter: createInstitution not yet implemented'); // since atomica calls for the reference, in what cases are institutions called? people? issue is that if 'institution' calls createInstitution, then how is it handled if only the note related to one is needed?
            break;
        case 'person':
            frontMatter = `---\ntags:\n  - ${tag}\id: ${id}\ndob: \ndod: \ninstitution: \nfield: \nwebsite: \ncontact: \n---\n`;
            break;
        case 'reference':
            console.log('generateFrontmatter: returned subject\n', subject);
            frontMatter = await createReference(tp, tag, id, title, subject, alias);
            break;
        case 'subject':
            frontMatter = `---\ntags:\n  - ${tag}\id: ${id}\n---\n`;
            break;
        default:
            console.log('generateFrontmatter: returning unknown');
            return '\ngenerateFrontmatter: unknown';
        };
    console.log('generateFrontmatter: returning frontMatter');
    console.log('generateFrontmatter:\n', frontMatter);
    return frontMatter;
};

// Generates body of note by tag
// TO DO
// institution
// change fs to tp
async function generateBody(tp, tag) {
    console.log('generateBody: starting');
    let body; 
    console.log('generateBody: checking tag case: ', tag);
    console.log(`generateBody: updating body to ${tag}`);
    // tags alphabetized
    switch (tag) {
        case 'axiom':
            body = `### Fact:\n`;
            break;
        case 'concept':
            body = `### Explanation:\n`;
            break;
        case 'corollary':
            body = `### Insight:\n`;
            break;
        case 'definition':
            body = `### Definition:\n`;
            break;
        case 'formula':
            body = `### Formula:\n\n\n### Derivation:\n`;
            break;
        case 'institution':
            body - `### Notes:\n`
            break;
        case 'lemma':
            body = `### Statement:\n`;
            break;
        case 'person':
            body = `### Bio:\n`;
            break;
        case 'proof':
            body = `### Hypothesis:\n\n\n### Supporting Arguments:\n\n\n### Proof:\n`;
            break;
        case 'reference':
            body = `### Contents\n`;
            break;
        case 'subject':
            body = '### Explanation:\n\n\n### Links:\n';
            break;
        case 'theorem':
            body = `### Statement:\n`;
            break;
        default:
            console.log('generateBody: returning unknown');
            break;
    };
    console.log('generateBody: returning body');
    console.log('generateBody:\n', body);
    return body;
};

// Writes the frontmatter and body content to the note being created by tag. Utilizes fs.writeFile (should use tp for ease of use for others)
// TO DO
// reconcile absolute path with tp.app.vault
// implement tp.app.vault.write() ?
// institution
async function writeToFile(tp, tag, title, frontmatter, body) {
    console.log('writeToFile: starting');
    console.log(`writeToFile: parameters:\ntag:\n${tag}\ntitle: ${title}\nfrontmatter:\n${frontmatter}\nbody:\n${body}`);
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
            console.log('writeToFile: returning unknown');
            return '\nwriteToFile: unknown file path or tag for folderChoice';
    };
    console.log('writeToFile: choosing ', folderChoice);
    const filePath = `/home/df/Obsidian/math/Zettelkasten/${folderChoice}/${title}.md`;
    console.log('writeToFile: writing to file with fs.writeFile');
    try {
        await fs.writeFile(filePath, `${frontmatter}${body}`, 'utf8');
        console.log(`writeToFile: ${tag} file written in ${folderChoice}`);
        return folderChoice;
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
    
    // console.log('main: checking uniqueness of title'); // Not sure where the error is coming from, but it doesn't seem to be breaking the app.
    console.log('main: title ', title);
    
    console.log('main: calling getTag');
    const tag = await getTag(tp);
    console.log('main: returned tag ', tag);
    
    console.log('main: letting frontmatter');
    let frontmatter;
    console.log('main: calling generateFrontmatter');
    frontmatter = await generateFrontmatter(tp, tag, title);

    console.log('main: letting body');
    let body;
    console.log('main: calling generateBody');
    body = await generateBody(tp, tag);

    console.log('main: pulling up file content');
    let content = tp.file.content;
    
    console.log('main: writing frontmatter and body to .md file with fs.');
    content = await writeToFile(tp, tag, title, frontmatter, body);
    console.log('main: content written');
    console.log('main:\n', content);

    // console.log('main: moving to correct note in Obsidian');

    console.log('main: completed');
}

module.exports = main;