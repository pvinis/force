export interface ImageEntity {
  src: string
  srcSet: string
}

export type ImageEntities = Array<ImageEntity | null>

export const prepareImageEntities = (
  imageEntities: ImageEntities
): ImageEntities => {
  // Ensure we have an array of exactly 4 images
  return Array.from(Array(4)).reduce(
    (acc, _, i) => [...acc, imageEntities[i] ?? null],
    [] as string[]
  )
}
