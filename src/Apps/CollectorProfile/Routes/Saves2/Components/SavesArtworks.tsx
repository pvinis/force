import { SavesArtworksGridFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworksGrid"
import {
  ArtworkFilterContextProvider,
  Counts,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { SortOptions } from "Components/SortFilter"
import { FC } from "react"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { SavesArtworks_collection$data } from "__generated__/SavesArtworks_collection.graphql"

interface SavesArtworksProps {
  collection: SavesArtworks_collection$data
  relay: RelayRefetchProp
}

const SavesArtworks: FC<SavesArtworksProps> = ({ collection, relay }) => {
  const { match } = useRouter()

  // TODO: Update sort options
  const sortOptions: SortOptions = [
    { value: "updated_at", text: "Recently Saved" },
    { value: "created_at", text: "Oldest First" },
  ]
  const defaultSort = sortOptions[0].value

  const counts: Counts = {
    artworks: collection?.artworks?.totalCount ?? 0,
  }

  return (
    <ArtworkFilterContextProvider
      filters={match.location.query}
      counts={counts}
      sortOptions={sortOptions}
      onChange={state => {
        updateUrl(state, {
          defaultValues: {
            sort: defaultSort,
          },
        })
      }}
    >
      <SavesArtworksGridFragmentContainer
        artworks={collection.artworks!}
        collection={collection}
        collectionID={collection.internalID}
        relayRefetch={relay.refetch}
      />
    </ArtworkFilterContextProvider>
  )
}

const QUERY = graphql`
  query SavesArtworksQuery($id: String!, $after: String) {
    me {
      collection(id: $id) {
        ...SavesArtworks_collection @arguments(after: $after)
      }
    }
  }
`

export const SavesArtworksRefetchContainer = createRefetchContainer(
  SavesArtworks,
  {
    collection: graphql`
      fragment SavesArtworks_collection on Collection
        @argumentDefinitions(after: { type: "String" }) {
        internalID
        artworks: artworksConnection(first: 30, after: $after) {
          totalCount
          ...SavesArtworksGrid_artworks
        }
        ...SavesArtworksGrid_collection
      }
    `,
  },
  QUERY
)
