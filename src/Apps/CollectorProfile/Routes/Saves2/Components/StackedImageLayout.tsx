import { Box, Image } from "@artsy/palette"
import {
  ImageEntities,
  ImageEntity,
  prepareImageEntities,
} from "Apps/CollectorProfile/Routes/Saves2/Utils/prepareImageEntities"
import { FC } from "react"

interface StackedImageLayoutProps {
  imageEntities: ImageEntities
}

interface StackImageProps {
  imageEntity: ImageEntity | null
  index: number
}

const LARGE_IMAGE_SIZE = 190
const SMALL_IMAGE_SIZE = 112
const LARGE_IMAGE_OFFSET = 4
const SMALL_IMAGE_OFFSET = 2

export const StackedImageLayout: FC<StackedImageLayoutProps> = ({
  imageEntities,
}) => {
  const preparedImageEntities = prepareImageEntities(imageEntities)
  const reversedImageEntities = preparedImageEntities.reverse()

  return (
    <Box position="relative">
      {reversedImageEntities.map((imageEntity, index) => (
        <StackImage imageEntity={imageEntity} index={index} />
      ))}
    </Box>
  )
}

const StackImage: FC<StackImageProps> = ({ imageEntity, index }) => {
  const SIZE = [SMALL_IMAGE_SIZE, LARGE_IMAGE_SIZE]
  const OFFSET_BY_INDEX = [
    `${SMALL_IMAGE_OFFSET * index}px`,
    `${LARGE_IMAGE_OFFSET * index}px`,
  ]

  if (imageEntity === null) {
    return (
      <Box
        width={SIZE}
        height={SIZE}
        bg="black5"
        position="absolute"
        top={OFFSET_BY_INDEX}
        left={OFFSET_BY_INDEX}
        border="1px solid"
        borderColor="black10"
        aria-label="Image placeholder"
      />
    )
  }

  return (
    <Box position="absolute" top={OFFSET_BY_INDEX} left={OFFSET_BY_INDEX}>
      <Image
        width={SIZE}
        height={SIZE}
        src={imageEntity.src}
        srcSet={imageEntity.srcSet}
        aria-label="Image"
        preventRightClick
      />
    </Box>
  )
}
