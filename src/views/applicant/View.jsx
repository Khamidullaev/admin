import { useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import Filters from "../../components/Filters"
import Header from "../../components/Header"
import { StyledTab, StyledTabs } from "../../components/StyledTabs"
import Card from "../../components/Card"
import Form from "../../components/Form/Form"
import FormItem from "../../components/Form/FormItem"
import Input from "../../components/Input"
import { CircularProgress, useTheme } from "@material-ui/core"
import { useParams } from "react-router"
import axios from "../../utils/axios"
import { TabPanel } from "../../components/Tab/TabBody"
import NewOffersTable from "../new-offers/Table"

const ApplicantView = () => {
  const { t } = useTranslation()
  const { id } = useParams()
  const theme = useTheme()

  const [selectedTab, setSelectedTab] = useState(0)
  const [initialValues, setInitialValues] = useState(null)
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    axios
      .get(`/applicant/${id}`)
      .then((res) => setInitialValues(res))
      .finally(() => setLoader(false))
  }

  const computedData = useMemo(() => {
    if (!initialValues) return []
    return [
      {
        title: "full.name",
        value: initialValues.full_name,
      },
      {
        title: "passport.series.and.number",
        value: initialValues.passport_number,
      },
      {
        title: "phone.number",
        value: initialValues.phone_number,
      },
      {
        title: "birth.date",
        value: initialValues.birth_date,
      },
      {
        title: "PINFL",
        value: initialValues.pin,
      },
      {
        title: "address",
        value: initialValues.permanent_address,
      },
    ]
  }, [initialValues])

  const tabLabel = (text, isActive = false) => {
    return <span className="px-1">{text}</span>
  }

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    }
  }

  if (loader) {
    return (
      <div className="w-full flex align-center justify-center py-10">
        <CircularProgress />
      </div>
    )
  }
  return (
    <div>
      <Header title={t("applicants")} />

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
          <StyledTab label={tabLabel(t("new.offers"))} {...a11yProps(0)} />

          <StyledTab
            label={tabLabel(t("general.information"))}
            {...a11yProps(1)}
          />
        </StyledTabs>
      </Filters>

      <TabPanel value={selectedTab} index={0} dir={theme.direction}>
        <NewOffersTable applicantId={id} selectedDates={[]} />
      </TabPanel>

      <TabPanel value={selectedTab} index={1} dir={theme.direction}>
        <div
          className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
          style={{ fontSize: "14px", lineHeight: "24px" }}
        >
          <div className="col-span-7">
            <Card title={t("general.information")}>
              {computedData.map((element) => (
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="">{t(element.title)}</div>
                  <div
                    style={{
                      flex: 1,
                      borderBottom: "1px dotted #000",
                      height: "15px",
                      margin: "0 15px",
                    }}
                  ></div>
                  <div>
                    <div>{element.value}</div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </TabPanel>
    </div>
  )
}

export default ApplicantView
