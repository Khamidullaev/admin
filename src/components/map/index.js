import { fadeIn } from '../common/keyframes'
import { FullscreenControl } from 'react-map-gl'
import styled from 'styled-components'

export const ToolTipContainer = styled.div`
    background: #ffffff;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    border-radius: 12px;
    padding: 12px;
    max-width: 400px;
    opacity: 0;
    animation: 0.2s ${fadeIn} ease-in forwards;
    /* position: absolute; */
    /* bottom: ${({ offsetY }) => offsetY || 0}px; */
    /* left: ${({ offsetX }) => offsetX || 0}px; */
    /* transform: translateX(-50%); */
    header {
        display: flex;
        justify-content: space-between;
        min-height: 48px;
        margin-bottom: 12px;
        button {
            align-self: flex-start;
            border: 0;
            border-radius: 50%;
            height: 24px;
            width: 24px;
            background: transparent;
            cursor: pointer;
            &:hover {
                background: #f6f8f9;
            }
        }
        h3 {
            align-self: flex-end;
            font-weight: 600;
            font-size: 18px;
            line-height: 20px;
        }
    }
    & > div {
        width: 100%;
        max-height: 200px;
        border-radius: 12px;
        overflow: hidden;
        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    }
    main {
        margin-top: 12px;
    }
`
export const ToolTipRow = styled.div`
    display: flex;
    min-height: 44px;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    background: ${({ even }) => (even ? '#F6F8F9' : '#fff')};

    span:nth-child(1) {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
    }
    span:nth-child(2) {
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #252c32;
        opacity: 0.9;
        margin-left: 10px;
    }
        span:nth-child(2) {
            font-size: 12px;
            line-height: 16px;
            text-align: right;
            color: #252c32;
            opacity: 0.9;
            margin-left: 6px;
        }
    }
`
export const ZoomControlContainer = styled.div`
    position: absolute;
    top: 60%;
    right: 24px;
    width: 32px;
    & > div {
        right: 0;
    }
`
export const StyledFullScreenControl = styled(FullscreenControl)`
    top: 12px;
    left: 12px;
    button .mapboxgl-ctrl-icon {
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.27276 6.72724C5.32499 6.77948 5.36643 6.84149 5.3947 6.90973C5.42297 6.97798 5.43752 7.05113 5.43752 7.125C5.43752 7.19887 5.42297 7.27202 5.3947 7.34027C5.36643 7.40851 5.32499 7.47052 5.27276 7.52276L2.85799 9.9375H2.0625V9.14201L4.47724 6.72724C4.52948 6.67501 4.59149 6.63357 4.65973 6.6053C4.72798 6.57703 4.80113 6.56248 4.875 6.56248C4.94887 6.56248 5.02202 6.57703 5.09027 6.6053C5.15851 6.63357 5.22052 6.67501 5.27276 6.72724ZM9.9375 2.0625H9.14201L6.72724 4.47724C6.62175 4.58273 6.56249 4.72581 6.56249 4.875C6.56249 5.02419 6.62175 5.16727 6.72724 5.27276C6.83273 5.37825 6.97581 5.43751 7.125 5.43751C7.27419 5.43751 7.41727 5.37825 7.52276 5.27276L9.9375 2.85799V2.0625ZM4.125 10.3125H1.6875L1.6875 7.875C1.6875 7.72582 1.62824 7.58274 1.52275 7.47725C1.41726 7.37176 1.27418 7.3125 1.125 7.3125C0.975816 7.3125 0.832742 7.37176 0.727252 7.47725C0.621763 7.58274 0.5625 7.72582 0.5625 7.875L0.5625 10.875C0.5625 11.0242 0.621763 11.1673 0.727252 11.2727C0.832742 11.3782 0.975816 11.4375 1.125 11.4375H4.125C4.27418 11.4375 4.41726 11.3782 4.52275 11.2727C4.62824 11.1673 4.6875 11.0242 4.6875 10.875C4.6875 10.7258 4.62824 10.5827 4.52275 10.4773C4.41726 10.3718 4.27418 10.3125 4.125 10.3125ZM10.875 0.5625H7.875C7.72582 0.5625 7.58274 0.621763 7.47725 0.727253C7.37176 0.832742 7.3125 0.975816 7.3125 1.125C7.3125 1.27418 7.37176 1.41726 7.47725 1.52275C7.58274 1.62824 7.72582 1.6875 7.875 1.6875H10.3125V4.125C10.3125 4.27418 10.3718 4.41726 10.4773 4.52275C10.5827 4.62824 10.7258 4.6875 10.875 4.6875C11.0242 4.6875 11.1673 4.62824 11.2727 4.52275C11.3782 4.41726 11.4375 4.27418 11.4375 4.125V1.125C11.4375 0.975816 11.3782 0.832742 11.2727 0.727253C11.1673 0.621763 11.0242 0.5625 10.875 0.5625Z' fill='black' fill-opacity='0.7'/%3E%3C/svg%3E%0A") !important;
    }
`
