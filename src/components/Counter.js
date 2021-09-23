import { useState } from "react";

function Counter() {
  const [compt, useCompt] = useState(0);

  const HandleOne = (value) => {
    useCompt(compt + value);
  };

  return (
    <div className="App">
      <p>{compt}</p>
      <button onClick={() => HandleOne(1)}>+</button>
      <button onClick={() => HandleOne(-1)}>-</button>
    </div>
  );
}

export default Counter;
