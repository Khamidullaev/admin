import { useTranslation } from "react-i18next"
import RequiredStar from "../RequiredStar"


const FRow = ({ required, label, children, isHidden }) => {
  const { t } = useTranslation()

  return (
    <div className={`w-full flex items-start mb-7 ${isHidden ? 'hidden' : ''}`} >
      <div className='w-1/3'>
        {required && <RequiredStar />}
        <span>{t(label)}</span>
      </div>
      <div className="w-2/3" >
          {children}
      </div>
    </div>
  )
}

export default FRow
