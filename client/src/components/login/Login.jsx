import { useEffect, useState } from "react"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { Button, InputForm, InputRadio } from ".."
import { apiRegister, apiSignIn } from "~/apis/auth"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import { useAppStore } from "~/store/useAppStore"

const Login = () => {
  const [variant, setVariant] = useState("LOGIN")
  const { setModal } = useAppStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const onSubmit = async (data) => {
    if (variant === "REGISTER") {
      const response = await apiRegister(data)
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Congrats",
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: "Go sign in",
        }).then(({ isConfirmed }) => {
          if (isConfirmed) setVariant("LOGIN")
        })
      } else toast.error(response.mes)
    }

    if (variant === "LOGIN") {
      const { name, role, ...payload } = data
      const response = await apiSignIn(data)
      if (response.success) {
        toast.success(response.mes)
        setModal(false, null)
      } else toast.error(response.mes)
    }
  }

  useEffect(() => {
    reset()
  }, [variant])

  return (
    <div
      className="bg-white rounded-md px-6 py-8 flex flex-col gap-6 text-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="text-5xl font-semibold tracking-tight font-dance">
        Welcome to rest06
      </h1>
      <div className="flex justify-start gap-6 border-b-4 w-full">
        <span
          className={clsx(
            variant === "LOGIN" && "border-b-2 border-black ",
            "cursor-pointer"
          )}
          onClick={() => setVariant("LOGIN")}
        >
          Login
        </span>
        <span
          className={clsx(
            variant === "REGISTER" && "border-b-2 border-black",
            "cursor-pointer"
          )}
          onClick={() => setVariant("REGISTER")}
        >
          New account
        </span>
      </div>
      <form className="flex flex-col gap-4 w-full px-4">
        <InputForm
          register={register}
          id="phone"
          label="Phone number"
          inputClassname="rounded-md"
          placeholder="type your phonenumber here"
          validate={{
            required: "This field cannot empty",
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: "Phone number invalid",
            },
          }}
          errors={errors}
        />
        <InputForm
          register={register}
          id="password"
          label="Password"
          inputClassname="rounded-md"
          placeholder="type your password here"
          type="password"
          validate={{ required: "This field cannot empty" }}
          errors={errors}
        />
        {variant === "REGISTER" && (
          <InputForm
            register={register}
            id="name"
            label="Your fullname"
            inputClassname="rounded-md"
            placeholder="type your fullname here"
            validate={{ required: "This field cannot empty" }}
            errors={errors}
          />
        )}
        {variant === "REGISTER" && (
          <InputRadio
            register={register}
            id="role"
            label="Type account"
            inputClassname="rounded-md"
            validate={{ required: "This field cannot empty" }}
            errors={errors}
            options={[
              {
                label: "User",
                value: "USER",
              },
              {
                label: "Agent",
                value: "AGENT",
              },
            ]}
          />
        )}

        <Button className="py-2 my-6" handleOnClick={handleSubmit(onSubmit)}>
          {variant === "LOGIN" ? "Sign in" : "Register"}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password ?
        </span>
      </form>
    </div>
  )
}

export default (Login)
