import termkit from "terminal-kit";
import gradient from "gradient-string";
import { startupProgress, exitProgress } from "./loader.js";
import { showSkills } from "./sections/skills.js";
import { showAbout } from "./sections/about.js";
import { showProjects } from "./sections/projects.js";
import { showContact } from "./sections/contact.js";
import { showExperience } from "./sections/experience.js";
import open from 'open';

const term = termkit.terminal;

// Typewriter
export async function typeWriter(text, delay = 1, colors = ["#00FFFF","#00FF99"], chunkSize = 10 ) {
  const grad = gradient(colors);
  const coloredText = grad(text);
  
  for (let i = 0; i < coloredText.length; i += chunkSize) {
    term(coloredText.slice(i, i + chunkSize));
    await new Promise(r => setTimeout(r, delay));
  }
  term("\n");
}


// Command handler
async function handleCommand(command) {
  switch (command.trim().toLowerCase()) {
    case "help":
      await typeWriter("\nAvailable commands:\n");
      await typeWriter("  about      - Everything about Me");
      await typeWriter("  skills     - View my Skills");
      await typeWriter("  projects   - See my Work");
      await typeWriter("  experience - My Experience");
      await typeWriter("  contact    - Get my Contact info");
      await typeWriter("  exit       - Close Portfolio");
      break;

    case "about":
      await showAbout(typeWriter);
      break;

    case "skills":
      await showSkills(typeWriter);
      break;

    case "experience":
      await showExperience(typeWriter);
      break;

    case "contact":   
      await showContact(typeWriter);
      break;

    case "linkedin":
      await typeWriter("Opening LinkedIn...");
      open("https://www.linkedin.com/in/jaiparashar");
      break;
    
    case "github":
      await typeWriter("Opening GitHub...");
      open("https://github.com/itsojaylicious");
      break;


    case "projects":
      await showProjects(typeWriter);
      break;

    case "exit":
      await typeWriter("\nShutting down...");
      await exitProgress();
      process.exit();

    default:
      await typeWriter("❌ Unknown command. Try: about, skills, projects, exit, or type 'help' for options.");
      break;
  }
}

// Input loop
function listenForCommands() {
  term.colorRgbHex("#00ffeeff", "> ");
  term.inputField(async (err, input) => {
    if (err) throw err;
    await handleCommand(input);
    listenForCommands();
  });
}

// Main funccc
(async () => {
  term.fullscreen(true);
  await startupProgress();
  const logo = `

               ░▒▓█▓▒░░▒▓██████▓▒░░▒▓█▓▒░ 
               ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
               ░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
               ░▒▓█▓▒░▒▓████████▓▒░▒▓█▓▒░ 
        ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
        ░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
         ░▒▓██████▓▒░░▒▓█▓▒░░▒▓█▓▒░▒▓█▓▒░ 
                                     
  `;

  term.colorRgbHex("#00FF00", logo);
  await typeWriter("Welcome to Jay's Portfolio 💻");
  await typeWriter("Type 'help' to explore commands.");
  listenForCommands();
})();
