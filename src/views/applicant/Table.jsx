import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"
import TableMessage from "../../components/TableMessage"
import axios from "../../utils/axios"

const ApplicantTable = ({
  applicantType,
  full_name,
  passport_number,
  phone_number,
}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [loader, setLoader] = useState(true)
  const history = useHistory()

  useEffect(() => {
    getItems(currentPage)
  }, [currentPage])
  
  const clearItems = () => {
    setItems((prev) => ({ count: prev.count }))
  }

  useEffect(() => {
    if (currentPage === 1) return getItems(currentPage)
    setCurrentPage(1)
  }, [full_name, passport_number, phone_number])

  const getItems = (page) => {
    setLoader(true)
    clearItems()
    axios
      .get("/applicant", {
        params: {
          limit: 10,
          page,
          user_type: applicantType,
          full_name,
          passport_number,
          phone_number,
        },
      })
      .then((res) => setItems(res))
      .finally(() => setLoader(false))
  }

  return (
    <div className="m-4 p-4 rounded-lg bg-white">
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>#</TableCell>
              <TableCell>{t("full.name")}</TableCell>
              <TableCell>{t("passport.series.and.number")}</TableCell>
              <TableCell>{t("phone.number")}</TableCell>
              <TableCell>{t("birth.date")}</TableCell>
              <TableCell>{t("PINFL")}</TableCell>
              <TableCell>{t("address")}</TableCell>
            </TableRow>
          </TableHead>
           (
            <TableBody>
              {items.applicants && items.applicants.length ? (
                items.applicants.map(
                  (
                    {
                      id,
                      first_name,
                      last_name,
                      middle_name,
                      passport_number,
                      phone_number,
                      birth_date,
                      pin,
                      permanent_address,
                    },
                    index
                  ) => (
                    <TableRow
                      key={id}
                      onClick={() =>
                        history.push(`/home/users/applicant/${id}`)
                      }
                    >
                      <TableCell>
                        <p className="text-blue-600 cursor-pointer">
                          {(currentPage - 1) * 10 + index + 1}
                        </p>
                      </TableCell>
                      <TableCell>{`${first_name} ${last_name} ${middle_name}`}</TableCell>
                      <TableCell>{passport_number}</TableCell>
                      <TableCell>{phone_number}</TableCell>
                      <TableCell>
                        <div style={{ whiteSpace: "nowrap" }}>{birth_date}</div>
                      </TableCell>
                      <TableCell>{pin}</TableCell>
                      <TableCell>{permanent_address}</TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <></>
              )}
              <TableLoader columnsCount={7} isVisible={loader} />
            </TableBody>
        </Table>
      </TableContainer>

      <TableMessage
        isVisible={!loader && !items?.applicants}
        text="Statuslar mavjud emas"
      />

      <Pagination
        count={items?.count}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
      />
    </div>
  )
}

export default ApplicantTable
