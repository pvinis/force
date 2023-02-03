import { Shelf, Spacer } from "@artsy/palette"
import { SavesArtworksQueryRenderer } from "./Components/SavesArtworks"
import { SavesItemFragmentContainer } from "./Components/SavesItem"
import { orderBy } from "lodash"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const nodes = extractNodes(me.collectionsConnection)
  // Placing the default collection at the top of the list
  let collections = orderBy(nodes, ["default"], ["desc"])
  const savedCollections = collections[selectedIndex]
  const selectedCollectionId = savedCollections.internalID

  return (
    <>
      <Shelf showProgress={false}>
        {collections.map((collection, index) => (
          <SavesItemFragmentContainer
            key={collection.internalID}
            item={collection}
            isSelected={collection.internalID === selectedCollectionId}
            imagesLayout={collection.default ? "grid" : "stacked"}
            onClick={() => setSelectedIndex(index)}
          />
        ))}
      </Shelf>

      <Spacer y={2} />

      <SavesArtworksQueryRenderer collectionID={selectedCollectionId} />
    </>
  )
}

export const CollectorProfileSaves2RouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2Route,
  {
    me: graphql`
      fragment CollectorProfileSaves2Route_me on Me {
        collectionsConnection(first: 20) {
          edges {
            node {
              internalID
              default
              ...SavesItem_item
            }
          }
        }
      }
    `,
  }
)
