import React from 'react'
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import Moment from "react-moment";
import { useTranslation } from "react-i18next";
import { t } from 'i18next';
export default function BtnsSection({DeletTask,user, userId}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const { t, i18n } = useTranslation();
  if(value){
    return (
      <button onClick={(e)=>{
          DeletTask(e)
      }} className='btn btn-danger my-5'>{t("delete Task")} </button>
    )
  }
  
}
