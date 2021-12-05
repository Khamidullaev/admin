import ImageUploadWithDrag from "../Upload/UploadWithDrag/ImageUploadWithDrag"
import _ from 'lodash'


const FImageUpload = ({ formik, name, ...props }) => {
  return (
    <div>
      <ImageUploadWithDrag
        name={name}
        value={_.get(formik?.values, name)}
        onChange={val => formik.setFieldValue(name, val)}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        {...props}
      />
    </div>
  )
}

export default FImageUpload