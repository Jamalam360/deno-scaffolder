async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (e) {
    if (e instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw e;
    }
  }
}

let vscodeSettings = true;

if (await exists("./vscode/settings.json") && !Deno.args.includes("--force")) {
  vscodeSettings = false;
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
