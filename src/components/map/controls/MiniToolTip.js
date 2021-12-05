import React from 'react'
import { ToolTipContainer } from '..'

function MiniToolTip({ data }) {
    // console.log({
    //     ...(data?.hoveredFeature?.properties
    //         ? data?.hoveredFeature?.properties
    //         : {}),
    //     top: data?.offsetY,
    //     left: data?.offsetX,
    // })
    return (
        <>
            {data?.hoveredFeature?.properties?.cadastral_number ? (
                <ToolTipContainer
                    offsetY={data?.offsetY}
                    offsetX={data?.offsetX}
                >
                    {data?.hoveredFeature?.properties?.name}
                </ToolTipContainer>
            ) : (
                ''
            )}
        </>
    )
}

export default MiniToolTip
