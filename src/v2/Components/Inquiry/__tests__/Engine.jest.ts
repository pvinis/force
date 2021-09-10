import { Engine } from "../Engine"

describe("Engine", () => {
  describe("a straight path", () => {
    const machine = new Engine({
      workflow: ["first", "second", "third", "fourth"],
    })

    describe("#current", () => {
      it("returns the first step in the path", () => {
        expect(machine.current()).toEqual("first")
      })
    })

    describe("#next", () => {
      it("moves through the workflow; stopping at the end", () => {
        expect(machine.next()).toEqual("second")
        expect(machine.current()).toEqual("second")
        expect(machine.next()).toEqual("third")
        expect(machine.isEnd()).toBe(false)
        expect(machine.next()).toEqual("fourth")
        expect(machine.isEnd()).toBe(true)
        expect(machine.next()).toEqual("fourth")
      })
    })
  })

  describe("a complex path", () => {
    const machine = new Engine({
      conditions: {
        firstDecision() {
          return false
        },
        secondDecision() {
          return true
        },
        thirdDecision() {
          return false
        },
      },
      workflow: [
        "first",
        "second",
        {
          firstDecision: {
            true: ["trueFirst", "trueSecond"],
            false: [
              "falseFirst",
              {
                secondDecision: {
                  true: [
                    "falseTrueFirst",
                    {
                      thirdDecision: {
                        true: ["falseTrueTrueFirst"],
                        false: ["falseTrueFalseFirst"],
                      },
                    },
                  ],
                  false: ["falseFalseFirst"],
                },
              },
            ],
          },
        },
        "fourth",
      ],
    })

    describe("#next", () => {
      it("moves through the states; making decisions and stopping at the end", function () {
        expect(machine.current()).toEqual("first")
        expect(machine.next()).toEqual("second")
        expect(machine.next()).toEqual("falseFirst") // Makes firstDecision
        expect(machine.next()).toEqual("falseTrueFirst") // Makes secondDecision
        expect(machine.next()).toEqual("falseTrueFalseFirst") // Makes dependentDecision
        expect(machine.next()).toEqual("fourth")
      })
    })
  })

  describe("resumable path", () => {
    const machine = new Engine({
      conditions: {
        second() {
          return true
        },

        fourth() {
          return false
        },

        subForth() {
          return true
        },
      },
      workflow: [
        "first",
        {
          second: {
            true: ["second′"],
          },
        },
        "third",
        {
          fourth: {
            false: [
              "fourth′",
              {
                subForth: {
                  true: ["fourth″"],
                },
              },
            ],
          },
        },
        "fifth",
      ],
    })

    it("resumes the primary path after travelling down multiple sub-paths", () => {
      expect(machine.current()).toEqual("first")
      expect(machine.isEnd()).toBe(false)
      expect(machine.next()).toEqual("second′")
      expect(machine.isEnd()).toBe(false)
      expect(machine.next()).toEqual("third")
      expect(machine.isEnd()).toBe(false)
      expect(machine.next()).toEqual("fourth′")
      expect(machine.isEnd()).toBe(false)
      expect(machine.next()).toEqual("fourth″")
      expect(machine.isEnd()).toBe(false)
      expect(machine.next()).toEqual("fifth")
      expect(machine.isEnd()).toBe(true)
    })
  })

  describe("conditional steps", () => {
    const machine = new Engine({
      conditions: {
        shouldSkip() {
          return true
        },

        shouldNotSkip() {
          return true
        },
      },
      workflow: [
        "first",
        { shouldSkip: { false: ["skipThisSecond"] } },
        { shouldNotSkip: { true: ["landOnThisSecond"] } },
        "third",
      ],
    })

    it("skips the second step", () => {
      expect(machine.current()).toEqual("first")
      expect(machine.next()).toEqual("landOnThisSecond")
      expect(machine.next()).toEqual("third")
      expect(machine.isEnd()).toBe(true)
    })
  })
})
