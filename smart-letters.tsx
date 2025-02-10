src/components/ui/smart-letters.tsx





import React, { useState } from 'react';
import { Target, BarChart2, Trophy, Heart, Clock, X } from 'lucide-react';

const SmartLetters = () => {
  const [selectedLetter, setSelectedLetter] = useState(null);

  const letters = [
    {
      letter: "S",
      title: "S = Specific",
      icon: <Target className="w-6 h-6 text-white" />,
      explanation: "Make your goal specific and narrow for more effective planning",
      example: "Instead of 'Get more clients', try 'Close 5 luxury property deals in downtown area' or 'Complete 20 AI-assisted sales training calls with a 90% quality score'",
      tips: [
        "What exactly do you want to achieve?",
        "Who is involved?",
        "Where will this happen?",
        "Which resources are needed?"
      ],
      color: "bg-purple-600"
    },
    {
      letter: "M",
      title: "M = Measurable",
      icon: <BarChart2 className="w-6 h-6 text-white" />,
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
      icon: <Trophy className="w-6 h-6 text-white" />,
      explanation: "Make sure you can reasonably accomplish your goal within a certain time frame",
      example: "Instead of 'Master sales skills', try 'Complete advanced AI sales training program with 50 recorded calls' or 'List 10 properties in the luxury market segment ($1M+)'",
      tips: [
        "Do you have the resources needed?",
        "Is it realistic given your constraints?",
        "Can you break it into smaller goals?",
        "What skills or tools do you need?"
      ],
      color: "bg-purple-600"
    },
    {
      letter: "R",
      title: "R = Relevant",
      icon: <Heart className="w-6 h-6 text-white" />,
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
      icon: <Clock className="w-6 h-6 text-white" />,
      explanation: "Set a realistic but ambitious end date to clarify task prioritization and increase motivation",
      example: "Instead of 'Improve my sales performance', try 'Complete 100 AI-analyzed sales calls by Q2 2024' or 'Close $2M in real estate transactions by end of Q3 2024'",
      tips: [
        "When do you want to achieve this?",
        "What can you do today?",
        "What can you do in 6 weeks?",
        "What's your deadline?"
      ],
      color: "bg-purple-600"
    }
  ];

  return (
    <div className="relative">
      {/* Letters Row */}
      <div className="flex justify-center gap-3 mb-4">
        {letters.map((item) => (
          <button
            key={item.letter}
            onClick={() => setSelectedLetter(item)}
            className={`
              w-16 h-16 rounded-lg flex items-center justify-center
              text-2xl font-bold transition-all duration-300
              ${item.color} text-white
              hover:shadow-lg hover:scale-105
              ${selectedLetter?.letter === item.letter ? 'ring-4 ring-yellow-400' : ''}
            `}
          >
            {item.letter}
          </button>
        ))}
      </div>

      {/* Popup Modal */}
      {selectedLetter && (
        <div className="absolute top-0 left-0 right-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-[32px] w-[800px] shadow-2xl">
            {/* Header */}
            <div className="bg-white p-4 rounded-t-[32px] flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`${selectedLetter.color} p-2 rounded-lg`}>
                  {selectedLetter.icon}
                </div>
                <div className="text-gray-800">
                  <h2 className="text-2xl font-bold text-purple-600">{selectedLetter.title}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedLetter(null)}
                className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div>
                <p className="text-gray-700">{selectedLetter.explanation}</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="font-medium text-purple-800 mb-2">Example:</p>
                <p className="text-purple-600">{selectedLetter.example}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700 mb-2">Ask yourself:</p>
                <ul className="space-y-2">
                  {selectedLetter.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-500 mt-1">•</span>
                      <span className="text-gray-600">{tip}</span>
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

export default SmartLetters;
