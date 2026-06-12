import Image from "next/image";
import Link from "next/link";

const checks = ["Physically examined", "Scientifically tested", "Mukhi verified", "Certification included"];

export default function AuthenticityCertification() {
  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      <div className="grid grid-cols-1 lg:grid-cols-[650px_1fr] gap-10 lg:gap-14 items-center">
        <div className="relative w-full h-[280px] lg:w-[650px] lg:h-[602px] overflow-hidden">
          <Image
            src="/assets/images/about/about-sacred-1.png"
            alt="Authenticity & Certification"
            fill
            sizes="(max-width: 1024px) 100vw, 650px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="font-prata text-3xl lg:text-[36px] text-dark m-0">Authenticity &amp; Certification</h2>
          <p className="font-lato text-sm text-gray-text m-0 leading-relaxed max-w-md">
            Each Rudraksha is verified before it is offered and accompanied by documented certification.
          </p>
          <div className="flex flex-col gap-3">
            {checks.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-brown shrink-0" />
                <span className="font-lato text-sm text-gray-text">{item}</span>
              </div>
            ))}
          </div>
          <Link
            href="/authenticity"
            className="inline-flex items-center gap-2 font-lato text-xs font-bold tracking-[0.8px] text-brown border-b border-brown pb-1 w-fit"
          >
            VIEW OUR AUTHENTICITY &amp; CERTIFICATION PROCESS
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
