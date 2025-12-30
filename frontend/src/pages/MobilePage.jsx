import { useState } from "react";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

const MobilePage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle email submission logic here

    if (email.trim() === "" || !email.includes("@")) {
      return toast.error("Please enter a valid email address.");
    }

    setEmail("");
    setLoading(true);
    toast.success("Email submitted successfully!");
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-center bg-base-300 shadow-[0px_4px_25px_0px_#0000000D] rounded-xl max-w-lg md:w-full w-11/12 md:py-8 py-6">
        <div className="flex items-center justify-center p-3 bg-base-100 rounded-full">
          <img
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/model/faceIcon.svg"
            alt="faceIcon"
          />
        </div>
        <h2 className="text-white font-medium text-lg mt-3">
          Look like you're on a mobile device!
        </h2>
        <p className="text-sm text-gray-300 mt-1 md:w-80 w-72 text-center">
          For the best coding experience, please switch to a desktop or laptop
          device.
        </p>
        <div className="flex items-center mt-5 w-full md:px-16 px-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="text-sm text-white/90 border-r-0 outline-none placeholder-white/90 border bg-transparent border-primary pl-3 w-full h-10 rounded-l-md"
          />
          <button
            type="button"
            className="font-medium text-sm text-slate-900 bg-linear-to-r from-primary via-secondary to-accent w-36 h-10 rounded-r-md"
            onClick={handleSubmit}
          >
            {loading ? (
              <div className="h-full w-full flex items-center justify-center gap-1.5">
                <Loader className="size-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span>Notify Me</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobilePage;
