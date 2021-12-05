import { useTranslation } from "react-i18next"
import Header from "../../components/Header"
import CustomButton from "../../components/Buttons/index"
import { useEffect, useState } from "react"
import { CircularProgress } from "@material-ui/core"
import Form from "../../components/Form/Form"
import axios from "../../utils/axios"
import moment from "moment"
import CardContent from "../../components/Card"
import RequiredStar from "../../components/RequiredStar"
import FormItem from "../../components/Form/FormItem"
import Input from "../../components/Input"
import Switch from "../../components/Switch"
import TextArea from "../../components/Textarea"
import Select from "../../components/Select"
import DatePicker from "../../components/DatePicker"
import { useDispatch } from "react-redux"
import { showAlert } from "../../redux/reducers/alertReducer"

const typeOptions = [
  {
    label: "Ma'lumot",
    value: "info",
  },
  {
    label: "Ogohlantirish",
    value: "warning",
  },
  {
    label: "Xatolik",
    value: "danger",
  },
]

const STATIC_ID = "617d0ea2160513c9ea76f3e6"

const Announcement = () => {
  const { t } = useTranslation()
  const [loader, setLoader] = useState(true)
  const [initialValues, setInitialValues] = useState({})
  const [headerLoader, setHeaderLoader] = useState(false)
  const [id, setId] = useState(null)
  const dispatch = useDispatch()

  const rule = {
    required: true,
    message: t('required'),
  }

  const onSubmit = (values) => {

    updateData({
      ...values,
      type: values.type.value,
      active_time: values.active_time ? values.active_time.toISOString() : ""
    })

  }
  

  const fetchData = () => {
    axios
      .get(`/announcement`)
      .then((res) => {
        console.log("RES ===>", res)
        const el = res.announcements[0]
        setInitialValues({
          announcement: el.announcement,
          status: el.status,
          type: typeOptions.find(option => option.value === el.type) ,
          active_time: moment(el.active_time),
        })
        setId(el.id)
      })
      .finally(() => setLoader(false))
  }

  const updateData = (data) => {
    setHeaderLoader(true)
    axios
      .put(`/announcement/${id}`, data)
      .then(res => dispatch(showAlert('Muvoffaqiyatli saqlandi', 'success')))
      .finally(() => setHeaderLoader(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      {loader ? (
        <div className="w-full flex align-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <Form initialValues={initialValues} onSubmit={onSubmit}>
          <Header
            title={t("announcement")}
            endAdornment={[
              <CustomButton type="submit" size="large" shape="text" color="text-primary-600">
                {t("save")}
              </CustomButton>,
            ]}
          />

          <div
            className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
            // style={{ fontSize: "14px", lineHeight: "24px" }}
          >
            <div className="col-span-7">
              <CardContent title={t("Tizim foydalanuvchilari uchun e’lon/ogohlantirish")}>
                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <span>{t("status")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="status">
                      <Switch />
                    </FormItem>
                  </div>
                </div>

                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("text")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="announcement" rule={rule} >
                      <TextArea />
                    </FormItem>
                  </div>
                </div>

                <div className="w-full flex items-baseline">
                  <div className="w-1/3">
                    <RequiredStar />
                    <span>{t("type")}</span>
                  </div>
                  <div className="w-2/3">
                    <FormItem name="type" rule={rule} >
                      <Select options={typeOptions} />
                    </FormItem>
                  </div>
                </div>

                <div className="w-full flex items-baseline">
                  <div className="w-1/3" style={{transform: 'translateY(5px)'}} >
                    {t("active.time")}
                  </div>
                  <div className="w-2/3">
                    <FormItem name="active_time">
                      <DatePicker hideTimeBlock placeholder="Sanani tanlang" />
                    </FormItem>
                  </div>
                </div>
                
              </CardContent>
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

export default Announcement
