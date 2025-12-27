import React from "react";
import { ArrowRightIcon } from "lucide-react";

function NotfoundPage() {
  const PreviousPage = () => {
    window.history.back();
  };
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-10 ">
      <div className="flex flex-col items-center justify-center text-sm max-md:px-4 py-20 gap-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
          404 Not Found
        </h1>
        <div className="h-px w-80 rounded bg-linear-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
        <p className="md:text-xl text-gray-400 max-w-lg text-center">
          The page you are looking for does not exist or has been moved.
        </p>
        <p
          onClick={PreviousPage}
          className="md:text-lg cursor-pointer text-sm group flex items-center gap-1 px-7 py-5 text-gray-200 mt-10 font-medium active:scale-95 transition-all"
        >
          Back to Previous Page
          <ArrowRightIcon size={16} className="group-hover:translate-x-0.5 transition-all" />
        </p>
      </div>
    </div>
  );
}

export default NotfoundPage;
