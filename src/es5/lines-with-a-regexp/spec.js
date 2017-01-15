const {expect} = require("chai")

const fun = require("./index")

describe("list-require-dependencies", () => {
  it("returns expected", () => {
    const str = `
      var x = /foo/g;
    `
    const result = fun(str)

    expect(result).to.eql([2])
  })
})
