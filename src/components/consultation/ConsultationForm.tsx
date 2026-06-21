"use client";

import { useState } from "react";
import { submitConsultationRequest } from "@/app/actions/consultation";
import { CldUploadWidget } from "next-cloudinary";
import { Upload, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConsultationForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [kundaliUrl, setKundaliUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    
    if (!kundaliUrl) {
      setError("Please upload your Kundali document before submitting.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("kundaliUrl", kundaliUrl);

    const result = await submitConsultationRequest(formData);
    
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(result.error || "Something went wrong.");
    }
  };

  return (
    <section className="section-pad bg-cream" id="consultation-form">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <h2 className="font-prata title-fluid mb-3 text-dark">Book Your Consultation</h2>
          <p className="font-lato text-gray-text">Please fill out all the fields below so our experts can prepare for your session.</p>
        </div>

        {isSubmitted ? (
          <div className="bg-white p-8 md:p-16 text-center border border-[#E7DFD6] shadow-sm flex flex-col items-center gap-4">
            <CheckCircle2 size={48} className="text-[#5b8c5a]" strokeWidth={1.5} />
            <h3 className="font-prata text-2xl text-dark">Request Received</h3>
            <p className="font-lato text-gray-text max-w-md mx-auto">
              Thank you! Your consultation request has been submitted. Our team will review your details and contact you shortly to confirm your appointment.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 border border-[#E7DFD6] shadow-sm flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Full Name *</label>
                <input required type="text" name="name" id="name" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors" placeholder="Enter your full name" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Email Address *</label>
                <input required type="email" name="email" id="email" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors" placeholder="Enter your email" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Phone Number *</label>
                <input required type="tel" name="phone" id="phone" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors" placeholder="Enter your phone number" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="dob" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Date of Birth *</label>
                <input required type="date" name="dob" id="dob" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors text-gray-text" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="tob" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Time of Birth *</label>
                <input required type="time" name="tob" id="tob" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors text-gray-text" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pob" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Place of Birth *</label>
                <input required type="text" name="pob" id="pob" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors" placeholder="City, Country" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="appointment" className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Preferred Appointment Date *</label>
                <input required type="date" name="appointment" id="appointment" className="border-b border-[#E7DFD6] px-2 py-3 font-lato text-[15px] bg-transparent focus:outline-none focus:border-brown transition-colors text-gray-text" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="font-lato text-xs font-bold tracking-[0.08em] text-dark uppercase">Upload Kundali *</label>
                <div className="pt-2">
                  <CldUploadWidget
                    signatureEndpoint="/api/cloudinary/sign-public"
                    options={{
                      folder: "Rudraksh/Kundali",
                      multiple: false,
                      clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "pdf"],
                      maxFileSize: 10000000,
                    }}
                    onSuccess={(result) => {
                      if (result.event === "success" && typeof result.info === "object" && result.info !== null) {
                        const info = result.info as { secure_url: string };
                        setKundaliUrl(info.secure_url);
                        setError("");
                      }
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className={`w-full flex items-center justify-center gap-2 border border-[#E7DFD6] px-4 py-3 font-lato text-[15px] transition-colors ${kundaliUrl ? 'bg-[#f4eedd] text-dark border-brown' : 'bg-[#FEF9F2] text-gray-text hover:bg-black/5'}`}
                      >
                        {kundaliUrl ? <CheckCircle2 size={18} className="text-brown" /> : <Upload size={18} />}
                        {kundaliUrl ? "Kundali Uploaded" : "Choose File (Image/PDF)"}
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>
            </div>

            {error && (
              <p className="font-lato text-sm text-destructive text-center mt-2">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-6 bg-brown text-white font-lato font-medium tracking-[0.06em] uppercase text-[15px] py-4 w-full hover:bg-[#431f0d] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
