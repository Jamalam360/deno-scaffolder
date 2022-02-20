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

const force = Deno.args.includes("--force");

if (await exists("./.vscode/settings.json")) {
  if (force) {
    await Deno.remove("./.vscode/settings.json");
  } else {
    Deno.exit(0);
  }
}

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
