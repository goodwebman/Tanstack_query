import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/redux";
import { authSlice } from "./authSlice";
import { loginThunk, useLoginLoading } from "./loginThunk";

export function Login() {
  const dispatch = useAppDispatch();

  const isLoading = useLoginLoading();
  const loginError = useAppSelector(authSlice.selectors.loginError);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginThunk(login, password));
  };

  const isFormEmpty = !login.trim() || !password.trim();

  return (
    <div className="p-5 border border-slate-500 rounded-lg container mx-auto mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl">Login</h1>

        <input
          className="p-5 rounded border border-slate-500"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Login"
        />

        <input
          className="p-5 rounded border border-slate-500"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {loginError && (
          <div className="bg-rose-500 text-white p-3 rounded">{loginError}</div>
        )}

        <button
          type="submit"
          disabled={isLoading || isFormEmpty}
          className="p-5 rounded bg-teal-500 text-white disabled:bg-slate-300"
        >
          Вход
        </button>
      </form>
    </div>
  );
}
