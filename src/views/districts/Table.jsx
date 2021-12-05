import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import Pagination from "../../components/Pagination"
import { useTranslation } from "react-i18next"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import TableLoader from "../../components/TableLoader"
import { useHistory } from "react-router"

const ApplicationTable = () => {
  const { t } = useTranslation()
  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const history = useHistory()

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage])

  const clearItems = () => {
    setItems(prev => ({count: prev.count}))
  }

  const getItems = (page) => {
    setLoader(true)
    clearItems()
    axios.get("/region", {params: {limit: 10, page}}).then((res) => {
      setItems(res)
    }).finally(() => setLoader(false))
  }


  return (
    <div className="m-4 p-4 rounded-lg bg-white">
      <TableContainer className="mt-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>#</TableCell>
              <TableCell>{t("name")}</TableCell>
              <TableCell>{t("region")}</TableCell>
              <TableCell>{t("Soato kod")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.regions &&
              items.regions.length &&
              items.regions.map(({ id, name, city, code }, index) => (
                <TableRow key={id} onClick={() => history.push(`/home/settings/districts/${id}`)} >
                  <TableCell>
                    <p className="text-blue-600">{(currentPage - 1) * 10 + index + 1}</p>
                  </TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{city?.name}</TableCell>
                  <TableCell>{code}</TableCell>
                </TableRow>
              ))}
              <TableLoader columnsCount={4} isVisible={loader} />
          </TableBody>
        </Table>
      </TableContainer>
      
        <Pagination count={items?.count} onChange={pageNumber => setCurrentPage(pageNumber)} />
    </div>
  )
}

export default ApplicationTable
