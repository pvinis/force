import { ArrowRightCircleIcon, Flex, Spacer, Text } from "@artsy/palette"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"

const ICON_SIZE = 45

export const SavesSeeAll: FC = () => {
  return (
    <RouterLink to="/collector-profile/saves2/all" textDecoration="none">
      <Flex
        p={1}
        width={[118, 202]}
        height={[168, 252]}
        borderRadius={10}
        bg="black5"
        border="1px solid"
        borderColor="black15"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <ArrowRightCircleIcon
          fill="black60"
          width={ICON_SIZE}
          height={ICON_SIZE}
        />
        <Spacer y={1} />
        <Text variant={["xs", "sm-display"]}>See all</Text>
      </Flex>
    </RouterLink>
  )
}
