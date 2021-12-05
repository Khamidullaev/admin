import { useCallback, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import "../UploadWithComment/styles.scss"
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox"
import axios from "../../../utils/axios"
import Button from "../../Button"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import DescriptionIcon from "@material-ui/icons/Description"
import "../style.scss"
import { CircularProgress } from "@material-ui/core"
import { useRef } from "react"
import { useDispatch } from "react-redux"
import { showAlert } from "../../../redux/reducers/alertReducer"
import CancelIcon from "@material-ui/icons/Cancel"

const UploadWithDrag = ({ onChange, value, error }) => {
  const dispatch = useDispatch()
  const [loader, setLoader] = useState(false)
  const inputRef = useRef(null)

  const onDrop = useCallback((files) => {
    const uploadedFile = files[0]
    setLoader(true)
    const data = new FormData()
    data.append("image", uploadedFile)

    axios
      .post("/image-upload", data, {
        headers: {
          "Content-Type": "mulpipart/form-data",
        },
      })
      .then((res) => {
        onChange(res.file_path)
      })
      .finally(() => setLoader(false))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const clearFile = (e) => {
    e.stopPropagation()
    onChange(null)
  }

  if (value) {
    return (
      <div
        className="w-full rounded-lg"
        style={{
          height: "164px",
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
          }}
        ></div>
        <img
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          src={`https://cdn.e-space.javelin.uz/e-space/${value}`}
          alt=""
        />
        <button
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#fff',
            outline: 'none',
            zIndex: 11
          }}
          onClick={clearFile}
        >
          <CancelIcon />
        </button>
      </div>
    )
  }

  return (
    <div className="upload-with-comment Upload">
      <div
        {...getRootProps()}
        className={`dropzone ${error ? 'error' : ''}`}
        ref={inputRef}
        style={{ height: 164 }}
      >
        <input {...getInputProps()} />
        {!loader ? (
          <>
            <MoveToInboxIcon style={{ fontSize: "50px" }} />
            <p className="title">
              <h1>Faylni yuklang</h1>
            </p>
          </>
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  )
}

export default UploadWithDrag
