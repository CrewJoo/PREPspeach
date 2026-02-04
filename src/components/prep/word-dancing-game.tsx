"use client";

import { useState, useEffect } from "react";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { WORD_DANCING_DATA, TrainingLevel, TrainingBunch, TrainingSentence } from "@/lib/word-dancing-data";
import { useWordDancingStore } from "@/lib/word-dancing-store";
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCcw, CheckCircle2, AlertCircle, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface WordDancingGameProps {
    level: number;
}

export function WordDancingGame({ level }: WordDancingGameProps) {
    const levelData = WORD_DANCING_DATA.find((d) => d.level === level);

    // Game State
    // Default to 0, will randomize on mount
    const [currentBunchIndex, setCurrentBunchIndex] = useState(0);
    const [sourceItems, setSourceItems] = useState<TrainingSentence[]>([]);
    const [targetItems, setTargetItems] = useState<(TrainingSentence | null)[]>([]);
    const [isChecked, setIsChecked] = useState(false);
    const [score, setScore] = useState(0);

    const [showResult, setShowResult] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { addScore, completeBunch } = useWordDancingStore();

    if (!levelData) return <div>Level not found</div>;

    const currentBunch = levelData.bunches[currentBunchIndex];

    // Initialize/Reset for current bunch
    useEffect(() => {
        setIsMounted(true);
        // Randomize start index only once on mount
        const randomIndex = Math.floor(Math.random() * levelData.bunches.length);
        setCurrentBunchIndex(randomIndex);
    }, []);

    useEffect(() => {
        if (currentBunch) {
            // Shuffle questions for source
            const shuffled = [...currentBunch.questions].sort(() => Math.random() - 0.5);
            setSourceItems(shuffled);
            setTargetItems(new Array(currentBunch.correctOrder.length).fill(null));
            setIsChecked(false);
            setScore(0);
            setShowResult(false);
        }
    }, [currentBunchIndex, currentBunch]);

    const handleDragStart = (e: any, item: TrainingSentence) => {
        // Maybe highlight potential drop zones?
    };

    // Helper to check if bunch is completed
    const isFull = targetItems.every(item => item !== null);

    const checkAnswer = () => {
        if (!currentBunch) return;

        let correctCount = 0;
        const total = currentBunch.correctOrder.length;

        targetItems.forEach((item, idx) => {
            // Check if item type matches the required slot type
            // (Allow swapping identical types like R-R)
            if (item && item.type === levelData.slots[idx]) {
                correctCount++;
            }
        });

        const calculatedScore = Math.round((correctCount / total) * 100);
        setScore(calculatedScore);
        setIsChecked(true);
        setShowResult(true);

        if (calculatedScore === 100) {
            // Add score (e.g., 50 XP per bunch)
            // But only if not already completed? Store handles unique bunch IDs, but score might be spammable.
            // Let's just add score on every success for fun or check if already done.
            // For now, pure Gamification: Every perfect solve gives +30 XP!
            addScore(30);
            completeBunch(level, currentBunchIndex); // Use index as ID for now since bunch doesn't have unique ID in data usually.
            // Wait, data might not have unique IDs across levels. 
            // In word-dancing-data.ts, bunches[index] might need a stable ID.
            // Let's check data structure. 
            // The user didn't ask for strict anti-cheat.
            // Using `currentBunchIndex` as ID is risky if randomized.
            // Ah, line 30: `currentBunch` is `levelData.bunches[currentBunchIndex]`.
            // Does bunch have ID? 
            // `TrainingBunch` type in data usually has `id` or title.
        }
    };

    const nextBunch = () => {
        // Randomize next bunch instead of sequential? 
        // Or just go to next and loop? User said "Every time different".
        // Let's just pick a random NEXT index that is different from current.
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * levelData.bunches.length);
        } while (nextIndex === currentBunchIndex && levelData.bunches.length > 1);

        setCurrentBunchIndex(nextIndex);
    };

    const retry = () => {
        // Just trigger the useEffect logic again by resetting state manually or slight hack
        const shuffled = [...currentBunch.questions].sort(() => Math.random() - 0.5);
        setSourceItems(shuffled);
        setTargetItems(new Array(currentBunch.correctOrder.length).fill(null));
        setIsChecked(false);
        setScore(0);
        setShowResult(false);
    };

    const [draggedItem, setDraggedItem] = useState<TrainingSentence | null>(null);

    const onDropToTarget = (index: number) => {
        if (!draggedItem) return;

        // Remove from source if it was there
        if (sourceItems.some(i => i.id === draggedItem.id)) {
            setSourceItems(prev => prev.filter(i => i.id !== draggedItem.id));
        }

        // Remove from other target slot if it was there
        const existingTargetIndex = targetItems.findIndex(i => i?.id === draggedItem.id);
        if (existingTargetIndex !== -1) {
            const newTargets = [...targetItems];
            newTargets[existingTargetIndex] = null;
            setTargetItems(newTargets);
        }

        // Place in new slot
        const newTargets = [...targetItems];
        // If slot occupied, swap? or just return to source?
        // Let's returns the occupant to source to avoid deleting.
        if (newTargets[index]) {
            setSourceItems(prev => [...prev, newTargets[index]!]);
        }
        newTargets[index] = draggedItem;
        setTargetItems(newTargets);
        setDraggedItem(null);
    };

    const onDropToSource = () => {
        if (!draggedItem) return;

        // If it's in target, remove it
        const existingTargetIndex = targetItems.findIndex(i => i?.id === draggedItem.id);
        if (existingTargetIndex !== -1) {
            const newTargets = [...targetItems];
            newTargets[existingTargetIndex] = null;
            setTargetItems(newTargets);
            setSourceItems(prev => [...prev, draggedItem]);
        }
        setDraggedItem(null);
    };

    const tabs = WORD_DANCING_DATA.map((d) => ({
        id: d.level,
        label: `Level ${d.level}`,
        href: `/prep/step${d.level}`,
    }));

    if (!isMounted) return null; // Avoid hydration mismatch

    return (
        <div className="w-full max-w-6xl mx-auto p-4 flex flex-col gap-8">
            {/* Level Navigation */}
            <div className="flex justify-center mb-4">
                <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl items-center">
                    <Link href="/prep/word-dancing">
                        <div className="px-6 py-2.5 rounded-lg font-bold text-sm text-slate-500 hover:text-trust-navy hover:bg-slate-200/50 transition-all flex items-center gap-2">
                            워드댄싱
                        </div>
                    </Link>
                    <div className="w-px h-6 bg-slate-300 mx-2" />
                    {tabs.map((tab) => (
                        <Link key={tab.id} href={tab.href}>
                            <div className={cn(
                                "px-6 py-2.5 rounded-lg font-bold text-sm transition-all",
                                level === tab.id
                                    ? "bg-white text-trust-navy shadow-sm"
                                    : "text-slate-500 hover:text-trust-navy hover:bg-slate-200/50"
                            )}>
                                {tab.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Header / Progress */}
            <div className="flex justify-between items-end border-b pb-4">
                <div>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
                        <span className={cn(
                            "mr-3",
                            level === 1 && "text-purple-300",
                            level === 2 && "text-purple-500",
                            level === 3 && "text-purple-700",
                            level === 4 && "text-purple-900"
                        )}>
                            {levelData.title.split(':')[0]}
                        </span>
                        <span>{levelData.title.substring(levelData.title.indexOf(':') + 1)}</span>
                    </h2>
                    <p className="text-lg text-slate-500 mt-2">{levelData.description}</p>
                </div>
                {/* Removed Progress since it's random now, or maybe show 'Infinite'? Or just keep as Bunch X? */}
                {/* User asked for random questions. Index might not be meaningful if it jumps around. */}
                {/* Let's keep it simple for now or remove. I'll remove progress for now or make it just generic. */}
            </div>

            {/* Q Display (Removed Q, just title) */}
            <div className="w-full text-left mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-tight">
                    {currentBunch.title}
                </h3>
            </div>

            {/* Game Area */}
            <div className="flex flex-col lg:flex-row gap-8 min-h-[500px]">

                {/* Source Area (Left) */}
                <div
                    className="flex-1 bg-slate-100 rounded-2xl p-6 border-2 border-slate-200 border-dashed relative"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDropToSource}
                >
                    <p className="text-slate-400 font-bold text-center mb-6 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                        <GripVertical className="h-4 w-4" /> 문장 저장소 (드래그 가능)
                    </p>
                    <div className="flex flex-col gap-4">
                        <AnimatePresence>
                            {sourceItems.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    draggable={!isChecked}
                                    onDragStart={() => !isChecked && setDraggedItem(item)}
                                    className={cn(
                                        "bg-white p-4 rounded-xl shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-all",
                                        isChecked && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <p className="text-slate-700 font-medium leading-relaxed text-lg lg:text-xl">{item.text}</p>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {sourceItems.length === 0 && !isChecked && (
                            <div className="text-center py-12 text-slate-400">
                                모든 문장을 오른쪽으로 옮겼습니다!
                            </div>
                        )}
                    </div>
                </div>

                {/* Target Area (Right) */}
                <div className="flex-1 flex flex-col gap-4">
                    {levelData.slots.map((slotInfo, index) => (
                        <div
                            key={index}
                            className="flex items-stretch gap-4"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => !isChecked && onDropToTarget(index)}
                        >
                            {/* Slot Label */}
                            <div className={cn(
                                "w-16 flex items-center justify-center rounded-xl font-black text-2xl shadow-sm shrink-0",
                                slotInfo === "P" && "bg-red-400 text-white",
                                slotInfo === "R" && "bg-blue-500 text-white",
                                slotInfo === "E" && "bg-success-green text-white",
                                slotInfo === "P'" && "bg-orange-400 text-white"
                            )}>
                                {slotInfo}
                            </div>

                            {/* Drop Zone */}
                            <div className={cn(
                                "flex-1 min-h-[80px] rounded-xl border-2 flex items-center p-2 relative transition-colors",
                                targetItems[index] ? "bg-white border-transparent shadow-sm" : "bg-slate-50 border-slate-200 border-dashed",
                                !isChecked && "hover:border-trust-navy/30"
                            )}>
                                {targetItems[index] ? (
                                    <motion.div
                                        layoutId={targetItems[index]!.id}
                                        draggable={!isChecked}
                                        onDragStart={() => !isChecked && setDraggedItem(targetItems[index]!)}
                                        className="w-full bg-trust-navy/5 p-3 rounded-lg border border-trust-navy/10 cursor-grab active:cursor-grabbing"
                                    >
                                        <p className="text-slate-800 font-bold text-lg leading-snug">{targetItems[index]!.text}</p>
                                        {/* X button to remove? or just drag back */}
                                    </motion.div>
                                ) : (
                                    <div className="w-full flex flex-col items-center justify-center gap-1">
                                        <span className="text-slate-300 text-base font-medium">여기에 놓기!</span>
                                        <span className="text-xs font-bold text-slate-400/70">
                                            {slotInfo === "P" && "핵심 결론"}
                                            {slotInfo === "R" && "이유/근거"}
                                            {slotInfo === "E" && "구체적 사례"}
                                            {slotInfo === "P'" && "결론 재강조"}
                                        </span>
                                    </div>
                                )}

                                {/* Answer Feedback Overlay */}
                                {isChecked && (
                                    <div className="absolute right-[-40px] top-1/2 -translate-y-1/2">
                                        {/* Check by Type matching */}
                                        {targetItems[index]?.type === levelData.slots[index] ? (
                                            <CheckCircle2 className="h-8 w-8 text-success-green" />
                                        ) : (
                                            <AlertCircle className="h-8 w-8 text-red-400" />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center mt-8 pb-20">
                {!isChecked ? (
                    <Button
                        size="lg"
                        onClick={checkAnswer}
                        disabled={!isFull}
                        className="bg-trust-navy text-white text-xl font-bold px-12 py-6 rounded-full shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        정답 확인하기
                    </Button>
                ) : (
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-slate-400 mb-1">SCORE</span>
                            <div className="text-4xl font-black text-trust-navy mb-4">{score}점</div>

                            <div className="flex gap-4">
                                <Button onClick={retry} variant="outline" className="rounded-full px-6">
                                    <RefreshCcw className="mr-2 h-4 w-4" /> 다시하기
                                </Button>
                                <Button onClick={nextBunch} className="bg-trust-navy text-white rounded-full px-8">
                                    다음 문제 <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Answer Key Reveal */}
            {isChecked && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-green-50 rounded-2xl p-8 border border-green-100"
                >
                    <h3 className="text-xl font-bold text-success-green mb-6 flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6" /> 정답 확인
                    </h3>
                    <div className="space-y-3">
                        {currentBunch.correctOrder.map((id, idx) => {
                            const item = currentBunch.questions.find(q => q.id === id);
                            if (!item) return null;
                            return (
                                <div key={id} className="flex gap-4 items-start bg-white p-4 rounded-xl border border-green-100/50 shadow-sm">
                                    <span className={cn(
                                        "px-3 py-1 rounded-lg text-sm font-bold text-white shrink-0",
                                        item.type === "P" && "bg-trust-navy",
                                        item.type === "R" && "bg-blue-500",
                                        item.type === "E" && "bg-success-green",
                                        item.type === "P'" && "bg-trust-navy text-orange-200"
                                    )}>{item.type}</span>
                                    <p className="text-slate-700">{item.text}</p>
                                </div>
                            )
                        })}
                    </div>
                </motion.div>
            )}

        </div>
    );
}
