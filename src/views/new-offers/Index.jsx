import React, { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useHistory } from "react-router-dom"
import axios from "../../utils/axios"

import Header from "../../components/Header"
import Filters from "../../components/Filters"

import AutoComplate from "../../components/Select/AutoComplate"
import NewOffersTable from "./Table"
import RangePicker from "../../components/DatePicker/RangePicker"
import moment from "moment"
import Input from "../../components/Input"

function NewOffers() {
  const { t } = useTranslation()
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [selectedRegionId, setSelectedRegionId] = useState(null)
  const [selectedStatusId, setSelectedStatusId] = useState(null)
  const [selectedDates, setSelectedDates] = useState([null, null])
  const [searchText, setSearchText] = useState(null)

  return (
    <div>
      <Header title="Bo`sh turgan yer uchastkalarini auksionga chiqarish uchun takliflar" />
      <Filters>
        <div className="flex space-x-2 w-full ">
          <AutoComplate
            placeholder={t("region.area")}
            style={{ minWidth: "200px" }}
            isClearable
            onChange={(val) => setSelectedCityId(val?.value?.id)}
          />
          <AutoComplate
            placeholder={t("region")}
            style={{ minWidth: "200px" }}
            url="/regions"
            onFetched={(res) => res.regions}
            isClearable
            params={selectedCityId}
            onChange={(val) => setSelectedRegionId(val?.value?.id)}
          />
          <RangePicker
            hideTimePicker
            placeholder="Sanani tanlang"
            onChange={(val) => {
              setSelectedDates(
                val.map((e) => (e ? moment(e).format("YYYY-MM-DD") : e))
              )
            }}
          />
        </div>
      </Filters>

      <NewOffersTable
        selectedCityId={selectedCityId}
        selectedRegionId={selectedRegionId}
        selectedStatusId={selectedStatusId}
        selectedDates={selectedDates}
        searchText={searchText}
      />
    </div>
  )
}

export default NewOffers
