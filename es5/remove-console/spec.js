const {expect} = require("chai")

const fun = require("./index")

describe("recast-remove-console", () => {
  it("returns expected", () => {
    const str = `
      var foo = "a";
      console.log(foo);
    `
    const result = fun(str)

    expect(result).to.eql(`
      var foo = "a";
    `)
  })

  it("returns expected", () => {
    const str = `
      function foo(bar) {
        console.log(bar);
        return bar + 2;
      }
    `
    const result = fun(str)

    expect(result).to.eql(`
      function foo(bar) {
        return bar + 2;
      }
    `)
  })

  it("returns expected", () => {
    const str = `
      var a = "console.log('foo')";
    `
    const result = fun(str)

    expect(result).to.eql(`
      var a = "console.log('foo')";
    `)
  })
})

