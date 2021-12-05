/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useRef, useEffect, useCallback } from "react"
import { EditingMode, Editor } from "react-map-gl-draw"
import ReactMapGL, { Source, Layer } from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css"
import useDidUpdate from "./hooks/useDidUpdate"
import MapZoomControls from "./controls/MapZoomControls"
import MapTypeControls from "./controls/MapTypeControls"
import { getEditHandleStyle, getFeatureStyle } from "./style"
import SourceLayer from "./SourceLayer"
import { mapboxToken } from "../../config/defaultSettings"
import ToolTip from "./controls/ToolTip"
import MapDrawControls from "./controls/MapDrawControls"

const OpenMap = ({
  onChange = () => {},
  initialFeatures,
  viewportCenter = [64.5735819, 41.381166],
  centerCoordinates,
  mapHeight,
  fullScreen,
  polygonCoordinates,
  mapWidth,
  enableDrawing,
  zoom = 5,
}) => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: mapHeight ? `${mapHeight}` : "calc(100vh - 200px)",
    longitude: viewportCenter?.[0],
    latitude: viewportCenter?.[1],
    zoom,
    bearing: 0,
    pitch: 0,
    scrollZoom: false,
  })
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState()
  const [features, setFeatures] = useState(initialFeatures)
  const [editFeatures, setEditFeatures] = useState([])
  const [toolTipContent, setToolTipContent] = useState({
    show: false,
  })

  const [mode, setMode] = useState({ text: "watch", type: "" })

  console.log("MODE ====>", mode)

  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/mapbox/outdoors-v11"
  )
  const mapRef = useRef()
  const editorRef = useRef()

  useEffect(() => {
    if (!mapWidth) return null
    setViewport((prev) => ({ ...prev, width: `${mapWidth}px` }))
  }, [mapWidth])

  useEffect(() => {}, [])
  const onUpdate = (payload) => {
    console.log('UPDATE---->', payload)

    onChange(payload)
    if (payload.editType === "addFeature") {
      setMode({
        type: new EditingMode(),
        text: "edit",
      })
    }
    setEditFeatures(payload.data)
  }

  useEffect(() => {
    if (!centerCoordinates)
      return setViewport((prev) => ({
        ...prev,
        longitude: 64.5735819,
        latitude: 41.381166,
        zoom,
      }))
    setViewport((prev) => ({
      ...prev,
      longitude: centerCoordinates?.[0],
      latitude: centerCoordinates?.[1],
      zoom: 20,
    }))
  }, [centerCoordinates])

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

  const closeToolTip = () => {
    setToolTipContent({
      show: false,
    })
  }

  const handlerClick = useCallback(
    (event) => {
      const data = event?.features?.[0]?.properties
      if (!data?.id) {
        if (toolTipContent?.show) return closeToolTip()
        return null
      }

      setToolTipContent({
        show: true,
        ...data,
      })
    },
    [toolTipContent]
  )
  useDidUpdate(() => {
    setFeatures(initialFeatures)
  }, [initialFeatures])
  // useDidUpdate(() => {
  //     if (features?.length) {
  //         animateToFeature(features[0])
  //     }
  // }, [features])
  useEffect(() => {
    if (window) {
      window.addEventListener("keypress", (e) => {
        if (["D", "d"].includes(e.key) && mode.text === "edit") {
          onDelete()
        }
      })
    }
    return () => window.removeEventListener("keypress", () => {})
  }, [mode.text, editFeatures, selectedFeatureIndex])

  return (
    <div
      style={{ overflow: "hidden" }}
      className={`${fullScreen ? "fullscreen" : ""} ${
        mode.text === "watch" ? "only_watch_map" : ""
      } map_container`}
    >
      <ReactMapGL
        {...viewport}
        ref={mapRef}
        mapStyle={mapStyle}
        onClick={handlerClick}
        onWheel={(e) => e.preventDefault()}
        style={{ minHeight: "500px" }}
        scrollZoom
        boxZoom
        // doubleClickZoom
        mapboxApiAccessToken={mapboxToken}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      >
        <Editor
          style={{ width: "100%", height: "100%" }}
          ref={editorRef}
          clickRadius={12}
          mode={mode?.type}
          onSelect={onSelect}
          onUpdate={onUpdate}
          features={editFeatures}
          editHandleShape="circle"
          featureStyle={getFeatureStyle}
          editHandleStyle={getEditHandleStyle}
          onUpdateCursor={(e) => console.log(e)}
        />
        <SourceLayer features={features} />

        <Source id="oregonjson" type="geojson" data={polygonCoordinates}>
          <Layer
            id="anything"
            type="fill"
            source="oregonjson"
            paint={{
              "fill-color": "#16acf7",
              "fill-outline-color": `#000`,
              "fill-opacity": 0.4,
            }}
          />
        </Source>

        <ToolTip data={toolTipContent} closeToolTip={closeToolTip} />
        {enableDrawing && <MapDrawControls
          onDelete={onDelete}
          mode={mode}
          openMap
          setMode={setMode}
          centered
        />}
        <MapZoomControls openMap setViewport={setViewport} />
      </ReactMapGL>
    </div>
  )
}

export default OpenMap
