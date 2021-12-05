import Select from "../Select"
import ErrorText from "./ErrorText"
import _ from 'lodash'


const FSelect = ({ formik, name, options, ...props }) => {
  return (
    <div>
      <Select
        name={name}
        options={options}
        value={_.get(formik?.values, name)}
        onChange={val => formik.setFieldValue(name, val)}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        isClearable
        {...props}
      />
      <ErrorText formik={formik} name={name} />
    </div>
  )
}

export default FSelect
