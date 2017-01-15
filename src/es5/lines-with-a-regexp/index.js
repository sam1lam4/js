const {traverseStr, types, constructors, getConstructor} = require("../..")

let lines

function traverseFn(key, item) {
  if (item.type === types.LITERAL &&
      getConstructor(item) === constructors.REGEX_LITERAL &&
      key === "type") {
    lines.push(item.loc.start.line)
  }
}

module.exports = function(str) {
  lines = []

  traverseStr(str, traverseFn)

  return lines
}
