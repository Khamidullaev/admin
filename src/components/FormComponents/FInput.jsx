import Input from "../Input"
import _ from 'lodash'
import ErrorText from "./ErrorText"

const FInput = ({ formik, name, ...props }) => {

  return (
    <div>
      <Input
        name={name}
        value={_.get(formik?.values, name)}
        onChange={formik.handleChange}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        {...props}
      />
      <ErrorText formik={formik} name={name} />
    </div>
  )
}

export default FInput
