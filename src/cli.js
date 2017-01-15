#!/usr/bin/env node

const fs = require("fs")
const program = require("commander")

const {version} = require("../package.json")
const {
  COMPLETION_CMD,
  logCompletionScript,
} = require("./completion")

function main(action, filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8")
  let fn

  // try to require relative to cwd, and then relative to this file
  try {
    fn = require(`${process.cwd()}/${action}`) // eslint-disable-line global-require
  } catch (e) {
    fn = require(`./${action}`) // eslint-disable-line global-require
  }

  const fnArgs = [fileContent].concat(program.argument)
  const result = fn(...fnArgs)

  if (program.replace) {
    if (typeof result === "string") {
      fs.writeFileSync(filePath, result)
    } else {
      console.log(`Result is not a string, will not write to: ${filePath}`)
    }
  }

  if (!program.silent) {
    console.log(`>>> ${filePath}`)
    if (typeof result === "string") {
      console.log(result)
    } else {
      console.log(JSON.stringify(result))
    }
  }
}

program
  .version(version)
  .arguments("<action> <filePath>")
  .action(main)
  .option("-r, --replace", "Replace the file with the output")
  .option("-a, --argument [value]", "Argument to pass to the script. Can be repeated.",
    (val, memo) => memo.concat([val]), [])
  .option("-s, --silent", "Don't log result")

program.on("--help", () => {
  console.log("  Examples:")
  console.log("")
  console.log("    $ find src -name '*.js' -type f | xargs -I {} sam1lam4 -is es5/remove-console {}")
  console.log("    $ sam1lam4 es5/lines-where-property-is-accessed -a foo index.js | grep -v '^>>>'")
  console.log("")
})

if (process.argv.length > 2) {
  if (process.argv[2] === COMPLETION_CMD) {
    logCompletionScript()
  } else {
    program.parse(process.argv)
  }
} else {
  program.outputHelp((txt) => txt)
}

