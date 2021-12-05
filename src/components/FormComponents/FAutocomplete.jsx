import AutoComplate from "../Select/AutoComplate"
import _ from "lodash"
import ErrorText from "./ErrorText"

const FAutocomplete = ({ formik, name, ...props }) => {
  return (
    <div>
      <AutoComplate
        name={name}
        value={_.get(formik.values, name)}
        onChange={val => formik.setFieldValue(name, val)}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        isClearable
        {...props}
      />
      <ErrorText formik={formik} name={name} />
    </div>
  )
}

export default FAutocomplete
