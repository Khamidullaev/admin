import { useMemo } from "react"
import Input from "../Input"


const NumberInput = ({value, onChange, ...props}) => {

  const computedValue = useMemo(() => {
    if(!value) return 0
    return Number(value).toLocaleString('ru-Ru')
  }, [value])

  const changeHandler = (e) => {
    const value = e.target.value.replace(/\s+/g, '').trim()
    const parseValue = parseInt(value)
    if (parseValue === NaN) {
      onChange(0)
    }
    else onChange(parseValue)
  }

  return (
    <Input onChange={changeHandler} value={computedValue} {...props} />
  )
}

export default NumberInput
