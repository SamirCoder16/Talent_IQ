import React, { useCallback, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";

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
