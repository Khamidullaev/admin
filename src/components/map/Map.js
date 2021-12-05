/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect } from "react"
import { Editor, EditingMode } from "react-map-gl-draw"
import ReactMapGL from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import { getFeatureStyle, getEditHandleStyle } from "./style"
import MapZoomControls from "./controls/MapZoomControls"
import MapDrawControls from "./controls/MapDrawControls"
import MapFullscreenControl from "./controls/MapFullscreenControl"
import MapTypeControls from "./controls/MapTypeControls"
import { mapboxToken } from "../../config/defaultSettings"

const Map = ({
  onChange = () => {},
  initialFeatures,
  viewportCenter = [69.2799997, 41.3113075],
  mapHeight,
  fullScreen,
  noControls,
  notEditable,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: mapHeight ? `${mapHeight}px` : "500px",
    longitude: viewportCenter?.[0],
    latitude: viewportCenter?.[1],
    zoom: 15,
    bearing: 0,
    pitch: 0,
  })
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState()
  const [editFeatures, setEditFeatures] = useState(
    initialFeatures?.length ? initialFeatures : []
  )
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/outdoors-v11"
  )

  const [mode, setMode] = useState({ text: "edit", type: new EditingMode() })

  // Satillate mode  - 'mapbox://styles/mapbox/satellite-v9'
  const mapRef = useRef()
  const editorRef = useRef()

  useEffect(() => {}, [])
  const onUpdate = (payload) => {
    console.log(payload)
    onChange(payload?.data)
    if (payload.editType === "addFeature") {
      setMode({
        type: new EditingMode(),
        text: "edit",
      })
    }
    setEditFeatures(payload.data)
  }

  const onDelete = () => {
    if (selectedFeatureIndex !== null && selectedFeatureIndex >= 0) {
      editorRef.current.deleteFeatures(selectedFeatureIndex)
      setEditFeatures(
        editFeatures?.filter((el, index) => index !== selectedFeatureIndex)
      )
    }
  }

  const onSelect = (selected) => {
    setSelectedFeatureIndex(selected.selectedFeatureIndex)
  }
  return (
    <div
      className={`${fullScreen ? "fullscreen" : ""} map_container`}
      style={{ ...(mapHeight && { height: mapHeight }), overflow: "hidden" }}
    >
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle={mapStyle}
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Editor
          style={{ width: "100%", height: "100%" }}
          ref={editorRef}
          clickRadius={12}
          mode={notEditable ? null : mode?.type}
          onSelect={onSelect}
          onUpdate={onUpdate}
          features={editFeatures}
          editHandleShape="circle"
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
        />
        <MapZoomControls setViewport={setViewport} />
        <MapFullscreenControl />
        {!noControls ? (
          <MapDrawControls onDelete={onDelete} mode={mode} setMode={setMode} />
        ) : (
          ""
        )}
      </ReactMapGL>
    </div>
  )
}

export default Map
