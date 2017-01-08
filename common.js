const recast = require("recast")

const isArray = (elem) => elem && typeof elem === "object" && elem.length && elem.length > 0 && elem.forEach
const last = (arr) => arr[arr.length - 1]

let call = 0

function traverse(object, parents, fn) {
  if (object && typeof object === "object") {
    const keys = Object.keys(object)
    const newParents = parents.concat(object)

    keys.forEach((key) => {
      const value = object[key]

      if (isArray(value)) {
        value.forEach((v) => {
          traverse(v, newParents, fn)
        })
      } else if (typeof value === "object") {
        traverse(value, newParents, fn)
      } else {
        call++
        fn(key, object, {
          call,
          parent: last(parents),
          parents,
        })
      }
    })
  }
}

function traverseAST(ast, fn) {
  call = 0
  traverse(ast, [], fn)
}

module.exports.traverseAST = traverseAST

module.exports.traverseStr = function(str, fn) {
  const ast = recast.parse(str, {loc: true})

  traverseAST(ast, fn)
}

module.exports.types = {
  CALL_EXPRESSION: "CallExpression",
  EXPRESSION_STATEMENT: "ExpressionStatement",
  IDENTIFIER: "Identifier",
  LITERAL: "Literal",
  MEMBER_EXPRESSION: "MemberExpression",
}

module.exports.constructors = {REGEX_LITERAL: "RegexLiteral"}

module.exports.getConstructor = (item) => {
  const constructor = item.constructor.toString()
  const matches = (/function(.*)\(/).exec(constructor)

  if (matches && matches.length > 1) {
    return matches[1].trim()
  }

  return null
}

module.exports.isArray = isArray
