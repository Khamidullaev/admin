import Header from "../../../components/Header"
import { useHistory } from "react-router-dom"
import CustomButton from "../../../components/Buttons/index"
import { useTranslation } from "react-i18next"
import Table from "./Table"
import Filters from "../../../components/Filters"
import AutoComplate from "../../../components/Select/AutoComplate"
import { useState } from "react"
import Button from "../../../components/Button"
import DownloadIcon from "@material-ui/icons/GetApp"
import Input from "../../../components/Input"

export default function Application() {
  const { t } = useTranslation()
  const history = useHistory()
  const [organizationId, setOrganizationId] = useState(null)
  const [roleId, setRoleId] = useState(null)
  const [searchText, setSearchText] = useState("")

  return (
    <div>
      <Header
        title={t("organization.users")}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/users/premises/create")}
          >
            {t("create.new.staff")}
          </CustomButton>,
        ]}
      />
      <Filters
      >
        <div className="flex space-x-2 w-6/12 ">
          <AutoComplate
            url="/organization"
            onChange={(val) => setOrganizationId(val?.value)}
            isClearable
            queryName="search"
            onFetched={(res) => res.organizations}
            style={{ minWidth: "200px" }}
            placeholder={t("organization")}
            formatOptions={(list) =>
              list && list.map((el) => ({ label: el.name, value: el.id }))
            }
          />
          <AutoComplate
            url="/role"
            onChange={(val) => setRoleId(val?.value)}
            queryParams={{
              organization_id: organizationId ?? null,
            }}
            isClearable
            onFetched={(res) => res.roles}
            style={{ minWidth: "200px" }}
            placeholder={t("role")}
            formatOptions={(list) =>
              list && list.map((el) => ({ label: el.name, value: el.id }))
            }
          />
        </div>
      </Filters>

      <Table
        organizationId={organizationId}
        roleId={roleId}
        searchText={searchText}
      />
    </div>
  )
}
