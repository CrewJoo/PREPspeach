import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

interface ModeSelectionProps {
    onSelect: (mode: 'INTERVIEW' | 'WORK') => void;
}

export function ModeSelection({ onSelect }: ModeSelectionProps) {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-trust-navy text-center mb-12">
                어떤 상황을 준비하고 계신가요?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Interview Mode */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('INTERVIEW')}
                    className="flex flex-col items-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-trust-navy transition-all group"
                >
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-trust-navy transition-colors">
                        <GraduationCap className="w-12 h-12 text-trust-navy group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">면접 / 진학</h3>
                    <p className="text-slate-500 text-center leading-relaxed">
                        입사 면접, 대입 면접 등<br />
                        자신을 어필해야 하는 순간
                    </p>
                </motion.button>

                {/* Work Mode */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelect('WORK')}
                    className="flex flex-col items-center p-12 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-transparent hover:border-trust-navy transition-all group"
                >
                    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8 group-hover:bg-trust-navy transition-colors">
                        <Briefcase className="w-12 h-12 text-indigo-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">기업 실무</h3>
                    <p className="text-slate-500 text-center leading-relaxed">
                        보고, 제안, 회의 등<br />
                        논리적 소통이 필요한 순간
                    </p>
                </motion.button>
            </div>
        </div>
    );
}
