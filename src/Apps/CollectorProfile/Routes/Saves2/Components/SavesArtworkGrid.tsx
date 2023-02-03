import { createFragmentContainer, graphql } from "react-relay"
import { SavesArtworkGrid_artworks$data } from "__generated__/SavesArtworkGrid_artworks.graphql"
import { useTracking } from "react-tracking"
import ArtworkGrid from "Components/ArtworkGrid"
import { ContextModule, clickedMainArtworkGrid } from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC } from "react"

interface SavesArtworkGridProps {
  artworks: SavesArtworkGrid_artworks$data
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const SavesArtworkGrid: FC<SavesArtworkGridProps> = ({ artworks }) => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()

  return (
    <ArtworkGrid
      artworks={artworks}
      columnCount={[2, 2, 2, 3]}
      contextModule={ContextModule.artworkGrid}
      itemMargin={40}
      emptyStateComponent={null}
      onBrickClick={(artwork, artworkIndex) => {
        // TODO: Clarify moments about analytics
        trackEvent(
          clickedMainArtworkGrid({
            contextPageOwnerType: contextPageOwnerType!,
            contextPageOwnerSlug,
            contextPageOwnerId,
            destinationPageOwnerId: artwork.internalID,
            destinationPageOwnerSlug: artwork.slug,
            position: artworkIndex,
            sort: context?.filters?.sort,
          })
        )
      }}
    />
  )
}

export const SavesArtworkGridFragmentContainer = createFragmentContainer(
  SavesArtworkGrid,
  {
    artworks: graphql`
      fragment SavesArtworkGrid_artworks on ArtworkConnection {
        ...ArtworkGrid_artworks
      }
    `,
  }
)
