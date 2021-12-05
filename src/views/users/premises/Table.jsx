import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import Pagination from "../../../components/Pagination"
import moment from "moment"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import StatusTag from "../../../components/Tag/StatusTag"
import axios from "../../../utils/axios"
import TableLoader from "../../../components/TableLoader"
import { clearStorage } from "mapbox-gl"
import { LocationCity } from "@material-ui/icons"

const UsersPremisesTable = ({ organizationId, roleId, searchText }) => {
  const { t } = useTranslation()
  const [items, setItems] = useState([])
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const history = useHistory()

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (currentPage === 1) return getItems(currentPage)
    setCurrentPage(1)
  }, [organizationId, roleId, searchText])

  const clearItems = () => {
    setItems((prev) => ({ count: prev.count }))
  }

  const getItems = (page) => {
    setLoader(true)
    clearItems()
    axios
      .get("/staff", {
        params: {
          organization_id: organizationId,
          role_id: roleId,
          limit: 10,
          search_string: searchText,
          page,
        },
      })
      .then((res) => {
        setItems(res)
      })
      .finally(() => setLoader(false))
  }

  return (
    <div className="m-4 p-4 rounded-lg bg-white">
      <TableContainer className="mt-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>{t("ID")}</TableCell>
              <TableCell>{t("first.name")}</TableCell>
              <TableCell>{t("organization")}</TableCell>
              <TableCell>Viloyat</TableCell>
              <TableCell>Tuman</TableCell>
              <TableCell>{t("role")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell>{t("added.date")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("items.staffs", items.staffs)}
            {items.staffs &&
              items.staffs.length &&
              items.staffs.map(
                (
                  {
                    id,
                    unique_name,
                    first_name,
                    role,
                    created_at,
                    organization,
                    city,
                    last_name,
                    region,
                  },
                  index
                ) => (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/home/users/premises/${id}`)}
                  >
                    <TableCell>
                      <p className="text-blue-600">{unique_name}</p>
                    </TableCell>
                    <TableCell>{first_name + " " + last_name}</TableCell>
                    <TableCell>{organization.name}</TableCell>
                    <TableCell>{city?.name}</TableCell>
                    <TableCell>{region?.name ? region?.name : "-"}</TableCell>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>
                      <StatusTag status={role.status} />
                    </TableCell>
                    <TableCell>
                      {moment(created_at).format("YYYY-MM-DD")}
                    </TableCell>
                  </TableRow>
                )
              )}
            <TableLoader columnsCount={8} isVisible={loader} />
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        count={items?.count}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
        title="Topilgan foydalanuvchilar soni"
      />
    </div>
  )
}

export default UsersPremisesTable
