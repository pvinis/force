import styled from "styled-components"
import colors from "../../Assets/Colors"
import { color, Flex, Text } from "@artsy/palette"
import React, { useEffect } from "react"
import { useNavBarHeight } from "../NavBar/useNavBarHeight"

const ToastContainer = styled.div<{
  isOpen: boolean
}>`
  width: 100%;
  z-index: 10000;
  padding: 7px 20px 7px;
  background-color: ${colors.greenToast};
  box-shadow: 0px 0px 1px 2rgba (0, 0, 0, 0.08), 0px 2px 8px rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  border-bottom: 1px solid ${color("black10")};
  transition: 0.6s;
  opacity: 0;
  position: fixed;
  left: 0;
  ${({ isOpen }) => isOpen && "opacity:1;"};
`
interface ToastComponentProps {
  showNotification: boolean
  notificationAction: string
  duration: number
  title: string
  onCloseToast: () => void
}
const ToastComponent: React.FC<ToastComponentProps> = ({
  notificationAction,
  showNotification,
  title,
  duration,
  onCloseToast,
}) => {
  const navHeight = useNavBarHeight()

  useEffect(() => {
    setTimeout(() => {
      showNotification && onCloseToast()
    }, duration)
  }, [showNotification])

  const [touchStart, setTouchStart] = React.useState(0)
  const [touchEnd, setTouchEnd] = React.useState(0)

  const handleTouchStart = e => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = e => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 60) {
      // do your stuff here for left swipe
      onCloseToast()
    }

    if (touchStart - touchEnd < -60) {
      // do your stuff here for right swipe
      alert("swipe right")
    }
  }

  return (
    <ToastContainer
      style={{ top: `${navHeight.desktop}px` }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      isOpen={showNotification}
    >
      <Flex alignItems="center" justifyContent="center">
        <Text color="white100" variant="subtitle" textAlign="center">
          {`${title} ${notificationAction}`}
        </Text>
      </Flex>
    </ToastContainer>
  )
}

export default ToastComponent
