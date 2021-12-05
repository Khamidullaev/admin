import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"
import TableMessage from "../../components/TableMessage"
import StatusTag from "../../components/Tag/StatusTag"
import axios from "../../utils/axios"

const StatusTable = ({type_code, searchText = ""}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const history = useHistory()

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage])

  useEffect(() => {
    if(currentPage === 1) return getItems(currentPage)
    setCurrentPage(1)
  }, [searchText])

  const getItems = (page) => {
    setLoader(true)
    axios.get('/status', {params: {limit: 10, page, type_code, name: searchText}})
      .then(res => setItems(res))
      .finally(() => setLoader(false))
  }


  return (
    <div className="m-4 p-4 rounded-lg bg-white">
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow className="bg-gray-100">
                <TableCell>#</TableCell>
                <TableCell>{t('name')}</TableCell>
                <TableCell>{t('russian.name')}</TableCell>
                <TableCell>{t('code')}</TableCell>
                <TableCell>{t('description')}</TableCell>
                <TableCell>{t("status")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.statuses && items.statuses.length 
                ? items.statuses.map(({ id, name, description, is_active, ru_name, code }, index) => (
                  <TableRow key={id} onClick={() => history.push(`/home/settings/status/${id}`)} >
                    <TableCell>
                      <p className="text-blue-600 cursor-pointer">{(currentPage - 1) * 10 + index + 1}</p>
                    </TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{ru_name}</TableCell>
                    <TableCell>{code}</TableCell>
                    <TableCell>{description}</TableCell>
                    <TableCell><StatusTag status={is_active} /></TableCell>
                  </TableRow>
                )) : <></>
              }
              <TableLoader columnsCount={6} isVisible={loader} />
            </TableBody>
          </Table>
        </TableContainer>

        <TableMessage
        isVisible={!loader && !items?.statuses}
        text="Statuslar mavjud emas"
      />

        <Pagination
           count={items?.count}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
  )
}

export default StatusTable
