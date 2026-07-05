"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Award,
  CheckCircle2,
  Clock3,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Integrated Facility Management",
    description:
      "One trusted partner for cleaning, security, parking, and daily facility support.",
  },
  {
    icon: Users,
    title: "Experienced Professional Team",
    description:
      "Trained personnel with discipline, supervision, and clear operational standards.",
  },
  {
    icon: Sparkles,
    title: "Customized Service Solutions",
    description:
      "Every facility receives a practical solution based on its site, risk, and operating needs.",
  },
  {
    icon: Award,
    title: "Consistent Quality Assurance",
    description:
      "Routine inspections, reporting, and evaluations help maintain reliable service quality.",
  },
  {
    icon: Clock3,
    title: "Responsive Operations",
    description:
      "Fast support from supervisors and management when urgent operational needs arise.",
  },
  {
    icon: CheckCircle2,
    title: "Trusted Client Experience",
    description:
      "Supporting offices, hospitals, hotels, retail destinations, residences, and industrial sites.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-6 py-28 text-slate-950 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[620px] overflow-hidden rounded-[2.5rem] bg-slate-950 shadow-2xl shadow-slate-200/70"
          >
            <Image
              src="/images/services/facility-management.jpg"
              alt="RGS facility management team"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover opacity-80"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
              <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-300">
                Operational Excellence
              </p>

              <h3 className="max-w-lg text-4xl font-black leading-tight text-white">
                Reliable people, clear standards, and consistent execution.
              </h3>

              <p className="mt-5 max-w-lg leading-8 text-slate-300">
                Delivering dependable facility management through experienced
                personnel, structured supervision, and measurable service
                quality.
              </p>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="mb-4 text-sm font-black uppercase tracking-[0.35em] text-teal-600">
                Why Choose RGS
              </p>

              <h2 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
                A trusted partner for modern facility management.
              </h2>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
                We combine experienced professionals, standardized operating
                procedures, and integrated service management to help clients
                maintain safe, clean, and efficient facilities.
              </p>
            </motion.div>

            <div className="grid gap-4 md:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.05,
                    }}
                    className="group rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-slate-200/70"
                  >
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-400 text-slate-950 transition duration-300 group-hover:rotate-6">
                      <Icon size={24} />
                    </div>

                    <h3 className="mb-3 text-xl font-black">
                      {feature.title}
                    </h3>

                    <p className="leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}