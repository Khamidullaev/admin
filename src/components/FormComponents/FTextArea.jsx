import TextArea from "../Textarea"
import _ from 'lodash'
import ErrorText from "./ErrorText"

const FTextArea = ({ formik, name, ...props }) => {
  return (
    <div>
      <TextArea
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

export default FTextArea


