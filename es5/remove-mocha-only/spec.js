const {expect} = require("chai")

const fun = require("./index")

describe("recast-remove-console", () => {
  it("returns expected", () => {
    const str = `
      it.only('foo', function() {
        expect(true).to.eql(true);
      });
    `
    const result = fun(str)

    expect(result).to.eql(`
      it('foo', function() {
        expect(true).to.eql(true);
      });
    `)
  })

  it("returns expected", () => {
    const str = `
      var foo = "it.only";
    `
    const result = fun(str)

    expect(result).to.eql(`
      var foo = "it.only";
    `)
  })

  it("returns expected", () => {
    const str = `
      describe.only("bar", function() {
        it.only('foo', function() {
          expect(true).to.eql(true);
        });
      })
    `
    const result = fun(str)

    expect(result).to.eql(`
      describe("bar", function() {
        it('foo', function() {
          expect(true).to.eql(true);
        });
      })
    `)
  })

  // this case is not possible to solve yet as there is not access to the scope
  it("returns expected", () => {
    const str = `
      function foo() {}
      describe.only("bar", foo)
    `
    const result = fun(str)

    expect(result).to.eql(`
      function foo() {}
      describe.only("bar", foo)
    `)
  })
})

