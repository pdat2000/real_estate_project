import { useState } from 'react'
import OtpInput from 'react-otp-input'
import { Button } from '~/components'

const OtpVerifier = ({ phone, cb }) => {
  const [otp, setOtp] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleConfirmOTP = () => {
    setIsLoading(true)
    window.confirmationResult
      ?.confirm(otp)
      .then((result) => {
        setIsLoading(false)
        cb()
      })
      .catch((err) => {
        setIsLoading(false)
      })
  }

  return (
    <div className="p-4 flex flex-col gap-12 justify-center items-center h-full">
      <span>
        We sent OTP code to your phone number, Please check your phone.
      </span>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span>☆</span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="otp-item h-16 border rounded-md outline-none inline-block border-blue-600 text-lg mx-2"
        shouldAutoFocus={true}
      />
      <div className="flex gap-4 items-center justify-center">
        <Button handleOnClick={handleConfirmOTP} disabled={isLoading}>
          Confirm OTP
        </Button>
        <Button className="bg-orange-600" handleOnClick={() => setOtp('')}>
          Clear
        </Button>
      </div>
    </div>
  )
}

export default OtpVerifier
