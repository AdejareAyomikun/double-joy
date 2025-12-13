import Image from "next/image";
import { 
    Search, 
    Download, 
    Rocket, 
    Settings, 
} from "lucide-react";

export default function Header() {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3 sm:gap-2 p-5 border-b border-gray-200  sticky top-0 bg-white z-10">
      <div className="flex relative col-span-2">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search anything..."
          className="px-10 py-3 border border-gray-300 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div className="col-span-1"></div>
      <div className="col-span-1 mt-3 ml-20 flex">
          <button className="mx-2">
            <Download />
          </button>
          <button className="mx-2">
            <Rocket />
          </button>
          <button className="mx-2">
            <Settings />
          </button>
          <Image
            src="/images/profile-pic.jpg"
            alt="Profile Picture"
            width={32}
            height={32}
            className="object-contain rounded-full mx-2 mt-2"
          />
        </div>
    </div>
  );
}
