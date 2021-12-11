import { FairsFairRowFragmentContainer } from "../FairsFairRow"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { DateTime } from "luxon"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: FairsFairRowFragmentContainer,
  // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
  query: graphql`
    query FairsFairRow_Test_Query {
      fair(id: "example") {
        ...FairsFairRow_fair
      }
    }
  `,
})

describe("FairsFairRow", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Fair: () => ({
        name: "Example Fair",
        isoStartAt: DateTime.local().minus({ day: 7 }).toISODate(),
        href: "/fair/example",
      }),
    })

    expect(wrapper.find("h4").first().text()).toEqual("Example Fair")
    expect(wrapper.find("a").props().href).toEqual("/fair/example")
  })

  describe("upcoming fair", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({
        Fair: () => ({
          name: "Example Fair",
          isoStartAt: DateTime.local().plus({ day: 7 }).toISODate(),
          href: "/fair/example",
        }),
        Profile: () => ({
          href: "/organizer-example",
        }),
      })

      expect(wrapper.find("h4").first().text()).toEqual("Example Fair")
      expect(wrapper.find("a").props().href).toEqual("/organizer-example")
    })
  })
})
