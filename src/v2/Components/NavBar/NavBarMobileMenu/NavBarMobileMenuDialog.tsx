import { Box } from "@artsy/palette"
import styled from "styled-components"

export const NavBarMobileMenuDialog = styled(Box).attrs({ role: "dialog" })`
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: calc(100% - 60px);
`
