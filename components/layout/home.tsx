
import CheckContract from "./contract/check-contract";
// import Stage from "./contract/stage";

const MainHome = () => {

  return (
    <div className="bg-gray-100 w-full h-full overflow-auto flex flex-col items-center justify-center px-3">
      <div className="bg-gray-100 w-full h-full md:w-lg mx-auto py-10">
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="text-2xl font-bold text-center">Verify & Publish Contract Source Code</p>
          <p className="text-sm text-gray-500 text-center">Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Orise will match the compiled code with that on the blockchain.</p>
        </div>
        {/* <Stage stage="contract" /> */}
        <CheckContract />
      </div>
    </div>
  )
}

export default MainHome;