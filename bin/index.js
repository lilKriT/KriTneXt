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
import fs from "fs";

// Greeting
// console.log("Installing Next. The lilKriT way.");
intro("KriTneXt - starting.");

// Getting arguments through clack
// Project name
const projectName = await text({
  message: "What's your project name? Pick a cool one.",
  placeholder: "my-kritical-app",
  initialValue: "my-kritical-app",
  validate(value) {
    if (value.length === 0) return "You must provide a name.";
    if (fs.existsSync(value)) return "Folder already exists.";
  },
});

if (isCancel(projectName)) {
  cancel("Operation canceled.");
  process.exit(0);
}

// There are just examples for now.
/*
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

let settings = `text: ${projectName}   \nConfirmed: ${confirmed}   \nType: ${projectType}  \nTools: ${additionalTools}`;
note(settings, "Settings");

const s = spinner();
s.start("Installing.");
await new Promise((resolve) => setTimeout(resolve, 500));
s.stop("Installed.");

let nextSteps = "cd path    \ninstall   \ndev";
note(nextSteps, "Next Steps");
*/

let settingsNote = `Name: ${projectName}`;
note(settingsNote, "Settings:");

const projectConfirmed = await confirm({
  message: "Do you wish to continue with those settings?",
});

if (isCancel(projectConfirmed) || !projectConfirmed) {
  cancel("Operation canceled.");
  process.exit(0);
}

// Creating a spinner
const s = spinner();

// Installing Next
s.start("Installing Next.");
const nextInstall =
  await $`pnpm create next-app@latest ${projectName} --ts --eslint --tailwind --no-src-dir --app --import-alias @/*`;
s.stop("Next Installed.");

// Installing an extra library
s.start("Installing additional libraries.");
process.chdir(projectName);
await $`pnpm add lodash`;
s.stop("Additiona libraries installed.");

// Ending message
outro("KriTTed.");
