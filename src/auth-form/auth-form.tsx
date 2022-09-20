import clsx from "clsx";
import type { FormEvent } from "react";
import { useRef, useState } from "react";
import { login } from "./api";
import s from "./auth-form.module.css";
import logoUrl from "./logo.svg";

type Props = { onSuccess: Function };
type Status = "initial" | "dirty" | "pending" | "done" | "error";

export function AuthForm({ onSuccess }: Props) {
  const [status, setStatus] = useState<Status>("initial");
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const formValid = formRef.current?.checkValidity() ?? false;
  const emailValid = formRef.current?.email.validity.valid ?? false;
  const passwordValid = formRef.current?.password.validity.valid ?? false;
  const showErrors = status === "dirty" || status === "error";

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setServerError(null);

    if (!formValid) {
      setStatus("dirty");
    } else {
      setStatus("pending");

      login()
        .then(() => {
          setStatus("done");
          onSuccess();
        })
        .catch((errorText) => {
          setStatus("error");
          setServerError(errorText);
        });
    }
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <img
          width="47"
          height="40"
          className={s.logo}
          src={logoUrl}
          alt="Your Company"
        />
        <h2 className={s.title}>Sign in to your account</h2>
      </div>
      <form
        ref={formRef}
        className={clsx(s.form, {
          [s.dirty]: showErrors,
        })}
        noValidate
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email" className={s.readers}>
            Email address
          </label>
          <input
            value={email}
            id="email"
            type="email"
            autoComplete="email"
            required
            className={clsx(s.field, s.topField)}
            onChange={(event) => {
              setEmail(event.target.value);
              setServerError(null);
            }}
            placeholder="Email address"
            disabled={status === "pending"}
          />
        </div>
        <div>
          <label htmlFor="password" className={s.readers}>
            Password
          </label>
          <input
            value={password}
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            disabled={status === "pending"}
            required
            className={clsx(s.field, s.bottomField)}
            onChange={(event) => {
              setPassword(event.target.value);
              setServerError(null);
            }}
            placeholder="Password"
          />
        </div>

        <button
          type="submit"
          className={s.submit}
          disabled={status === "pending" || (status === "dirty" && !formValid)}
        >
          {status === "pending" ? "Signing in..." : "Sign in"}
        </button>

        <div className={s.errors}>
          {showErrors && (
            <>
              {serverError && <p>{serverError}</p>}
              {!emailValid && <p>Incorrect email address</p>}
              {!passwordValid && <p>Incorrect password</p>}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
