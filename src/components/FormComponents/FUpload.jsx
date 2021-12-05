import Upload from "../Upload"
import _ from 'lodash'


const FUpload = ({ formik, name, ...props }) => {
  return (
    <div>
      <Upload
        name={name}
        value={_.get(formik?.values, name)}
        onChange={val => formik.setFieldValue(name, val)}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        {...props}
      />
    </div>
  )
}

export default FUpload