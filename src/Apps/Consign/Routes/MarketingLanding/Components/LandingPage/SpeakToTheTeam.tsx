import { Button, Text, Image } from "@artsy/palette"
import { TextAndImageLayout } from "Apps/Consign/Routes/MarketingLanding/Components/LandingPage/TextAndImageLayout"
import { RouterLink } from "System/Router/RouterLink"
import { resized } from "Utils/resized"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useAnalyticsContext, useSystemContext } from "System"
import { useTracking } from "react-tracking"

export const SpeakToTheTeam: React.FC = () => {
  const { user } = useSystemContext()
  const { contextPageOwnerType } = useAnalyticsContext()
  const { trackEvent } = useTracking()
  const enableSWAInquiryFlow = useFeatureFlag("swa-inquiry-flow")

  const image = resized(
    "https://files.artsy.net/images/SWA-landing-FAQ-section-speak-to-the-team.jpg",
    { width: 949, height: 420 }
  )
  const getInTouchRoute = enableSWAInquiryFlow
    ? "/sell/inquiry"
    : "mailto:sell@artsy.net?subject=Inquiry about selling with Artsy"

  const trackGetInTouchClick = () => {
    trackEvent({
      action: "clickedGetInTouch",
      context_module: "SpeakToTheTeam",
      context_page_owner_type: contextPageOwnerType,
      label: "Get in Touch",
      user_id: user?.id,
      user_email: user?.email,
    })
  }

  return (
    <TextAndImageLayout
      text={
        <>
          <Text variant={["md", "xl", "xxl"]} textColor="white100">
            Interested in selling multiple artworks?
          </Text>
          <Text variant={["md", "xl", "xxl"]} mb={4} textColor="white100">
            Speak with our team.
          </Text>
        </>
      }
      button={
        <Button
          // @ts-ignore
          as={RouterLink}
          variant="primaryWhite"
          width="100%"
          to={getInTouchRoute}
          onClick={trackGetInTouchClick}
          data-testid="get-in-touch-button"
        >
          Get in Touch
        </Button>
      }
      image={
        <Image
          width="100%"
          height="100%"
          src={image.src}
          srcSet={image.srcSet}
          lazyLoad
          style={{ backgroundColor: "black" }}
          alt="Collage of five artworks on a black background"
        />
      }
    />
  )
}
