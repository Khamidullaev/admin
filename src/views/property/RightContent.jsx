// import { useState, useEffect } from "react"
import Card from '../../components/Card/index'
import Input from "../../components/Input/index"
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'react-i18next'


export function RightContent ({ value, onChange = function() {} }) {


  // **** USE-HOOKS ****
  const { t } = useTranslation()
  // const [optionsList, setOptionsList] = useState(value)

  // **** FUNCTIONS ****
  
  
  // **** EVENTS ****
  const onAddOption = () => {
    onChange(old => [...old, {name: '', value: ''}])
  }

  const onRemoveOption = (index = 0) => {
    if(value.length !== 1) {
      onChange(old => old.filter((el, i) => i !== index))
    }
  }

  const onOptionChange = (e, key, index) => {
    onChange(el => el.map((item, i) => index === i ? ({...item, [key]: e.target.value}) : item))
  }
  
  return (
    <Card title={t("options")}>
      {value ? value.map(({name, value}, index) => (
        <div className="flex mb-6" key={index}>
          <div className="rounded-lg border border-gray-200 p-5 flex-grow">
            <div className="w-full flex items-center">
              <div className="w-1/3">
                {t("name")}
              </div>
              <div className="w-2/3">
                <Input type="text" value={name} onChange={e => onOptionChange(e, 'name', index)} />
              </div>
            </div>
            <div className="w-full mt-6 flex items-center">
              <div className="w-1/3">
                {t("option.value")}
              </div>
              <div className="w-2/3">
                <Input type="text" value={value} onChange={e => onOptionChange(e, 'value', index)} />
              </div>
            </div>
          </div>
          <div>
            <div
              onClick={() => onRemoveOption(index)}
              className="rounded-full ml-5 flex w-6 h-6 items-center justify-center cursor-pointer bg-gray-200"
            >
              <CloseIcon style={{fontSize: 10}} />
            </div>
          </div>
        </div>
      )) : <></>}
      <div
        className="
          p-2
          flex
          w-full
          border
          rounded-lg
          items-center
          cursor-pointer
          justify-center
          text-primary
          border-primary
        "
        onClick={onAddOption}
      >
        <AddIcon style={{color: 'rgba(64, 148, 247, 1)', marginRight: 16}} />
        {t("add.option")}
      </div>
    </Card>
  )
}