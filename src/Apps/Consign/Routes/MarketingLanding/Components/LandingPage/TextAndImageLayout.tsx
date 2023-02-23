import { Column, GridColumns, ResponsiveBox, Box, Text } from "@artsy/palette"
import { ReactElement } from "react"
import { Media } from "Utils/Responsive"

export const TextAndImageLayout: React.FC<{
  text: ReactElement
  button: ReactElement
  image: ReactElement
  references?: string
}> = ({ text, button, image, references }) => {
  return (
    <Box
      mx={[-2, -4]}
      pt={[4, 6, 12]}
      pb={[0, 6, 12]}
      backgroundColor="black100"
    >
      <GridColumns>
        <Column span={6} pb={[2, 0]} pr={[2, 2]} pl={[2, 4]}>
          {text}
          {button}
        </Column>

        <Column span={6} order={[1, 0]}>
          <ResponsiveBox aspectWidth={950} aspectHeight={419} maxWidth="100%">
            {image}
          </ResponsiveBox>
          <Media greaterThan="xs">
            <Text mt={1} variant="xs" color="black15">
              <i>{references}</i>
            </Text>
          </Media>
        </Column>
      </GridColumns>
    </Box>
  )
}
