import {
  Box,
  Button,
  Flex,
  HelpIcon,
  Link,
  Select,
  Separator,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkSidebarBidAction_artwork } from "v2/__generated__/ArtworkSidebarBidAction_artwork.graphql"
import { ArtworkSidebarBidAction_me } from "v2/__generated__/ArtworkSidebarBidAction_me.graphql"
import * as Schema from "v2/System/Analytics/Schema"
import track from "react-tracking"
import { getENV } from "v2/Utils/getENV"
import { bidderQualifications } from "v2/Utils/identityVerificationRequirements"
import { compact } from "lodash"

export interface ArtworkSidebarBidActionProps {
  artwork: ArtworkSidebarBidAction_artwork
  me: ArtworkSidebarBidAction_me
}

export interface ArtworkSidebarBidActionState {
  selectedMaxBidCents?: number
}

const RegisterToBidButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <Button width="100%" size="medium" mt={1} onClick={onClick} data-test="bid">
      Register to bid
    </Button>
  )
}

const VerifyIdentityButton: React.FC<{ id: string }> = ({ id }) => (
  <a href={`/identity-verification/${id}`}>
    <Button width="100%" size="medium">
      Verify identity
    </Button>
  </a>
)

const IdentityVerificationDisclaimer: React.FC = () => {
  return (
    <Text variant="md" color="black60" textAlign="center">
      Identity verification required to bid.{" "}
      <Link href="/identity-verification-faq">FAQ</Link>
    </Text>
  )
}

@track()
export class ArtworkSidebarBidAction extends React.Component<
  ArtworkSidebarBidActionProps,
  ArtworkSidebarBidActionState
> {
  state: ArtworkSidebarBidActionState = {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    selectedMaxBidCents: null,
  }

  setMaxBid = (newVal: string) => {
    this.setState({ selectedMaxBidCents: parseInt(newVal, 10) })
  }

  redirectToRegister = () => {
    const { sale } = this.props.artwork
    const href = `/auction-registration/${sale?.slug}`
    window.location.href = href
  }

  @track((props: ArtworkSidebarBidActionProps) => ({
    artwork_slug: props.artwork.slug,
    products: [
      {
        product_id: props.artwork.internalID,
        quantity: 1,
        price:
          props.artwork.myLotStanding &&
          props.artwork.myLotStanding[0] &&
          (props.artwork.myLotStanding[0].most_recent_bid?.max_bid?.cents ??
            0) / 100,
      },
    ],
    auction_slug: props.artwork.sale?.slug,
    context_page: Schema.PageName.ArtworkPage,
    action_type: Schema.ActionType.ClickedBid,
  }))
  redirectToBid(firstIncrement: number) {
    const { slug, sale } = this.props.artwork
    const bid = this.state.selectedMaxBidCents || firstIncrement
    const href = `/auction/${sale?.slug}/bid/${slug}?bid=${bid}`
    window.location.href = href
  }

  @track({
    type: Schema.Type.Button,
    flow: Schema.Flow.Auctions,
    subject: Schema.Subject.EnterLiveAuction,
    context_module: Schema.ContextModule.Sidebar,
    action_type: Schema.ActionType.Click,
  })
  redirectToLiveBidding(me: ArtworkSidebarBidAction_me | null) {
    const slug = this.props.artwork.sale?.slug
    const liveUrl = `${getENV("PREDICTION_URL")}/${slug}`
    if (me) {
      window.location.href = `${liveUrl}/login`
    } else {
      window.location.href = liveUrl
    }
  }

  render() {
    const {
      artwork,
      artwork: { sale },
      me,
    } = this.props

    if (!sale || sale.is_closed) return null

    /**
     * NOTE: This is making an incorrect assumption that there could only ever
     * be 1 live sale with this work. When we run into that case, there is
     * likely design work to be done too, so we can adjust this then.
     */
    const myLotStanding = artwork.myLotStanding && artwork.myLotStanding[0]
    const hasMyBids = !!(myLotStanding && myLotStanding.most_recent_bid)

    const {
      registrationAttempted,
      qualifiedForBidding,
      userLacksIdentityVerification,
      pendingIdentityVerification,
      shouldPromptIdVerification,
    } = bidderQualifications(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      sale,
      me,
      sale.registrationStatus && {
        qualifiedForBidding: sale.registrationStatus.qualified_for_bidding,
      }
    )

    if (sale.is_preview) {
      let PreviewAction: React.FC

      if (registrationAttempted) {
        if (qualifiedForBidding) {
          PreviewAction = () => (
            <Button width="100%" size="medium" mt={1} disabled>
              Registration complete
            </Button>
          )
        } else if (shouldPromptIdVerification) {
          PreviewAction = () => (
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            <VerifyIdentityButton id={pendingIdentityVerification.internalID} />
          )
        } else {
          PreviewAction = () => (
            <Button width="100%" size="medium" mt={1} disabled>
              Registration pending
            </Button>
          )
        }
      } else {
        PreviewAction = () => (
          <RegisterToBidButton onClick={this.redirectToRegister} />
        )
      }
      return (
        <>
          <PreviewAction />

          <Spacer mt={1} />

          {userLacksIdentityVerification && <IdentityVerificationDisclaimer />}
        </>
      )
    }

    if (sale.is_live_open) {
      const notApprovedBidderBeforeRegistrationClosed: boolean =
        !!sale.is_registration_closed && !qualifiedForBidding

      if (notApprovedBidderBeforeRegistrationClosed) {
        return (
          <>
            <Text variant="xs" color="black60" pb={1} textAlign="center">
              Registration closed
            </Text>

            <Button
              width="100%"
              size="medium"
              onClick={() => this.redirectToLiveBidding(me)}
            >
              Watch live bidding
            </Button>
          </>
        )
      } else {
        return (
          <>
            <Button
              width="100%"
              size="medium"
              onClick={() => this.redirectToLiveBidding(me)}
            >
              Enter live bidding
            </Button>

            <Spacer mt={1} />

            {userLacksIdentityVerification && (
              <IdentityVerificationDisclaimer />
            )}
          </>
        )
      }
    }

    if (sale.is_open) {
      if (registrationAttempted && !qualifiedForBidding) {
        return (
          <>
            {shouldPromptIdVerification ? (
              <VerifyIdentityButton
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                id={pendingIdentityVerification.internalID}
              />
            ) : (
              <Button width="100%" size="medium" disabled>
                Registration pending
              </Button>
            )}

            <Spacer mt={1} />

            {userLacksIdentityVerification && (
              <IdentityVerificationDisclaimer />
            )}
          </>
        )
      }

      if (sale.is_registration_closed && !qualifiedForBidding) {
        return (
          <Button width="100%" size="medium" disabled>
            Registration closed
          </Button>
        )
      }

      const myLastMaxBid =
        hasMyBids && myLotStanding?.most_recent_bid?.max_bid?.cents

      const increments = compact(
        artwork.sale_artwork?.increments?.filter(
          increment => (increment?.cents ?? 0) > (myLastMaxBid || 0)
        )
      )

      const firstIncrement = increments[0]

      const selectOptions = increments.map(increment => ({
        value: increment.cents?.toString(),
        text: increment.display,
      }))

      if (!qualifiedForBidding && userLacksIdentityVerification) {
        return (
          <>
            <RegisterToBidButton onClick={this.redirectToRegister} />

            <Spacer mt={1} />

            <IdentityVerificationDisclaimer />
          </>
        )
      } else {
        return (
          <>
            <Separator my={2} />

            <Flex width="100%" flexDirection="row" alignItems="center">
              <Text variant="md" color="black100" mr={1}>
                Place max bid
              </Text>

              <Tooltip
                content="Set the maximum amount you would like Artsy to bid up to on your behalf"
                placement="top"
              >
                <Box
                  style={{
                    // Vertically center
                    lineHeight: 0,
                  }}
                >
                  <HelpIcon aria-hidden title="" />
                </Box>
              </Tooltip>
            </Flex>

            <Spacer mt={1} />

            <Select
              variant="default"
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              options={selectOptions}
              onSelect={this.setMaxBid}
            />

            <Spacer mt={1} />

            <Button
              width="100%"
              size="medium"
              data-test="bid"
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              onClick={() => this.redirectToBid(firstIncrement.cents)}
            >
              {hasMyBids ? "Increase max bid" : "Bid"}
            </Button>
          </>
        )
      }
    }
  }
}

export const ArtworkSidebarBidActionFragmentContainer = createFragmentContainer(
  (props: ArtworkSidebarBidActionProps) => {
    return <ArtworkSidebarBidAction {...props} />
  },
  {
    // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
    artwork: graphql`
      fragment ArtworkSidebarBidAction_artwork on Artwork {
        myLotStanding(live: true) {
          most_recent_bid: mostRecentBid {
            max_bid: maxBid {
              cents
            }
          }
        }
        slug
        internalID
        sale {
          slug
          registrationStatus {
            qualified_for_bidding: qualifiedForBidding
          }
          is_preview: isPreview
          is_open: isOpen
          is_live_open: isLiveOpen
          is_closed: isClosed
          is_registration_closed: isRegistrationClosed
          requireIdentityVerification
        }
        sale_artwork: saleArtwork {
          increments {
            cents
            display
          }
        }
      }
    `,
    // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
    me: graphql`
      fragment ArtworkSidebarBidAction_me on Me {
        identityVerified
        pendingIdentityVerification {
          internalID
        }
      }
    `,
  }
)
