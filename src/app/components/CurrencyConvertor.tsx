// components/CurrencyConverter.tsx
"use client";
import Image from "next/image";

import { useState, useEffect } from "react";
import axios from "axios";
import { url } from "inspector";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        setExchangeRates(response.data.rates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchExchangeRates();
  }, []);

  const convertCurrency = () => {
    const conversionRate =
      exchangeRates[toCurrency] / exchangeRates[fromCurrency];
    const result = amount * conversionRate;
    setConvertedAmount(result);
  };

  return (
    <div
      className="min-h-screen h-full w-full scroll-overflow bg-cover bg-center relative md-small"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="p-4 md:w-1/2 mx-auto relative scroll-overflow">
        <h1 className="text-4xl font-bold mb-4 px-4 py-4 my-4">
          Currency Converter
        </h1>
        <div className="flex flex-col md:flex-row md:items-center mb-4 my-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="border rounded p-2 mb-2 md:mb-0 md:mr-2 flex-1 px-2 py-2 my-4"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border rounded p-2 mr-2 md:flex-1 px-2 py-2 my-4"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="mx-4 my-4 font-bold text-xl justify-center ">
            to
          </span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border rounded p-2 mr-2 md:flex-1 px-2 py-2 gap-2"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button
            onClick={convertCurrency}
            className="bg-blue-500 text-white rounded md-small px-4 py-2 rounded-lg ring-1 ring-black gap-2 my-4 "
          >
            Convert
          </button>
        </div>
        {!loading && (
          <div className="text-xl bg-white py-3 px-3 md-small">
            {amount} {fromCurrency} equals {convertedAmount.toFixed(2)}{" "}
            {toCurrency}
          </div>
        )}
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
};

export default CurrencyConverter;
