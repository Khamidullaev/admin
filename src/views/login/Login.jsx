import { useHistory } from "react-router-dom"
import Button from "../../components/Button"
import AccountCircleIcon from "@material-ui/icons/AccountCircle"
import LockIcon from "@material-ui/icons/Lock"
import PhoneIcon from "@material-ui/icons/Phone"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"
import axios from "../../utils/axios"
import { useDispatch } from "react-redux"
import { SET_AUTH_TOKENS } from "../../redux/constants"
import AlertComponent from "../../components/Alert"
import { showAlert } from "../../redux/reducers/alertReducer"

export default function App() {
  const { t } = useTranslation()
  const history = useHistory()
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const [loader, setLoader] = useState(false)
  const dispatch = useDispatch()

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (!login.trim() || !password.trim()) return setError(true)

    setLoader(true)

    axios
      .post("/login", { login, password })
      .then((res) => {
        const permissions = res.role.permissions.map(permission => permission.name)

        dispatch({
          type: SET_AUTH_TOKENS,
          payload: {
            accessToken: res.access_token,
            refreshToken: res.refresh_token,
            login,
            permissions,
            verified: res.verified
          },
        })
        history.push("/home/new-offers")
      })
      .catch(() => dispatch(showAlert("Login yoki parol noto'gri terilgan")))
      .finally(() => setLoader(false))
  }

  const validation = (value) => {
    if (!error || value) return ""
    return "error"
  }

  return (
    <div className="h-screen flex font-body login-form">
      <AlertComponent />
      <div className="w-6/12 h-screen flex flex-col gap-5 justify-center items-center bg-gradient-to-t from-blue-50 via-white-100 via-white-100 to-white">
        <h1 style={{ fontSize: '100px', fontWeight: 'bold', color: '#4797FB' }} >e-Space</h1>
      </div>
      <div className="w-6/12 h-screen bg-background justify-around items-center flex flex-col shadow ">
        <div className="w-3/4 mt-24 rounded-2xl shadow-lg bg-white h-6/12 p-3">
          <div className="text-3xl font-semibold p-4">{t("signin")}</div>
          <hr></hr>
          <form onSubmit={onFormSubmit}>
            <div className="flex flex-col p-6 font-semibold space-y-6">
              <div className={`flex flex-col space-y-2 ${validation(login)}`}>
                <label>{t("username")}</label>
                <span className="flex items-center space-x-2 p-3 bg-background_2 rounded-lg form-item">
                  <span>
                    <AccountCircleIcon style={{ color: "#6E8BB7" }} />
                  </span>
                  <input
                    placeholder={t("enter.username")}
                    type="text"
                    spellCheck="false"
                    id="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  ></input>
                </span>
              </div>
              <div
                className={`flex flex-col space-y-2 ${validation(password)}`}
              >
                <label>{t("password")}</label>
                <span className="items-center space-x-2 p-3 bg-background_2 rounded-lg flex form-item">
                  <span>
                    <LockIcon style={{ color: "#6E8BB7" }} />
                  </span>
                  <input
                    type="password"
                    placeholder={t("enter.password")}
                    spellCheck="false"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </span>
              </div>
            </div>
            <hr></hr>
            <div className="px-6 py-3">
              <Button
                type="submit"
                className="w-full flex justify-center align-center"
                color="primary"
                shape="filled"
                size="large"
                loading={loader}
              >
                {t("enter")}
              </Button>
            </div>
          </form>
        </div>

        <div className="rounded rounded-xl  h-21 w-3/4 p-5 bg-white flex justify-between items-center shadow-lg">
          <div className="flex space-x-2 items-center">
            <PhoneIcon />
            <span>{t("support.service")}</span>
          </div>
          <div>
            <span>+998 (90) 123-45-67</span>
          </div>
        </div>
      </div>
    </div>
  )
}
