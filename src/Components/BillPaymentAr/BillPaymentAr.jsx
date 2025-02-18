import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";

export default function BillPayment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardType, setCardType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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
  const [errorMessage, setErrorMessage] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const detectCardType = (number) => {
    const visaRegex = /^4/;
    const masterCardRegex = /^5[1-5]/;

    if (visaRegex.test(number)) return "Visa";
    if (masterCardRegex.test(number)) return "MasterCard";
    return "";
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    if (value.length > 19) return;

    setCardNumber(value);
    setCardType(detectCardType(value.replace(/\s/g, "")));
    setErrorMessage({ ...errorMessage, cardNumber: "" });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 2 && value.length < 5)
      value = value.slice(0, 2) + "/" + value.slice(2);
    if (value.length > 5) return;
    setExpiry(value);
    setErrorMessage({ ...errorMessage, expiry: "" });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 3) return;
    setCvv(value);
    setErrorMessage({ ...errorMessage, cvv: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrorMessage = { cardNumber: "", expiry: "", cvv: "" };

    if (!cardNumber || cardNumber.replace(/\s/g, "").length !== 16) {
      newErrorMessage.cardNumber = "رقم البطاقة يجب أن يكون 16 رقمًا.";
      valid = false;
    }

    const expiryParts = expiry.split("/");
    if (
      !expiry ||
      expiryParts.length !== 2 ||
      !/^\d{2}$/.test(expiryParts[0]) ||
      !/^\d{2}$/.test(expiryParts[1]) ||
      parseInt(expiryParts[0], 10) > 12 ||
      parseInt(expiryParts[1], 10) < 23
    ) {
      newErrorMessage.expiry = "الرجاء إدخال تاريخ انتهاء صالح (MM/YY).";
      valid = false;
    }

    if (!cvv || cvv.length !== 3) {
      newErrorMessage.cvv = "CVV يجب أن يكون 3 أرقام.";
      valid = false;
    }

    setErrorMessage(newErrorMessage);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setSuccessMessage("تم الدفع بنجاح!");
      setErrorMessage({ cardNumber: "", expiry: "", cvv: "" });
    } else {
      setSuccessMessage("");
    }
  };

  return (
    <div className="bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))] min-h-screen flex justify-center items-center p-4">
      <div className="max-w-sm sm:max-w-2xl mx-auto text-center">
        <h2 className="text-3xl bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20 font-serif">
          إعادة شحن الرصيد باستخدام البطاقة
        </h2>

        <div className="w-full max-w-md p-6 shadow-lg bg-[#000000] rounded-2xl mt-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 ">
              <div>
                <label
                  htmlFor="card-number"
                  className="block font-medium text-gray-300"
                >
                  رقم البطاقة
                </label>
                <div className="relative">
                  <input
                    id="card-number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className="mt-1 w-full p-2 focus:outline-none  bg-[#A9A9A9] rounded-lg  pr-10"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                  {cardType && (
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-blue-500">
                      {cardType === "Visa" ? <FaCcVisa /> : <FaCcMastercard />}
                    </span>
                  )}
                </div>
                {errorMessage.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errorMessage.cardNumber}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label
                    htmlFor="expiry"
                    className="block font-medium text-gray-300"
                  >
                    تاريخ الانتهاء
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    className="mt-1 bg-[#A9A9A9] focus:outline-none w-full p-2  rounded-lg "
                    value={expiry}
                    onChange={handleExpiryChange}
                  />
                  {errorMessage.expiry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessage.expiry}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="cvv"
                    className="block font-medium text-gray-300"
                  >
                    CVV
                  </label>
                  <input
                    id="cvv"
                    type="password"
                    placeholder="123"
                    maxLength={3}
                    className="mt-1 w-full p-2 focus:outline-none bg-[#A9A9A9]  rounded-lg "
                    value={cvv}
                    onChange={handleCvvChange}
                  />
                  {errorMessage.cvv && (
                    <p className="text-red-500 text-sm mt-1">
                      {errorMessage.cvv}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 p-3 bg-[#A9A9A9]  rounded-lg hover:bg-[#888888] text-[#0F0F0F] font-bold duration-200 transition"
              >
                ادفع الآن
              </button>
              {successMessage && (
                <p className="text-green-500 text-center mt-4">
                  {successMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}