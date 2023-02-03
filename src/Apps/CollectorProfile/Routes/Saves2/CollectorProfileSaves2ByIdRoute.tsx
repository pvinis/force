import { Flex, Join, MoreIcon, Spacer, Text } from "@artsy/palette"
import { SavesArtworksRefetchContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworks"
import { TopContextBar } from "Components/TopContextBar"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectorProfileSaves2ByIdRoute_me$data } from "__generated__/CollectorProfileSaves2ByIdRoute_me.graphql"

interface CollectorProfileSaves2ByIdRouteProps {
  me: CollectorProfileSaves2ByIdRoute_me$data
}

const CollectorProfileSaves2ByIdRoute: FC<CollectorProfileSaves2ByIdRouteProps> = ({
  me,
}) => {
  const collection = me.collection

  if (!collection) {
    return null
  }

  return (
    <>
      <TopContextBar
        href="/collector-profile/saves2/all"
        displayBackArrow
        hideSeparator
      >
        Back to collections
      </TopContextBar>

      <Spacer y={4} />

      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Join separator={<Spacer x={2} />}>
          <Text variant="lg-display">{collection.name}</Text>
          {!collection.default && <MoreIcon width="24px" height="24px" />}
        </Join>
      </Flex>

      <Spacer y={4} />

      <SavesArtworksRefetchContainer collection={collection} />
    </>
  )
}

export const CollectorProfileSaves2ByIdRouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2ByIdRoute,
  {
    me: graphql`
      fragment CollectorProfileSaves2ByIdRoute_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        collection(id: $id) {
          name
          default
          ...SavesArtworks_collection
        }
      }
    `,
  }
)
