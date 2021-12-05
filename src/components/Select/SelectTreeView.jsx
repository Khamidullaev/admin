import {
  FormControl,
  InputLabel,
  makeStyles,
  Menu,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core"
import { TreeView } from "@material-ui/lab"
import { useEffect, useState } from "react"
import Input from "../Input"
import "./style.scss"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"
import TreeItem from "./TreeItem"
import OutsideClickHandler from "react-outside-click-handler"
import axios from '../../utils/axios'

const SelectTreeView = ({ disabled, collectionName, value, onChange = () => {} }) => {
  const [options, setOptions] = useState(null)
  const [open, setOpen] = useState(false)
  const [localValue, setLocalValue] = useState(value)
  // const [open, setOpen] = useState(true)


  useEffect(() => {
    if(!collectionName) return setOptions(null)
    getCollectionOptions()
  }, [collectionName])

  const getCollectionOptions = () => {
    axios.get('/entity-collection', { params: { collection_name: collectionName } })
      .then(res => setOptions(res.collections))
  }

  const handleClickInput = (event) => {
    if(disabled) return null
    setOpen(prev => !prev)
  }

  const clickHandler = (val) => {
    onChange(val)
    setLocalValue(val)
    setOpen(false)
  }

  const onOutsideClick = () => {
    setOpen(false)
  }



  return (
    <OutsideClickHandler
      onOutsideClick={onOutsideClick}
    >
      <div className="SelectTreeView" style={{ position: "relative" }}>
        <Input
          readOnly
          active={open}
          value={localValue?.label}
          onClick={handleClickInput}
          disabled={disabled}
        />

        {open && <div className="dropdown-wrapper">
          <div className="dropdown-block">
            {options?.length ? options?.map((option) => (
              <TreeItem
                element={option}
                onChange={clickHandler}
                value={localValue}
              />
            )) : <div style={{textAlign: 'center'}}>Ma'lumotlar yo'q</div>}
          </div>
        </div>}
      </div>
    </OutsideClickHandler>
  )
}

export default SelectTreeView
