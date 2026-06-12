import Image from "next/image";

const suitable = [
  "You're beginning or continuing a consistent spiritual practice",
  "You value steadiness and clarity over intensity",
  "You prefer traditionally versatile rudraksha",
];

const notSuitable = [
  "You're seeking instant or dramatic results",
  "You're unsure of your intention",
  "You're choosing based only on trends",
];

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <path d="M3.33 10L7.5 14.17L16.67 5" stroke="#552912" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
      <path d="M4.38 4.38L15.62 15.62M15.62 4.38L4.38 15.62" stroke="#BB5A28" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function IsThisRightForYou() {
  return (
    <section className="h-px-section py-14 lg:py-20" style={{ background: "#FEF9F2" }}>
      <h2 className="font-prata text-3xl lg:text-[36px] text-dark text-center m-0 mb-10 lg:mb-12">Is This Right for You?</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          <span className="font-lato text-base font-medium text-gray-text">This may be suitable for you if:</span>
          <div className="flex flex-col gap-4">
            {suitable.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckIcon />
                <span className="font-lato text-sm text-gray-text leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center order-1 lg:order-2">
          <div
            className="w-full max-w-[320px] aspect-square p-[3%]"
            style={{
              border: "3px solid transparent",
              backgroundImage: "linear-gradient(#FEF9F2, #FEF9F2), linear-gradient(180deg, #552912 0%, #BB5A28 100%)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src="/assets/images/products/category-necklace.png"
                alt="4 Mukhi Rudraksha"
                fill
                sizes="(max-width: 1024px) 90vw, 320px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5 order-3">
          <span className="font-lato text-base font-medium text-gray-text">This may not be suitable if:</span>
          <div className="flex flex-col gap-4">
            {notSuitable.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CrossIcon />
                <span className="font-lato text-sm text-gray-text leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
