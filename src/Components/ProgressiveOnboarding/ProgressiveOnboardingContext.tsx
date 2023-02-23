import * as Yup from "yup"
import { useDidMount } from "@artsy/palette"
import { createContext, FC, useContext, useEffect, useState } from "react"
import { PROGRESSIVE_ONBOARDING_FIND_FOLLOWS } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFindFollows"
import { PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowsHighlight"
import { PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowArtist"

const ProgressiveOnboardingContext = createContext<{
  dismissed: ProgressiveOnboardingKey[]
  dismiss: (key: ProgressiveOnboardingKey) => void
  isDismissed: (key: ProgressiveOnboardingKey) => boolean
}>({
  dismissed: [],
  dismiss: () => {},
  isDismissed: () => false,
})

export const ProgressiveOnboardingProvider: FC = ({ children }) => {
  const [dismissed, setDismissed] = useState<ProgressiveOnboardingKey[]>([])

  const dismiss = (key: ProgressiveOnboardingKey) => {
    __dismiss__(key)
    setDismissed([...dismissed, key])
  }

  useEffect(() => {
    setDismissed(all())
  }, [])

  const mounted = useDidMount()

  const isDismissed = (key: ProgressiveOnboardingKey) => {
    return !mounted || dismissed.includes(key)
  }

  return (
    <ProgressiveOnboardingContext.Provider
      value={{ dismissed, dismiss, isDismissed }}
    >
      {children}
    </ProgressiveOnboardingContext.Provider>
  )
}

export const useProgressiveOnboarding = () => {
  return useContext(ProgressiveOnboardingContext)
}

const LOCAL_STORAGE_KEY = "progressive-onboarding-dismissed"

const PROGRESSIVE_ONBOARDING_KEYS = [
  PROGRESSIVE_ONBOARDING_FOLLOW_ARTIST,
  PROGRESSIVE_ONBOARDING_FIND_FOLLOWS,
  PROGRESSIVE_ONBOARDING_FOLLOWS_HIGHLIGHT,
] as const

type ProgressiveOnboardingKey = typeof PROGRESSIVE_ONBOARDING_KEYS[number]

const schema = Yup.array().of(
  Yup.string().oneOf([...PROGRESSIVE_ONBOARDING_KEYS])
)

export const isValid = (value: any): value is ProgressiveOnboardingKey[] => {
  return schema.isValidSync(value)
}

const parse = (value: any): ProgressiveOnboardingKey[] => {
  if (!value) return []

  try {
    const parsed = JSON.parse(value)

    if (!isValid(parsed)) return []

    return parsed
  } catch (err) {
    return []
  }
}

export const __dismiss__ = (key: ProgressiveOnboardingKey) => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  const dismissed = parse(item)
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([...dismissed, key]))
}

export const all = () => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  return parse(item)
}

export const isDismissed = (key: ProgressiveOnboardingKey) => {
  const item = localStorage.getItem(LOCAL_STORAGE_KEY)
  const dismissed = parse(item)
  return dismissed.includes(key)
}

export const reset = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY)
}
