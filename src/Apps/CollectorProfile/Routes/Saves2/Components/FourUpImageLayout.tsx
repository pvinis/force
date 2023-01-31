import { Box, Flex, Image, Spacer } from "@artsy/palette"
import {
  ImageEntities,
  ImageEntity,
  prepareImageEntities,
} from "Apps/CollectorProfile/Routes/Saves2/Utils/prepareImageEntities"
import { FC } from "react"

interface FourUpImageLayoutProps {
  imageEntities: ImageEntities
}

interface RowImageProps {
  imageEntity: ImageEntity | null
}

const LARGE_IMAGE_SIZE = 100
const SMALL_IMAGE_SIZE = 58
const IMAGE_OFFSET = "2px"

export const FourUpImageLayout: FC<FourUpImageLayoutProps> = ({
  imageEntities,
}) => {
  const preparedImageEntities = prepareImageEntities(imageEntities)

  return (
    <Box>
      <Flex flexDirection="row">
        <RowImage imageEntity={preparedImageEntities[0]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage imageEntity={preparedImageEntities[1]} />
      </Flex>

      <Spacer y={IMAGE_OFFSET} />

      <Flex flexDirection="row">
        <RowImage imageEntity={preparedImageEntities[2]} />
        <Spacer x={IMAGE_OFFSET} />
        <RowImage imageEntity={preparedImageEntities[3]} />
      </Flex>
    </Box>
  )
}

const RowImage: FC<RowImageProps> = ({ imageEntity }) => {
  const SIZE = [SMALL_IMAGE_SIZE, LARGE_IMAGE_SIZE]

  if (imageEntity === null) {
    return (
      <Box
        width={SIZE}
        height={SIZE}
        bg="black5"
        border="1px solid"
        borderColor="black10"
        aria-label="Image placeholder"
      />
    )
  }

  return (
    <Image
      width={SIZE}
      height={SIZE}
      preventRightClick
      src={imageEntity.src}
      srcSet={imageEntity.srcSet}
      aria-label="Image"
    />
  )
}
