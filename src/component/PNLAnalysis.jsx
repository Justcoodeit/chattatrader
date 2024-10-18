import { BsEye } from "react-icons/bs";
import productImg from "./../data/images/alarmz-pnl.png";

export default function PNLAnalysis() {
  return (
    <>
      <div className="">
        <img height={288} width={417} src={productImg} alt="alarmz-img" />
        <h1 className="text-[#231F20] leading-6 font-medium bg-[#F0E303] border border-yellow-300 rounded-xl text-2xl p-1 text-center mt-2 ml-1 mr-1">
          PNL Analysis
        </h1>
        <div className="flex justify-around items-center mt-4 mr-1 ml-1">
          <div className="cursor-pointer bg-[#DFF0FF] rounded-full px-7 py-4 text-xl w-2/4 text-center flex justify-center items-center gap-2 shadow-md">
            <div className="text-md bg-black text-white p-1 rounded-full">
              <BsEye />
            </div>
            <p className="text-xs font-bold">Total Value (ALZ)</p>
          </div>

          <div className="flex justify-center items-center w-2/4 ">
            <select
              name="currency"
              id="currency"
              className="bg-black text-white rounded-full text-lg px-7 py-4 shadow-md cursor-pointer"
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="YEN">YEN</option>
            </select>
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-3 text-[#231F20]">129,00.000</h1>
          <h2 className="text-xl bg-gray-300 px-4 py-2 text-center border border-gray-400 rounded-full">
            ~$898,090.0000
          </h2>
        </div>
      </div>
    </>
  );
}
