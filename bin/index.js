#! /usr/bin/env node

import { execa, $ } from "execa";

console.log("Installing Next. The lilKriT way.");
// const install = await execa("pnpm create", ["next-app@latest", "test"]);
const next =
  await $`pnpm create next-app@latest test --ts --eslint --tailwind --no-src-dir --app --import-alias @/*`;
console.log("KriTneXt installed.");
