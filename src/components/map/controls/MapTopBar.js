/* eslint-disable no-restricted-syntax */
import Button from 'components/form/button/Button'
import SelectMenu from 'components/form/select/SelectMenu'
import { FilterIcon, HomeIcon, HomeIconOutlined } from 'icons/map'
import { LocationIcon, NearMeIcon, SearchIcon } from 'icons/form'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Router } from 'i18n'
import useDidUpdate from 'hooks/useDidUpdate'
import { breakpoints } from 'theme/breakpoint'
import { useIsMobile } from 'hooks/useIsMobile'
import StatusMenu from 'components/form/select/StatusMenu'
import { Box } from '@material-ui/core'
import { HTMLOverlay } from 'react-map-gl'
import { request } from 'request/request'
import MapFilterDrawer from './MapFilterDrawer'
import responseFormatter from '../responseFormatter'

const MapTopBarContainer = styled.div`
    position: fixed;
    top: 24px;
    left: 24px;
    width: calc(100% - 240px);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    & > * {
        margin-bottom: 8px;
    }
    @media ${breakpoints.ts} {
        top: 12px;
        left: 12px;
        width: calc(100% - 12px);
        & > button:nth-last-child(1) {
            position: absolute;
            right: 12px;
            top: 48px;
        }
        & > div {
            display: none;
        }
    }
`
function MapTopBar({ setFeatures }) {
    const isMobile = useIsMobile()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [options, setOptions] = useState({
        city: [],
        region: [],
        status: [],
    })
    const [values, setValues] = useState({
        region: null,
        status: [],
        city: null,
        apply: false,
    })
    const handleApplyFilter = () => {
        setValues({ ...values, apply: true })
    }
    const getAllStatuses = () => {
        request
            .get(`/status`)
            .then(({ data }) => {
                setOptions((opts) => ({ ...opts, status: data }))
            })
            .catch((err) => console.log(err))
    }
    const getFeaturesByFilter = () => {
        const cityQuery = values.city?.id ? `&city_id=${values.city?.id}` : ''
        const regionQuery = values.region?.id
            ? `&region_id=${values.region?.id}`
            : ''
        const statusQuery = values.status?.length
            ? `&status_id=${values.status?.[0].id}`
            : ''
        if (regionQuery) {
            console.log('filter called')
            request
                .get(
                    `/entity?limit=100${cityQuery}${regionQuery}${statusQuery}`,
                )
                .then(({ data }) => {
                    console.log(data)
                    if (data?.entities?.length) {
                        const formattedFeatures = responseFormatter(
                            data?.entities,
                        )
                        setFeatures(formattedFeatures)
                    } else {
                        setFeatures([])
                    }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setValues({ ...values, apply: false })
                })
        } else {
            setFeatures([])
            setValues({ ...values, apply: false })
        }
    }
    useEffect(() => {
        if (values.city?.id) {
            request
                .get(`/regions/${values.city?.id}`)
                .then(({ data }) => {
                    setOptions((opts) => ({
                        ...opts,
                        region: data?.regions || [],
                    }))
                })
                .catch((err) => console.log(err))
        }
    }, [values?.city])
    useDidUpdate(() => {
        console.log('apply =', true)
        if (values.apply) {
            getFeaturesByFilter()
        }
    }, [values])
    useEffect(() => {
        request
            .get(`/city`)
            .then(({ data }) => {
                setOptions((opts) => ({ ...opts, city: data?.cities }))
            })
            .then(() => getAllStatuses())
            .catch((err) => console.log(err))
    }, [])

    useDidUpdate(() => {
        // Reset region value when city changes
        setValues({
            ...values,
            region: '',
        })
    }, [values?.city?.id])
    return (
        <HTMLOverlay
            redraw={() => (
                <MapTopBarContainer>
                    <Button
                        noBorder
                        onClick={() => Router.push('/')}
                        adornment={
                            isMobile ? <HomeIconOutlined /> : <HomeIcon />
                        }
                        icon
                    />
                    {!isMobile && (
                        <>
                            <SelectMenu
                                noBorder
                                clearable
                                boxStyles={{ width: 216, mb: 0, ml: 1 }}
                                name="asdasd"
                                onChange={(value) => {
                                    setValues({
                                        ...values,
                                        city: value,
                                    })
                                }}
                                adornment={<LocationIcon fill="#3C464E" />}
                                isStatic
                                resetValue={() => {
                                    setValues({ ...values, city: null })
                                }}
                                value={values.city}
                                options={options?.city}
                                placeholder="Выберите область"
                            />
                            <SelectMenu
                                clearable
                                isStatic
                                noBorder
                                boxStyles={{ width: 216, mb: 0, mx: 1 }}
                                name="asdasd"
                                onChange={(value) => {
                                    setValues({ ...values, region: value })
                                }}
                                resetValue={() => {
                                    setValues({ ...values, region: null })
                                }}
                                adornment={<NearMeIcon fill="#3C464E" />}
                                value={values.region}
                                options={options?.region}
                                placeholder="Выберите регион"
                            />
                            <Box {...{ width: 216, mb: 0, mr: 1 }}>
                                <StatusMenu
                                    options={options.status}
                                    onChange={(value) =>
                                        setValues({
                                            ...values,
                                            status: value,
                                        })
                                    }
                                    value={values.status}
                                />
                            </Box>

                            <Button
                                noBorder
                                color="#3C464E"
                                fontWeight={500}
                                onClick={handleApplyFilter}
                                adornment={<SearchIcon />}
                            >
                                Показать на карте
                            </Button>
                        </>
                    )}
                    {isMobile && (
                        <>
                            <Button
                                noBorder
                                onClick={() => setOpenDrawer(true)}
                                adornment={<FilterIcon />}
                                icon
                            />
                            <MapFilterDrawer
                                open={openDrawer}
                                options={options}
                                values={values}
                                setValues={setValues}
                                handleClose={() => setOpenDrawer(false)}
                            />
                        </>
                    )}
                </MapTopBarContainer>
            )}
            captureScroll
            style={{ height: 'auto !important' }}
        />
    )
}
export default MapTopBar
