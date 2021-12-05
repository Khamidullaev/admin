import React from 'react'
import { NavigationControl } from 'react-map-gl'
import { ZoomControlContainer } from '..'

function MapZoomControls({ setViewport, openMap }) {
    return (
        <ZoomControlContainer openMap={openMap}>
            <NavigationControl
                showCompass={false}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            />
        </ZoomControlContainer>
    )
}

export default MapZoomControls
