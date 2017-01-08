const {traverseAST, types} = require("../../common")

const recast = require("recast")

module.exports = function(str) {
  const ast = recast.parse(str)

  traverseAST(ast, (key, item, meta) => {
    if (item[key] === "console" &&
        meta.parent.type === types.MEMBER_EXPRESSION &&
        meta.parents[meta.parents.length - 2].type === types.CALL_EXPRESSION &&
        meta.parents[meta.parents.length - 3].type === types.EXPRESSION_STATEMENT) {
      const expression = meta.parents[meta.parents.length - 3]
      const expressionParent = meta.parents[meta.parents.length - 4]

      expressionParent.body = expressionParent.body.filter((el) => el !== expression)
    }
  })

  return recast.print(ast).code
}
