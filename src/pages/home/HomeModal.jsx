import { useState } from "react"
import Modal from "../../shared/Modal";
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";

export default function HomeModal({ closeModel,inputvalue,setTitlefun,title, showmodale, taskArray, setTitle, getinputfun, pushfunc,addTofirebase ,showLoading}) {
  const { t, i18n } = useTranslation();

  return (<>
    {showmodale && <Modal closeModel={closeModel}>
      <div className="home-module d-flex-column">
        <input dir="auto" onChange={(e) => {
          setTitlefun(e)
        }} type="text" className="my-3 form-control" required value={title}/>
        <div className="d-flex align-items-center">
          <input dir="auto" onChange={(e) => {
            getinputfun(e)
          }} type="text" className="mb-2 form-control" required value={inputvalue}/>
          <button onClick={(e) => {
            pushfunc(e)
          }} className="btn btn-primary small">
           {t("add")}
          </button>
        </div>
        <ul>
          {taskArray.map((ele) => 
            <li key={ele}>{ele}</li>
          )}
        </ul>
        <button onClick={(e) => {
          e.preventDefault();
          addTofirebase()
        }} className="btn btn-primary" type="submit">
            {showLoading && <ReactLoading type={"spin"} color={"red"} height={20} width={20} />}
            {!showLoading && `${t("add task")}`
            }
        </button>
      </div>
    </Modal>}
  </>)
}