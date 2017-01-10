#!/usr/bin/env node

const fs = require("fs")
const program = require("commander")

const {version} = require("./package.json")
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

  const result = fn(fileContent)

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
  .option("-r --replace", "Replace the file with the output")
  .option("-s --silent", "Don't log result")

program.on("--help", () => {
  console.log("  Examples:")
  console.log("")
  console.log("    $ find src -name '*.js' -type f | xargs -I {} sam1lam4 -is es5/recast-remove-console {}")
  console.log("")
})

const args = process.argv

if (args.length > 2 && args[2] === COMPLETION_CMD) {
  logCompletionScript()
} else {
  program.parse(args)
}

