import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { stockData } from "./../data/AssetsNetWorthData.js";

export default function AssetNetWorth() {
  return (
    <div className="container border rounded-md p-2">
      <div className="w-full bg-[#FFFDD2] text-black text-center p-2 text-xl font-bold mb-4 border rounded-md border-none">
        <h1>Asset Net Worth</h1>
      </div>
      <div className="flex justify-evenly mb-4">
        <div className="flex flex-col items-center">
          <button className="rounded-3xl px-6 py-2 text-lg font-bold border bg-black text-white">
            +$122,321
          </button>
          <p className="font-extralight text-sm text-gray-600">
            Last updated: 02 hrs ago
          </p>
        </div>
        <div className="flex gap-4 justify-between items-center">
          {["1D", "1W", "1M", "1Y"].map((period, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 ${
                period === "1M"
                  ? "bg-black text-white"
                  : "bg-yellow-200 text-black"
              } hover:bg-yellow-300`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      <div className="h-72 w-[28rem] mx-auto">
        <ResponsiveContainer>
          <AreaChart data={stockData}>
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotoneX"
              dataKey="price"
              stroke="#006400"
              strokeWidth={2}
              fill="url(#colorGreen)"
              fillOpacity={0.2}
            />
            <defs>
              <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="green" stopOpacity={0.4} />
                <stop offset="100%" stopColor="green" stopOpacity={0.1} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
