import { useTheme } from "@material-ui/core"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Filters from "../../components/Filters"
import Header from "../../components/Header"
import { StyledTab, StyledTabs } from "../../components/StyledTabs"
import { TabPanel } from "../../components/Tab/TabBody"
import ApplicantTable from "./Table"
import Button from "../../components/Button"
import DownloadIcon from "@material-ui/icons/GetApp"
import Input from "../../components/Input"

const Applicant = () => {
  const { t } = useTranslation()
  const [selectedTab, setSelectedTab] = useState(0)
  const theme = useTheme()
  const [fullName, setFullName] = useState("")
  const [passportNumber, setPassportNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const tabLabel = (text, isActive = false) => {
    return <span className="px-1">{text}</span>
  }

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    }
  }

  return (
    <div>
      <Header title={t("applicants")} />

      <Filters
      >
        <div className="flex space-x-2 w-full">
          <Input
            placeholder={t("full.name")}
            style={{ width: 200 }}
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
          <Input
            placeholder={t("passport.series.and.number")}
            style={{ width: 200 }}
            onChange={(e) => setPassportNumber(e.target.value)}
            value={passportNumber}
          />
          <Input
            placeholder={t("phone.number")}
            style={{ width: 200 }}
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
          />
        </div>
      </Filters>
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
          <StyledTab label={tabLabel(t("physical.person"))} {...a11yProps(0)} />

          <StyledTab label={tabLabel(t("legal.person"))} {...a11yProps(1)} />
        </StyledTabs>
      </Filters>

      <TabPanel value={selectedTab} index={0} dir={theme.direction}>
        <ApplicantTable
          applicantType="L"
          full_name={fullName}
          passport_number={passportNumber}
          phone_number={phoneNumber}
        />
      </TabPanel>
      <TabPanel value={selectedTab} index={1} dir={theme.direction}>
        <ApplicantTable
          applicantType="R"
          full_name={fullName}
          passport_number={passportNumber}
          phone_number={phoneNumber}
        />
      </TabPanel>
    </div>
  )
}

export default Applicant
