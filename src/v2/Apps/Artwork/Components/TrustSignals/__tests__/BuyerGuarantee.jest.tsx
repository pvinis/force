import { graphql } from "react-relay"
import { BuyerGuaranteeFragmentContainer } from "../BuyerGuarantee"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-relay")

const { getWrapper } = setupTestWrapper({
  Component: BuyerGuaranteeFragmentContainer,
  // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
  query: graphql`
    query BuyerGuaranteeTestQuery {
      artwork(id: "whatevs") {
        ...BuyerGuarantee_artwork
      }
    }
  `,
})

describe("BuyerGuarantee", () => {
  it("Doesn't render when work is neither acquireable nor offerable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: false,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(0)
  })

  it("Renders when the artwork is acquireable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: true,
          is_offerable: false,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })

  it("Renders when the artwork is offerable", async () => {
    const component = getWrapper({
      Artwork: () => {
        return {
          is_acquireable: false,
          is_offerable: true,
        }
      },
    })
    expect(component.find("TrustSignal").length).toBe(1)
  })
})
