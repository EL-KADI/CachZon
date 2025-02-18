import { useState, useEffect } from "react";
import "./WalletAr-module.css";

export default function WalletAr() {
  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [isValid1, setIsValid1] = useState(true);
  const [isValid2, setIsValid2] = useState(true);
  const [areNumbersEqual, setAreNumbersEqual] = useState(false);
  const [showVerificationCodeInput, setShowVerificationCodeInput] =
    useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [isEditing, setIsEditing] = useState(false);
  const gradientBackgroundStart = "rgb(0, 0, 0)";
  const gradientBackgroundEnd = "rgb(25, 25, 25)";
  const firstColor = "0, 0, 0";
  const secondColor = "20, 20, 20";
  const thirdColor = "30, 30, 30";
  const fourthColor = "40, 40, 40";
  const fifthColor = "50, 50, 50";
  const pointerColor = "10, 10, 10";
  const size = "80%";
  const blendingValue = "hard-light";

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  const accountSID = import.meta.env.VITE_TWILIO_ACCOUNT_SID;
const authToken = import.meta.env.VITE_TWILIO_AUTH_TOKEN;
const verifyServiceSID = import.meta.env.VITE_TWILIO_VERIFY_SERVICE_SID;


  const handlePhoneNumber1Change = (e) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber1(inputPhoneNumber);

    const egyptPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    setIsValid1(egyptPhoneRegex.test(inputPhoneNumber));

    setAreNumbersEqual(inputPhoneNumber === phoneNumber2);
  };

  const handlePhoneNumber2Change = (e) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber2(inputPhoneNumber);

    const egyptPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
    setIsValid2(egyptPhoneRegex.test(inputPhoneNumber));

    setAreNumbersEqual(inputPhoneNumber === phoneNumber1);
  };

  const handleVerificationCodeChange = (e) => {
    const inputCode = e.target.value;
    setVerificationCode(inputCode);
  };

  const sendVerificationCode = async () => {
    try {
      const egyptPhoneRegex = /^01[0-2,5]{1}[0-9]{8}$/;
      if (!egyptPhoneRegex.test(phoneNumber1)) {
        setErrorMessage("يرجى إدخال رقم هاتف مصري صالح.");
        return;
      }

      const formattedPhoneNumber = `+20${phoneNumber1}`;

      const response = await fetch(
        `https://verify.twilio.com/v2/Services/${verifyServiceSID}/Verifications`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${accountSID}:${authToken}`)}`,
          },
          body: new URLSearchParams({
            To: formattedPhoneNumber,
            Channel: "sms",
          }),
        }
      );

      const data = await response.json();
      if (data.status === "pending") {
        setShowVerificationCodeInput(true);
        setErrorMessage("");
      } else {
        throw new Error(data.message || "فشل في إرسال رمز التحقق.");
      }
    } catch (error) {
      setErrorMessage(`فشل في إرسال رمز التحقق: ${error.message}`);
    }
  };

  const verifyCode = async () => {
    try {
      const formattedPhoneNumber = `+20${phoneNumber1}`;

      const response = await fetch(
        `https://verify.twilio.com/v2/Services/${verifyServiceSID}/VerificationCheck`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${accountSID}:${authToken}`)}`,
          },
          body: new URLSearchParams({
            To: formattedPhoneNumber,
            Code: verificationCode,
          }),
        }
      );

      const data = await response.json();
      if (data.status === "approved") {
        setSuccessMessage("تم التحقق بنجاح!");
        setErrorMessage("");
      } else {
        throw new Error(data.message || "رمز التحقق غير صالح.");
      }
    } catch (error) {
      setErrorMessage(`فشل في التحقق من الرمز: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!showVerificationCodeInput) {
      if (!isValid1 || !isValid2 || areNumbersEqual) {
        setErrorMessage("يرجى التأكد من صحة أرقام الهواتف وعدم كونها متشابهة.");
        return;
      }

      sendVerificationCode();
    } else {
      verifyCode();
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setShowVerificationCodeInput(false);
    setVerificationCode("");
    setTimeLeft(60);
  };

  useEffect(() => {
    if (showVerificationCodeInput && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setErrorMessage("انتهت مدة صلاحية رمز التحقق. يرجى المحاولة مرة أخرى.");
      setShowVerificationCodeInput(false);
    }
  }, [showVerificationCodeInput, timeLeft]);

  return (
    <div className="bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] w-full pt-10 h-screen items-center my-auto flex flex-col justify-center">
      <div className=" max-w-sm sm:max-w-2xl mx-auto">
        <h2 className="text-center text-3xl  mx-auto bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-serif">
          تحويل الرصيد عبر المحفظة
        </h2>
      </div>
      <form
        className="sm:max-w-sm mx-auto max-w-xs z-50 custom-media w-full mt-10"
        onSubmit={handleSubmit}
      >
        {!showVerificationCodeInput && (
          <>
            <label
              htmlFor="phone-input-1"
              className="block mb-2 text-sm font-medium text-right text-gray-200"
            >
             المرسل
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <input
                type="text"
                id="phone-input-1"
                className={`${
                  isValid1 ? "border-gray-300" : "border-red-500"
                } text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 bg-[#555555] placeholder-gray-200 text-white`}
                placeholder="01"
                value={phoneNumber1}
                onChange={handlePhoneNumber1Change}
              />
            </div>
            {!isValid1 && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                يرجى إدخال رقم هاتف مصري صالح.
              </p>
            )}

            <label
              htmlFor="phone-input-2"
              className="block mb-2 mt-10 text-sm font-medium  text-right text-gray-200"
            >
            المستلم
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 18"
                >
                  <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z" />
                </svg>
              </div>
              <input
                type="text"
                id="phone-input-2"
                className={`${
                  isValid2 ? "border-gray-300" : "border-red-500"
                } text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 bg-[#555555] placeholder-gray-200 text-white`}
                placeholder="01"
                value={phoneNumber2}
                onChange={handlePhoneNumber2Change}
              />
            </div>
            {!isValid2 && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                يرجى إدخال رقم هاتف مصري صالح.
              </p>
            )}

            {areNumbersEqual && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                يجب أن تكون الأرقام مختلفة.
              </p>
            )}
          </>
        )}

        {showVerificationCodeInput && (
          <div className="relative">
            <label
              htmlFor="verification-code"
              className="block mb-2 text-sm font-medium text-gray-200"
            >
              رمز التحقق
            </label>
            <input
              type="text"
              id="verification-code"
              className={`${
                isCodeValid ? "border-gray-300" : "border-red-500"
              } text-sm rounded-lg focus:outline-none block w-full ps-10 p-2.5 bg-[#555555] placeholder-gray-200 text-white`}
              placeholder="رمز التحقق"
              value={verificationCode}
              onChange={handleVerificationCodeChange}
            />
            {!isCodeValid && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                رمز التحقق غير صالح.
              </p>
            )}
          </div>
        )}

        {errorMessage && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-500">
            {successMessage}
          </p>
        )}

        <button
          type="submit"
          className="mt-4 bg-[#A9A9A9] hover:bg-[#888888] text-[#0F0F0F] duration-200 font-bold py-2 px-4 rounded"
          disabled={
            !phoneNumber1 ||
            !phoneNumber2 ||
            !isValid1 ||
            !isValid2 ||
            areNumbersEqual ||
            (showVerificationCodeInput && !verificationCode)
          }
        >
          {showVerificationCodeInput ? `إدخال الرمز(${timeLeft}s)` : "إرسال "}
        </button>
        {showVerificationCodeInput && (
          <button
            type="button"
            onClick={handleEdit}
            className="mt-4 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            تعديل الرقم
          </button>
        )}
      </form>
    </div>
  );
}
