import Switch from "../Switch"
import _ from 'lodash'


const FSwitch = ({ formik, name, ...props }) => {

  return (
    <div>
      <Switch
        name={name}
        checked={_.get(formik?.values, name)}
        onChange={val => formik.setFieldValue(name, val)}
        isClearable
        {...props}
      />
      <div className="min-h-6" />
    </div>
  )
}

export default FSwitch
