import React from 'react'
import { useDispatch } from 'react-redux'
import { setMapData } from 'store/actions/application/applicationActions'
import { Router } from '../../../i18n'
import { NearMeIcon } from '../../../icons/form'
import Button from '../button/Button'
import {
    InputContainer,
    InputLabel,
    InvisibleInput,
    StyledMap,
    StyledMapInner,
} from '..'

function SelectMap({
    label,
    placeholder,
    name,
    value,
    setFieldValue,
    required,
    boxStyles,
}) {
    const dispatch = useDispatch()
    return (
        <InputContainer {...boxStyles}>
            <InputLabel>{label}</InputLabel>
            <StyledMap>
                <StyledMapInner
                    type="button"
                    onClick={() => Router.push(`/map?field=${name}`)}
                >
                    <NearMeIcon />
                    {value ? 'Нарисовано с карты' : placeholder}
                </StyledMapInner>
                {value && (
                    <Button
                        type="button"
                        secondary
                        background="transparent"
                        noBorder
                        minWidth={0}
                        onClick={() => {
                            dispatch(setMapData(value?.map?.data || ''))
                            setFieldValue(name, '')
                        }}
                    >
                        Отменить
                    </Button>
                )}
            </StyledMap>
            <InvisibleInput
                map
                required={required}
                value={value}
                onChange={() => {}}
            />
        </InputContainer>
    )
}

export default SelectMap
