import loadable from "@loadable/component"
import { AppRouteConfig } from "v2/System/Router/Route"
import { graphql } from "react-relay"

const ExampleApp = loadable(
  () => import(/* webpackChunkName: "exampleBundle" */ "./ExampleApp"),
  {
    resolveComponent: component => component.ExampleAppFragmentContainer,
  }
)
const ArtistRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Artist/ExampleArtistRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtistRouteFragmentContainer,
  }
)
const ArtworkRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Artwork/ExampleArtworkRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtworkRouteFragmentContainer,
  }
)
const ArtworkFilterRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/ArtworkFilter/ExampleArtworkFilterRoute"
    ),
  {
    resolveComponent: component =>
      component.ExampleArtworkFilterFragmentContainer,
  }
)
const WelcomeRoute = loadable(
  () =>
    import(
      /* webpackChunkName: "exampleBundle" */ "./Routes/Welcome/WelcomeRoute"
    ),
  {
    resolveComponent: component => component.WelcomeRoute,
  }
)

export const exampleRoutes: AppRouteConfig[] = [
  {
    path: "/example",

    // FIXME: V2 theme is deprecated. Still need to refactor example app to use latest
    theme: "v2",
    getComponent: () => ExampleApp,
    onClientSideRender: () => {
      ExampleApp.preload()
    },
    // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
    query: graphql`
      query exampleRoutes_ExampleQuery {
        system {
          ...ExampleApp_system
        }
      }
    `,
    children: [
      {
        path: "",
        theme: "v2",
        Component: WelcomeRoute,
      },
      {
        path: "artist/:slug",
        theme: "v2",
        getComponent: () => ArtistRoute,
        onClientSideRender: () => {
          ArtistRoute.preload()
        },
        // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
        query: graphql`
          query exampleRoutes_ArtistQuery($slug: String!) {
            artist(id: $slug) @principalField {
              id
              ...ExampleArtistRoute_artist
            }
          }
        `,
      },
      {
        path: "artwork/:slug",
        theme: "v2",
        getComponent: () => ArtworkRoute,
        onClientSideRender: () => {
          ArtworkRoute.preload()
        },
        // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
        query: graphql`
          query exampleRoutes_ArtworkQuery($slug: String!) {
            artwork(id: $slug) {
              id
              ...ExampleArtworkRoute_artwork
            }
          }
        `,
      },
      {
        path: "artwork-filter/:slug",
        theme: "v2",
        getComponent: () => ArtworkFilterRoute,
        onClientSideRender: () => {
          ArtworkRoute.preload()
        },
        // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
        query: graphql`
          query exampleRoutes_TagQuery(
            $slug: String!
            $input: FilterArtworksInput
          ) {
            tag(id: $slug) @principalField {
              ...ExampleArtworkFilterRoute_tag @arguments(input: $input)
            }
          }
        `,
      },
    ],
  },
]
