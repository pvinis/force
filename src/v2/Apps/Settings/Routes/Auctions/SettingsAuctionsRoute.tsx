import { Join, Spacer } from "@artsy/palette"
import React from "react"
import { SettingsAuctionsRoute_me } from "v2/__generated__/SettingsAuctionsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { UserActiveBidsFragmentContainer } from "./Components/UserActiveBids"
import { UserBidHistoryFragmentContainer } from "./Components/UserBidHistory"
import { UserRegistrationAuctionsFragmentContainer } from "./Components/UserRegistrationAuctions"

interface SettingsAuctionsRouteProps {
  me: SettingsAuctionsRoute_me
}

const SettingsAuctionsRoute: React.FC<SettingsAuctionsRouteProps> = ({
  me,
}) => {
  return (
    <Join
      separator={
        <Spacer mt={4} borderBottom="1px solid" borderColor="black10" />
      }
    >
      <UserActiveBidsFragmentContainer me={me} />
      <UserBidHistoryFragmentContainer me={me} />
      <UserRegistrationAuctionsFragmentContainer me={me} />
    </Join>
  )
}

export const SettingsAuctionsRouteFragmentContainer = createFragmentContainer(
  SettingsAuctionsRoute,
  {
    // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
    me: graphql`
      fragment SettingsAuctionsRoute_me on Me {
        ...UserActiveBids_me
        ...UserBidHistory_me
        ...UserRegistrationAuctions_me
      }
    `,
  }
)
