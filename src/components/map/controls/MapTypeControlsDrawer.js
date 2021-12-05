/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import styled from 'styled-components'
// import Button from 'components/form/button/Button'
// import { CloseIconSmall } from 'icons/map'
import { GuideContainer } from './MapGuideBox'

const DrawerContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
    & > button {
        align-self: flex-end;
    }
`
const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        width: 85%;
    }
`
const TypeControllerContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 6px solid #f5f5f5;
    margin: 12px 0;
    padding: 8px 16px;
    & > div {
        border-radius: 12px;
        flex-grow: 1;
        margin-bottom: 8px;
        &:nth-child(1) {
            margin-right: 12px;
        }
        input {
            width: 0;
            height: 0;
            position: absolute;
            z-index: -1;
        }
        label {
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            font-weight: normal;
            font-size: 14px;
            line-height: 24px;
            width: 100%;
            padding: 0 16px;
            border-radius: 6px;
            color: #000;
            background: #f5f5f5;
            font-weight: normal;
            font-size: 16px;
            line-height: 20px;
            transition: 0.1s;
        }
        input:checked + label {
            background: ${({ theme }) => theme.palette.primary[500]};
            color: #fff;
        }
    }
`
export default function MapTypeControlsDrawer({
    open,
    handleClose,
    handleChange,
    satellateStyle,
    streetStyle,
    mapStyle,
}) {
    return (
        <StyledDrawer anchor="right" open={open} onClose={handleClose}>
            <DrawerContent>
                {/* <Button icon noBorder onClick={handleClose}>
                    <CloseIconSmall />
                </Button> */}
                <TypeControllerContainer>
                    <div>
                        <input
                            onChange={handleChange}
                            type="radio"
                            value="street"
                            checked={mapStyle === streetStyle}
                            name="type"
                            id="option1"
                        />
                        <label htmlFor="option1">Схема</label>
                    </div>
                    <div>
                        <input
                            onChange={handleChange}
                            value="satillate"
                            type="radio"
                            name="type"
                            id="option2"
                            checked={mapStyle === satellateStyle}
                        />
                        <label htmlFor="option2">Спутник</label>
                    </div>
                </TypeControllerContainer>
                <GuideContainer staticPosition />
            </DrawerContent>
        </StyledDrawer>
    )
}
