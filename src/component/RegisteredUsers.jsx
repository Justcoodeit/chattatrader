import { registeredUsers } from "../data/RegisteredUsers";

export default function RegisteredUsers() {
  return (
    <div className="p-4 border rounded-3xl">
      <div className="bg-[#FFFDD2] text-2xl font-semibold flex p-4 justify-between border rounded-3xl ">
        <h1>Registered Users</h1>{" "}
        <button className="rounded-3xl px-6 py-2 text-sm font-bold border bg-black text-white">
          Create Account +
        </button>
      </div>
      <div className="bg-white text-2xl font-semibold p-4 flex justify-between items-center">
        <button className="w-3/12 px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 gap-4 my-2 bg-yellow-200 text-black hover:bg-yellow-300">
          Name
        </button>
        <button className="w-3/12 px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 gap-4 my-2 bg-black text-white hover:bg-yellow-300 hover:text-black">
          Mobile
        </button>
        <button className="w-2/12 px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 gap-4 my-2 bg-yellow-200 text-black hover:bg-yellow-300">
          Wallets
        </button>
        <button className="w-2/12 px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 gap-4 my-2 bg-yellow-200 text-black hover:bg-yellow-300">
          Date/Time
        </button>
        <button className="w-2/12 px-4 py-2 font-bold border rounded-3xl text-xs transition-colors duration-200 gap-4 my-2 bg-yellow-200 text-black hover:bg-yellow-300">
          Status
        </button>
      </div>
      <div className="bg-white border border-gray-200 p-4">
        {registeredUsers.map((user, index) => (
          <div
            key={index}
            className="flex justify-between items-center mb-1 font-bold bg-gray-50 border rounded p-1 gap-4"
          >
            <div className="w-3/12 text-sm ">{user.username}</div>
            <div className="w-3/12 text-sm ">{user.mobile}</div>
            <div className="w-2/12 text-sm ">{user.numberOfWallets}</div>
            <div className="w-2/12 text-sm ">{user.date}</div>
            <div className="w-2/12">
              <span
                className={`px-8 py-2 inline-flex text-s leading-5 font-semibold rounded-full ${
                  user.isActive
                    ? "bg-[#32A071] text-white"
                    : "bg-[#F6465D] text-white"
                }`}
              >
                {user.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
