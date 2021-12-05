import React, { useRef } from 'react'
import { Source, Layer } from 'react-map-gl'
import json from './json'
// import uuid from 'utils/uniqueIdGenerator'

const colorsHLS = [`14,115,246`, `242, 39, 28`, `26, 193, 157`]
const styleGenerator = (type, color = `14,115,246`) => {
    // const rndInt = Math.floor(Math.random() * 2) + 0
    const paint =
        type === 'fill'
            ? {
                  'fill-color': `rgba(${color},0.1)`,
                  'fill-outline-color': `rgb(${color})`,
                  'fill-opacity': 1,
              }
            : {
                  'line-color': `rgb(${color})`,
                  'line-width': 2,
              }
    return {
        type,
        paint,
    }
}
const SingleLayer = ({ id }) => {
    const ref = useRef(colorsHLS[id % 3])
    return (
        <>
            <Layer
                source={'id'}
                id={`lineId${id}`}
                {...styleGenerator('line', ref.current)}
            />
            <Layer
                source={id}
                id={`fillId${id}`}
                {...styleGenerator('fill', ref.current)}
            />
        </>
    )
}
function SourceLayer({ features }) {
    return (
        <>
            {features?.length ? (
                <>
                    <Source
                        id="1"
                        type="geojson"
                        data={{
                            type: 'FeatureCollection',
                            features,
                        }}
                    >
                        <SingleLayer id="1" />
                    </Source>
                </>
            ) : (
                ''
            )}
            {/* <Source
                id="1"
                type="geojson"
                data={{
                    type: 'FeatureCollection',
                    features: [json[0]],
                }}
            >
                <SingleLayer id="1" />
            </Source>
            <Source
                id="2"
                type="geojson"
                data={{
                    type: 'FeatureCollection',
                    features: [json[0]],
                }}
            >
                <SingleLayer id="2" />
            </Source> */}
        </>
    )
}

export default SourceLayer
