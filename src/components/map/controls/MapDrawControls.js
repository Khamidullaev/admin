import React from 'react'
import { DrawPolygonMode, DrawPointMode, EditingMode } from 'react-map-gl-draw'
import EyeIcon from '@material-ui/icons/Visibility';
import LocationIcon from '@material-ui/icons/LocationOn';
import PencilIcon from '@material-ui/icons/Create';
import PolygonIcon from '@material-ui/icons/FormatShapes';
import TrashIcon from '@material-ui/icons/Delete';


import styled from 'styled-components'

const MapDrawControlsContainer = styled.div`
    position: absolute;
    top: ${({ centered }) => (centered ? 'calc(50% - 120px)' : '24px')};
    right: 24px;
    border-radius: 4px;
    overflow: hidden;
    button {
        width: 32px;
        height: 32px;
        display: block;
        padding: 0;
        outline: none;
        border: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        cursor: pointer;
        &:not(:nth-child(1)) {
            border-top: 1px solid #ddd;
        }
    }
`

function MapDrawControls({ setMode, mode, onDelete, centered, openMap }) {
    return (
        <MapDrawControlsContainer openMap={openMap} centered={centered}>
            <div>
                <button
                    type="button"
                    title="Polygon tool"
                    onClick={() =>
                        setMode({
                            type: '',
                            text: 'watch',
                        })
                    }
                >
                    <EyeIcon
                        style={{color: mode?.text === 'watch' ? '#4094F7' : ''}}
                    />
                </button>
                <button
                    type="button"
                    title="Polygon tool"
                    onClick={() =>
                        setMode({
                            type: new EditingMode(),
                            text: 'edit',
                        })
                    }
                >
                    <PencilIcon
                        style={{color: mode?.text === 'edit' ? '#4094F7' : ''}}
                    />
                </button>
                <button
                    type="button"
                    title="Polygon tool"
                    onClick={() =>
                        setMode({
                            type: new DrawPolygonMode(),
                            text: 'polygon',
                        })
                    }
                >
                    <PolygonIcon
                        style={{color: mode?.text === 'polygon' ? '#4094F7' : ''}}
                    />
                </button>

                {/* <button
                    type="button"
                    title="Point tool"
                    onClick={() =>
                        setMode({ type: new DrawPointMode(), text: 'point' })
                    }
                >
                    <LocationIcon
                        style={{color: mode?.text === 'point' ? 'red' : ''}}
                    />
                </button> */}
                <button type="button" title="Delete tool" onClick={onDelete}>
                    <TrashIcon />
                </button>
            </div>
        </MapDrawControlsContainer>
    )
}

export default MapDrawControls
