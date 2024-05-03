import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Currency() {
  const [rates, setRates] = useState({});
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [convert, setConvert] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/361375572d9d9d23fd22dcda/latest/${fromCurrency}`
        );
        const datas = response.data.conversion_rates;
        setRates(datas);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, [fromCurrency]);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleFrom = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleTo = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = () => {
    const result = amount * rates[toCurrency];
    setConvert(result);
  };

  return (
    <>
      <div className="container w-4/12  ml-[30%] mt-8 px-5  ">
        <div class="p-3 mt-8 items-center flex justify-center text-white text-center text-3xl bg-purple-900">
          <span class="text-orange-500">Calcu</span>lator
        </div>
        <div>
          <label className="mb-5 block">
            Amount:
            <input
              className="w-full p-4 mt-3 border-2 border-black"
              type="number"
              value={amount}
              onChange={handleAmount}
            />
          </label>
        </div>
        <div>
          <label className="mb-5 block">
            FromCurrency:
            <select
              className="w-full p-4 mt-3 border-2 border-black"
              value={fromCurrency}
              onChange={handleFrom}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            ToCurrency:
            <select
              className="w-full p-4 mt-2 border-2 border-black"
              value={toCurrency}
              onChange={handleTo}
            >
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          onClick={handleConvert}
          class="w-full tracking-tight bg-black h-[50px] my-3  flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        >
          Convert
        </button>
        <div>
          <p className="text-bold mt-3 py-4 bg-gray-200 text-black">
            Converted Amount: {convert}
          </p>
        </div>
      </div>
    </>
  );
}
