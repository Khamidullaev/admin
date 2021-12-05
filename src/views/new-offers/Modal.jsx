import { useTranslation } from "react-i18next"
import Button from "../../components/Button"
import TextArea from "../../components/Textarea"
import { Backdrop, Fade, Modal } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useEffect, useState } from "react"
import axios from "../../utils/axios"
import AutoComplate from "../../components/Select/AutoComplate"
import Upload from "../../components/Upload/index"
import { rejectPropertyIdDescription, rejectPropertyIdFile } from "../../config/defaultSettings"
import { useDispatch } from "react-redux"
import { showAlert } from "../../redux/reducers/alertReducer"
import { useHistory, useParams } from "react-router-dom"

const handleFormatOptions = (list) => {
  return list && list.length
    ? list.map((elm) => ({ label: elm.entity_number, value: elm.id }))
    : []
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const NewOffersModal = ({ type, closeModal, finishedStatus, entityId }) => {
  const classes = useStyles()
  const history = useHistory()
  const params = useParams()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [description, setDescription] = useState("")
  const [entityID, setEntityID] = useState(entityId)
  const [rejectFile, setRejectFile] = useState(null)
  const [buttonLoader, setButtonLoader] = useState(false)

  useEffect(() => {
    setDescription("")
    setEntityID(entityId)
  }, [type])

  const reject = (data) => {
    setButtonLoader(true)
    const entity_draft_id = params.id
    axios
      .put(`entity-draft-property/${entity_draft_id}`, data)
      .then(res => history.push("/home/new-offers"))
      .finally(() => setButtonLoader(false))
  }

  const acceptHandler = () => {

    finishedStatus({
      comment: description,
      entity_id: entityID,
    })
  }

  const rejectHanler = () => {

    reject({
      entity_properties: [
        {
          property_id: rejectPropertyIdFile,
          value: rejectFile,
        },
        {
          property_id: rejectPropertyIdDescription,
          value: description,
        },
      ],
    })
  }

  if (!type) return null

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={type}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={type}>
        <div className="outline-none py-5 rounded-md bg-white">
          {type === "reject" ? (
            <div className=" px-5">
              <h1 className="title font-bold text-xl mb-8">
                {t("do.you.really.want.to.refuce.this.offer")}
              </h1>

              <div className="mb-5">
                <label htmlFor="" className="mb-5 block">
                  {t("E-IMZO")}*
                </label>
              </div>

              <div className="mb-5">
                <label htmlFor="" className="mb-5 block">
                  {t("describe.reason")}*
                </label>
                <TextArea
                  rows="5"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-5">
                <label htmlFor="" className="mb-5 block">
                  {t("describe.reason")}*
                </label>
                <Upload onChange={(value) => setRejectFile(value)} />
              </div>

              <div className="buttons-row flex justify-end">
                <Button
                  className="flex justify-center"
                  style={{ width: "160px" }}
                  size="large"
                  color="gray"
                  onClick={closeModal}
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex justify-center ml-3"
                  style={{ width: "160px" }}
                  size="large"
                  color="red"
                  onClick={rejectHanler}
                  loading={buttonLoader}
                >
                  {t("reject")}
                </Button>
              </div>
            </div>
          ) : (
            <div className="px-5">
              <h1 className="title font-bold text-xl mb-8">
                {t("accept.form.title")}
              </h1>

              <div className="mb-5">
                <label htmlFor="" className="mb-5 block">
                  {t("comments")}
                </label>
                <TextArea
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              {!entityId &&  <div className="mb-5">
                <label htmlFor="" className="mb-5 block">
                  {t("select.request")}
                </label>
                <AutoComplate
                  url="/entity?limit=100"
                  onFetched={(res) => res.entities}
                  queryName=""
                  formatOptions={handleFormatOptions}
                  onChange={(val) => {
                    setEntityID(val.value)
                  }}
                />
              </div>}

              <div className="buttons-row flex justify-end">
                <Button
                  className="flex justify-center"
                  style={{ width: "160px" }}
                  size="large"
                  color="gray"
                  onClick={closeModal}
                >
                  {t("cancel")}
                </Button>
                <Button
                  className="flex justify-center ml-3"
                  style={{ width: "160px" }}
                  size="large"
                  onClick={acceptHandler}
                >
                  {t("accept")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  )
}

export default NewOffersModal
