import { graphql } from "react-relay"
import { ShowArtworksEmptyStateFragmentContainer } from "../Components/ShowArtworksEmptyState"
import { ShowArtworksEmptyState_Test_Query } from "v2/__generated__/ShowArtworksEmptyState_Test_Query.graphql"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper<ShowArtworksEmptyState_Test_Query>({
  Component: ShowArtworksEmptyStateFragmentContainer,
  // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
  query: graphql`
    query ShowArtworksEmptyState_Test_Query {
      show(id: "example-show-id") {
        ...ShowArtworksEmptyState_show
      }
    }
  `,
})

describe("ShowArtworksEmptyState", () => {
  describe("fair booth", () => {
    it("renders the correct message for non-closed fair booths", () => {
      const wrapper = getWrapper({ Show: () => ({ isFairBooth: true }) })
      const html = wrapper.html()

      expect(html).toContain(
        "This fair booth is currently unavailable. Please check back closer to the fair for artworks."
      )
    })

    it("renders the correct message for closed fair booths", () => {
      const wrapper = getWrapper({
        Show: () => ({ isFairBooth: true, status: "closed" }),
      })
      const html = wrapper.html()

      expect(html).toContain("This fair booth is currently unavailable.")
      expect(html).not.toContain(
        "Please check back closer to the fair for artworks."
      )
    })
  })

  describe("show", () => {
    it("renders the correct message for non-closed shows", () => {
      const wrapper = getWrapper({ Show: () => ({ isFairBooth: false }) })
      const html = wrapper.html()

      expect(html).toContain(
        "This show is currently unavailable. Please check back closer to the show for artworks."
      )
    })

    it("renders the correct message for closed shows", () => {
      const wrapper = getWrapper({
        Show: () => ({ isFairBooth: false, status: "closed" }),
      })
      const html = wrapper.html()

      expect(html).toContain("This show is currently unavailable.")
      expect(html).not.toContain(
        "Please check back closer to the show for artworks."
      )
    })
  })
})
