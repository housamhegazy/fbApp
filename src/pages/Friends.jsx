// import { FirstContext } from 'Context/PostimageList'
// import React, { useContext } from 'react'

// export default function Friends() {
//   const {housam,count,increaseNumber,decreaseNumber} = useContext(FirstContext)
//   return (
//     <div>
//     <button onClick={() => increaseNumber()}>
//       {" "}
//       increament
//     </button>
//     <button onClick={() => decreaseNumber()}>
//       {" "}
//       decreament
//     </button>
//     <h1>{count}</h1>
//     <h1>{housam}</h1>
//     </div>
//   )
// }
import React, { useState } from "react";
const initialData = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
let nextId = 3;
export default function Friends() {
  const [data, setData] = useState(initialData);
  const [inputData, setinputData] = useState("");
  const [dataobj, setdataobj] = useState();
  function onChanges(e) {
    setinputData(e.target.value);
  }
  function addData() {
    setdataobj({ text: inputData, id: nextId++, done: false });
    setData([...data, dataobj]);

    // data.find((ele) => ele.id !== dataobj.id) && setData([...data, dataobj]);
  }
  function handleDelete(id) {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  }

  function handleEdite(text, id) {
    setinputData(text);
    handleDelete(id)
    setdataobj({ text: text, id: id, done: false });
  }
  console.log(data);
  return (
    <div>
      <input
        onChange={(e) => {
          onChanges(e);
        }}
        type="text"
        value={inputData}
      />
      <button
        onClick={() => {
          addData();
          setinputData("");
        }}
      >
        add
      </button>
      {data.map((t) => {
        return (
          <div key={t.id}>
            <p>{t.text}</p>
            <button
              onClick={() => {
                handleDelete(t.id);
              }}
            >
              delete
            </button>
            <button
              onClick={() => {
                handleEdite(t.text, t.id);
              }}
            >
              edit
            </button>
          </div>
        );
      })}
    </div>
  );
}
