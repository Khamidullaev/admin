import { useTranslation } from "react-i18next"
import Card from "../../../components/Card"
import Header from "../../../components/Header"
import Input from "../../../components/Input"
import Select from "../../../components/Select"
import Breadcrumb from "../../../components/Breadcrumb/index"
import { useParams } from "react-router"
import Switch from "../../../components/Switch"
import { useState } from "react"
import * as Yup from "yup"
import axios from "../../../utils/axios"
import { useEffect } from "react"
import CustomButton from "../../../components/Buttons/index"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import ActionHistory from "../../../components/ActionHistory"
import AutoComplate from "../../../components/Select/AutoComplate"
import Form from "../../../components/Form/Form"
import FormItem from "../../../components/Form/FormItem"
import Button from "../../../components/Button"
import RequiredStar from "../../../components/RequiredStar"
import Filters from "../../../components/Filters"

const UsersPremisesCreate = ({ children }) => {
  const { t } = useTranslation()
  const params = useParams()
  const history = useHistory()
  const [initialValues, setInitialValues] = useState({
    status: true,
    login: "",
    password: "",
  })

  const [loader, setLoader] = useState(true)
  const [selectedCity, setSelectedCity] = useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [enteredPassword, setEnteredPassword] = useState("")
  const [selectedOrganization, setSelectedOrganization] = useState(null)
  const [selectedRole, setSelectedRole] = useState(null)
  const [passwordFieldDisable, setPasswordFieldDisabled] = useState(true)
  const [errors, setErrors] = useState({
    city: false,
    region: false,
  })
  const [passError, setPassError] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [buttonLoader, setButtonLoader] = useState(false)
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [selectedRegionId, setSelectedRegionId] = useState(null)
  const [selectedStatusId, setSelectedStatusId] = useState(null)
  const [searchText, setSearchText] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = () => {
    if (!params.id) return setLoader(false)

    axios
      .get(`/staff/${params.id}`)
      .then((res) => {
        res.status = res.role.status
        res.passport_issue_date = moment(res.passport_issue_date).format(
          "YYYY-MM-DD"
        )
        res.password = ""

        setInitialValues(res)
        if (res.city) setSelectedCity({ value: res.city, label: res.city.name })
        if (res.region)
          setSelectedRegion({ value: res.region, label: res.region.name })
        setSelectedOrganization({
          value: res.organization,
          label: res.organization.name,
        })
        setSelectedRole({ value: res.role, label: res.role.name })
      })
      .finally(() => setLoader(false))
  }

  const fetchList = (url, setFunction, listName, params) => {
    setFunction((prev) => ({ ...prev, loader: true }))
    axios.get(url, { params }).then((res) =>
      setFunction({
        loader: false,
        list: res[listName],
      })
    )
  }

  const saveChanges = (data) => {
    data.city = selectedCity?.value
    data.region = selectedRegion?.value
    data.role_id = selectedRole.value.id
    data.organization_id = selectedOrganization.value.id
    if (params.id) {
      axios.put(`/staff/${params.id}`, data).then((res) => {
        history.push("/home/users/premises")
      })
    } else {
      axios.post(`/staff`, data).then((res) => {
        history.push("/home/users/premises")
      })
    }
  }

  const changePassword = () => {
    if (!oldPassword || !newPassword) return setPassError(true)

    setButtonLoader(true)
    axios
      .post(`/update-password/${params.id}`, {
        new_password: newPassword,
        old_password: oldPassword,
      })
      .then((res) => {
        setPasswordFieldDisabled(true)
        setOldPassword("")
        setNewPassword("")
        setPassError(false)
      })
      .finally(() => setButtonLoader(false))
  }

  const onSubmit = (values) => {
    values.inn = +values.inn
    if (errorChecker()) return null
    saveChanges(values)
  }

  const errorChecker = () => {
    const errors = {
      city: !selectedCity && selectedRole?.value?.code > 1,
      region: !selectedRegion && selectedRole?.value?.code === 3,
    }
    setErrors(errors)

    return errors.city || errors.region
  }

  const clearError = (name) => {
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const ValidationSchema = params.id
    ? {
        login: Yup.string()
          ?.required(t("required"))
          ?.min(8, "Simvollar soni mimimum 8 ta"),
      }
    : {
        login: Yup.string()
          ?.required(t("required"))
          ?.min(8, "Simvollar soni mimimum 8 ta"),
        password: Yup.string()
          ?.required(t("required"))
          ?.min(8, "Simvollar soni mimimum 8 ta"),
      }

  console.log("SCHEMA ===> ", ValidationSchema)

  const rule = {
    required: true,
    message: t("required"),
  }

  const routes = [
    {
      title: t("organization.users"),
      link: true,
      route: "/home/users/premises",
    },
    {
      title: params.id ? params.id : t("create"),
    },
  ]

  return (
    <div>
      {loader ? (
        <div className="w-full flex align-center justify-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          initialSchema={ValidationSchema}
        >
          <Header
            className="sticky top-0 z-50"
            title={t("organization.users")}
            startAdornment={[<Breadcrumb routes={routes} />]}
            endAdornment={[
              <CustomButton
                size="large"
                shape="text"
                color="text-primary-600"
                type="submit"
              >
                {t(params.id ? "save" : "create")}
              </CustomButton>,
            ]}
          />

          <div
            className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
            style={{ fontSize: "14px", lineHeight: "24px" }}
          >
            <div className="col-span-7">
              <Card title={t("general.information")}>
                {/* ---------STATUS---------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">{t("status")}</div>
                    <div className="w-2/3">
                      <FormItem name="status" rule={rule}>
                        <Switch id="status" color="primary" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------ID--------- */}
                {params.id ? (
                  <div className="mb-6">
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("ID")}</div>
                      <div className="w-2/3">
                        <Input defaultValue={params.id} disabled />
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* ---------FIRST_NAME--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("first.name")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="first_name" rule={rule}>
                        <Input id="first_name" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------LAST_NAME--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("last.name")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="last_name" rule={rule}>
                        <Input id="last_name" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------MIDDLE_NAME--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("middle.name")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="middle_name" rule={rule}>
                        <Input id="middle_name" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------INN--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("inn")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="inn" rule={rule}>
                        <Input type="number" id="inn" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------PINFL--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("PINFL")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="pinfl" rule={rule}>
                        <Input id="pinfl" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------PASSPORT--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("passport.series.and.number")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="passport_number" rule={rule}>
                        <Input id="passport_number" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------DATE OF ISSUE--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("date.of.issue")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="passport_issue_date" rule={rule}>
                        <Input type="date" id="passport_issue_date" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------PLACE OF ISSUE--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("place.of.issue")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="passport_issue_place" rule={rule}>
                        <Input id="passport_issue_place" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------TEL NUMBER--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("phone.number")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="phone_number" rule={rule}>
                        <Input id="phone_number" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------EMAIL--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("email")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="email" rule={rule}>
                        <Input id="email" />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------ADDRESS--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("address")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="address" rule={rule}>
                        <Input id="address" />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </Card>

              <Card title={t("access")} className="mt-8">
                {/* ---------LOGIN--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("login")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="login">
                        <Input id="login" disabled={params.id} />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------PASSWORD--------- */}

                {passwordFieldDisable ? (
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("password")}</span>
                    </div>
                    <div className="w-2/3">
                      {!params.id ? (
                        <FormItem name="password">
                          <Input
                            id="password"
                            type="password"
                            value={enteredPassword}
                            onChange={(e) =>
                              setEnteredPassword(e.target.password)
                            }
                          />
                        </FormItem>
                      ) : (
                        <Button
                          className="mb-5"
                          color="primary"
                          onClick={() => setPasswordFieldDisabled(false)}
                        >
                          Parolni o'zgartirish
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("old.password")}</div>
                      <div className="w-2/3">
                        <Input
                          id="password"
                          type="password"
                          error={passError && !oldPassword}
                          value={oldPassword}
                          onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <FieldErrorComponent
                          visible={passError && !oldPassword}
                        />
                      </div>
                    </div>
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">{t("new.password")}</div>
                      <div className="w-2/3">
                        <Input
                          id="password"
                          type="password"
                          value={newPassword}
                          error={passError && !newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <FieldErrorComponent
                          visible={passError && !newPassword}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        className="mb-5"
                        color="primary"
                        onClick={changePassword}
                        loading={buttonLoader}
                      >
                        O'zgartirish
                      </Button>
                    </div>
                  </>
                )}

                {/* ---------ORGANIZATION--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("organization")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="organization" rule={rule}>
                        <AutoComplate
                          url="/organization"
                          onFetched={(res) => res.organizations}
                          queryName={"search"}
                          onChange={(value) => setSelectedOrganization(value)}
                          value={selectedOrganization}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------ROLE--------- */}
                <div>
                  <div className="w-full flex items-baseline">
                    <div className="w-1/3">
                      <RequiredStar />
                      <span>{t("role")}</span>
                    </div>
                    <div className="w-2/3">
                      <FormItem name="role" rule={rule}>
                        <AutoComplate
                          url="/role"
                          onFetched={(res) => res.roles}
                          queryParams={{
                            organization_id:
                              selectedOrganization?.value?.id ?? 0,
                          }}
                          onChange={(value) => setSelectedRole(value)}
                          value={selectedRole}
                        />
                      </FormItem>
                    </div>
                  </div>
                </div>

                {/* ---------CITY--------- */}
                {selectedRole?.value.code === 2 ||
                selectedRole?.value.code === 3 ? (
                  <div>
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">
                        <RequiredStar />
                        <span>{t("region.area")}</span>
                      </div>
                      <div className="w-2/3">
                        <AutoComplate
                          onChange={(value) => {
                            setSelectedCity(value)
                            clearError("city")
                          }}
                          value={selectedCity}
                          error={errors.city}
                        />
                        <FieldErrorComponent visible={errors.city} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* ---------REGION--------- */}
                {selectedRole?.value.code === 3 ? (
                  <div>
                    <div className="w-full flex items-baseline">
                      <div className="w-1/3">
                        <RequiredStar />
                        <span>{t("region")}</span>
                      </div>
                      <div className="w-2/3">
                        <AutoComplate
                          url="/regions"
                          onFetched={(res) => res.regions}
                          params={selectedCity?.value?.id}
                          onChange={(value) => {
                            setSelectedRegion(value)
                            clearError("region")
                          }}
                          value={selectedRegion}
                          error={errors.region}
                        />
                        <FieldErrorComponent visible={errors.region} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </Card>
            </div>

            <div className="col-span-5">
              <ActionHistory type="staffs" elementID={params.id} />
            </div>
          </div>
        </Form>
      )}
    </div>
  )
}

const FieldErrorComponent = ({
  text = "Bu maydonni to'ldirish shart",
  visible = false,
}) => {
  return (
    <div
      className="min-h-6 w-full"
      style={{ fontSize: "14px", lineHeight: 1.5715, color: "#ff4d4f" }}
    >
      {visible ? text : ""}
    </div>
  )
}

export default UsersPremisesCreate
