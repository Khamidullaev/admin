import _ from 'lodash'

const ErrorText = ({ formik, name, children, text, ...props }) => {
  return (
    <div className="min-h-6 w-full" style={{fontSize: '14px', lineHeight: 1.5715, color: '#ff4d4f'}} >
      {(_.get(formik.touched, name) && _.get(formik.errors, name)) ?? " "}
    </div>
  )
}

export default ErrorText
