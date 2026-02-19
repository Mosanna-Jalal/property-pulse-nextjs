const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      <p className="text-lg font-semibold text-gray-600">Map is loading...</p>
    </div>
  );
};

export default Spinner;
