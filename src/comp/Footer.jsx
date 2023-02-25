import './footer.css'
import { useTranslation } from "react-i18next";

function Footer(){
  const { t, i18n } = useTranslation();

  return (
    <div className="footer text-center bg-info">
        <h5 className="card-title bg-primary py-2">
            {i18n.language === "en" && "Designed and Developed by Housam Hegazy"}
            {i18n.language === "ar" && "تصميم وتطوير حسام حجازي"}
            {i18n.language === "fr" && "Conçu et développé par Housam Hegazy"}
        </h5>
  </div>
  )
}
export default Footer