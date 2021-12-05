import { useTranslation } from "react-i18next"
import Input from "../../../components/Input"
import Form from "../../../components/Form/Form"
import FormItem from "../../../components/Form/FormItem"
import Header from "../../../components/Header"
import Card from "../../../components/Card"
import { useState } from "react"
import axios from "../../../utils/axios"
import { useHistory, useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { useEffect } from "react"
import Breadcrumb from "../../../components/Breadcrumb"
import CustomButton from "../../../components/Buttons"
import Select from "../../../components/Select"
import Filters from "../../../components/Filters"
import { StyledTab, StyledTabs } from "../../../components/StyledTabs"
import { TabPanel } from "../../../components/Tab/TabBody"
import { useTheme } from "@material-ui/core"
import RequiredStar from "../../../components/RequiredStar"

const Create = () => {
  const { t } = useTranslation()
  const params = useParams()
  const history = useHistory()
  const theme = useTheme()

  const rule = {
    required: true,
    message: t("required.field.error"),
  }

  // ------------------STATE-------------------

  const [data, setData] = useState({})
  const [loader, setLoader] = useState(true)
  const [buttonLoader, setButtonLoader] = useState(false)
  const [citiesList, setCitiesList] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)

  // ----------------REQUESTS TO SERVER---------------

  const fetchData = () => {
    if (!params.id) return setLoader(false)
    axios
      .get("/region/" + params.id)
      .then((res) =>
        setData({ ...res, city: { value: res.city, label: res.city.name } })
      )
      .finally(() => setLoader(false))
  }

  const fetchCitiesList = () => {
    axios
      .get("/city")
      .then((res) =>
        setCitiesList(
          res?.cities?.map((city) => ({ value: city, label: city.name }))
        )
      )
  }

  const saveChanges = (data) => {
    setButtonLoader(true)

    const createParams = {
      url: "/region/",
      method: "POST",
    }

    const editParams = {
      url: "/region/" + params.id,
      method: "PUT",
    }

    const selectedParams = params.id ? editParams : createParams

    axios({ ...selectedParams, data })
      .then((res) => history.push("/home/settings/districts"))
      .finally(() => setButtonLoader(false))
  }

  // ---------------------USE EFFECT----------------------

  useEffect(() => {
    fetchCitiesList()
    fetchData()
  }, [])

  // -----------------------ON SUBMIT--------------------

  const onSubmit = (values) => {
    saveChanges({
      ...values,
      id: params.id,
      soato: +values.soato,
      code: +values.code,
      city_id: values.city.value.id,
    })
  }

  // -----------------------CONSTANS---------------------

  const routes = [
    {
      title: t("districts"),
      link: true,
      route: "/home/settings/districts",
    },
    {
      title: params.id ? data.name : t("create"),
    },
  ]

  const tabLabel = (text, isActive = false) => {
    return <span className="px-1">{text}</span>
  }

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    }
  }

  // ----------------------RENDER-----------------------

  if (loader)
    return (
      <div className="w-full flex align-center justify-center">
        <CircularProgress />
      </div>
    )

  return (
    <div>
      <Form initialValues={data} onSubmit={onSubmit}>
        <Header
          title={t("districts")}
          startAdornment={[<Breadcrumb routes={routes} />]}
          endAdornment={
            selectedTab === 0
              ? [
                  <CustomButton
                    size="large"
                    shape="text"
                    color="text-primary-600"
                    onClick={(e) => history.push("/home/settings/districts")}
                  >
                    {t("cancel")}
                  </CustomButton>,
                  <CustomButton
                    size="large"
                    shape="text"
                    color="text-primary-600"
                    type="submit"
                    loading={buttonLoader}
                  >
                    {t(params.id ? "save" : "create")}
                  </CustomButton>,
                ]
              : [
                  <CustomButton
                    size="large"
                    shape="text"
                    color="text-primary-600"
                    onClick={(e) =>
                      history.push("/home/settings/county/create")
                    }
                  >
                    {t("create")}
                  </CustomButton>,
                ]
          }
        />

        <Filters>
          <StyledTabs
            value={selectedTab}
            onChange={(_, value) => setSelectedTab(value)}
            indicatorColor="primary"
            textColor="primary"
            centered={false}
            aria-label="full width tabs example"
            TabIndicatorProps={{ children: <span className="w-2" /> }}
          >
            <StyledTab
              label={tabLabel(t("general.information"))}
              {...a11yProps(0)}
            />
          </StyledTabs>
        </Filters>

        {/* ========================GENERAL INFORMAITON========================== */}
        <TabPanel value={selectedTab} index={0} dir={theme.direction}>
          <div
            className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
            style={{ fontSize: "14px", lineHeight: "24px" }}
          >
            <div className="col-span-7">
              <Card title={t("general.information")}>
                {/* ------------------NAME-------------------- */}
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("name")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="name" rule={rule}>
                      <Input />
                    </FormItem>
                  </div>
                </div>

                {/* ------------------RU NAME-------------------- */}
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("russian.name")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="ru_name" rule={rule}>
                      <Input />
                    </FormItem>
                  </div>
                </div>

                {/* ------------------SOATO-------------------- */}
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("Soato")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="soato" rule={rule}>
                      <Input type="number" />
                    </FormItem>
                  </div>
                </div>

                {/* ------------------CODE-------------------- */}
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("code")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="code" rule={rule}>
                      <Input type="number" />
                    </FormItem>
                  </div>
                </div>

                {/* ------------------CITY-------------------- */}
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("region")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="city" rule={rule}>
                      <Select options={citiesList} />
                    </FormItem>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabPanel>
      </Form>
    </div>
  )
}

export default Create
