import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import Header from "../../components/Header"
import { useHistory } from "react-router-dom"
import TableContainer from "@material-ui/core/TableContainer"
import CustomButton from "../../components/Buttons/index"
import { useTranslation } from "react-i18next"
import moment from "moment"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"
import Filters from "../../components/Filters"
import Input from "../../components/Input"
import StatusTag from "../../components/Tag/StatusTag"

export default function OrganizationsList() {
  // **** USE-HOOKS ****
  const { t } = useTranslation()
  const history = useHistory()
  const [items, setItems] = useState([])
  const [loader, setLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage, searchText])

  const clearItems = () => {
    setItems((prev) => ({ count: prev.count }))
  }

  const getItems = (pageNumber = 1) => {
    setLoader(true)
    clearItems()
    axios
      .get("/organization", {
        params: { page: pageNumber, limit: 10, search: searchText },
      })
      .then((res) => {
        setItems(res)
      })
      .finally(() => setLoader(false))
  }

  return (
    <div>
      <Header
        title={t("organizations")}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/settings/organizations/create")}
          >
            {t("create")}
          </CustomButton>,
        ]}
      />

      <div className="m-4 p-4 rounded-lg bg-white">
        <TableContainer className="mt-4">
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>{t("#")}</TableCell>
                <TableCell>{t("name")}</TableCell>
                <TableCell>{t("code")}</TableCell>
                <TableCell>{t("created.date")}</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log("items.organizations", items.organizations)}
              {items.organizations && items.organizations.length ? (
                items.organizations.map(
                  ({ id, name, code, created_at, status }, index) => (
                    <TableRow
                      key={id}
                      onClick={() =>
                        history.push(`/home/settings/organizations/${id}`)
                      }
                    >
                      <TableCell>
                        <p className="text-blue-600">
                          {(currentPage - 1) * 10 + index + 1}
                        </p>
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{code}</TableCell>
                      <TableCell>
                        {moment(created_at).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>
                        {status ? (
                          <StatusTag
                            color={"#47D16C"}
                            status={status?.status}
                            innerText={"Faol"}
                          />
                        ) : (
                          <StatusTag
                            color={"#F76659"}
                            status={status?.status}
                            innerText={"Nofaol"}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <></>
              )}
              <TableLoader columnsCount={5} isVisible={loader} />
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={items?.count}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  )
}
