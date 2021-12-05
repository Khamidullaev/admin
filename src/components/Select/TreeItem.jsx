import { useMemo, useState } from "react"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"

const TreeItem = ({ element, onChange = () => {}, value }) => {
  const [childBlockVisible, setChildBlockVisible] = useState(false)

  const hasChild = useMemo(() => {
    return !!element?.children?.length
  }, [element])

  const isActive = useMemo(() => {
    return element?.value === value?.value
  }, [element, value])

  const listItemClickHandler = () => {
    if(hasChild) return setChildBlockVisible((prev) => !prev)
    onChange(element)
  }
  
  return (
    <div>
      <div className={`list-element ${isActive ? 'active' : ''}`} onClick={listItemClickHandler}>
        <div className="label">{element?.label}</div>
        {element?.children && <div className={`icon ${childBlockVisible ? 'open' : ''}`}><ArrowDropDownIcon /></div>}
      </div>
      {hasChild && childBlockVisible && (
        <div className="child-block">
          {element?.children?.map((child) => (
            <TreeItem element={child} onChange={onChange} value={value} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TreeItem
