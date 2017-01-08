const {expect} = require("chai")

const fun = require("./index")

describe("lines-property-is-accessed", () => {
  it("returns expected", () => {
    const propertyName = "foo"
    const str = `
      var foo = "bar";
      var baz = {foo: "bar"};
      console.log(baz.foo);
      foo = "bam";
      foo = baz.foo;
    `
    const result = fun(str, propertyName)

    expect(result).to.eql([4, 6])
  })
})
