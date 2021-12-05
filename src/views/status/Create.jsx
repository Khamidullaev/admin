import { useTranslation } from "react-i18next"
import Card from "../../components/Card"
import Header from "../../components/Header"
import Input from "../../components/Input"
import Breadcrumb from "../../components/Breadcrumb/index"
import { useParams } from "react-router"
import Switch from "../../components/Switch"
import { Formik } from "formik"
import { useState } from "react"
import * as Yup from "yup"
import axios from "../../utils/axios"
import { useEffect } from "react"
import CustomButton from "../../components/Buttons/index"
import { useHistory } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import TextArea from "../../components/Textarea"
import ColorSelect from "../../components/ColorSelect/index"
import Select from "../../components/Select"
import AutoComplate from "../../components/Select/AutoComplate"
import Form from "../../components/Form/Form"
import FormItem from "../../components/Form/FormItem"

const UsersPremisesCreate = () => {
  const { t } = useTranslation()
  const params = useParams()
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({})
  const [loader, setLoader] = useState(true)
  const [entityTypesList, setEntityTypesList] = useState([])

  useEffect(() => {
    fetchEntityTypesList()
    fetchData()
  }, [])

  const fetchData = () => {
    if (!params.id) return setLoader(false)
    axios.get(`/status/${params.id}`).then((res) => {
      setInitialValues({
        ...res,
        type_code: {
          value: res.type_code_object.code,
          label: res.type_code_object.name,
        },
      })
      fetchParentStatusData(res.parent_status_id)
    })
  }

  const fetchParentStatusData = (parentStatusId) => {
    axios
      .get(`status/${parentStatusId}`)
      .then((res) =>
        setInitialValues((prev) => ({
          ...prev,
          parent_status: { value: res, label: res.name },
        }))
      )
      .finally(() => setLoader(false))
  }

  console.log("INITIAL VALUES ===> ", initialValues)

  const fetchEntityTypesList = () => {
    axios
      .get("/global-entity-types")
      .then((res) =>
        setEntityTypesList(
          res.map((type) => ({ value: type.code, label: type.name }))
        )
      )
  }

  const saveChanges = (data) => {
    if (params.id)
      axios.put(`/status/${params.id}`, data).then((res) => {
        history.goBack()
      })
    else
      axios.post(`/status`, data).then((res) => {
        history.goBack()
      })
  }

  const onSubmit = (values) => {
    saveChanges({
      ...values,
      type_code: values.type_code.value,
      parent_status_id: values.parent_status.value.id,
    })
  }

  const routes = [
    {
      title: t("application.statuses"),
      link: true,
      route: "/home/settings/status",
    },
    {
      title: params.id ? initialValues?.name : t("create"),
    },
  ]

  return (
    <div>
      {loader ? (
        <div className="w-full flex align-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          <Header
            title={t("organization.users")}
            startAdornment={[<Breadcrumb routes={routes} />]}
            endAdornment={[
              <CustomButton
                size="large"
                shape="text"
                color="text-primary-600"
                type="submit"
              >
                {t(params.id ? "save" : "create")}
              </CustomButton>,
            ]}
          />

          <div
            className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
            style={{ fontSize: "14px", lineHeight: "24px" }}
          >
            <div className="col-span-7">
              <Card title={t("general.information")}>
                {/* ---------STATUS---------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("status")}</div>
                    <div className="w-2/3">
                      <FormItem name="is_active">
                        <Switch color="primary" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------CODE--------- */}

                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("code")}</div>
                    <div className="w-2/3">
                      <FormItem name="code">
                        <Input />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------NAME--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("name")}</div>
                    <div className="w-2/3">
                      <FormItem name="name">
                        <Input />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------RUSSIAN_NAME--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("russian.name")}</div>
                    <div className="w-2/3">
                      <FormItem name="ru_name">
                        <Input />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------DESCRIPTION--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("description")}</div>
                    <div className="w-2/3">
                      <FormItem name="description">
                        <TextArea />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------TYPE CODE--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("Тип заявки")}</div>
                    <div className="w-2/3">
                      <FormItem name="type_code">
                        <Select options={entityTypesList} />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------PARENT STATUS--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("previous.status")}</div>
                    <div className="w-2/3">
                      <FormItem name="parent_status">
                        <AutoComplate
                          url="/status"
                          onFetched={(res) => res.statuses}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------COLOR--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("color")}</div>
                    <div className="w-2/3">
                      <FormItem name="color">
                        <ColorSelect
                          colorsList={[
                            "#0D9676",
                            "#CC0905",
                            "#0452C8",
                            "#84919A",
                            "#7E10E5",
                            "#F8C51B",
                            "#1565C0",
                            "#EF6C00",
                          ]}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default UsersPremisesCreate
