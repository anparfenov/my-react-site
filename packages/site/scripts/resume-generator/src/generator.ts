import {Contact, CV, cvData, Education, Job, Skill} from "../../../data/cv";
import {i18n} from "../../../i18n/i18n";
import {UserLink} from "../../../data/about";
import {format as dateFormat} from 'date-fns';
import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

const CV_DIRNAME = path.resolve(process.env.HOME ?? '', 'Documents/tex/generated_cv');
const CV_RU_FILENAME = 'cv_ru_andrey_parfenov_gen';
const CV_RU_FILENAME_LATEX = 'cv_ru_andrey_parfenov_gen.dvi';
const CV_RU_FILENAME_DVI = 'cv_ru_andrey_parfenov_gen.latex';


function generateTab(num: number) {
    return (new Array(num)).fill(' ').join('');
}

function generate(title: string, skills: string, education: string, jobs: string): string {
    return `\\documentclass[11pt]{article}

\\usepackage{titlesec}
\\usepackage{titling}
\\usepackage[margin=0.8in]{geometry}
\\usepackage[utf8]{inputenc}
\\usepackage[russian]{babel}

\\pagenumbering{gobble}

\\titleformat{\\section}{\\huge\\bfseries}{}{0em}{}

${title}

\\begin{document}

\\maketitle

\\begin{minipage}[t]{0.4\\linewidth}

${skills}

${education}

\\end{minipage}
\\hspace{2em}
\\begin{minipage}[t]{0.55\\linewidth}

${jobs}

\\end{minipage}

\\end{document}`
}

type TitleProps = Pick<CV, 'nameLang' | 'professionLang' | 'contacts' | 'links'>

function generateTitle(props: TitleProps): string {
    const name = i18n.t(props.nameLang);
    const profession = i18n.t(props.professionLang);
    const [telegram, mail] = props.contacts;
    const [github, gitlab] = props.links;

    const generateContacts = (contacts: Contact[]) => {
        return contacts
            .map((contact) => `\\textbf{${contact.text}}: ${contact.url}`)
            .join(' $\\vert$ ');
    }

    const generateLinks = (contacts: UserLink[]) => {
        return contacts
            .map((contact) => `\\textbf{${contact.label}}: ${contact.url}`)
            .join(' $\\vert$ ');
    }

    return `\\renewcommand{\\maketitle}{
    \\begin{center}{\\huge\\bfseries\\theauthor}
    \\vspace{0.3em}

    {\\large ${profession}}
    \\vspace{0.7em}


    ${generateContacts([telegram, mail])}
    \\vspace{0.45em}
    ${generateLinks([github, gitlab])}

    \\end{center}
    \\vspace{4em}
}

\\author{${name}}`
}

function generateSkills(skills: Skill[]): string {
    const [programmingLangs, frameworks] = skills.slice(0, 2);
    const otherSection = skills[2];
    const generateTechSection = ({sectionLang, tech}: Skill) => {
        return `
\\subsection{${i18n.t(sectionLang)}}
${tech?.map((item) => item.name).join(', ')}
\\vspace{1em}`
    }
    const generateItemList = ({sectionLang, list}: Skill) => {
        return `
\\subsection{${i18n.t(sectionLang)}}
        
\\begin{itemize}
    \\item ${list?.join(', ')}
\\end{itemize}`
    }

    return `
\\section{Навыки}
${generateTechSection(programmingLangs)}
${generateTechSection(frameworks)}
${generateItemList(otherSection)}
\\hspace{1em}
`
}

function generateEducation(educationList: Education[]): string {


    return `\\section{${i18n.t('cv.education')}}

${educationList.map((education) => 
        String.raw`\subsection{${i18n.t(education.universityLang)}}

2014--2018\newline
${i18n.t(education.facultyLang)}, ${i18n.t(education.programLang)}`
    )}`
}

function generateJobs(jobs: Job[]): string {
    const generateSection = (job: Job) => {
        return `
\\subsection{${job.company}}
${dateFormat(job.start, "MMMM/yyyy")} - ${job.end ? dateFormat(job.start, "MMMM/yyyy") : i18n.t('cv.currentTime')}

\\begin{itemize}
${job.description.map(({textLang}) => 
    `${generateTab(4)}\\item ${i18n.t(textLang)}`
).join('\n')}
\\end{itemize}
`
    }

    return `\\section{${i18n.t('cv.jobExperience')}}

${jobs.map(job => generateSection(job)).join('')}
`;
}

function outputLatex(dirname: string, filename: string, content: string) {
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, {recursive: true});
    }
    fs.writeFileSync(path.resolve(dirname, filename), content);
}

function generatePdfFromLatex() {
    const latexProc = spawn(`latex | dvipdfm ${CV_RU_FILENAME_DVI}`, {
        stdio: 'inherit',
        shell: true,
        cwd: CV_DIRNAME,
    });
    latexProc.on('close', (result) => {
        console.log('done!', result);
    })
}

const cvResult = generate(generateTitle({
        nameLang: cvData.nameLang,
        professionLang: cvData.professionLang,
        contacts: cvData.contacts,
        links: cvData.links
    }),
    generateSkills(cvData.skills),
    generateEducation(cvData.educationList),
    generateJobs(cvData.jobs)
)

outputLatex(CV_DIRNAME, CV_RU_FILENAME_LATEX, cvResult);
generatePdfFromLatex();
