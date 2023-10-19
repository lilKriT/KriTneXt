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
import t from "../templates/templates.js";

console.log(t);

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

*/

// Displaying settings and asking for confirmation:
let settingsNote = `Name: ${projectName}`;
note(settingsNote, "Settings:");

const projectConfirmed = await confirm({
  message: "Do you wish to continue with those settings?",
});

if (isCancel(projectConfirmed) || !projectConfirmed) {
  cancel("Operation canceled.");
  process.exit(0);
}

// More testing:
// fs.readFile("./templates/example.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

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

// Replacing files with my templates:
let replaceContent = fs.readFileSync("./templates/example.tsx", "utf-8");

fs.writeFile(`app/page.tsx`, replaceContent, (err) => {
  if (err) {
    console.error(err);
  }
});

// Ending message
outro("KriTTed.");
