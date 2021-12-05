import "./style.scss"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import { useState } from "react"
import { useRef } from "react"
import ImageViewer from "react-simple-image-viewer"
import { useMemo } from "react"
import axios from "../../utils/axios"
import { CircularProgress } from "@material-ui/core"
import CancelIcon from "@material-ui/icons/Cancel"

const Gallery = ({ gallery, setGallery, notEditable }) => {
  const inputRef = useRef(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const imageLinks = useMemo(() => {
    return gallery?.map(
      (image) => `https://cdn.e-space.javelin.uz/e-space/${image}`
    )
  }, [gallery])

  const [loading, setLoading] = useState(false)

  const addNewImage = (image) => {
    setGallery((prev) => [...prev, image])
  }

  const imageClickHandler = (index) => {
    setSelectedImageIndex(index)
    setPreviewVisible(true)
  }

  const inputChangeHandler = (e) => {
    setLoading(true)
    const file = e.target.files[0]

    const data = new FormData()
    data.append("image", file)
    axios
      .post("/image-upload", data, {
        headers: {
          "Content-Type": "mulpipart/form-data",
        },
      })
      .then((res) => {
        addNewImage(res.file_path)
      })
      .finally(() => setLoading(false))
  }

  const deleteImage = (id) => {
    setGallery((prev) => prev.filter((galleryImageId) => galleryImageId !== id))
  }

  const closeButtonHandler = (e, link) => {
    e.stopPropagation()
    deleteImage(link.replace("https://cdn.e-space.javelin.uz/e-space/", ""))
  }

  return (
    <div className="Gallery">
      {imageLinks?.map((link, index) => (
        <div className="block" onClick={() => imageClickHandler(index)}>
          {!notEditable && (
            <button
              className="close-btn"
              onClick={(e) => closeButtonHandler(e, link)}
            >
              <CancelIcon />
            </button>
          )}
          <img src={link} alt="" />
        </div>
      ))}

      {!notEditable && (
        <div
          className="add-block block"
          onClick={() => inputRef.current.click()}
        >
          <div className="add-icon">
            {!loading ? (
              <>
                <AddCircleOutlineIcon style={{ fontSize: "35px" }} />
                <p>Max size: 4 MB</p>
              </>
            ) : (
              <CircularProgress />
            )}
          </div>

          <input
            // type="file"
            className="hidden"
            ref={inputRef}
            onChange={inputChangeHandler}
          />
        </div>
      )}

      {previewVisible && (
        <ImageViewer
          style={{ zIndex: 100000 }}
          src={imageLinks}
          currentIndex={selectedImageIndex}
          disableScroll={true}
          onClose={() => setPreviewVisible(false)}
          zIndex={2}
        />
      )}
    </div>
  )
}

export default Gallery
