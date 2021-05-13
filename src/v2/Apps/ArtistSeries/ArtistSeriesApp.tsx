import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtistSeriesApp_artistSeries } from "v2/__generated__/ArtistSeriesApp_artistSeries.graphql"
import { ArtistSeriesHeaderFragmentContainer as ArtistSeriesHeader } from "./Components/ArtistSeriesHeader"
import { ArtistSeriesArtworksFilterRefetchContainer as ArtistSeriesArtworksFilter } from "./Components/ArtistSeriesArtworksFilter"
import { ArtistSeriesRailFragmentContainer as OtherArtistSeriesRail } from "v2/Components/ArtistSeriesRail/ArtistSeriesRail"
import { ArtistSeriesMetaFragmentContainer as ArtistSeriesMeta } from "./Components/ArtistSeriesMeta"
import { ContextModule } from "@artsy/cohesion"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import { SharedArtworkFilterContextProps } from "v2/Components/ArtworkFilter/ArtworkFilterContext"
import { Spacer } from "@artsy/palette"
import { ErrorPage } from "v2/Components/ErrorPage"

interface ArtistSeriesAppProps {
  artistSeries: ArtistSeriesApp_artistSeries
}

const ArtistSeriesApp: React.FC<ArtistSeriesAppProps> = ({ artistSeries }) => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  // The `@principalField` directive doesn't work on `artistSeries` due to stitching
  // Using `throw new HttpError(404)` fails in the acceptance tests.
  // Your guess is as good as mine.
  if (!artistSeries) {
    return <ErrorPage code={404} />
  }

  const { railArtist, internalID, sidebarAggregations } = artistSeries

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <>
        <ArtistSeriesMeta artistSeries={artistSeries} />

        <ArtistSeriesHeader artistSeries={artistSeries} />

        <Spacer mt={6} />

        <ArtistSeriesArtworksFilter
          artistSeries={artistSeries}
          aggregations={
            sidebarAggregations?.aggregations as SharedArtworkFilterContextProps["aggregations"]
          }
        />

        {(railArtist?.length ?? 0) > 0 && (
          <>
            <Spacer mt={6} />

            <OtherArtistSeriesRail
              artist={(railArtist ?? [])[0]!}
              title="Series by this artist"
              contextModule={ContextModule.moreSeriesByThisArtist}
            />
          </>
        )}
      </>
    </AnalyticsContext.Provider>
  )
}

export const ArtistSeriesAppFragmentContainer = createFragmentContainer(
  ArtistSeriesApp,
  {
    artistSeries: graphql`
      fragment ArtistSeriesApp_artistSeries on ArtistSeries
        @argumentDefinitions(
          input: { type: "FilterArtworksInput" }
          aggregations: { type: "[ArtworkAggregation]" }
        ) {
        ...ArtistSeriesMeta_artistSeries
        ...ArtistSeriesHeader_artistSeries
        railArtist: artists(size: 1) {
          ...ArtistSeriesRail_artist
        }
        internalID
        slug
        ...ArtistSeriesArtworksFilter_artistSeries @arguments(input: $input)
        sidebarAggregations: filterArtworksConnection(
          aggregations: $aggregations
          first: 1
        ) {
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
  }
)
