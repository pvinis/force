import * as React from "react"
import { SearchResultsArtworks_viewer$data } from "__generated__/SearchResultsArtworks_viewer.graphql"
import { ZeroState } from "Apps/Search/Components/ZeroState"
import { ArtworkFilter } from "Components/ArtworkFilter"
import { updateUrl } from "Components/ArtworkFilter/Utils/urlBuilder"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { ActiveFilterPills } from "Components/SavedSearchAlert/Components/ActiveFilterPills"
import { useSystemContext } from "System"

interface SearchResultsRouteProps {
  viewer: SearchResultsArtworks_viewer$data
}

export const SearchResultsArtworksRoute: React.FC<SearchResultsRouteProps> = props => {
  const { match } = useRouter()
  const { userPreferences } = useSystemContext()
  const { viewer } = props
  const { sidebar } = viewer

  return (
    <ArtworkFilter
      mt={4}
      viewer={viewer}
      filters={match.location.query}
      onChange={updateUrl}
      ZeroState={ZeroState}
      aggregations={
        sidebar?.aggregations as SharedArtworkFilterContextProps["aggregations"]
      }
      counts={sidebar?.counts as Counts}
      sortOptions={[
        { value: "-decayed_merch", text: "Default" },
        { value: "-has_price,-prices", text: "Price (desc.)" },
        { value: "-has_price,prices", text: "Price (asc.)" },
        { value: "-partner_updated_at", text: "Recently updated" },
        { value: "-published_at", text: "Recently added" },
        { value: "-year", text: "Artwork year (desc.)" },
        { value: "year", text: "Artwork year (asc.)" },
      ]}
      FilterPillsSection={<ActiveFilterPills />}
      userPreferredMetric={userPreferences?.metric}
    />
  )
}

export const SearchResultsArtworksRouteFragmentContainer = createFragmentContainer(
  SearchResultsArtworksRoute,
  {
    viewer: graphql`
      fragment SearchResultsArtworks_viewer on Viewer
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          sidebarInput: { type: "FilterArtworksInput" }
          shouldFetchCounts: { type: "Boolean!", defaultValue: false }
        ) {
        sidebar: artworksConnection(first: 1, input: $sidebarInput) {
          counts @include(if: $shouldFetchCounts) {
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
        ...ArtworkFilter_viewer @arguments(input: $input)
      }
    `,
  }
)
