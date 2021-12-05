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
import Breadcrumb from "../../components/Breadcrumb/index"
import CustomButton from "../../components/Buttons/index"
import { useTranslation } from "react-i18next"
import Tag from "../../components/Tag/StatusTag"
import Filters from "../../components/Filters"
import Input from "../../components/Input"
import { getObjectInputTypes } from "../../config/defaultSettings"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"
import AbsoluteTableLoader from "../../components/TableLoader/AbsoluteTableLoader"

export default function Property() {
  const { t } = useTranslation()
  const history = useHistory()
  const [items, setItems] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage]
  )

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
      .get("/property", { params: { limit: 10, page, name: searchText } })
      .then((res) => {
        setItems(res)
      })
      .catch(() => clearItems())
      .finally(() => setLoader(false))
  }

  const objectInputTypes = getObjectInputTypes(t)

  const routes = [
    {
      title: t("settings"),
      link: true,
      route: "/home/settings",
    },
    {
      title: t("application.fields"),
      link: true,
      route: "/home/settings/property",
    },
  ]

  return (
    <div>
      <Header
        title={t("application.fields")}
        startAdornment={[<Breadcrumb routes={routes} />]}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/settings/property/create")}
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
                <TableCell>{t("type")}</TableCell>
                <TableCell>{t("mandatory")}</TableCell>
                <TableCell>{t("status")}</TableCell>
                <TableCell>{t("created.date")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="relative" >
              {items.properties && items.properties.length ? (
                items.properties.map(
                  ({ id, name, type, order, is_required, status }, index) => (
                    <TableRow
                      key={id}
                      onClick={() =>
                        history.push(`/home/settings/property/${id}`)
                      }
                    >
                      <TableCell>
                        <p className="text-blue-600 cursor-pointer">
                          {(currentPage - 1) * 10 + index + 1}
                        </p>
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{objectInputTypes[type]}</TableCell>
                      <TableCell>{t(is_required ? "yes" : "no")}</TableCell>
                      <TableCell>
                        <Tag status={status} />
                      </TableCell>
                      <TableCell>24.06.2021</TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <></>
              )}
              <TableLoader columnsCount={6} isVisible={loader} />
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
