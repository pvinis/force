import { graphql } from "react-relay"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { ViewInRoomFragmentContainer } from "../ViewInRoom"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: ViewInRoomFragmentContainer,
  // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
  query: graphql`
    query ViewInRoom_Test_Query {
      artwork(id: "example") {
        ...ViewInRoom_artwork
      }
    }
  `,
})

describe("ViewInRoom", () => {
  it("renders correctly", () => {
    const wrapper = getWrapper({
      Artwork: () => ({ widthCm: 33, heightCm: 66 }),
      ResizedImageUrl: () => ({
        src: "example.jpg",
        srcSet: "example.jpg 1x",
      }),
    })

    expect(wrapper.html()).toContain(
      'src="example.jpg" srcset="example.jpg 1x"'
    )
  })
})
