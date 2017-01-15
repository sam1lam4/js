const {expect} = require("chai")

const fun = require("./index")

describe("list-require-dependencies", () => {
  it("returns expected", () => {
    const str = `
      require(["a", "b"], function(a, b) {
        console.log("a", a);
      });
    `
    const result = fun(str)

    expect(result).to.eql(["a", "b"])
  })

  it("returns expected", () => {
    const str = `
      require("foo");
    `
    const result = fun(str)

    expect(result).to.eql(["foo"])
  })

  it("returns expected", () => {
    const str = `
      require();
    `
    const result = fun(str)

    expect(result).to.eql([])
  })
})
