import { useState } from "react"
import Header from "../../components/Header"
import { useHistory } from "react-router-dom"
import Breadcrumb from "../../components/Breadcrumb/index"
import CustomButton from "../../components/Buttons/index"
import { useTranslation } from "react-i18next"
import Filters from "../../components/Filters"
import Input from "../../components/Input"

import StatusTable from "./Table"
import { StyledTab, StyledTabs } from "../../components/StyledTabs"
import { TabPanel } from "../../components/Tab/TabBody"
import { useTheme } from "@material-ui/core"

export default function Status() {
  const { t } = useTranslation()
  const history = useHistory()
  const [selectedTab, setSelectedTab] = useState(0)
  const theme = useTheme()

  const [searchText, setSearchText] = useState('')

  const routes = [
    {
      title: t("settings"),
      link: true,
      route: "/home/settings",
    },
    {
      title: t("application.statuses"),
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

  return (
    <div>
      <Header
        title={t("application.statuses")}
        startAdornment={[<Breadcrumb routes={routes} />]}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/settings/status/create")}
          >
            Create
          </CustomButton>,
        ]}
      />

        <StatusTable type_code={4} searchText={searchText} />
    </div>
  )
}
