// import { useIsMobile } from 'hooks/useIsMobile'
// import { BoldArrowLeft } from "icons/map"
import React, { useState } from "react"
import styled, { keyframes, css } from "styled-components"

const fadeOut = keyframes`
  from {
      opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(-120%);
  }
`
const fadeIn = keyframes`
  from {
    opacity: 0; 
    visibility: hidden;
    transform: translateX(-120%);
  }
  to {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  
  }
`
export const OpenGuideBoxIcon = () => (
  <svg
    width="20"
    height="80"
    viewBox="0 0 20 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.09042e-10 79.9677C1.12473e-09 78.739 8.15107 73.5868 14.0459 70.0213C17.7137 67.8029 20 63.851 20 59.5645V20.7736C20 16.3286 17.5361 12.2591 13.6789 10.0501C7.81879 6.69411 1.5471e-10 1.87805 4.09042e-10 0.0722122C8.1581e-10 -2.81597 -7.12031e-10 81.8923 4.09042e-10 79.9677Z"
      fill="#0E73F6"
    />
    <path
      d="M12.52 39.5204C12.6138 39.6141 12.6666 39.7412 12.6667 39.8738V40.1271C12.6652 40.2594 12.6126 40.3859 12.52 40.4804L9.09336 43.9004C9.03077 43.9635 8.94557 43.999 8.85669 43.999C8.76782 43.999 8.68262 43.9635 8.62003 43.9004L8.1467 43.4271C8.08399 43.3656 8.04865 43.2816 8.04865 43.1938C8.04865 43.106 8.08399 43.0219 8.1467 42.9604L11.1134 40.0004L8.1467 37.0404C8.08359 36.9778 8.0481 36.8926 8.0481 36.8038C8.0481 36.7149 8.08359 36.6297 8.1467 36.5671L8.62003 36.1004C8.68262 36.0373 8.76782 36.0018 8.85669 36.0018C8.94557 36.0018 9.03077 36.0373 9.09336 36.1004L12.52 39.5204Z"
      fill="white"
    />
  </svg>
)

const data = [
  {
    color: "red",
    label: "Аниқланган ер участкалари",
  },
  {
    color: "#4094F7",
    label: "Тизимга киритилган ер участкалари",
  },
  {
    color: "#F8C51B",
    label: "Ваколатли органлар муҳокамасида",
  },
  {
    color: "#1AC19D",
    label: "Аукционга чиқарилган ер участкалари",
  },
]
const OpenGuideBoxButton = styled.button`
  position: absolute;
  bottom: 64px;
  left: 0;
  display: flex;
  background: transparent;
  border: 0;
  align-items: center;
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.2s linear forwards;
`
const fadeAnimation = css`
  animation: ${({ show }) => (show ? fadeIn : fadeOut)} 0.2s linear forwards;
`
const GuideBox = styled.div`
  position: ${({ staticPosition }) => (staticPosition ? "static" : "absolute")};
  box-shadow: ${({ staticPosition }) =>
    !staticPosition ? "0px 7px 10px rgba(0, 0, 0, 0.08)" : "none"};
  border-radius: 12px;
  bottom: ${({ staticPosition }) => (staticPosition ? "auto" : "24px")};
  left: ${({ staticPosition }) => (staticPosition ? "auto" : "24px")};
  padding: ${({ staticPosition }) => (staticPosition ? "16px" : "24px")};
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 0;
  ${({ staticPosition }) => (staticPosition ? "" : fadeAnimation)};
  /* animation: ${({ show, staticPosition }) =>
    !staticPosition && show
      ? css(`${fadeIn}  0.2s forwards`)
      : css`
          ${fadeOut} 0.2s forwards
        `}; */
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    h2 {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
    button {
      width: 32px;
      height: 32px;
      left: 365px;
      top: 0px;
      background: #ebf7ff;
      border-radius: 8px;
      border: 0;
      margin-left: 16px;
      display: ${({ staticPosition }) =>
        !staticPosition ? "default" : "none"};
    }
  }
  div {
    p {
      color: #48535b;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      span {
        display: flex;
        width: 16px;
        height: 16px;
        margin-right: 16px;
      }
    }
  }
`
export const GuideContainer = ({ open, setOpen, staticPosition }) => (
  <GuideBox show={open} staticPosition={staticPosition}>
    <header>
      <h2>Ер участкаларининг жараёнлардаги ҳолати</h2>
      <button type="button" onClick={() => setOpen(false)}>
        LEFT
      </button>
    </header>
    <div>
      {data.map((el) => (
        <p key={el.color}>
          <span style={{ background: el.color }} />
          {el.label}
        </p>
      ))}
    </div>
  </GuideBox>
)
function MapGuideBox() {
  const [open, setOpen] = useState(false)
  // const isMobile = useIsMobile()
  return (
    <>
      <OpenGuideBoxButton show={!open} onClick={() => setOpen(true)}>
        <OpenGuideBoxIcon />
      </OpenGuideBoxButton>
      <GuideContainer open={open} setOpen={setOpen} />
    </>
  )
}

export default MapGuideBox
