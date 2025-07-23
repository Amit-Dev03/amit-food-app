const Online = () => {
  return (
    <>
      <span className="relative flex h-3 w-3 mb-6 mt-[0.32rem]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
      </span>
      <span className="ml-2 font-medium text-gray-700 mb-6">Online</span>
    </>
  );
};
export default Online;
