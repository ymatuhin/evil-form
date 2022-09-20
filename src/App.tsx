import { useState } from "react";
import { AuthForm } from "./auth-form";

export function App() {
  const [done, setDone] = useState(false);
  return done ? <p>Ok!</p> : <AuthForm onSuccess={() => setDone(true)} />;
}
