/* eslint-disable jsx-a11y/label-has-associated-control */
import Drawer from '@material-ui/core/Drawer'
import styled from 'styled-components'
import Button from 'components/form/button/Button'
import { CloseIconSmall } from 'icons/map'
import SelectMenu from 'components/form/select/SelectMenu'
import { LocationIcon, NearMeIcon } from 'icons/form'
import React from 'react'
import StatusMenu from 'components/form/select/StatusMenu'

const DrawerContent = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-right: 10px;
    & > div {
        width: 100%;
        padding: 16px;
        & > div {
            margin-bottom: 8px;
        }
    }
    & > header {
        padding: 16px 6px 0 16px;
        align-items: center;
        display: flex;
        width: 100%;
        justify-content: space-between;
        h3 {
            font-weight: 600;
            font-size: 16px;
            line-height: 24px;
        }
    }
`
const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        width: 85%;
    }
`
export default function MapFilterDrawer({
    open,
    handleClose,
    options,
    setValues,
    values,
}) {
    return (
        <StyledDrawer anchor="right" open={open} onClose={handleClose}>
            <DrawerContent>
                <header>
                    <h3>Филтьр</h3>
                    <Button icon noBorder onClick={handleClose}>
                        <CloseIconSmall />
                    </Button>
                </header>
                <div>
                    <SelectMenu
                        boxStyles={{ mb: 1 }}
                        name="asdasd"
                        onChange={(value) => {
                            setValues({ ...values, city: value, apply: true })
                        }}
                        adornment={<LocationIcon fill="#3C464E" />}
                        isStatic
                        value={values.city}
                        options={options?.city}
                        placeholder="Выберите область"
                    />
                    <SelectMenu
                        isStatic
                        boxStyles={{ mb: 1 }}
                        name="asdasd"
                        onChange={(value) => {
                            setValues({ ...values, region: value, apply: true })
                        }}
                        adornment={<NearMeIcon fill="#3C464E" />}
                        value={values.region}
                        options={options?.region}
                        placeholder="Выберите регион"
                    />
                    <StatusMenu
                        options={options.status}
                        onChange={(value) =>
                            setValues({
                                ...values,
                                status: value,
                                apply: true,
                            })
                        }
                        value={values.status}
                    />
                </div>
            </DrawerContent>
        </StyledDrawer>
    )
}
