import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavesArtworksGrid_artworks$data } from "__generated__/SavesArtworksGrid_artworks.graphql"
import { SavesArtworksGrid_collection$data } from "__generated__/SavesArtworksGrid_collection.graphql"
import { useTracking } from "react-tracking"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import {
  ContextModule,
  ClickedChangePage,
  ActionType,
  commercialFilterParamsChanged,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC, useState } from "react"
import { SavesArtworksGridHeader } from "./SavesArtworksGridHeader"
import { Spacer } from "@artsy/palette"
import useDeepCompareEffect from "use-deep-compare-effect"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { isEqual } from "lodash"
import { Jump } from "Utils/Hooks/useJump"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { SavesEmptyStateFragmentContainer } from "./SavesEmptyState"
import { SavesArtworkGridFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworkGrid"

interface SavesArtworksGridProps {
  artworks: SavesArtworksGrid_artworks$data
  collection: SavesArtworksGrid_collection$data
  collectionID: string
  relayRefetch: RelayRefetchProp["refetch"]
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const SavesArtworksGrid: FC<SavesArtworksGridProps> = ({
  artworks,
  collection,
  relayRefetch,
}) => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()
  const filters = context.filters ?? {}
  const [fetching, setFetching] = useState(false)
  const previousFilters = usePrevious(filters)

  const {
    pageCursors,
    pageInfo: { hasNextPage },
  } = artworks

  /**
   * Load next page of artworks
   */
  const loadNext = () => {
    if (hasNextPage) {
      const prevPage = context?.filters?.page ?? 0
      loadPage(prevPage + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  const loadPage = (page: number) => {
    context.setFilter("page", page)
  }

  const fetchResults = () => {
    setFetching(true)

    const relayParams = {
      after: artworks.pageInfo.endCursor,
    }

    relayRefetch(relayParams, null, error => {
      if (error) {
        console.error(error)
      }

      setFetching(false)
    })
  }

  const trackAnalytics = (changedFilterKey: string) => {
    if (changedFilterKey === "page") {
      const prevFilterValue = previousFilters[changedFilterKey]
      const currentFilterValue = filters[changedFilterKey]

      const pageTrackingParams: ClickedChangePage = {
        action: ActionType.clickedChangePage,
        context_module: ContextModule.artworkGrid,
        context_page_owner_type: contextPageOwnerType!,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        page_current: prevFilterValue!,
        page_changed: currentFilterValue!,
      }

      trackEvent(pageTrackingParams)
      return
    }

    const onlyAllowedFilters = allowedFilters(filters)
    const event = commercialFilterParamsChanged({
      changed: JSON.stringify({
        [changedFilterKey]: filters[changedFilterKey],
      }),
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType!,
      current: JSON.stringify(onlyAllowedFilters),
    })

    trackEvent(event)
  }

  useDeepCompareEffect(() => {
    const changedFilterEntity = Object.entries(filters).find(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        const isChanged = !isEqual(currentFilter, previousFilter)

        return isChanged
      }
    )
    const filtersHaveUpdated = !!changedFilterEntity

    if (filtersHaveUpdated) {
      const [filterKey] = changedFilterEntity

      // we currently support only `page` filter in relay query
      if (filterKey === "page") {
        fetchResults()
      }

      trackAnalytics(filterKey)
    }
  }, [context.filters])

  if (artworks.edges?.length === 0) {
    return <SavesEmptyStateFragmentContainer collection={collection} />
  }

  return (
    <>
      <Jump id="artworksGrid" />

      <SavesArtworksGridHeader />

      <Spacer y={2} />

      <LoadingArea isLoading={fetching}>
        <SavesArtworkGridFragmentContainer artworks={artworks} />

        <Pagination
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="artworksGrid"
        />
      </LoadingArea>
    </>
  )
}

export const SavesArtworksGridFragmentContainer = createFragmentContainer(
  SavesArtworksGrid,
  {
    artworks: graphql`
      fragment SavesArtworksGrid_artworks on ArtworkConnection {
        pageInfo {
          hasNextPage
          endCursor
        }
        pageCursors {
          ...Pagination_pageCursors
        }
        edges {
          node {
            id
          }
        }
        ...SavesArtworkGrid_artworks
      }
    `,
    collection: graphql`
      fragment SavesArtworksGrid_collection on Collection {
        ...SavesEmptyState_collection
      }
    `,
  }
)
