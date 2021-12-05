import {
  Close as CloseIcon,
  CalendarToday as CalendarIcon,
} from "@material-ui/icons"
import moment from "moment"
import { useEffect, useRef } from "react"
import { useState } from "react"
import Input from "../Input"

const DateInput = ({
  setCalendarVisible,
  selectedDate,
  setSelectedDate,
  placeholder,
  className,
  style,
  disabled,
  onChange,
  error,
  hideTimeBlock,
}) => {
  const [inputValue, setInputValue] = useState("")
  const [focus, setFocus] = useState(false)
  const inputRef = useRef()

  useEffect(() => {
    setInputValue(
      selectedDate?.format(
        hideTimeBlock ? "DD.MM.YYYY" : "DD-MM-YYYY HH:mm:ss"
      ) ?? ""
    )
  }, [selectedDate])

  const clearInput = () => {
    setSelectedDate(null)
    onChange(null)
    setCalendarVisible(false)
  }

  const onInputFocus = () => setFocus(true)

  const onInputBlur = () => setFocus(false)

  const calendarIconClick = () => inputRef.current.focus()

  useEffect(() => {
    if (focus) return setCalendarVisible(true)

    const inputValueMoment = moment(inputValue, "DD.MM.YYYY")

    if (inputValueMoment.isValid()) setSelectedDate(inputValueMoment)
    else setInputValue(selectedDate?.format("DD.MM.YYYY") ?? "")
  }, [focus])

  return (
    <div
      className="date-input"
    >
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        ref={inputRef}
        error={error}
        disabled={disabled}
        className={`${disabled ? "cursor-not-allowed" : ""}`}
      />

      <div className="date-input__icons">
        {selectedDate && (
          <CloseIcon
            className="date-input__icons__icon"
            onClick={clearInput}
            style={{ marginRight: "5px" }}
          />
        )}
        <CalendarIcon
          className="date-input__icons__icon"
          // onClick={calendarIconClick}
        />
      </div>
    </div>
  )
}

export default DateInput
