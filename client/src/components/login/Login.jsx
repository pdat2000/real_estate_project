import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { Button, InputForm, InputRadio, OtpVerifier } from '..'
import { apiRegister, apiSignIn } from '~/apis/auth'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { useAppStore } from '~/store/useAppStore'
import { useUserStore } from '~/store/useUserStore'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import auth from '~/utils/firebaseConfig'
import { twMerge } from 'tailwind-merge'

const Login = () => {
  const [variant, setVariant] = useState('LOGIN')
  const [isLoading, setIsLoading] = useState(false)
  const { setModal } = useAppStore()
  const { setToken, roles } = useUserStore()
  const [isShowComfirmOTP, setIsShowComfirmOTP] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const handleCaptchaVerify = () => {
    if (!window.recaptchVerify) {
      window.recaptchVerify = new RecaptchaVerifier(
        auth,
        'recaptcha-verifiler',
        {
          size: 'invisible',
          callback: (response) => {},
          'expired-callback': (response) => {},
        }
      )
    }
  }
  const handleSendOTP = (phone) => {
    setIsLoading(true)
    handleCaptchaVerify()
    const verifier = window.recaptchVerify
    const formatPhone = '+84' + phone.slice(1)
    signInWithPhoneNumber(auth, formatPhone, verifier)
      .then((result) => {
        setIsLoading(false)
        toast.success('send OTP to your phone')
        window.confirmationResult = result
        setIsShowComfirmOTP(true)
      })
      .catch((error) => {
        setIsLoading(false)
        window.confirmationResult = null
        toast.error('something went wrong')
      })
  }
  const onSubmit = async (data) => {
    if (variant === 'REGISTER') {
      if (data?.roleCode !== 'ROL7') {
        handleSendOTP(data.phone)
      } else handleRegister(data)
    }
    if (variant === 'LOGIN') {
      setIsLoading(true)
      const response = await apiSignIn(data)
      setToken(response.accessToken)
      setIsLoading(false)
      if (response.success) {
        toast.success(response.mes)
        setModal(false, null)
      } else toast.error(response.mes)
    }
  }
  const handleRegister = async (data) => {
    const { roleCode, ...payload } = data
    if (!roleCode === 'ROL7') data.roleCode = roleCode
    const response = await apiRegister(payload)
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Congrats',
        text: response.mes,
        showConfirmButton: true,
        confirmButtonText: 'Go sign in',
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          setVariant('LOGIN')
          setIsShowComfirmOTP(false)
        }
      })
    } else toast.error(response.mes)
  }

  useEffect(() => {
    reset()
  }, [reset, variant])

  return (
    <div
      className={twMerge(
        clsx(
          'bg-white rounded-md px-6 py-8 w-[600px] flex flex-col gap-6 text-lg relative',
          isShowComfirmOTP && 'w-[600px] h-[270px]'
        )
      )}
      onClick={(e) => e.stopPropagation()}
    >
      {isShowComfirmOTP && (
        <div className="absolute inset-0 bg-white rounded-md">
          <OtpVerifier cb={handleSubmit(handleRegister)} />
        </div>
      )}
      <h1 className="text-5xl font-semibold tracking-tight font-dance">
        Welcome to rest06
      </h1>
      <div
        className={twMerge(
          clsx(
            'flex justify-start gap-6 border-b-4 w-full',
            isShowComfirmOTP && 'hidden'
          )
        )}
      >
        <span
          className={clsx(
            variant === 'LOGIN' && 'border-b-2 border-black ',
            'cursor-pointer'
          )}
          onClick={() => setVariant('LOGIN')}
        >
          Login
        </span>
        <div id="recaptcha-verifiler"></div>
        <span
          className={clsx(
            variant === 'REGISTER' && 'border-b-2 border-black',
            'cursor-pointer'
          )}
          onClick={() => setVariant('REGISTER')}
        >
          New account
        </span>
      </div>
      <form
        className={twMerge(
          clsx('flex flex-col gap-4 w-full px-4', isShowComfirmOTP && 'hidden')
        )}
      >
        <InputForm
          register={register}
          id="phone"
          label="Phone number"
          inputClassname="rounded-md"
          placeholder="type your phonenumber here"
          validate={{
            required: 'This field cannot empty',
            pattern: {
              value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
              message: 'Phone number invalid',
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
          validate={{ required: 'This field cannot empty' }}
          errors={errors}
        />
        {variant === 'REGISTER' && (
          <InputForm
            register={register}
            id="name"
            label="Your fullname"
            inputClassname="rounded-md"
            placeholder="type your fullname here"
            validate={{ required: 'This field cannot empty' }}
            errors={errors}
          />
        )}
        {variant === 'REGISTER' && (
          <InputRadio
            register={register}
            id="roleCode"
            label="Type account"
            inputClassname="rounded-md"
            validate={{ required: 'This field cannot empty' }}
            errors={errors}
            optionsClassname="grid grid-cols-3 gap-4"
            options={roles
              .filter((el) => el.code !== 'ROL1')
              .map((el) => ({ label: el.value, value: el.code }))}
          />
        )}
        <Button
          className="py-2 my-6"
          handleOnClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          {variant === 'LOGIN' ? 'Sign in' : 'Register'}
        </Button>
        <span className="cursor-pointer text-main-500 hover:underline w-full text-center">
          Forgot your password ?
        </span>
      </form>
    </div>
  )
}

export default Login
