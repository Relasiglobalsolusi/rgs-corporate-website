import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";

export default function ContactForm() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-6 py-28 text-slate-950 md:px-10"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
              Contact RGS
            </p>

            <h2 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
              Let&apos;s build a cleaner, safer, better-managed facility.
            </h2>
          </div>

          <p className="max-w-2xl text-lg leading-8 text-slate-600 lg:ml-auto">
            Tell us what your site needs. Our team will recommend the right
            cleaning, security, parking, or integrated facility support
            solution.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/60 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative overflow-hidden bg-slate-950 p-8 text-white md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.22),transparent_32%)]" />

            <div className="relative z-10 flex h-full min-h-[560px] flex-col justify-between">
              <div>
                <h3 className="mb-5 text-4xl font-black leading-tight">
                  Professional support for daily operations.
                </h3>

                <p className="max-w-md text-lg leading-8 text-slate-300">
                  RGS supports commercial buildings, hospitals, hotels,
                  logistics sites, residential properties, and industrial
                  facilities across Indonesia.
                </p>
              </div>

              <div className="grid gap-4">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Jalan+Daan+Mogot+KM+14.5+Ruko+Point+8+Blok+F6+Duri+Kosambi+Cengkareng+West+Jakarta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-teal-300/40 hover:bg-white/10"
                >
                  <MapPin className="mt-1 shrink-0 text-teal-300 transition group-hover:scale-110" />

                  <div>
                    <p className="font-black">Office Address</p>
                    <p className="mt-1 leading-7 text-slate-300 transition group-hover:text-white">
                      Jalan Daan Mogot KM 14.5
                      <br />
                      Ruko Point 8 Blok F6
                      <br />
                      Duri Kosambi, Cengkareng
                      <br />
                      West Jakarta
                    </p>
                  </div>
                </a>

                <div className="grid gap-4 sm:grid-cols-2">
                  <a
                    href="mailto:contact@rgs.co.id"
                    className="group flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-teal-300/40 hover:bg-white/10"
                  >
                    <Mail className="shrink-0 text-teal-300 transition group-hover:scale-110" />

                    <div>
                      <p className="font-black">Email</p>
                      <p className="mt-1 break-all text-slate-300 transition group-hover:text-white">
                        contact@rgs.co.id
                      </p>
                    </div>
                  </a>

                  <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                    <Clock className="shrink-0 text-teal-300" />

                    <div>
                      <p className="font-black">Response</p>
                      <p className="mt-1 text-slate-300">
                        Proposal-ready team
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+622122952228"
                  className="group flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-teal-300/40 hover:bg-white/10"
                >
                  <Phone className="shrink-0 text-teal-300 transition group-hover:scale-110" />

                  <div>
                    <p className="font-black">Phone</p>
                    <p className="mt-1 text-slate-300 transition group-hover:text-white">
                      +62 21 2295 2228
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <form className="bg-slate-950 p-8 text-white md:p-10">
            <div className="mb-10 border-b border-white/10 pb-8">
              <h3 className="text-4xl font-black leading-tight">
                Request a consultation.
              </h3>

              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-300">
                Share your facility type, location, and operational
                requirements. Our team will prepare a proposal tailored to your
                needs.
              </p>
            </div>

            <div className="grid gap-5">
              <input
                placeholder="Company Name"
                className="rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <input
                  placeholder="Contact Person"
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
                />

                <input
                  placeholder="Phone Number"
                  className="rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
                />
              </div>

              <input
                placeholder="Email Address"
                className="rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
              />

              <select className="rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-slate-400 outline-none transition focus:border-teal-400">
                <option>Service Needed</option>
                <option>Cleaning Service</option>
                <option>Security Service</option>
                <option>Parking Management</option>
                <option>Integrated Facility Management</option>
              </select>

              <textarea
                rows={6}
                placeholder="Tell us about your facility, location, building type and service requirements..."
                className="resize-none rounded-2xl border border-white/10 bg-slate-900 p-5 font-semibold text-white outline-none transition placeholder:text-slate-500 focus:border-teal-400"
              />

              <button
                type="button"
                className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-teal-400 px-8 py-5 text-base font-black text-slate-950 shadow-xl shadow-teal-400/20 transition hover:-translate-y-1 hover:bg-teal-300"
              >
                Send Inquiry
                <ArrowRight
                  size={20}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}