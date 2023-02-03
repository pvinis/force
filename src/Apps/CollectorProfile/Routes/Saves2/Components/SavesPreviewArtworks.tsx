import { SavesPreviewArtworks_collection$data } from "__generated__/SavesPreviewArtworks_collection.graphql"
import { SavesPreviewArtworksQuery } from "__generated__/SavesPreviewArtworksQuery.graphql"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Button, Flex, Join, MoreIcon, Spacer, Text } from "@artsy/palette"
import { SavesArtworksGridPlaceholder } from "./SavesPlaceholders"
import { SavesArtworkGridFragmentContainer } from "./SavesArtworkGrid"
import { RouterLink } from "System/Router/RouterLink"
import { SavesEmptyStateFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesEmptyState"

interface SavesPreviewArtworksRendererProps {
  collectionID: string
}

interface SavesPreviewArtworksProps {
  collection: SavesPreviewArtworks_collection$data
}

const SavesPreviewArtworks: FC<SavesPreviewArtworksProps> = ({
  collection,
}) => {
  if (collection.artworks?.edges?.length === 0) {
    return <SavesEmptyStateFragmentContainer collection={collection} />
  }

  return (
    <>
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

      <SavesArtworkGridFragmentContainer artworks={collection.artworks!} />

      <Spacer y={4} />

      <Flex justifyContent="center">
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="secondaryBlack"
          to={`/collector-profile/saves2/${collection.internalID}`}
        >
          See all artworks
        </Button>
      </Flex>
    </>
  )
}

const QUERY = graphql`
  query SavesPreviewArtworksQuery($collectionID: String!) {
    me {
      collection(id: $collectionID) {
        ...SavesPreviewArtworks_collection
      }
    }
  }
`

const SavesPreviewArtworksFragmentContainer = createFragmentContainer(
  SavesPreviewArtworks,
  {
    collection: graphql`
      fragment SavesPreviewArtworks_collection on Collection {
        name
        default
        internalID
        artworks: artworksConnection(first: 10) {
          edges {
            node {
              internalID
            }
          }
          ...SavesArtworkGrid_artworks
        }
        ...SavesArtworksGrid_collection
        ...SavesEmptyState_collection
      }
    `,
  }
)

export const SavesPreviewArtworksRenderer: FC<SavesPreviewArtworksRendererProps> = ({
  collectionID,
}) => {
  return (
    <SystemQueryRenderer<SavesPreviewArtworksQuery>
      placeholder={<SavesArtworksGridPlaceholder />}
      query={QUERY}
      variables={{
        collectionID,
      }}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.me?.collection) {
          return <SavesArtworksGridPlaceholder />
        }

        return (
          <SavesPreviewArtworksFragmentContainer
            collection={props.me.collection}
          />
        )
      }}
    />
  )
}
