import Header from "../../components/Header";
import { useHistory } from "react-router-dom";

import CustomButton from "../../components/Buttons/index";
import { useTranslation } from "react-i18next";
import Table from "./Table"

export default function Application() {
  const { t } = useTranslation();
  const history = useHistory();


  return (
    <div>
      <Header
        title={t("districts")}
        endAdornment={[
          <CustomButton
            size="large"
            shape="text"
            color="text-primary-600"
            onClick={() => history.push("/home/settings/districts/create")}
          >
            {t("create")}
          </CustomButton>,
        ]}
      />
      <Table />
    </div>
  );
}


