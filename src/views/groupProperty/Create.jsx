import { useState, useEffect } from "react"
import axios from "../../utils/axios"
// import Select from '@material-ui/core/Select'
import { useHistory, useParams } from "react-router-dom"
import Header from "../../components/Header"
import Breadcrumb from "../../components/Breadcrumb/index"
import CustomButton from "../../components/Buttons/index"
import Switch from "../../components/Switch/index"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "../../components/Card/index"
// import Skeleton from '@material-ui/lab/Skeleton'
import { useTranslation } from "react-i18next"
import Tag from "../../components/Tag/index"
import Skeleton from "../../components/Skeleton"

import { Formik } from "formik"
import * as Yup from "yup"
import Input from "../../components/Input/index"
import Textarea from "../../components/Textarea/index"
import Select from "../../components/Select/index"
import AutoComplate from "../../components/Select/AutoComplate"
import Form from "../../components/Form/Form"
import FormItem from "../../components/Form/FormItem"
import RequiredStar from "../../components/RequiredStar"

export default function PropertyCreate() {
  // **** USE-HOOKS ****
  const { t } = useTranslation()
  const history = useHistory()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [isGettingData, setIsGettingData] = useState(false)
  const [groupProperty, setGroupProperty] = useState(null)
  const [properties, setProperties] = useState([])
  const [statuses, setStatuses] = useState([])
  const [types, setTypes] = useState([])

  const [fields, setFields] = useState([])
  const [viewStatusValues, setViewStatusValues] = useState([])
  const [editStatusValues, setEditStatusValues] = useState([])
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const [typeValue, setTypeValue] = useState(null)
  const [initialValues, setInitialValues] = useState({
    status: true,
    name: "",
    description: "",
    step: "",
  })

  console.log("ORG ===>", selectedOrganization)

  useEffect(() => {
    getPropertyies()
    getStatuses()
    getTypes()
    if (params.id) {
      getGroupProperty(params.id)
    }
  }, [])

  // **** FUNCTIONS ****
  const getGroupProperty = async (id) => {
    setIsGettingData(true)
    try {
      const {
        name,
        step,
        description,
        status,
        properties,
        read_statuses,
        write_statuses,
        type,
        organization
      } = await axios.get(`/group-property/${id}`)
      const entityTypes = await getTypes()
      setTypeValue(entityTypes.filter((el) => el.value === type)[0])
      if(organization?.name) {
        setSelectedOrganization({label: organization.name, value: organization})
      }
      
      const fields =
        properties && properties.length
          ? properties.map(({ name, id }) => ({ label: name, value: id }))
          : []

      setFields(fields)

      setInitialValues({
        name,
        description,
        status,
        step,
        fields,
        typeValue: entityTypes.filter((el) => el.value === type)[0],
      })

      setEditStatusValues(
        write_statuses && write_statuses.length
          ? write_statuses.map(({ name, id }) => ({ label: name, value: id }))
          : []
      )
      setViewStatusValues(
        read_statuses && read_statuses.length
          ? read_statuses.map(({ name, id }) => ({ label: name, value: id }))
          : []
      )
    } catch (e) {
      console.log(e)
    } finally {
      setIsGettingData(false)
    }
  }

  const handleFormatOptions = (list) => {
    return list && list.length
      ? list.map((elm) => ({ label: elm.name, value: elm.id }))
      : []
  }

  const getPropertyies = () => {
    axios
      .get("/property")
      .then((res) => {
        console.log(res)
        if (res.properties) {
          setProperties(
            res.properties.map(({ name, id }) => ({ label: name, value: id }))
          )
        }
      })
      .finally(() => {})
  }

  const getStatuses = () => {
    axios
      .get("/status")
      .then((res) => {
        console.log(res)
        if (res.statuses) {
          setStatuses(
            res.statuses.map(({ name, id }) => ({ label: name, value: id }))
          )
        }
      })
      .finally(() => {})
  }

  const getTypes = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get("/global-entity-types")
        if (res) {
          const types = res.map(({ name, code }) => ({
            label: name,
            value: code,
          }))
          setTypes(types)
          resolve(types)
        }
        resolve([])
      } catch (e) {
        reject(e)
      }
    })
  }

  // **** EVENTS ****
  const onSubmit = (values) => {
    console.log("FORM SUBMIT => ", values, fields)
    values.step = +values.step
    values.organization = selectedOrganization?.value ? {id: selectedOrganization.value?.id, name: selectedOrganization.value?.name} : null
    setLoading(true)
    if (params.id) {
      axios
        .put(`/group-property/${params.id}`, {
          ...values,
          type: typeValue?.value,
          properties: fields.map((field, index) => ({
            property_id: field.value,
            order: index,
          })),
          read_statuses: viewStatusValues.map(({ value }) => value),
          write_statuses: editStatusValues.map(({ value }) => value),
        })
        .then((res) => {
          console.log(res)
          history.push("/home/settings/group-property")
        })
        .finally(() => {
          setLoading(false)
        })
    } else {
      axios
        .post("/group-property", {
          ...values,
          type: typeValue.value,
          properties: fields.map((field, index) => ({
            property_id: field.value,
            order: index,
          })),
          read_statuses: viewStatusValues.map(({ value }) => value),
          write_statuses: editStatusValues.map(({ value }) => value),
        })
        .then((res) => {
          console.log(res)
          history.push("/home/settings/group-property")
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }

  const routes = [
    {
      title: t("application.field.groups"),
      link: true,
      route: "/home/settings/group-property",
    },
    {
      title: params.id ? initialValues.name : t("create"),
    },
  ]

  const rule = {
    required: true,
    message: t("required"),
  }

  return (
    <div>
      {!params.id || !isGettingData ? (
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          <Header
            title={t("application.field.groups")}
            startAdornment={[<Breadcrumb routes={routes} />]}
            endAdornment={[
              <CustomButton
                size="large"
                shape="text"
                color="text-secondary"
                onClick={() => history.push("/home/settings/group-property")}
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

          <div className="p-4 w-full grid grid-cols-2 gap-4 box-border">
            <div>
              <Card title={t("general.information")}>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">{t("status")}</div>
                  <div className="w-2/3">
                    <FormItem name="status" rule={rule}>
                      <Switch id="status" color="primary" />
                    </FormItem>
                  </div>
                </div>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("name")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="name" rule={rule}>
                      <Input id="name" type="text" />
                    </FormItem>
                  </div>
                </div>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("serial.number")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="step" rule={rule}>
                      <Input id="step" type="number" />
                    </FormItem>
                  </div>
                </div>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("description")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="description" rule={rule}>
                      <Textarea id="description" />
                    </FormItem>
                  </div>
                </div>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("fields")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="fields" rule={rule}>
                      <AutoComplate
                        id="fields"
                        url="/property"
                        onFetched={(res) => res.properties}
                        isMulti
                        value={fields}
                        formatOptions={handleFormatOptions}
                        onChange={setFields}
                      />
                    </FormItem>
                  </div>
                </div>
              </Card>
            </div>

            <div>
              <Card title={t("add.customization")}>
                <div className="w-full flex items-baseline mb-5">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("type.title")}</span>
                  </div>
                  <div className="w-2/3 pl-5">
                    <FormItem rule={rule} name="typeValue">
                      <Select
                        value={typeValue}
                        options={types}
                        onChange={setTypeValue}
                      />
                    </FormItem>
                  </div>
                </div>

                <div className="w-full flex items-center mb-5">
                  <div className="w-1/3" style={{textIndent: '10px'}} >{t("view.status.title")}</div>
                  <div className="w-2/3 pl-5">
                    <AutoComplate
                      id="statuses"
                      url="/status"
                      queryParams={{ type_code: typeValue?.value }}
                      onFetched={(res) => res.statuses}
                      isMulti
                      value={viewStatusValues}
                      formatOptions={handleFormatOptions}
                      onChange={setViewStatusValues}
                    />
                  </div>
                </div>

                <div className="w-full flex items-center mb-5">
                  <div className="w-1/3" style={{textIndent: '10px'}}>{t("edit.status.title")}</div>
                  <div className="w-2/3 pl-5">
                    <AutoComplate
                      id="statuses"
                      url="/status"
                      queryParams={{ type_code: typeValue?.value }}
                      onFetched={(res) => res.statuses}
                      isMulti
                      value={editStatusValues}
                      formatOptions={handleFormatOptions}
                      onChange={setEditStatusValues}
                    />
                  </div>
                </div>

                <div className="w-full flex items-center">
                  <div className="w-1/3" style={{textIndent: '10px'}}>{t("group.property.organization")}</div>
                  <div className="w-2/3 pl-5">
                    {/* <AutoComplate
                      id="statuses"
                      url="/status"
                      queryParams={{ type_code: typeValue?.value }}
                      onFetched={(res) => res.statuses}
                      value={selectedOrganization}
                      formatOptions={handleFormatOptions}
                      onChange={val => console.log("VAL ===>", val)}
                    /> */}
                    <AutoComplate
                      url='/organization'
                      value={selectedOrganization}
                      onChange={setSelectedOrganization}
                      queryName='search'
                      onFetched={(res) => res.organizations}
                    />
                  </div>
                </div>


                {/* <p className="text-md mt-4">{t("edit.status.title")}</p>
                <div className="w-full flex items-center">
                  <div className="flex-grow">
                    <AutoComplate
                      id="statuses"
                      url="/status"
                      queryParams={{ type_code: typeValue?.value }}
                      onFetched={(res) => res.statuses}
                      isMulti
                      value={editStatusValues}
                      formatOptions={handleFormatOptions}
                      onChange={setEditStatusValues}
                    />
                  </div>
                </div> */}

              </Card>
            </div>
          </div>
        </Form>
      ) : (
        <Skeleton />
      )}
    </div>
  )
}
