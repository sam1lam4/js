const {traverseStr, types, isArray} = require("../..")

module.exports = function(str) {
  const dependencies = []

  traverseStr(str, (key, item, meta) => {
    if (item[key] === "require" && item.type === types.IDENTIFIER) {
      const {parent} = meta
      const firstArgument = parent.arguments[0]

      if (!firstArgument) {
        return
      }

      if (isArray(firstArgument.elements)) {
        firstArgument.elements
          .map((e) => e.raw)
          .map((e) => e.replace(/"/g, ""))
          .forEach((e) => dependencies.push(e))
      } else if (firstArgument.type === types.LITERAL) {
        dependencies.push(firstArgument.value)
      }
    }
  })

  return dependencies
}
