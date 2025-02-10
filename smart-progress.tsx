src/components/ui/smart-progress.tsx





"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface SmartProgressProps {
  progress: number;
}

type LetterType = {
  letter: string;
  title: string;
  explanation: string;
  example: string;
  tips: string[];
  color: string;
}

const SmartProgress = ({ progress }: SmartProgressProps) => {
  const [selectedLetter, setSelectedLetter] = useState<LetterType | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setSelectedLetter(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const letters: LetterType[] = [
    {
      letter: "S",
      title: "S = Specific",
      explanation: "Make your goal specific and narrow for more effective planning",
      example: "Instead of 'Get more clients', try 'Close 5 luxury property deals in downtown area' or 'Complete 20 AI-assisted sales training calls with a 90% quality score'",
      tips: [
        "What exactly do you want to achieve?",
        "Who is involved?",
        "Where will this happen?",
        "Which resources are needed?"
      ],
      color: "bg-[#5b06be]"
    },
    {
      letter: "M",
      title: "M = Measurable",
      explanation: "Make sure your goal and progress are measurable",
      example: "Instead of 'Improve sales calls', try 'Increase sales call conversion rate from 20% to 35%' or 'Generate $100,000 in real estate commissions this quarter'",
      tips: [
        "How much?",
        "How many?",
        "How will you know when it's accomplished?",
        "What's your progress indicator?"
      ],
      color: "bg-gray-500"
    },
    {
      letter: "A",
      title: "A = Achievable",
      explanation: "Make sure you can reasonably accomplish your goal within a certain time frame",
      example: "Instead of 'Master sales skills', try 'Complete advanced AI sales training program with 50 recorded calls' or 'List 10 properties in the luxury market segment ($1M+)'",
      tips: [
        "Do you have the resources needed?",
        "Is it realistic given your constraints?",
        "Can you break it into smaller goals?",
        "What skills or tools do you need?"
      ],
      color: "bg-[#5b06be]"
    },
    {
      letter: "R",
      title: "R = Relevant",
      explanation: "Your goal should align with your values and long-term objectives",
      example: "Instead of 'Do more sales training', try 'Master objection handling through AI-assisted role-play to increase luxury property closings' or 'Expand network by joining top 2 real estate associations in my area'",
      tips: [
        "Why is this goal important to you?",
        "Does it align with your other goals?",
        "Is this the right time?",
        "Does it match your values?"
      ],
      color: "bg-gray-500"
    },
    {
      letter: "T",
      title: "T = Time-based",
      explanation: "Set a realistic but ambitious end date to clarify task prioritization and increase motivation",
      example: "Instead of 'Improve my sales performance', try 'Complete 100 AI-analyzed sales calls by Q2 2024' or 'Close $2M in real estate transactions by end of Q3 2024'",
      tips: [
        "When do you want to achieve this?",
        "What can you do today?",
        "What can you do in 6 weeks?",
        "What's your deadline?"
      ],
      color: "bg-[#5b06be]"
    }
  ];

  return (
    <div className="bg-[#5b06be] p-8 rounded-[32px] relative">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-6">
          <div className="flex gap-3">
            {letters.map((item) => (
              <button
                key={item.letter}
                onClick={() => setSelectedLetter(selectedLetter?.letter === item.letter ? null : item)}
                className={`
                  relative w-16 h-16 rounded-xl flex items-center justify-center
                  text-3xl font-bold transition-all duration-300
                  bg-white/20 text-white border-b-4 border-white/10
                  hover:bg-white/30 active:border-b-0 active:translate-y-1 group
                  ${selectedLetter?.letter === item.letter ? 'ring-4 ring-white/30' : ''}
                `}
              >
                {item.letter}
                <Info className="absolute top-1.5 right-1.5 w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          <span className="text-white text-4xl font-bold">GOALS</span>
        </div>
        <span className="text-white text-4xl font-bold">{progress}%</span>
      </div>
      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Popup Modal */}
      {selectedLetter && (
        <div className="absolute -top-4 left-0 right-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] w-[600px] shadow-2xl" ref={popupRef}>
            {/* Header */}
            <div className="bg-white px-3 py-4 rounded-t-[24px] flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    text-xl font-bold transition-all duration-300
                    bg-[#5b06be] text-white border-b-3 border-[#4c05a0]
                  `}>
                    {selectedLetter.letter}
                  </div>
                  <h2 className="text-2xl font-bold text-[#5b06be]">{selectedLetter.title.split('=')[1].trim()}</h2>
                </div>
                <div className="text-gray-700 text-sm leading-relaxed max-w-xl text-center mt-1">
                  {selectedLetter.explanation}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-4 space-y-3">
              <div className="bg-white p-3 rounded-[20px] shadow-lg text-sm">
                <h3 className="font-semibold text-[#5b06be] mb-2 text-base">Example:</h3>
                <div className="text-gray-700 space-y-2">
                  {selectedLetter.example.split('. ').map((sentence, index) => (
                    <p key={index} className="leading-relaxed">
                      {sentence.trim() + (index < selectedLetter.example.split('. ').length - 1 ? '.' : '')}
                    </p>
                  ))}
                </div>
              </div>

              <div className="bg-white p-3 rounded-[20px] shadow-lg text-sm">
                <h3 className="font-semibold text-[#5b06be] mb-2 text-base">Ask yourself:</h3>
                <ul className="space-y-3">
                  {selectedLetter.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-yellow-500 text-xl flex-shrink-0">•</span>
                      <span className="text-gray-700">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartProgress;
