export default function AboutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* Left Column */}
      <div className="w-full h-full font-clash px-4 sm:px-8 mt-6 md:mt-9">
        <h1 className="text-5xl font-bold">About</h1>
        <h1 className="text-5xl font-bold text-[#C4C2BE]">ADAAMSTACK</h1>
      </div>

      {/* Right Column */}
      <div className="flex items-start justify-center  h-dvh px-4 sm:px-0 mt-6 md:mt-0">
        <div className="font-grotesk text-2xl sm:text-3xl max-w-md leading-snug">
          <h1 className="text-[#C4C2BE]">
            <span className="text-[#ED5B30] text-3xl sm:text-4xl">
              ADAAMSTACK
            </span>{" "}
            was built to address the issues I had when I first began working in
            frontend programming and web design. Hunting for materials and tools
            took up a lot of time that could have been better spent improving my
            skills.
          </h1>
          <h1 className="text-[#C4C2BE] mt-6">
            <span className="text-[#ED5B30] text-3xl sm:text-4xl">
              ADAAMSTACK
            </span>{" "}
            now exists to assist individuals facing similar difficulties. These
            materials were chosen and compiled by me.
          </h1>
        </div>
      </div>
    </div>
  );
}
