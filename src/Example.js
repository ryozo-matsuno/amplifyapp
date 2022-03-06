import React, { useState } from "react";

const Example = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
		// Hooksを用いているのでthisを使わなくてもstateを参照できる
    setCount(() => count + 1);
  };

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={handleClick}>+1</button>
    </div>
  );
}

export default Example;