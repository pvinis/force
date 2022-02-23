import React from "react"
import { CloseIcon, Pill } from "@artsy/palette"
import styled from "styled-components"
import { FilterPill } from "../types"

const CLOSE_ICON_SIZE = 15

export interface SavedSearchAlertPillsProps {
  items: FilterPill[]
  onDeletePress: (pill: FilterPill) => void
}

export const SavedSearchAlertPills: React.FC<SavedSearchAlertPillsProps> = props => {
  const { items, onDeletePress } = props

  return (
    <>
      {items.map(item => {
        const key = `filter-label-${item.name}`

        if (item.isDefault) {
          return (
            <DefaultPill key={key} variant="textSquare" mx={0.5} mb={1}>
              {item.displayName}
            </DefaultPill>
          )
        }

        return (
          <Pill
            key={key}
            variant="textSquare"
            mx={0.5}
            mb={1}
            onClick={() => onDeletePress(item)}
          >
            {item.displayName}
            <CloseIcon
              fill="currentColor"
              width={CLOSE_ICON_SIZE}
              height={CLOSE_ICON_SIZE}
              ml={0.5}
            />
          </Pill>
        )
      })}
    </>
  )
}

const DefaultPill = styled(Pill)`
  pointer-events: none;
`