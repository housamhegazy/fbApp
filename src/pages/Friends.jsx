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
  const [inputData, setinputData] = useState();
  function onChanges(e) {
    setinputData({ text: e.target.value, done: true });
  }
  function addData() {
    setData([...data, { ...inputData, id: nextId++ }]);
  }
  console.log(data);

  return (
    <div>
      <input
        onChange={(e) => {
          onChanges(e);
        }}
        type="text"
      />
      <button
        onClick={() => {
          addData();
        }}
      >
        add
      </button>
      {data.map((t) => {
        return (
          <div key={t.id}>
            <p>{t.text}</p>
            <button>save</button>
            <button>edite</button>
            <button>delete</button>
          </div>
        );
      })}
    </div>
  );
}
