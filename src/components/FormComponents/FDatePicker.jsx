import DatePicker from '../DatePicker'
import _ from 'lodash'
import ErrorText from './ErrorText'

const FDatePicker = ({ formik, name, options, ...props }) => {
  return (
    <div>
      <DatePicker
        name={name}
        hideTimePicker
        hideTimeBlock
        value={_.get(formik?.values, name)}
        error={_.get(formik.touched, name) && Boolean(_.get(formik.errors, name))}
        onChange={val => formik.setFieldValue(name, val)}  
      />
      <ErrorText formik={formik} name={name} />
    </div>
  )
}

export default FDatePicker
