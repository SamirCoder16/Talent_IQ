import React, { useCallback, useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const click = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count : {count}
      </button>
      <Child onClick={click} />
    </div>
  );
};

export const Child = React.memo(({ onClick }) => {
  console.log("Child Re-rendered");
  return <button onClick={onClick}>add</button>;
});

export default App;
