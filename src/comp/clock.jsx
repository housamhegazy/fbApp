import Clock from 'react-live-clock';
import { useTranslation } from "react-i18next";
export default function MyClock(){
    const { t, i18n } = useTranslation();
    return (
        <>
        <h5 className='my-3'>
            {i18n.language === "en" && "time now in Saudi Arabia"}
            {i18n.language === "ar" && "الوقت الآن في المملكة العربية السعودية"}
            {i18n.language === "fr" && "temps maintenant en Arabie Saoudite"}
        </h5>
        <Clock format={'HH:mm:ss'} ticking={true} timezone={'Asia/Riyadh'} className="mb-4"/>
        </>
    )
}