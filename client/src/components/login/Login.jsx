import clsx from "clsx"
import { useState } from "react"

const Login = () => {
  const [variant, setVariant] = useState("LOGIN")

  return (
    <div
      className="bg-white rounded-md px-6 py-8 flex flex-col gap-6 text-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-5xl font-semibold tracking-tight font-dance">
        Welcome to rest06
      </h1>
      <div className="flex justify-start gap-6 border-b-4">
        <span
          className={clsx(
            variant === "LOGIN" && "border-b-2 border-black ",
            "cursor-pointer"
          )}
          onClick={()=>setVariant('LOGIN')}
        >
          Login
        </span>
        <span
          className={clsx(
            variant === "REGISTER" && "border-b-2 border-black",
            "cursor-pointer"
          )}
          onClick={()=>setVariant('REGISTER')}
        >
          New account
        </span>
      </div>
    </div>
  )
}

export default Login
