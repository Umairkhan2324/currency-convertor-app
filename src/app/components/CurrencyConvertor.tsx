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
      className="min-h-screen f-full w-full scroll-overflow bg-cover bg-center relative"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="p-4 md:w-1/2 mx-auto relative scroll-overflow">
        <h1 className="text-4xl font-semibold mb-4 md-small flex item-center justify-center">
          Currency Converter
        </h1>
        <div className="flex items-center mb-4 md-small">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value))}
            className="border rounded p-2 mr-2 flex-1 md-small"
          />
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="border rounded p-2 mx-2 md-small"
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <span className="mx-2">to</span>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="border rounded p-2 mx-2 md-small "
          >
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          <button
            onClick={convertCurrency}
            className="bg-blue-500 text-white px-4 py-2 rounded md-small"
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
