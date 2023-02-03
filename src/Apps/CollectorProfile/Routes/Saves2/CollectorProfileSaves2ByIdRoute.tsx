import { Box, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectorProfileSaves2ByIdRoute_me$data } from "__generated__/CollectorProfileSaves2ByIdRoute_me.graphql"

interface CollectorProfileSaves2ByIdRouteProps {
  me: CollectorProfileSaves2ByIdRoute_me$data
}

const CollectorProfileSaves2ByIdRoute: FC<CollectorProfileSaves2ByIdRouteProps> = ({
  me,
}) => {
  return (
    <Box>
      <Text>{me.collection?.internalID}</Text>
    </Box>
  )
}

export const CollectorProfileSaves2ByIdRouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2ByIdRoute,
  {
    me: graphql`
      fragment CollectorProfileSaves2ByIdRoute_me on Me
        @argumentDefinitions(id: { type: "String!" }) {
        collection(id: $id) {
          internalID
        }
      }
    `,
  }
)
