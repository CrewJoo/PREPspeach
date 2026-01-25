"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LANDING_COPY, COLORS } from "@/lib/constants";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-white">
      {/* Header / Logo */}
      <nav className="absolute top-0 left-0 z-50 w-full p-6 sm:p-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-1">
            <span className="text-3xl font-black tracking-tighter text-trust-navy">PREP</span>
            <span className="text-3xl font-light text-gray-400 group-hover:text-success-green transition-colors">speach</span>
            <span className="ml-1 h-2 w-2 rounded-full bg-success-green animate-pulse" />
          </Link>
        </div>
      </nav>

      {/* 1. Attention (Hero Section) */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 pt-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex max-w-4xl flex-col items-center gap-8"
        >
          <motion.div variants={itemVariants}>
            <span className="rounded-full bg-red-600 px-6 py-2 text-lg font-bold text-white shadow-lg">
              {LANDING_COPY.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="whitespace-pre-wrap break-keep text-5xl font-bold tracking-tight text-gray-400 sm:text-6xl lg:text-7xl"
          >
            <span className="whitespace-nowrap">면접관은 당신의 화려한 <span className="text-gray-900">'스펙'</span>보다</span><br />
            <span className="text-gray-900">'논리적인 1분'</span>을 기억합니다.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-2xl whitespace-pre-wrap text-xl text-gray-500 sm:text-2xl"
          >
            {LANDING_COPY.hero.subtitle}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/prep">
              <Button size="lg" className="h-16 w-full sm:w-auto bg-success-green px-8 text-xl font-bold hover:bg-success-green/90 shadow-xl shadow-success-green/20 transition-all hover:scale-105">
                {LANDING_COPY.hero.ctaStep}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <Link href="/transform">
              <Button size="lg" className="h-16 w-full sm:w-auto bg-purple-900 px-8 text-xl font-bold text-white hover:bg-purple-800 shadow-xl transition-all hover:scale-105">
                {LANDING_COPY.hero.ctaTransform}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Interest (Problem Awareness) */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-trust-navy sm:text-4xl">
              {LANDING_COPY.problem.title}
            </h2>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
            {LANDING_COPY.problem.cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200/50"
              >
                <span className="text-5xl mb-6">{card.emoji}</span>
                <h3 className="text-xl font-bold text-gray-900">{card.title}</h3>
                <p className="mt-4 text-center text-base text-gray-600 leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Desire (Solution / PREP Method) */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-trust-navy sm:text-4xl">
              {LANDING_COPY.solution.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {LANDING_COPY.solution.steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-trust-navy text-xl font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">{step.name}</h3>
                </div>
                <p className="text-gray-600">{step.desc}</p>
                <div className="absolute bottom-0 right-0 h-24 w-24 translate-x-8 translate-y-8 rounded-full bg-trust-navy/5 group-hover:bg-trust-navy/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Action (Final CTA) */}
      <section className="relative overflow-hidden bg-trust-navy py-24 sm:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl whitespace-pre-wrap">
            {LANDING_COPY.action.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-blue-100">
            {LANDING_COPY.action.desc}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/prep">
              <Button size="lg" className="h-14 bg-success-green px-8 text-xl font-bold text-white hover:bg-success-green/90 shadow-2xl hover:shadow-success-green/50 hover:-translate-y-1 transition-all">
                {LANDING_COPY.action.cta}
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-center text-sm text-gray-400 border-t">
        <p>Designed by PREPspeach</p>
        <p className="mt-2">Inspired by Prof. Lim Jae-chun's Logic</p>
      </footer>
    </div>
  );
}
