import React from "react"
// import Button from 'components/form/button/Button'
// import { CloseIconSmall } from 'icons/map'
import { Popup } from "react-map-gl"
import { Link } from "react-router-dom"
import "./tooltip.scss"

const rowData = [
  {
    label: "Raqami",
    accessor: "number",
  },
  {
    label: "Holati",
    accessor: "status",
  },
  {
    label: "Viloyat",
    accessor: "city",
  },
  {
    label: "Tuman",
    accessor: "region",
  },
  {
    label: "Address",
    accessor: "address",
  },
]
function ToolTip({ data, closeToolTip }) {
  console.log("data => ", data)
  return (
    <>
      {data?.show ? (
        <Popup
          className="MapTooltip"
          longitude={data.long}
          latitude={data.lat}
          anchor="bottom"
          style={{ borderRadius: "200px" }}
          captureScroll
        >
          <div style={{ minWidth: "400px" }}>
            <h1
              className="popup-title font-bold mb-4 px-4"
              style={{ fontSize: "18px" }}
            >
              Yer uchastkasi
            </h1>

            <div className="popu-list">
              {rowData.map((row, index) => (
                <>
                  <div
                    className="popup-row flex justify-between items-center px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: index % 2 === 1 ? "#F6F8F9" : "#fff",
                    }}
                  >
                    <div className="row-label" style={{ fontWeight: 500 }}>
                      {row.label}:
                    </div>
                    <div className="row-value">{data[row.accessor]}</div>
                  </div>
                </>
              ))}
              <Link
                to={`/home/application/edit/${data.id}/${data.typeCode}`}
                className="flex justify-center items-center px-4 py-2 rounded-lg text-center cursor-pointer"
                style={{ color: "#4094F7", textDecoration: "underline" }}
              >
                Yer uchastkasi sahifasiga o'tish
              </Link>

              {/* <div className="popup-row flex justify-between items-center px-4 py-2">
                                <div className="row-label">Ҳолати</div>
                                <div className="row-value">Рад этилди (таъқиқланган)</div>
                            </div>
                            <div className="popup-row flex justify-between items-center px-4 py-2" style={{backgroundColor: "#F6F8F9"}}>
                                <div className="row-label">Вилоят</div>
                                <div className="row-value">Тошкент шаҳар</div>
                            </div> */}
            </div>
          </div>

          {/* <ToolTipContainer
                        longitude={data.properties.long}
                        latitude={data.properties.lat}
                        anchor="bottom"
                        captureScroll
                        offsetY={data?.offsetY}
                        offsetX={data?.offsetX}
                    >
                        <header>
                            <h3>{data?.properties?.name}</h3>
                            <button type="button" onClick={closeToolTip}>
                                <CloseIconSmall />
                            </button>
                        </header>
                        {data?.properties?.image ? (
                            <div>
                                <img
                                    src={data?.properties?.image}
                                    alt={data?.properties?.name}
                                />
                            </div>
                        ) : (
                            ''
                        )}
                        <main>
                            {rowData.map((row, index) => (
                                <ToolTipRow
                                    key={row.label}
                                    even={index % 2 === 1}
                                >
                                    <span>{row.label}</span>
                                    <span>
                                        {data?.properties?.[row.accessor] ||
                                            '—'}
                                    </span>
                                </ToolTipRow>
                            ))}
                            <Button
                                fullWidth
                                primary
                                onClick={() =>
                                    router.push({
                                        pathname: '/create-application',
                                        query: {
                                            entity_id: data.properties.id,
                                        },
                                    })
                                }
                            >
                                Taklif kiritish
                            </Button>
                        </main>
                    </ToolTipContainer> */}
        </Popup>
      ) : (
        ""
      )}
    </>
  )
}

export default ToolTip
