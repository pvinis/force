import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
  Image,
  ResponsiveBox,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"
import { RouterLink } from "v2/System/Router/RouterLink"
import { PartnerCell_partner } from "v2/__generated__/PartnerCell_partner.graphql"
import { DEFAULT_CELL_WIDTH } from "./constants"
import { PartnerEntityHeaderFragmentContainer } from "../EntityHeaders/PartnerEntityHeader"

interface PartnerCellProps {
  partner: PartnerCell_partner
  /** Defaults to `"RAIL"` */
  mode?: "GRID" | "RAIL"
}

const PartnerCell: React.FC<PartnerCellProps> = ({
  partner,
  mode = "RAIL",
}) => {
  const { trackEvent } = useTracking()

  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH
  const image = partner.profile?.image?.cropped

  if (!partner.profile) {
    return null
  }

  return (
    <RouterLink
      to={`${partner.href}`}
      display="block"
      textDecoration="none"
      width={width}
      onClick={() => {
        const trackingEvent: ClickedGalleryGroup = {
          action: ActionType.clickedGalleryGroup,
          context_module: ContextModule.featuredGalleriesRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_id: partner.internalID,
          destination_page_owner_slug: partner.slug,
          destination_page_owner_type: OwnerType.galleries,
          type: "thumbnail",
        }

        trackEvent(trackingEvent)
      }}
    >
      <PartnerEntityHeaderFragmentContainer
        partner={partner}
        displayAvatar={false}
        displayLink={false}
        alignItems="flex-end"
        mb={1}
      />

      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        {image?.src ? (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width="100%"
            height="100%"
            alt=""
            lazyLoad
            style={{ display: "block" }}
          />
        ) : (
          <Text
            variant="lg"
            bg="black10"
            width="100%"
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {partner.initials}
          </Text>
        )}
      </ResponsiveBox>
    </RouterLink>
  )
}

type PartnerCellPlaceholderProps = Pick<PartnerCellProps, "mode">

export const PartnerCellPlaceholder: React.FC<PartnerCellPlaceholderProps> = ({
  mode = "RAIL",
}) => {
  const width = mode === "GRID" ? "100%" : DEFAULT_CELL_WIDTH

  return (
    <Box width={width}>
      <SkeletonText variant="lg">Example Gallery</SkeletonText>

      <SkeletonText variant="md" mb={1}>
        Location
      </SkeletonText>

      <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
        <SkeletonBox width="100%" height="100%" />
      </ResponsiveBox>
    </Box>
  )
}

export const PartnerCellFragmentContainer = createFragmentContainer(
  PartnerCell,
  {
    partner: graphql`
      fragment PartnerCell_partner on Partner {
        ...PartnerEntityHeader_partner
        internalID
        slug
        name
        href
        initials
        locationsConnection(first: 15) {
          edges {
            node {
              city
            }
          }
        }
        categories {
          name
          slug
        }
        profile {
          ...FollowProfileButton_profile
          isFollowed
          image {
            cropped(
              width: 445
              height: 334
              version: ["wide", "large", "featured", "larger"]
            ) {
              src
              srcSet
            }
          }
        }
      }
    `,
  }
)
