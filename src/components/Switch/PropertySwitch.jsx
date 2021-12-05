import "./index.css"
import RcSwitch from "rc-switch"

export default function Switch({ style, onChange, ...props }) {

  const changeHandler = val => {
    if(val) onChange('1')
    else onChange('')
  }

  return (
    <RcSwitch
      style={{ outline: "none", ...style }}
      onChange={changeHandler}
      {...props}
    />
  )
}