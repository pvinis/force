import { AuthContextModule } from "@artsy/cohesion"
import { useManageArtworkForCollectionsContext } from "Components/Artwork/ManageArtworkForCollections"
import { SaveButtonBase } from "Components/Artwork/SaveButton/SaveButton"
import { useSaveArtwork } from "Components/Artwork/SaveButton/useSaveArtwork"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { SaveArtworkToCollectionsButton_artwork$data } from "__generated__/SaveArtworkToCollectionsButton_artwork.graphql"

interface SaveArtworkToCollectionsButtonProps {
  artwork: SaveArtworkToCollectionsButton_artwork$data
  contextModule: AuthContextModule
}

const SaveArtworkToCollectionsButton: FC<SaveArtworkToCollectionsButtonProps> = ({
  artwork,
  contextModule,
}) => {
  const tracking = useTracking()
  const {
    setArtworkId,
    savedListId,
    isSavedToList,
  } = useManageArtworkForCollectionsContext()

  const isSaved = !!artwork.is_saved

  const { handleSave } = useSaveArtwork({
    isSaved,
    artwork,
    contextModule,
    onSave: ({ action, artwork }) => {
      tracking.trackEvent({
        action,
        entity_slug: artwork.slug,
        entity_id: artwork.internalID,
      })
    },
  })

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    if (savedListId) {
      setArtworkId(artwork.internalID)
      return
    }

    handleSave()
  }

  return (
    <SaveButtonBase
      isSaved={savedListId ? isSavedToList : isSaved}
      onClick={handleClick}
    />
  )
}

export const SaveArtworkToCollectionsButtonFragmentContainer = createFragmentContainer(
  SaveArtworkToCollectionsButton,
  {
    artwork: graphql`
      fragment SaveArtworkToCollectionsButton_artwork on Artwork {
        id
        internalID
        is_saved: isSaved
        slug
      }
    `,
  }
)
