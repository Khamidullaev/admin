import { useTranslation } from "react-i18next"
import Card from "../../components/Card"
import Header from "../../components/Header"
import Input from "../../components/Input"
import Breadcrumb from "../../components/Breadcrumb/index"
import { useParams } from "react-router"
import Form from "../../components/Form/Index"
import { Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import axios from "../../utils/axios"
import { useEffect } from "react"
import CustomButton from "../../components/Buttons/index"
import { Link, useHistory } from "react-router-dom"
import Modal from "./Modal"
import ActionHistory from "../../components/ActionHistory"
import StatusTag from "../../components/Tag/StatusTag"
import Loadable from "react-loadable"
import TableLoader from "../../components/TableLoader"
import FullScreenLoader from "../../components/FullScreenLoader"
import Gallery from "../../components/Gallery"
import GenerateFieldComponent from "../../utils/generateFieldComponent"
import moment from "moment"
import responseFormatter from "../../components/map/responseFormatter"

const Map = Loadable({
  loader: () => import("../../components/map/Map"),
  loading: TableLoader,
})

const UsersPremisesCreate = () => {
  const { t } = useTranslation()
  const params = useParams()
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({})
  const [loader, setLoader] = useState(true)
  const [modalType, setModalType] = useState(null)
  const [mapFeatures, setMapFeatures] = useState([])
  const [gallery, setGallery] = useState([])

  const closeModal = () => setModalType(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    if (!params.id) return setLoader(false)

    axios
      .get(`/entity-draft/${params.id}`)
      .then((res) => {
        setInitialValues(res)
        const formattedCoordinates = responseFormatter([res], "entity_single")
        setMapFeatures(formattedCoordinates)
        setGallery(res.entity_gallery ?? [])
      })
      .finally(() => setLoader(false))
  }

  const onSubmit = (values) => {
    // saveChanges(values)
  }

  const ValidationSchema = Yup.object().shape({
    // status: Yup.bool().required(t("required.field.error")),
  })

  const routes = [
    {
      title: t("new.offers"),
      link: true,
      route: "/home/settings/status",
    },
    {
      title: params.id
        ? t("offer") + " № " + initialValues.entity_draft_number
        : t("create"),
    },
  ]

  const generateButtons = (statusCode) => {
    switch (statusCode) {
      case "NEW_DRAFT":
        return [
          <CustomButton
            size="large"
            shape="text"
            color="text-green-600"
            onClick={acceptForConsideration}
          >
            {t("accept.for.consideration")}
          </CustomButton>,
        ]

      case "VIEWING_DRAFT":
        return [
          <CustomButton
            size="large"
            shape="text"
            color="text-red-600"
            onClick={() => {
              setModalType("reject")
            }}
          >
            {t("reject")}
          </CustomButton>,
          <CustomButton
            size="large"
            shape="text"
            color="text-green-600"
            onClick={() => {
              setModalType("accept")
            }}
          >
            {t("accept")}
          </CustomButton>,
        ]

      default:
        return []
    }
  }

  const acceptForConsideration = () => {
    setLoader(true)
    updateStatus()
  }

  const updateStatus = () => {
    const entity_draft_id = params.id
    const status_id = initialValues?.status?.id
    axios
      .put("/entity-draft-status", { entity_draft_id, status_id })
      .then((res) => fetchData())
  }

  const finishedStatus = (data) => {
    const entity_draft_id = params.id
    const status_id = initialValues?.status?.id
    data.status_id = status_id
    axios
      .patch(`/entity-draft/${entity_draft_id}`, data)
      .then((res) => history.push("/home/new-offers"))
  }

  return (
    <div>
      <Modal
        type={modalType}
        closeModal={closeModal}
        finishedStatus={finishedStatus}
        entityId={initialValues?.entity?.id}
      />

      {loader ? (
        <div className="w-full flex align-center justify-center py-10">
          <FullScreenLoader />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ValidationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Header
               className="sticky top-0 z-2"
                startAdornment={[<Breadcrumb routes={routes} />]}
                endAdornment={generateButtons(initialValues?.status?.code)}
              />

              <div
                className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
                style={{ fontSize: "14px", lineHeight: "24px" }}
              >
                <div className="col-span-7">
                  <Card
                    title={
                      t("offer") + " № " + initialValues.entity_draft_number
                    }
                    extra={
                      <StatusTag
                        color={initialValues?.status?.color}
                        innerText={initialValues?.status?.name}
                      />
                    }
                  >
                    {/* ---------ENTITY---------- */}
                    {initialValues.entity?.id ? (
                      <div className="mb-6">
                        <div className="w-full flex items-baseline">
                          <div className="w-1/3">Yer uchastkasi raqami</div>
                          <div className="w-2/3">
                            <Link
                              to={`/home/application/edit/${initialValues.entity?.id}/1`}
                              className="hover:no-underline underline text-blue-500"
                            >
                              {initialValues.entity?.entity_number}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    {/* ---------APPLICANT---------- */}
                    <div>
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("applicant")}</div>
                        <div className="w-2/3">
                          <Form.Item name="applicantName" formik={formik}>
                            <Input
                              disabled
                              id="code"
                              {...formik.getFieldProps("applicant.name")}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {/* ---------CITY---------- */}
                    <div>
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("city")}</div>
                        <div className="w-2/3">
                          <Form.Item name="city" formik={formik}>
                            <Input
                              disabled
                              id="city"
                              {...formik.getFieldProps("city.name")}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {/* ---------REGION---------- */}
                    <div>
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("region")}</div>
                        <div className="w-2/3">
                          <Form.Item name="region" formik={formik}>
                            <Input
                              disabled
                              id="region"
                              {...formik.getFieldProps("region.name")}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {/* ---------DISTRICT--------- */}
                    <div>
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("district")}</div>
                        <div className="w-2/3">
                          <Form.Item name="district" formik={formik}>
                            <Input
                              disabled
                              id="district"
                              {...formik.getFieldProps("district.name")}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {/* ---------CREATED_AT--------- */}
                    <div>
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("created.time")}</div>
                        <div className="w-2/3">
                          <Form.Item name="created_at" formik={formik}>
                            <Input
                              disabled
                              id="created_at"
                              value={moment(formik.values.created_at).format(
                                "HH:mm:ss -- DD.MM.YYYY"
                              )}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                    {initialValues.entity_properties
                      ?.filter((element) => element.property.type !== "map")
                      .map((property) => (
                        <div className="mb-6">
                          <div className="w-full flex items-baseline">
                            <div className="w-1/3">
                              {property.property.label}
                            </div>
                            <div className="w-2/3">
                              {/* <Input disabled value={property.value} /> */}
                              <GenerateFieldComponent
                                type={property.property.type}
                                value={property.value}
                                placeholder={"----"}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                  </Card>

                  {mapFeatures.length > 0 && (
                    <Card className="mt-6" title="Выбранная площад">
                      <Map
                        viewportCenter={
                          mapFeatures[0]?.geometry?.coordinates?.[0]?.[0]
                        }
                        initialFeatures={mapFeatures}
                        mapHeight={260}
                        noControls
                        notEditable
                      />
                    </Card>
                  )}

                  <Card title="Yer uchastkasi rasmlari" className="mt-6">
                    <Gallery
                      gallery={gallery}
                      setGallery={setGallery}
                      notEditable
                    />
                  </Card>
                </div>

                {params.id && (
                  <div className="col-span-5">
                    <ActionHistory
                      title="Taklif ustida bajarilgan harakatlar"
                      elementID={params.id}
                    />
                  </div>
                )}
              </div>
            </form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default UsersPremisesCreate
