import { useRouter } from "found"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import {
  Aggregations,
  Counts,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { ArtistsFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/ArtistsFilter"
import { MediumFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/MediumFilter"
import { PriceRangeFilter } from "v2/Components/ArtworkFilter/ArtworkFilters/PriceRangeFilter"
import { AuctionArtworkFilter_viewer } from "v2/__generated__/AuctionArtworkFilter_viewer.graphql"

export const ARTWORK_FILTER_INPUT_ARGS = {
  aggregations: ["ARTIST", "MEDIUM", "FOLLOWED_ARTISTS", "TOTAL"],
  atAuction: true,
  first: 10,
}

interface AuctionArtworkFilterProps {
  relay: RelayRefetchProp
  viewer: AuctionArtworkFilter_viewer
}

const AuctionArtworkFilter: React.FC<AuctionArtworkFilterProps> = ({
  viewer,
}) => {
  const { match } = useRouter()

  const { aggregations, counts } = viewer.sidebarAggregations!

  return (
    <ArtworkFilter
      aggregations={aggregations as Aggregations}
      filters={match && match.location.query}
      counts={counts as Counts}
      relayRefetchInputVariables={{
        ...ARTWORK_FILTER_INPUT_ARGS,
        saleID: match.params.slug,
      }}
      sortOptions={[
        { text: "Lot Number (desc.)", value: "-sale_position" },
        { text: "Lot Number (asc.)", value: "sale_position" },
        { text: "Most Bids", value: "-bidder_positions_count" },
        { text: "Least Bids", value: "bidder_positions_count" },
        { text: "Price (desc.)", value: "-prices" },
        { text: "Price (asc.)", value: "prices" },
      ]}
      viewer={viewer}
      Filters={
        <>
          <ArtistsFilter expanded />
          <PriceRangeFilter expanded />
          <MediumFilter expanded />
        </>
      }
    />
  )
}

export const AuctionArtworkFilterRefetchContainer = createRefetchContainer(
  AuctionArtworkFilter,
  {
    viewer: graphql`
      fragment AuctionArtworkFilter_viewer on Viewer
        @argumentDefinitions(input: { type: "FilterArtworksInput" }) {
        ...ArtworkFilter_viewer @arguments(input: $input)

        sidebarAggregations: artworksConnection(input: $input, first: 1) {
          counts {
            followedArtists
          }
          aggregations {
            slice
            counts {
              name
              value
              count
            }
          }
        }
      }
    `,
  },
  graphql`
    query AuctionArtworkFilterQuery($input: FilterArtworksInput) {
      viewer {
        ...AuctionArtworkFilter_viewer @arguments(input: $input)
      }
    }
  `
)