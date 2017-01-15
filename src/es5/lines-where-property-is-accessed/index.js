const {traverseStr, types, exitWithError} = require("../..")

module.exports = function(str, propertyName) {
  const list = []

  if (!propertyName) {
    exitWithError("Property name argument missing")
  }

  traverseStr(str, (key, item, meta) => {
    if (item[key] === propertyName && item.type === types.IDENTIFIER && meta.parent.type === types.MEMBER_EXPRESSION) {
      list.push(meta.parent.loc.start.line)
    }
  })

  return list
}
