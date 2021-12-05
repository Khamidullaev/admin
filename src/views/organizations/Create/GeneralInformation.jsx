import { useTranslation } from "react-i18next"
import Card from "../../../components/Card"
import Form from "../../../components/Form/Index"
import Input from "../../../components/Input"
import Switch from "../../../components/Switch"
import TextArea from "../../../components/Textarea"

const GeneralInformation = ({ formik }) => {
  const { t } = useTranslation()

  return (
    <div
      className="p-4 w-full grid grid-cols-12 gap-4 box-border font-body"
      style={{ fontSize: "14px", lineHeight: "24px" }}
    >
      <div className="col-span-7">
        <Card title={t("general.information")}>

          {/* ---------STATUS---------- */}
          <div>
            <div className="w-full flex items-baseline">
              <div className="w-1/3">{t("status")}</div>
              <div className="w-2/3">
                <Form.Item name="status" formik={formik}>
                  <Switch
                    id="stataus"
                    color="primary"
                    checked={formik.values.status}
                    onChange={(val) => formik.setFieldValue("status", val)}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* ---------FULL NAME---------- */}
          <div>
            <div className="w-full flex items-baseline">
              <div className="w-1/3">{t("full.name")}</div>
              <div className="w-2/3">
                <Form.Item name="full_name" formik={formik}>
                  <Input id="full_name" {...formik.getFieldProps("full_name")} />
                </Form.Item>
              </div>
            </div>
          </div>


          {/* ---------NAME---------- */}
          <div>
            <div className="w-full flex items-baseline">
              <div className="w-1/3">{t("name")}</div>
              <div className="w-2/3">
                <Form.Item name="name" formik={formik}>
                  <Input id="name" {...formik.getFieldProps("name")} />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* ---------CODE---------- */}
          <div>
            <div className="w-full flex items-baseline">
              <div className="w-1/3">{t("code")}</div>
              <div className="w-2/3">
                <Form.Item name="code" formik={formik}>
                  <Input type="number" id="code" {...formik.getFieldProps("code")} />
                </Form.Item>
              </div>
            </div>
          </div>

          {/* ---------DESCRIPTION--------- */}
          <div >
            <div className="w-full flex items-baseline">
              <div className="w-1/3">{t("description")}</div>
              <div className="w-2/3">
                <Form.Item name="description" formik={formik}>
                  <TextArea
                    id="description"
                    {...formik.getFieldProps("description")}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

        </Card>
      </div>
    </div>
  )
}

export default GeneralInformation
