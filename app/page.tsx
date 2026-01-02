import Image from "next/image";
import { FaTelegram } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-black overflow-hidden">
      {/* Main content */}
      <main className="flex flex-col items-center justify-center px-4 sm:px-6 gap-8 text-center">
        {/* Logo */}
        <div className="w-96 h-96 sm:w-full sm:h-full md:max-w-3xl md:max-h-3xl relative">
          <Image
            src="/SouzaLabzLogo1.png"
            alt="SouzaLabz Logo"
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </div>

        {/* Coming Soon text with neon effect */}
        <h1 className="neon-text text-3xl sm:text-4xl md:text-5xl font-bold text-center tracking-widest uppercase letter-spacing-wide">
          Coming Soon<span className="animate-pulse">...</span>
        </h1>

        {/* Telegram icon link */}
        <a
          href="https://t.me/souzalabzdotcom"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 hover:scale-110 transition-transform duration-300"
          aria-label="Visit our Telegram"
        >
          <FaTelegram className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
        </a>
      </main>
    </div>
  );
}
