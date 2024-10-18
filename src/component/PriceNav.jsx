import { BinanceIcon } from "../data/Icons";
import { CoinBaseIcon } from "../data/Icons";
import { priceNavData } from "../data/PriceNavData";

export default function PriceNav() {

  const getChangeColor = (value) => {
    return value.startsWith("-") ? "text-red-500" : "text-green-500";
  };

  return (
    <div className="flex justify-evenly items-center gap-4 bg-blue-200 border rounded-lg w-full">
      <div className="flex gap-3">
        <BinanceIcon />
        <h1 className="text-[#F0B90B] text-2xl font-bold leading-5">Binance</h1>
      </div>
      <ul className="flex justify-evenly items-center text-lg p-4 gap-8">
        {Object.entries(priceNavData).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            <span
              className={key === "24 Hour Change" ? getChangeColor(value) : ""}
            >
              {value}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex">
        <CoinBaseIcon />
        <h1 className="text-green-900 text-lg font-bold ml-2">Coinbase</h1>
      </div>
    </div>
  );
}
