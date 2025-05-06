const Loader = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-white text-black">
    <div className="text-xl font-semibold mb-2">
      Please wait, loading the application...
    </div>
    <div className="text-sm text-gray-600 text-center max-w-md px-4">
      We’re setting things up in your browser. This may take a few seconds. If
      it takes too long, please check your browser storage settings or refresh
      the page.
    </div>
  </div>
);

export default Loader;
