import { centroid } from "@turf/turf"

export default function responseFormatter(arr, entity_single) {
  const formattedArr = []
  // eslint-disable-next-line no-restricted-syntax
  for (const obj of arr) {
    const area =
      obj.entity_properties.find((el) => el.property_id === process.env.AREA_ID)
        ?.value || 0
    // const type =
    //     obj.entity_properties.find(
    //         (el) => el.property_id === process.env.FEATURE_TYPE_ID,
    //     )?.value || 'Polygon'
    let coordinates = JSON.parse(
      obj.entity_properties.find(
        (el) => el.property_id === process.env.REACT_APP_COORDINATES_ID
      )?.value || null
    )
    if (entity_single) {
      try {
        coordinates = JSON.parse(
          obj.entity_properties.find(
            (el) =>
              el.property.id === process.env.REACT_APP_COORDINATES_ID ||
              el.property.id === process.env.REACT_APP_MAP_PROPERTY_ID
          )?.value || null
        )
      } catch (e) {
        console.log("Error in responseFormatter.js : " + e)
      }
    }
    if (coordinates && coordinates[0]?.length === 0) {
      return []
    }

    if (coordinates) {
      const centerCoords = centroid({
        type: "Polygon",
        coordinates,
      })?.geometry?.coordinates

      const properties = {
        id: obj.id,
        name: obj.address,
        status: obj.status.name,
        application_quantity: 1,
        cadastral_number: obj.kadastr_number,
        city: obj.city?.name,
        region: obj.region?.name,
        district: obj.address,
        area,
        long: centerCoords?.[0] || coordinates?.[0]?.[0]?.[0],
        lat: centerCoords?.[1] || coordinates?.[0]?.[0]?.[1],
        description: "",
      }

      const geometry = {
        type: "Polygon",
        coordinates,
      }
      const formatted = { type: "Feature", geometry, properties }
      formattedArr.push(formatted)
    }
  }
  return formattedArr
}
