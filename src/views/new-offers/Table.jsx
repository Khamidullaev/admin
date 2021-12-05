import {
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Pagination from "../../components/Pagination"
import TableLoader from "../../components/TableLoader"
import axios from "../../utils/axios"
import StatusTag from "../../components/Tag/StatusTag"
import moment from "moment"
import TableMessage from "../../components/TableMessage"
import { useHistory } from "react-router"

let timeout

const NewOffersTable = ({
  selectedCityId,
  selectedRegionId,
  selectedStatusId,
  data,
  applicantId,
  selectedDates,
  searchText,
}) => {
  const { t } = useTranslation()
  const [items, setItems] = useState({})
  const [loader, setLoader] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const history = useHistory()

  useEffect(() => {
    if (data) return setItems({ entity_drafts: data })
    getItems(currentPage, true)
  }, [currentPage])

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  useEffect(() => {
    if (currentPage === 1 && !data) getItems(currentPage, true)
    setCurrentPage(1)
  }, [
    selectedCityId,
    selectedRegionId,
    selectedStatusId,
    selectedDates,
    searchText,
  ])

  const clearItems = () => {
    setItems((prev) => ({ count: prev.count }))
  }

  const getItems = (page, loader) => {
    clearTimeout(timeout)
    if (loader) {
      setLoader(true)
      clearItems()
    }

    const url = applicantId
      ? `/applicant-entity-draft/${applicantId}`
      : "/entity-draft"

    axios
      .get(url, {
        params: {
          limit: 10,
          page,
          city_id: selectedCityId,
          region_id: selectedRegionId,
          status_id: selectedStatusId,
          from_date: selectedDates[0],
          to_date: selectedDates[1],
          entity_draft_number: searchText,
        },
      })
      .then((res) => {
        timeout = setTimeout(() => {
          getItems(currentPage, false)
        }, 5000)
        setItems(res)
      })
      .finally(() => setLoader(false))
  }

  return (
    <div className="bg-white rounded-lg m-4 p-4">
      <TableContainer className="mt-4">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-50">
              <TableCell>#</TableCell>
              <TableCell>{t("new.offers.number")}</TableCell>
              <TableCell>{t("applicant")}</TableCell>
              <TableCell>{t("status")}</TableCell>
              <TableCell>{t("received.time")}</TableCell>
              <TableCell>{t("region.area")}</TableCell>

              <TableCell>{t("district")}</TableCell>

              <TableCell>{t("county")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.entity_drafts && items?.entity_drafts.length ? (
              items.entity_drafts.map(
                (
                  {
                    id,
                    applicant,
                    status,
                    created_at,
                    entity_draft_number,
                    city,
                    region,
                    district,
                  },
                  index
                ) => (
                  <TableRow
                    key={id}
                    onClick={() => history.push(`/home/new-offers/${id}`)}
                  >
                    <TableCell>{(currentPage - 1) * 10 + index + 1}</TableCell>
                    <TableCell>{entity_draft_number}</TableCell>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>
                      <StatusTag
                        color={status?.color}
                        status={status?.status}
                        innerText={status?.name}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <p>{moment(created_at).format("DD.MM.YYYY")}</p>
                        <div className="text-green-600 bg-green-200 px-4 text-base rounded-md ml-3">
                          {moment(created_at).format("HH:mm")}
                        </div>
                      </div>
                    </TableCell>
                    {/* <TableCell>{entity_number}</TableCell> */}
                    <TableCell>{city.name}</TableCell>
                    <TableCell>{region.name}</TableCell>
                    <TableCell>{district.name}</TableCell>
                  </TableRow>
                )
              )
            ) : (
              <></>
            )}
            <TableLoader columnsCount={8} isVisible={loader} />
          </TableBody>
        </Table>
      </TableContainer>

      <TableMessage
        isVisible={!loader && !(items?.entity_drafts?.length > 0)}
        text="Takliflar mavjud emas"
      />

      <Pagination
        count={items?.count}
        onChange={(pageNumber) => setCurrentPage(pageNumber)}
        title="Takliflar soni"
      />
    </div>
  )
}

export default NewOffersTable
