#! /usr/bin/env node

import { execa, $ } from "execa";
import {
  intro,
  outro,
  isCancel,
  cancel,
  text,
  confirm,
  select,
  multiselect,
  spinner,
  note,
} from "@clack/prompts";

// Greeting
console.log("Installing Next. The lilKriT way.");
intro("KriT neXt");

// Getting arguments through clack
const value = await text({
  message: "Alright. How will your awesome app be called?",
  placeholder: "my-kritical-app",
  initialValue: "my-kritical-app",
  validate(value) {
    if (value.length === 0) return "You must provide a name.";
  },
});

if (isCancel(value)) {
  cancel("Operation canceled.");
  process.exit(0);
}

const confirmed = await confirm({
  message: "Do you want to continue?",
});

if (isCancel(confirmed) || !confirmed) {
  cancel("Operation canceled.");
  process.exit(0);
}

const projectType = await select({
  message: "Pick a project type.",
  options: [
    { value: "ts", label: "TypeScript" },
    { value: "js", label: "JavaScript" },
  ],
});

const additionalTools = await multiselect({
  message: "Select additiona tools:",
  options: [
    { value: "eslint", label: "ESLint", hint: "recommended" },
    { value: "prettier", label: "Prettier" },
    { value: "github", label: "GitHub" },
  ],
  required: false,
});

let settings = `text: ${value}   \nConfirmed: ${confirmed}   \nType: ${projectType}  \nTools: ${additionalTools}`;
note(settings, "Settings");

const s = spinner();
s.start("Installing.");
await new Promise((resolve) => setTimeout(resolve, 500));
s.stop("Installed.");

let nextSteps = "cd path    \ninstall   \ndev";
note(nextSteps, "Next Steps");

// Installing next
// const nextInstall =
//   await $`pnpm create next-app@latest test --ts --eslint --tailwind --no-src-dir --app --import-alias @/*`;
console.log("Does this console log?");

// Ending message
outro("KriTTed.");
console.log("KriTneXt installed.");
