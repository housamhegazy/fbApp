import React, { useEffect } from "react";
import { db } from "../../../firebase/config";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import { useRef } from "react";
import ReactLoading from 'react-loading';

export default function Titlesection({ user, userId, changeTitle }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const refElement = useRef(null);
  if (error) {
    return (
      <section>
        <h1>{error.message}</h1>
      </section>
    );
  }
  if (loading) {
    return <ReactLoading type={"spin"} color={"red"} height={50} width={50} />;
  }

  if (value) {
    return (
      <div className="input-header d-flex align-center w-50">
        <input
          style={{
            textDecoration: value.data().completed
              ? "line-through wavy"
              : "none",
          }}
          onChange={(e) => {
            changeTitle(e);
          }}
          dir="auto"
          type="text"
          className="title-input form-control bg-transparent text-center"
          defaultValue={value.data().title}
          ref={refElement}
        />
        <i
          onClick={() => {
            refElement.current.focus();
          }}
          className="bi bi-pencil-square fs-3"
          role="button"
        ></i>
      </div>
    );
  }
}
