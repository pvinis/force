import { Button, Flex, Separator, Spinner, Text } from "@artsy/palette"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { NotificationsList_viewer } from "__generated__/NotificationsList_viewer.graphql"
import {
  NotificationsListQuery,
  NotificationTypesEnum,
} from "__generated__/NotificationsListQuery.graphql"
import { NotificationItemFragmentContainer } from "Components/Notifications/NotificationItem"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Fragment, useContext, useState } from "react"
import { SystemContext } from "System"
import { NotificationsListScrollSentinel } from "./NotificationsListScrollSentinel"
import { NotificationPaginationType, NotificationType } from "./types"
import { NotificationsEmptyStateByType } from "./NotificationsEmptyStateByType"

interface NotificationsListQueryRendererProps {
  type: NotificationType
  paginationType?: NotificationPaginationType
}

interface NotificationsListProps extends NotificationsListQueryRendererProps {
  viewer: NotificationsList_viewer
  relay: RelayPaginationProp
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  viewer,
  relay,
  type,
  paginationType = "showMoreButton",
}) => {
  const [loading, setLoading] = useState(false)
  const [showMoreWasPressed, setShowMoreWasPressed] = useState(false)
  const nodes = extractNodes(viewer.notifications)

  const handleLoadNext = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setLoading(true)
    setShowMoreWasPressed(true)

    relay.loadMore(10, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  const renderFooter = () => {
    if (relay.isLoading() || loading) {
      return <Spinner />
    }

    if (paginationType === "infinite" || showMoreWasPressed) {
      return <NotificationsListScrollSentinel onNext={handleLoadNext} />
    }

    return (
      <Button onClick={handleLoadNext} size="small" variant="secondaryBlack">
        Show More
      </Button>
    )
  }

  if (nodes.length === 0) {
    return <NotificationsEmptyStateByType type={type} />
  }

  return (
    <>
      {nodes.map(node => (
        <Fragment key={node.internalID}>
          <NotificationItemFragmentContainer item={node} />
          <Separator />
        </Fragment>
      ))}

      {relay.hasMore() && (
        <Flex
          my={2}
          height={40}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {renderFooter()}
        </Flex>
      )}
    </>
  )
}

const NOTIFICATIONS_NEXT_QUERY = graphql`
  query NotificationsListNextQuery(
    $count: Int!
    $cursor: String
    $types: [NotificationTypesEnum]
  ) {
    viewer {
      ...NotificationsList_viewer
        @arguments(count: $count, cursor: $cursor, types: $types)
    }
  }
`

export const NotificationsListFragmentContainer = createPaginationContainer(
  NotificationsList,
  {
    viewer: graphql`
      fragment NotificationsList_viewer on Viewer
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 10 }
          cursor: { type: "String" }
          types: { type: "[NotificationTypesEnum]" }
        ) {
        notifications: notificationsConnection(
          first: $count
          after: $cursor
          notificationTypes: $types
        ) @connection(key: "NotificationsList_notifications", filters: []) {
          edges {
            node {
              internalID
              ...NotificationItem_item
            }
          }
        }
      }
    `,
  },
  {
    query: NOTIFICATIONS_NEXT_QUERY,
    getConnectionFromProps(props) {
      return props.viewer.notifications
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }, fragmentVariables) {
      return {
        ...fragmentVariables,
        count,
        cursor,
      }
    },
  }
)

export const NotificationsListQueryRenderer: React.FC<NotificationsListQueryRendererProps> = ({
  type,
  paginationType,
}) => {
  const { relayEnvironment } = useContext(SystemContext)
  const types = getNotificationTypes(type)

  return (
    <SystemQueryRenderer<NotificationsListQuery>
      environment={relayEnvironment}
      query={graphql`
        query NotificationsListQuery($types: [NotificationTypesEnum]) {
          viewer {
            ...NotificationsList_viewer @arguments(types: $types)
          }
        }
      `}
      variables={{
        types,
      }}
      render={({ error, props }) => {
        if (error) {
          return (
            <Flex justifyContent="center">
              <Text variant="xs" color="red100">
                {error.message}
              </Text>
            </Flex>
          )
        }

        // TODO: Style loading state
        if (!props || !props.viewer) {
          return (
            <Flex justifyContent="center" my={2}>
              <Text variant="xs">Loading</Text>
            </Flex>
          )
        }

        return (
          <NotificationsListFragmentContainer
            viewer={props.viewer}
            paginationType={paginationType}
            type={type}
          />
        )
      }}
    />
  )
}

const getNotificationTypes = (
  type: NotificationType
): NotificationTypesEnum[] | undefined => {
  if (type === "alerts") {
    return ["ARTWORK_ALERT"]
  }

  return []
}
