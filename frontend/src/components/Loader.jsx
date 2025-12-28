import { LoaderIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-base-200">
        <div className="flex flex-col items-center justify-center gap-6">
            <LoaderIcon className="size-10 text-primary md:size-8 animate-spin transition-all duration-300" />
            <p className="text-xl">Loading...</p>
        </div>
    </div>
  )
}

export default Loader