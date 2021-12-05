import FDatePicker from "../components/FormComponents/FDatePicker"
import FInput from "../components/FormComponents/FInput"
import FSelect from "../components/FormComponents/FSelect"
import FSwitch from "../components/FormComponents/FSwitch"
import FTextArea from "../components/FormComponents/FTextArea"
import FUpload from "../components/FormComponents/FUpload"

const FormComonentsGenerator = ({ name, type, property_options, ...props }) => {
  switch (type) {
    case "string":
      if (name === "611359b073bf6fe15aaef568")
        return <FInput name={name} endAdornment="ga / sotih" {...props} />
      return <FInput name={name} {...props} />

    case "number":
      return <FInput name={name} type="number" {...props} />

    case "textarea":
      return <FTextArea name={name} {...props} />

    case "boolean":
      return <FSwitch name={name} {...props} />

    case "date":
      return <FDatePicker name={name} {...props} />

    case "file":
      return <FUpload name={name} {...props} />

    case "radio":
      return (
        <FSelect
          name={name}
          options={property_options?.map((option) => ({
            value: option.value,
            label: option.name,
          }))}
          {...props}
        />
      )

    case "checkbox":
      return (
        <FSelect
          name={name}
          isMulti
          options={property_options?.map((option) => ({
            value: option.value,
            label: option.name,
          }))}
          {...props}
        />
      )

    default:
      return <FInput name={name} {...props} />

  }
}

export default FormComonentsGenerator
