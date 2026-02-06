"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ProgramGuideModal } from "@/components/common/program-guide-modal";
import { useHomeStore } from "@/store/use-home-store";
import { useInterviewStore } from "@/lib/interview-store";
import { Menu, X, Home } from "lucide-react";
import { CoachingModal } from "@/components/common/coaching-modal";

export function MainNav() {
    const [showGuide, setShowGuide] = useState(false);
    const [showCoaching, setShowCoaching] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const { viewMode, setViewMode } = useHomeStore();

    // Logic: Hide Logo on Main Page (AI/Interview modes) and Subpages (About/Transform),
    // but KEEEP it on '/prep' based on user request ("Except PREP training places").
    const isHome = pathname === '/';
    // const isTrainingPlace = pathname.startsWith('/prep') || pathname.startsWith('/about');

    // If we are on the home page, only show if in intro mode (because other modes have their own header?)
    // Actually, user wants "PREP 생각의 공식" on left when menu items clicked.
    // The menu items lead to subpages.
    const showLogo = (isHome && viewMode === 'intro') || !isHome;

    const handleLogoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        goHome();
    };

    const goHome = () => {
        if (isHome) {
            setViewMode('intro');
        } else {
            setViewMode('intro'); // Reset state for when we arrive
            router.push('/');
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="fixed top-6 left-0 z-[100] w-full p-4 flex justify-center pointer-events-none">
                <nav className="pointer-events-auto w-full max-w-7xl bg-white/90 backdrop-blur-sm border border-white/50 rounded-full shadow-md px-6 py-4 sm:px-8 sm:py-5 flex justify-between items-center ring-1 ring-white/60 transition-all hover:bg-white/95 hover:shadow-lg">
                    {/* Logo - Conditional Visibility */}
                    <div
                        className={`flex items-center gap-1 cursor-pointer transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        onClick={handleLogoClick}
                    >
                        <div className="flex items-center gap-1">
                            <span className="text-2xl font-black tracking-tighter text-trust-navy sm:text-3xl">PREP</span>
                            <span className="text-2xl font-light text-slate-500 sm:text-3xl"> 생각의 공식</span>
                        </div>
                        <span className="ml-1 h-1.5 w-1.5 rounded-full bg-success-green animate-pulse" />
                    </div>

                    {/* Menu Links */}
                    <div className="hidden lg:flex items-center gap-6">
                        <Link href="/about/prep" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap">
                            PREP이란?
                        </Link>
                        <Link href="/prep-word-dancing" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap">
                            PREP 워드댄싱
                        </Link>
                        <Link href="/prep-training" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap">
                            PREP 트레이닝
                        </Link>
                        <Link href="/prep-transform" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap">
                            PREP 변환기
                        </Link>
                        <Link href="/prep-interview" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap" onClick={() => useInterviewStore.getState().reset()}>
                            PREP 면접관
                        </Link>
                        <Link href="/prep-prompt" className="text-sm font-bold text-slate-700 hover:text-trust-navy transition-colors whitespace-nowrap">
                            PREP 프롬프트
                        </Link>

                        <button
                            onClick={() => setShowGuide(true)}
                            className="px-5 py-2.5 rounded-full bg-trust-navy text-sm font-bold text-white hover:bg-trust-navy/90 hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            워크숍 안내
                        </button>
                        <button
                            onClick={() => setShowCoaching(true)}
                            className="px-5 py-2.5 rounded-full bg-indigo-600 text-sm font-bold text-white hover:bg-indigo-700 hover:shadow-lg transition-all whitespace-nowrap"
                        >
                            1:1 코칭 신청
                        </button>

                        <button
                            onClick={goHome}
                            className="p-3 rounded-full text-slate-500 hover:text-white hover:bg-trust-navy transition-all shadow-sm border border-slate-200 hover:border-trust-navy hover:shadow-md active:scale-95 group"
                            aria-label="Home"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-trust-navy transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-md pt-32 px-6 lg:hidden flex flex-col items-center gap-6 animate-in fade-in slide-in-from-top-5 duration-200">
                    <Link
                        href="/about/prep"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP이란?
                    </Link>
                    <Link
                        href="/prep-word-dancing"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP 워드댄싱
                    </Link>
                    <Link
                        href="/prep-training"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP 트레이닝
                    </Link>
                    <Link
                        href="/prep-transform"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP 변환기
                    </Link>
                    <Link
                        href="/prep-interview"
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            useInterviewStore.getState().reset();
                        }}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP 면접관
                    </Link>
                    <Link
                        href="/prep-prompt"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-bold text-slate-700 hover:text-trust-navy py-2"
                    >
                        PREP 프롬프트
                    </Link>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setShowGuide(true);
                        }}
                        className="mt-4 px-8 py-3 rounded-full bg-trust-navy text-white font-bold hover:bg-trust-navy/90 shadow-lg"
                    >
                        워크숍 안내
                    </button>
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setShowCoaching(true);
                        }}
                        className="px-8 py-3 rounded-full bg-indigo-600 text-white font-bold hover:bg-indigo-700 shadow-lg"
                    >
                        1:1 코칭 신청
                    </button>

                    {/* Home Link for Mobile (Icon Only) */}
                    <div className="w-full border-t border-slate-100 mt-6 pt-6 flex justify-center pb-2">
                        <button
                            onClick={goHome}
                            className="p-4 rounded-full text-slate-500 hover:text-white hover:bg-trust-navy transition-all shadow-sm border border-slate-200 hover:border-trust-navy hover:shadow-md active:scale-95 group"
                            aria-label="Home"
                        >
                            <Home className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>
            )}

            <ProgramGuideModal isOpen={showGuide} onClose={() => setShowGuide(false)} />
            <CoachingModal isOpen={showCoaching} onClose={() => setShowCoaching(false)} />
        </>
    );
}
