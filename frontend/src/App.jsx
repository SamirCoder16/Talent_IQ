import React, { useCallback, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";
import Snowfall from "react-snowfall";

const App = () => {
  const [count, setCount] = useState(0);

  const click = useCallback(() => {
    console.log("Clicked");
  }, []);

  return (
    <div className="h-screen w-full bg-[#28282B] text-white">
      <Snowfall
        snowflakeCount={150} // ideal
        speed={[0.5, 1.5]} // smooth
        wind={[-0.5, 1.5]}
      />
      <button onClick={() => setCount((prev) => prev + 1)}>
        Count : {count}
      </button>
      <Child onClick={click} />
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>

      <SignedIn>
        <SignOutButton mode="modal" />
      </SignedIn>
    </div>
  );
};

export const Child = React.memo(({ onClick }) => {
  console.log("Child Re-rendered");
  return <button onClick={onClick}>add</button>;
});

export default App;
