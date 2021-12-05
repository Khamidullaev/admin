import React from "react"
import { Fade } from "@material-ui/core"
import { useTranslation } from "react-i18next"
import Button from "../Button"

const LogoutModal = ({ isOpen, close, logout }) => {
  const { t } = useTranslation()

  if (!isOpen) return null

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 100,
      }}
    >
      <Fade in={isOpen}>
        <div className="outline-none py-5 rounded-md bg-white">
          <div className=" px-5">
            <h1 className="title font-bold text-xl mb-8">Tizimdan chiqish</h1>

            <div className="buttons-row flex justify-end">
              <Button
                className="flex justify-center"
                style={{ width: "160px" }}
                size="large"
                color="gray"
                onClick={close}
              >
                {t("cancel")}
              </Button>
              <Button
                className="flex justify-center ml-3"
                style={{ width: "160px" }}
                size="large"
                color="primary"
                onClick={logout}
              >
                {t("Tasdiqlash")}
              </Button>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  )
}

export default LogoutModal
