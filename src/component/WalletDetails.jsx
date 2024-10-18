import { cardData } from "./../data/ProfitLossData";
import { functionsData } from "../data/WalletDetailsData";

const WalletDetails = () => {
  const PnLCard = ({ title, plPercent, plAmount, btnText }) => {
    return (
      <div
        className={`p-2 rounded-lg shadow-md flex flex-col items-center text-center min-w-sm ${
          plPercent.startsWith("-") ? "bg-[#fcf0de]" : "bg-[#ecfaf0]"
        }`}
      >
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p
          className={`text-3xl font-bold ${
            plPercent.startsWith("-") ? "text-red-500" : "text-green-500"
          }`}
        >
          {plPercent}
        </p>
        <p
          className={`text-lg font-semibold mb-1  ${
            plAmount.startsWith("-") ? "text-red-500" : "text-green-500"
          }`}
        >
          {plAmount}
        </p>
        <button className="bg-black text-white rounded-full px-3 py-1 text-lg">
          {btnText}
        </button>
      </div>
    );
  };
  return (
    <>
      <div className="flex flex-wrap gap-3 mt-6 justify-center">
        {functionsData.map((func, index) => (
          <div
            key={index}
            style={{ backgroundColor: func.bgColor }}
            className="flex flex-col items-center justify-center rounded-full w-24 h-24 p-2 shadow-md"
          >
            <span className="text-black text-2xl">{func.icon}</span>
            <p className="text-lg font-light mt-1">{func.title}</p>
          </div>
        ))}
      </div>
      <div className="p-1 mt-8 grid grid-cols-3 gap-[1rem] mx-auto">
        {cardData.map((card, index) => (
          <PnLCard
            key={index}
            title={card.title}
            plPercent={card.plPercent}
            plAmount={card.plAmount}
            btnText={card.btnText}
            bgColor={card.bgColor}
          />
        ))}
      </div>
    </>
  );
};

export default WalletDetails;
