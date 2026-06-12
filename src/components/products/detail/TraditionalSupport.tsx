import Image from "next/image";

export default function TraditionalSupport() {
  return (
    <section className="relative h-[280px] lg:h-[360px] overflow-hidden">
      <Image src="/assets/images/home/beads.png" alt="What This Traditionally Supports" fill sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-3">
        <h2 className="font-prata text-2xl lg:text-[32px] text-white m-0">What This Traditionally Supports</h2>
        <p className="font-lato text-sm text-white/85 max-w-2xl m-0 leading-relaxed">
          The 5 Mukhi Rudraksha is traditionally associated with everyday balance and clarity. It is commonly chosen by
          individuals seeking steadiness in routine, focus in practice, and a grounded approach to spiritual growth.
        </p>
        <p className="font-lato text-xs italic text-white/55 m-0">
          Individual experiences may vary. This is not a medical or guaranteed outcome.
        </p>
      </div>
    </section>
  );
}
