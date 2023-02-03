import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2AllRoute_me$data } from "__generated__/CollectorProfileSaves2AllRoute_me.graphql"
import { TopContextBar } from "Components/TopContextBar"

interface CollectorProfileSaves2AllRouteProps {
  me: CollectorProfileSaves2AllRoute_me$data
}

const CollectorProfileSaves2AllRoute: FC<CollectorProfileSaves2AllRouteProps> = ({
  me,
}) => {
  const nodes = extractNodes(me.collectionsConnection)

  return (
    <>
      <TopContextBar
        href="/collector-profile/saves2"
        displayBackArrow
        hideSeparator
      >
        Back to the list of collections
      </TopContextBar>

      <Spacer y={4} />

      <GridColumns>
        {nodes.map(node => (
          <Column span={3}>
            <RouterLink
              to={`/collector-profile/saves2/${node.internalID}`}
              textDecoration="none"
            >
              <Box
                p={1}
                border="1px solid"
                borderColor="black15"
                textAlign="center"
                bg="black5"
              >
                <Text>{node.name}</Text>
              </Box>
            </RouterLink>
          </Column>
        ))}
      </GridColumns>
    </>
  )
}

export const CollectorProfileSaves2AllRouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2AllRoute,
  {
    me: graphql`
      fragment CollectorProfileSaves2AllRoute_me on Me {
        collectionsConnection(first: 30) {
          edges {
            node {
              internalID
              name
            }
          }
        }
      }
    `,
  }
)
