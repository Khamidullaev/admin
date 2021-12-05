import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import { useTranslation } from "react-i18next"
import Header from "../../components/Header"
import { useHistory } from "react-router-dom"
import TableContainer from "@material-ui/core/TableContainer"
import Breadcrumb from "../../components/Breadcrumb/index"
import CustomButton from "../../components/Buttons/index"
import Filters from "../../components/Filters"
import Input from "../../components/Input"
import StatusTag from "../../components/Tag/StatusTag"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"

export default function GroupProperty() {
  const { t } = useTranslation()
  const history = useHistory()
  const [items, setItems] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (currentPage === 1) return getItems(currentPage)
    setCurrentPage(1)
  }, [searchText])

  const clearItems = () => {
    setItems((prev) => ({ count: prev.count }))
  }

  const getItems = (page) => {
    setLoader(true)
    clearItems()
    axios
      .get("/group-property", {
        params: { page, limit: 10, search: searchText },
      })
      .then((res) => setItems(res))
      .finally(() => setLoader(false))
  }

  const routes = [
    {
      title: t("settings"),
      link: true,
      route: "/home/settings",
    },
    {
      title: t("application.field.groups"),
    },
  ]

  return (
    <div>
      <Header
        title={t("application.field.groups")}
        startAdornment={[<Breadcrumb routes={routes} />]}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/settings/group-property/create")}
          >
            {t("create")}
          </CustomButton>,
        ]}
      />

      <div className="m-4 p-4 rounded-lg bg-white">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>#</TableCell>
                <TableCell>{t("name")}</TableCell>
                <TableCell>{t("fields")}</TableCell>
                <TableCell style={{ maxWidth: 456 }}>
                  {t("description")}
                </TableCell>
                <TableCell>{t("status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.group_properties && items.group_properties.length ? (
                items.group_properties.map(
                  ({ id, name, properties, description, status }, index) => (
                    <TableRow
                      key={id}
                      onClick={() =>
                        history.push(`/home/settings/group-property/${id}`)
                      }
                    >
                      <TableCell>
                        <p className="text-blue-600 cursor-pointer">
                          {(currentPage - 1) * 10 + index + 1}
                        </p>
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{properties.length}</TableCell>
                      <TableCell>
                        <p className="truncate">{description}</p>
                      </TableCell>
                      <TableCell>
                        <StatusTag status={status} />
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
