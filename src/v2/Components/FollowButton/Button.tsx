import { Box, Button, ButtonProps } from "@artsy/palette"
import { useState } from "react"
import * as React from "react"

interface FollowButtonProps {
  isFollowed?: boolean
  buttonProps?: Omit<Partial<ButtonProps>, "variant">
  handleFollow?: React.MouseEventHandler<HTMLButtonElement>
}

export const FollowButton: React.ForwardRefExoticComponent<
  FollowButtonProps & { ref?: React.Ref<HTMLElement> }
> = React.forwardRef(
  ({ isFollowed = false, buttonProps = {}, handleFollow }, forwardedRef) => {
    const [showUnfollow, setShowUnfollow] = useState(false)

    const text = isFollowed
      ? showUnfollow
        ? "Unfollow"
        : "Following"
      : "Follow"

    return (
      <Button
        ref={forwardedRef}
        onClick={handleFollow}
        variant="secondaryNeutral"
        success={isFollowed}
        onMouseEnter={() => setShowUnfollow(true)}
        onMouseLeave={() => setShowUnfollow(false)}
        data-follow={isFollowed}
        data-test="followButton"
        {...buttonProps}
      >
        {/*
          To prevent layout shift: the longest string this
          contains is "Following": position that, hide it,
          then overlay the normal labels.
        */}
        <Box position="relative">
          <Box
            as="span"
            opacity={0}
            style={{ pointerEvents: "none" }}
            aria-hidden="true"
          >
            Following
          </Box>

          <Box
            position="absolute"
            top="50%"
            left="50%"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            {text}
          </Box>
        </Box>
      </Button>
    )
  }
)
