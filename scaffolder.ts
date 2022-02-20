import { exists } from "https://deno.land/std/fs/mod.ts";

const force = Deno.args.includes("--force");
const settingsExists = await exists("settings.json");

let vscodeSettings = true;

if (settingsExists && !force) {
  vscodeSettings = false;
} else if (settingsExists && force) {
  await Deno.remove("./.vscode/settings.json");
} else {
  await Deno.mkdir("./.vscode", { recursive: true });
}

if (vscodeSettings) {
  await Deno.writeTextFile(
    "./.vscode/settings.json",
    JSON.stringify(
      {
        "deno.enable": true,
        "deno.lint": true,
        "deno.unstable": true,
        "editor.formatOnSave": true,
        "editor.defaultFormatter": "denoland.vscode-deno",
        "editor.tabSize": 2,
      },
      null,
      2,
    ),
  );
}

Deno.run({
  cmd: ["git", "init"],
});
