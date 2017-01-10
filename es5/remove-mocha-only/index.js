const {traverseAST, types} = require("../../common")

const recast = require("recast")

function isTargetOnly(key, item, meta) {
  return item[key] === "only" &&
    item.type === types.IDENTIFIER &&
    meta.parent.type === types.MEMBER_EXPRESSION &&
    (meta.parent.object.name === "it" || meta.parent.object.name === "describe") &&
    meta.parents[meta.parents.length - 2].type === types.CALL_EXPRESSION &&
    meta.parents[meta.parents.length - 2].arguments.length === 2 &&
    meta.parents[meta.parents.length - 2].arguments[0].type === types.LITERAL &&
    meta.parents[meta.parents.length - 2].arguments[1].type === types.FUNCTION_EXPRESSION
}

module.exports = function(str) {
  const ast = recast.parse(str)

  traverseAST(ast, (key, item, meta) => {
    if (isTargetOnly(key, item, meta)) {
      const callExpression = meta.parents[meta.parents.length - 2]
      const identifier = recast.types.builders.identifier(meta.parent.object.name)

      callExpression.callee = identifier
    }
  })

  return recast.print(ast).code
}
