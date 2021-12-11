import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { FairEditorialFragmentContainer } from ".."

jest.unmock("react-relay")

describe("FairEditorial", () => {
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => {
      return <FairEditorialFragmentContainer fair={props.fair} />
    },
    // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
    query: graphql`
      query FairEditorial_Test_Query {
        fair(id: "test") {
          ...FairEditorial_fair
        }
      }
    `,
  })

  it("renders title correctly", () => {
    const wrapper = getWrapper({})
    expect(wrapper.text()).toContain("Explore Further")
  })

  it("renders articles rail", () => {
    const wrapper = getWrapper({})
    expect(wrapper.find("FairEditorialRailArticles").length).toBe(1)
  })
})
