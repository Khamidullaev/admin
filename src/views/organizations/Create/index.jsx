import { CircularProgress } from "@material-ui/core"
import { Formik } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Header from "../../../components/Header"
import Breadcrumbs from "../../../components/Breadcrumb"
import { useHistory, useParams } from "react-router-dom"
import CustomButton from "../../../components/Buttons"
import Filters from "../../../components/Filters"
import { StyledTab, StyledTabs } from "../../../components/StyledTabs"
import { TabPanel } from "../../../components/Tab/TabBody"
import { useTheme } from "@material-ui/core"
import GeneralInformation from "./GeneralInformation"
import axios from "../../../utils/axios"
import * as Yup from "yup"
import { useEffect } from "react"
import StaffTable from "../../users/premises/Table"

const BranchCreate = () => {
  const { t } = useTranslation()
  const [loader, setLoader] = useState(true)
  const params = useParams()
  const history = useHistory()
  const theme = useTheme()
  const [initialValues, setInitialValues] = useState({ status: true })

  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    fetchOrganizationData()
  }, [])

  const fetchOrganizationData = () => {
    if (!params.id) return setLoader(false)
    axios
      .get(`/organization/${params.id}`)
      .then((res) => {
        setInitialValues(res)
      })
      .finally(() => setLoader(false))
  }

  const saveChanges = (data) => {
    if (!params.id) {
      axios
        .post("/organization", data)
        .then((res) => history.push("/home/settings/organizations"))
    } else {
      axios
        .put(`/organization/${params.id}`, data)
        .then((res) => history.push("/home/settings/organizations"))
    }
  }

  const onSubmit = (values) => {
    saveChanges(values)
  }

  const routes = [
    {
      title: t("organization"),
      link: true,
      route: "/home/settings/organizations",
    },
    {
      title: params.id ? initialValues.name : t("create"),
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t("required.field.error")),
    code: Yup.string().required(t("required.field.error")),
  })

  return (
    <div>
      {loader ? (
        <div className="w-full flex align-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <Header
                title={t("organizations")}
                startAdornment={[<Breadcrumbs routes={routes} />]}
                endAdornment={
                  selectedTab === 1
                    ? [
                        <CustomButton
                          size="large"
                          shape="text"
                          color="text-green-500"
                          onClick={() =>
                            history.push("/home/users/premises/create")
                          }
                        >
                          {t("add.user")}
                        </CustomButton>,
                      ]
                    : [
                        <CustomButton
                          size="large"
                          shape="text"
                          color="text-primary-600"
                          type="submit"
                        >
                          {t(params.id ? "save" : "create")}
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
                    style={{ width: "100px" }}
                  />

                  {params.id && (
                    <StyledTab
                      label={tabLabel(t("users"))}
                      {...a11yProps(1)}
                      style={{ width: "100px" }}
                    />
                  )}
                </StyledTabs>
              </Filters>

              <TabPanel value={selectedTab} index={0} dir={theme.direction}>
                <GeneralInformation formik={formik} />
              </TabPanel>

              <TabPanel value={selectedTab} index={1} dir={theme.direction}>
                <StaffTable organizationId={params.id} />
              </TabPanel>
            </form>
          )}
        </Formik>
      )}
    </div>
  )
}

export default BranchCreate
