import termkit from "terminal-kit";
import { COLORS } from "./data.js";

const term = termkit.terminal;
const spinnerFrames = ["⠋","⠙","⠹","⠸","⠼","⠴","⠦","⠧","⠇","⠏"];
async function typeWriterLine(text, delay = 20) {
  for (const char of text) {
    term(char);
    await new Promise(r => setTimeout(r, delay));
  }
}

export async function startupProgress() {
  term.clear();

  const steps = [
    "Initializing portfolio 📊 ...",
    "Integrating Aura ✨ ...",
    "Almost Rizzing up 🎀 ..."
  ];

  const baseY = Math.floor(term.height / 2);
  for (const step of steps) {
    term.moveTo(1, baseY).eraseLine();
    await typeWriterLine(step + " ");
    for (let i = 0; i < spinnerFrames.length * 4; i++) {
      term.moveTo(step.length + 2, baseY);
      term.colorRgbHex(COLORS.primary, spinnerFrames[i % spinnerFrames.length]);
      await new Promise(r => setTimeout(r, 80));
    }
    term.moveTo(1, baseY).eraseLine();
  }

  // Done mess
  const doneMsg = "✓ Portfolio loaded successfully!";
  term.moveTo(1, baseY).eraseLine();
  term.colorRgbHex("#00FF00", doneMsg);

  await new Promise(r => setTimeout(r, 800));
  term.clear();
}

export async function exitProgress() {
  term.clear();
  const msg = "Exiting portfolio...";
  const baseY = Math.floor(term.height / 2);
  term.moveTo(1, baseY).eraseLine();
  term.colorRgbHex(COLORS.secondary, msg);
  for (let i = 0; i < spinnerFrames.length * 3; i++) {
    term.moveTo(msg.length + 2, baseY);
    term.colorRgbHex(COLORS.primary, spinnerFrames[i % spinnerFrames.length]);
    await new Promise(r => setTimeout(r, 80));
  }

  term.clear();
  process.exit();
}
