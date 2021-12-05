import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Card from "../../components/Card"
import OpenMapContainer from "../../components/OpenMapContainer"
import { useResizeDetector } from "react-resize-detector"
import TableLoader from "../../components/TableLoader"
import Loadable from "react-loadable"
import AutoComplate from "../../components/Select/AutoComplate"
import { useTranslation } from "react-i18next"
import Filters from "../../components/Filters"
import Button from "../../components/Button"
import axios from "../../utils/axios"
import { mapPropertyId } from "../../config/defaultSettings"
import { centroid } from "@turf/turf"
import { useDispatch, useSelector } from "react-redux"
import { showAlert } from "../../redux/reducers/alertReducer"
import StatusTag from "../../components/Tag/StatusTag"
import Input from "../../components/Input"

const Map = Loadable({
  loader: () => import("../../components/map/OpenMap"),
  loading: TableLoader,
})

const OpenMap = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [selectedRegionId, setSelectedRegionId] = useState(null)
  const [selectedStatusId, setSelectedStatusId] = useState(null)
  const [errors, setErrors] = useState(false)
  const [entityList, setEntityList] = useState([])
  const [buttonLoader, setButtonLoader] = useState(false)
  const [searchText, setSearchText] = useState("")
  const globalAlertHeight = useSelector(state => state.alert.globalAlertHeight)

  const [mapWidth, setMapWidth] = useState(null)
  
  const onResize = useCallback((width) => {
    setMapWidth(width)
  }, [])

  const { ref } = useResizeDetector({
    onResize,
    handleHeight: false,
    skipOnMount: true,
  })

  const fetchGis = (limit, page) => {
    axios
      .get("/entity-properties", {
        params: {
          city_id: selectedCityId,
          region_id: selectedRegionId,
          status_id: selectedStatusId,
          entity_number: searchText,
          limit,
          page,
        },
      })
      .then((res) => {
        if (!(res?.entities?.length > 0)) {
          if (page === 1) {
            return dispatch(showAlert("Yer uchastkasi topilmadi"))
          }
          return
        }
        setEntityList(res.entities)
        fetchGis(limit, page + 1)
      })
      .finally(() => setButtonLoader(false))
  }

  const fetchEntityCoordinates = () => {
    if ((selectedCityId && selectedRegionId) || searchText) {
      setButtonLoader(true)
      setEntityList([])
      fetchGis(100, 1)
    } else {
      return setEntityList(null)
    }
  }

  const coordinates = useMemo(() => {
    if (!entityList) return null
    return entityList.map((entity, index) => {
      const coordinateProperty = entity.entity_properties.filter(
        (property) => property.property_id === mapPropertyId
      )[0]?.value

      if (!coordinateProperty) return null

      const coordinates = JSON.parse(coordinateProperty)

      const centerCoords = centroid({
        type: "Polygon",
        coordinates,
      })?.geometry?.coordinates

      return {
        id: index + 1,
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates,
        },

        properties: {
          id: entity.id,
          number: entity.entity_number,
          status: entity.status.name,
          city: entity.city.name,
          region: entity.region.name,
          address: entity.address,
          long: centerCoords?.[0] || coordinates?.[0]?.[0]?.[0],
          lat: centerCoords?.[1] || coordinates?.[0]?.[0]?.[1],
          typeCode: entity.entity_type_code || 1,
        },
      }
    })
  }, [entityList])

  return (
    <div ref={ref} className="w-full">
      <div
        className="absolute top-0 left-0 bg-white rounded-br-lg"
        style={{ zIndex: 1000 }}
      >
        <div className="select-area flex gap-2 p-4">
          <AutoComplate
            placeholder={t("region.area")}
            style={{ width: "200px" }}
            isClearable
            onChange={(val) => setSelectedCityId(val?.value?.id)}
          />

          <AutoComplate
            placeholder={t("region")}
            style={{ width: "200px" }}
            url="/regions"
            isClearable
            onFetched={(res) => res.regions}
            params={selectedCityId}
            onChange={(val) => setSelectedRegionId(val?.value?.id)}
          />

          <Button
            loading={buttonLoader}
            color="primary"
            onClick={fetchEntityCoordinates}
          >
            Xaritada ko'rsatish
          </Button>
        </div>
        <div
          className="bg-white rounded-br-lg overflow-hidden"
          style={{ zIndex: 1000 }}
        >
          <StatusTag
            disableBorderRadius
            color="#095fc1"
            innerText={
              <div>
                Xaritadagi yer uchastkalari soni:{" "}
                <strong>{entityList?.length ?? 0}</strong>
              </div>
            }
          />
        </div>
      </div>

      <Map
        fullScreen
        initialFeatures={coordinates}
        centerCoordinates={coordinates?.[0]?.geometry?.coordinates?.[0]?.[0]}
        mapHeight={`calc(100vh - ${globalAlertHeight}px)`}
        mapWidth={mapWidth}
        zoom={6}
      />
    </div>
  )
}

export default OpenMap
