import {
  ArrowLeftIcon,
  Box,
  Clickable,
  CloseIcon,
  Flex,
  FullBleed,
  HeartFillIcon,
  HeartIcon,
  Text,
} from "@artsy/palette"
import { ArtQuizButton } from "Apps/ArtQuiz/Components/ArtQuizButton"
import {
  ArtQuizCard,
  Mode,
  useArtQuizCards,
} from "Apps/ArtQuiz/Components/ArtQuizCard"
import { FC } from "react"
import { RouterLink } from "System/Router/RouterLink"
import { useRouter } from "System/Router/useRouter"

const EXAMPLE_CARDS = [...new Array(16)].map(_ => ({
  id: Math.random().toString(26).slice(2),
}))

interface ArtQuizMainProps {}

export const ArtQuizMain: FC<ArtQuizMainProps> = () => {
  const { router } = useRouter()

  const { cards, activeIndex, dispatch } = useArtQuizCards({
    cards: EXAMPLE_CARDS,
  })

  const handlePrevious = () => {
    if (activeIndex === 0) {
      router.push("/art-quiz/welcome")

      return
    }

    dispatch({ type: "Previous" })
  }

  const handleNext = (action: "Like" | "Dislike") => () => {
    if (activeIndex === cards.length - 1) {
      router.push("/art-quiz/results")

      return
    }

    dispatch({ type: action })
  }

  return (
    <>
      <FullBleed height="100%" display="flex" flexDirection="column">
        <Flex alignItems="stretch">
          <Clickable
            onClick={handlePrevious}
            p={4}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <ArrowLeftIcon />
          </Clickable>

          <Text
            variant="xs"
            flex={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {activeIndex + 1} / {cards.length}
          </Text>

          <RouterLink
            to="/"
            p={4}
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            textDecoration="none"
          >
            <Text variant="xs">Close</Text>
          </RouterLink>
        </Flex>

        <Flex
          position="relative"
          justifyContent="center"
          alignItems="center"
          flex={1}
          flexDirection="column"
        >
          {cards.map((card, i) => {
            const mode = i === activeIndex ? Mode.Active : card.mode

            return (
              <ArtQuizCard key={card.id} mode={mode} position="absolute">
                <Box
                  width={400}
                  height={400}
                  bg="black10"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text variant="xl">{card.id}</Text>
                </Box>
              </ArtQuizCard>
            )
          })}
        </Flex>

        <Flex alignItems="stretch" justifyContent="center">
          <ArtQuizButton onClick={handleNext("Dislike")} aria-label="Dislike">
            <CloseIcon width={40} height={40} />
          </ArtQuizButton>

          <ArtQuizButton onClick={handleNext("Like")} aria-label="Like">
            {({ mode }) => {
              if (mode === "Animating") {
                return <HeartFillIcon width={40} height={40} title="" />
              }

              return <HeartIcon width={40} height={40} title="" />
            }}
          </ArtQuizButton>
        </Flex>
      </FullBleed>
    </>
  )
}
