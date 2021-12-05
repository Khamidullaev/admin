import { useState, useEffect } from "react"
import axios from "../../utils/axios"
// import Select from '@material-ui/core/Select'
// import Switch from '@material-ui/core/Switch'
import { useHistory, useParams } from "react-router-dom"
import Header from "../../components/Header"
import Breadcrumb from "../../components/Breadcrumb/index"
import CustomButton from "../../components/Buttons/index"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "../../components/Card/index"
import { RightContent } from "./RightContent"
import Skeleton from "@material-ui/lab/Skeleton"
import { useTranslation } from "react-i18next"
import { getInputTypes } from "../../config/defaultSettings"

import { Formik } from "formik"
import * as Yup from "yup"
import Form from "../../components/Form/Index"
import Input from "../../components/Input/index"
import Textarea from "../../components/Textarea/index"
import Select from "../../components/Select/index"
import Switch from "../../components/Switch"
import GenerateFieldComponent from "../../utils/generateFieldComponent"
import Checkbox from "../../components/Checkbox"
import { collectionTypes } from "./collectionTypes"
import SelectTreeView from "../../components/Select/SelectTreeView"

export default function PropertyCreate() {
  // **** USE-HOOKS ****
  const { t } = useTranslation()
  const history = useHistory()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [isRequired, setIsRequired] = useState(false)
  const [selectedType, setSelectedType] = useState(null)
  const [label, setLabel] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const [withConfirmation, setWithConfirmation] = useState(false)
  const [isConfirm, setIsConfirm] = useState(false)
  const [isGettingData, setIsGettingData] = useState(false)
  const [optionsList, setOptionsList] = useState([{ name: "", value: "" }])
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [initialValues, setInitialValues] = useState({
    status: true,
    name: "",
    type: {},
    description: "",
    validation: "none",
    is_required: false,
    with_confirmation: false,
  })

  useEffect(() => {
    console.log(params)
    if (params.id) {
      getProperty(params.id)
    }
  }, [])

  // **** FUNCTIONS ****
  const getProperty = (id) => {
    setIsGettingData(true)
    axios
      .get(`/property/${id}`)
      .then((res) => {
        setInitialValues({
          ...res,
          type: inputTypes.filter((el) => el.value === res.type)[0],
        })
        setOptionsList(res.property_options)
        setSelectedType(res.type)
        setPlaceholder(res.placeholder)
        setLabel(res.label)
        setWithConfirmation(res.with_confirmation)
        setSelectedCollection(collectionTypes.find(el => el.value === res?.collection_name))
      })
      .finally(() => setIsGettingData(false))
  }

  // **** EVENTS ****
  const onSubmit = (values) => {
    setLoading(true)
    if (params.id) {
      axios
        .put(`/property/${params.id}`, {
          ...values,
          validation: isRequired ? values.validation : "",
          type: values.type.value,
          collection_name: selectedCollection?.value,
          property_options:
            values.type.value === "checkbox" || values.type.value === "radio"
              ? optionsList
              : [],
        })
        .then((res) => {
          console.log(res)
          history.push("/home/settings/property")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      axios
        .post("/property", {
          ...values,
          validation: isRequired ? values.validation : "",
          type: values.type.value,
          collection_name: selectedCollection?.value,
          property_options:
            values.type.value === "checkbox" || values.type.value === "radio"
              ? optionsList
              : [],
        })
        .then((res) => {
          console.log(res)
          history.push("/home/settings/property")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const onIsRequiredChange = (value, formik) => {
    setIsRequired(value)
    formik.setFieldValue("is_required", value)
    if (value) {
      formik.setFieldValue("validation", "")
    } else {
      formik.setFieldValue("validation", "none")
    }
  }

  // **** CONSTANTS ****
  const ValidationSchema = Yup.object().shape({
    status: Yup.bool().required(t("required.field.error")),
    name: Yup.string().required(t("required.field.error")),
    type: Yup.object().required(t("required.field.error")),
    with_confirmation: Yup.string().required(t("required.field.error")),
    description: Yup.string().required(t("required.field.error")),
    // validation: Yup.string().required(t("required.field.error")),
    is_required: Yup.bool().required(t("required.field.error")),
  })

  const inputTypes = getInputTypes(t)

  const routes = [
    {
      title: t("settings"),
      link: true,
      route: "/home/settings",
    },
    {
      title: t("application.fields"),
      link: true,
      route: "/home/settings/property",
    },
    {
      title: params.id ? initialValues.name : t("create"),
    },
  ]

  return (
    <div>
      {!params.id || !isGettingData ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={ValidationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Header
                title={t("application.fields")}
                startAdornment={[<Breadcrumb routes={routes} />]}
                endAdornment={[
                  <CustomButton
                    size="large"
                    shape="text"
                    color="text-secondary"
                    onClick={() => history.push("/home/settings/property")}
                  >
                    {t("cancel")}
                  </CustomButton>,
                  <CustomButton
                    size="large"
                    type="submit"
                    shape="text"
                    color="text-primary-600"
                    // onClick={onSubmit}
                    icon={
                      loading ? (
                        <CircularProgress color="inherit" size={14} />
                      ) : (
                        <></>
                      )
                    }
                  >
                    {t(params.id ? "edit" : "create")}
                  </CustomButton>,
                ]}
              />

              <div className="p-4 w-full grid grid-cols-12 gap-4 box-border">
                <div className="col-span-6">
                  <Card title="Общие сведения">
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("status")}</div>
                      <div className="w-2/3">
                        <Form.Item name="status" formik={formik}>
                          <Switch
                            id="status"
                            color="primary"
                            checked={formik.values.status}
                            onChange={(val) => {
                              formik.setFieldValue("status", val)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("property.name")}</div>
                      <div className="w-2/3">
                        <Form.Item name="name" formik={formik}>
                          <Input
                            id="name"
                            type="text"
                            {...formik.getFieldProps("name")}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("type")}</div>
                      <div className="w-2/3">
                        <Form.Item name="type" formik={formik}>
                          <Select
                            id="type"
                            options={inputTypes}
                            value={formik.values.type}
                            onChange={(val) => {
                              formik.setFieldValue("type", val)
                              setSelectedType(val?.value)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("description")}</div>
                      <div className="w-2/3">
                        <Form.Item name="description" formik={formik}>
                          <Textarea
                            id="description"
                            {...formik.getFieldProps("description")}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("title")}</div>
                      <div className="w-2/3">
                        <Form.Item name="label" formik={formik}>
                          <Input
                            id="label"
                            type="text"
                            value={formik.values.label}
                            onChange={(e) => {
                              formik.setFieldValue("label", e.target.value)
                              setLabel(e.target.value)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("placeholder")}</div>
                      <div className="w-2/3">
                        <Form.Item name="placeholder" formik={formik}>
                          <Input
                            id="placeholder"
                            type="text"
                            value={formik.values.placeholder}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "placeholder",
                                e.target.value
                              )
                              setPlaceholder(e.target.value)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("with.confirmation")}</div>
                      <div className="w-2/3">
                        <Form.Item name="with_confirmation" formik={formik}>
                          <Switch
                            id="with_confirmation"
                            color="primary"
                            checked={formik.values.with_confirmation}
                            onChange={(val) => {
                              formik.setFieldValue("with_confirmation", val)
                              setWithConfirmation(val)
                            }}
                          />
                        </Form.Item>
                      </div>
                    </div>

                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("required.field")}</div>
                      <div className="w-2/3">
                        <Form.Item name="is_required" formik={formik}>
                          <Switch
                            id="is_required"
                            color="primary"
                            checked={formik.values.is_required}
                            onChange={(val) => onIsRequiredChange(val, formik)}
                          />
                        </Form.Item>
                      </div>
                    </div>
                    {isRequired && (
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{t("validation")}</div>
                        <div className="w-2/3">
                          <Form.Item name="validation" formik={formik}>
                            <Input
                              id="validation"
                              type="text"
                              {...formik.getFieldProps("validation")}
                            />
                          </Form.Item>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                <div className="col-span-6">
                  {selectedType && (
                    <Card title={t("preview")} className="mb-5">
                      <div className="w-full flex items-baseline">
                        <div className="w-1/3">{label}</div>
                        <div className="w-2/3">
                          {withConfirmation && (
                            <div className="mb-3">
                              <Checkbox
                                checked={isConfirm}
                                onChange={(val) => setIsConfirm(val)}
                              />
                            </div>
                          )}
                          {(!withConfirmation || isConfirm) && (
                            <GenerateFieldComponent
                              type={selectedType}
                              property_options={optionsList}
                              placeholder={placeholder}
                              collection_name={selectedCollection?.value}
                            />
                          )}
                        </div>
                      </div>
                    </Card>
                  )}

                  {(selectedType === "checkbox" ||
                    selectedType === "radio") && (
                    <div className="col-span-5">
                      <RightContent
                        value={optionsList}
                        onChange={setOptionsList}
                      />
                    </div>
                  )}

                  {/* ----------COLLECTION SELECT------ */}

                  <div className="col-span-5">
                    <Card title={t("collection")}>
                      <Select
                        className="mb-5"
                        options={collectionTypes}
                        value={selectedCollection}
                        onChange={setSelectedCollection}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      ) : (
        <div>
          <Skeleton variant="rect" width="100%" height={64} animation="wave" />
          <div className="p-4 w-full grid grid-cols-2 gap-4 box-border">
            <div>
              <Skeleton
                variant="rect"
                width="100%"
                height={500}
                animation="wave"
              />
            </div>
            <div>
              <Skeleton
                variant="rect"
                width="100%"
                height={500}
                animation="wave"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
