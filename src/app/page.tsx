// pages/index.tsx

import CurrencyConverter from "./components/CurrencyConvertor";

const Home = () => {
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center">
      <CurrencyConverter />
    </div>
  );
};

export default Home;
