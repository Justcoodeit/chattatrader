import {
  Notification,
  ProfitAnalysis,
  CryptoChart,
  BellOutline,
  SelectedWallet,
  PocketWallet,
} from "../data/Icons";

function Navbar() {
  return (
    <div className="flex flex-col items-center bg-blue-200 w-20 py-4 space-y-4 h-full fixed border-none">
      <span className="mb-12 mt-4 cursor-pointer">
        <Notification />
      </span>
      <div className="flex flex-col items-center space-y-12 text-3xl text-gray-700">
        <span className="cursor-pointer">
          <ProfitAnalysis />
        </span>
        <span className="cursor-pointer">
          <CryptoChart />
        </span>
        <span className="cursor-pointer">
          <BellOutline />
        </span>
        <span className="cursor-pointer">
          <SelectedWallet />
        </span>
        <PocketWallet />
      </div>
    </div>
  );
}

export default Navbar;
