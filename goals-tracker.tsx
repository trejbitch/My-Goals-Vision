src/components/ui/goals-tracker.tsx






"use client"

import { useState, useEffect, useRef } from "react"
import { Plus, ChevronRight, Calendar, Clock, ChevronUp, ChevronDown, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DatePicker } from "./date-picker"
import confetti from "canvas-confetti"
import SmartProgress from "./smart-progress"
import Image from "next/image"

type Goal = {
  id: number
  text: string
  targetDate: string
  completed: boolean
  createdAt: string
  progress: number
  total?: number
  current?: number
}

export default function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState({ text: "", charCount: 0, repeats: "" })
  const [targetDate, setTargetDate] = useState("")
  const [showControls, setShowControls] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleInputFocus = () => {
    setShowControls(true)
  }

  // Function to calculate days remaining
  const getDaysRemaining = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const addGoal = () => {
    if (newGoal.text.trim() && targetDate) {
      const total = parseInt(newGoal.repeats) || 1

      setGoals([...goals, {
        id: Date.now(),
        text: newGoal.text,
        targetDate,
        completed: false,
        createdAt: new Date().toISOString(),
        progress: 0,
        total,
        current: 0
      }])

      setNewGoal({ text: "", charCount: 0, repeats: "" })
      setTargetDate("")
      setShowControls(false)
      setIsExpanded(false)
    }
  }

  const handleProgressClick = (goalId: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId && goal.total) {
        const newCurrent = (goal.current || 0) + 1
        const newProgress = (newCurrent / goal.total) * 100
        const completed = newCurrent >= goal.total

        if (completed) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          })
        }

        return {
          ...goal,
          current: newCurrent,
          progress: newProgress,
          completed: completed
        }
      }
      return goal
    }))
  }

  return (
    <div className="w-full bg-white">
      <Card className="rounded-[20px] bg-white p-6 pb-6 shadow-[0_4px_24px_rgba(0,0,0,0.1)]">
        <div className="mb-8 flex items-center gap-3">
          <Image 
            src="https://res.cloudinary.com/drkudvyog/image/upload/v1736854523/Goals_and_vision_h26ldw.png"
            alt="Goals Icon"
            width={24}
            height={24}
          />
          <h1 className="text-2xl font-bold text-gray-900">My Goals & Vision</h1>
        </div>

        <SmartProgress progress={goals.length > 0 ? (goals.filter(g => g.completed).length / goals.length) * 100 : 0} />

        <div className="relative mt-4">
          <div className={`bg-white rounded-[20px] transition-all duration-300 ${showControls ? 'p-4 border border-gray-100' : ''}`}>
            {/* Goal Input */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="What's your next goal?"
                value={newGoal.text}
                onChange={(e) => {
                  const text = e.target.value
                  setNewGoal(prev => ({
                    ...prev,
                    text,
                    charCount: text.length
                  }))
                }}
                onFocus={handleInputFocus}
                maxLength={250}
                className={`w-full bg-white rounded-[20px] py-3 px-4 pr-20 text-base outline-none text-gray-600 ${!showControls ? 'border border-gray-200' : ''}`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                {newGoal.charCount}/250
              </div>
            </div>

            {/* Controls Row - Only shown after input focus */}
            {showControls && (
              <div className="mt-2 flex gap-4">
                {/* Repeats Control */}
                <div className="flex-1">
                  <div className="relative w-full h-[52px]">
                    <div
                      onClick={() => !isExpanded && setIsExpanded(true)}
                      className={`w-full bg-white flex items-center justify-between h-full transition-all duration-200 cursor-pointer rounded-[20px] ${
                        isExpanded 
                          ? 'border border-[#e2e2e2] ring-[3px] ring-[rgba(238,228,255,0.75)]' 
                          : 'border-gray-200 hover:border-gray-300 border'
                      }`}
                    >
                      <div className="flex-1 px-4">
                        {isExpanded ? (
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={newGoal.repeats}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '')
                              if (value === '' || parseInt(value) > 0) {
                                setNewGoal(prev => ({ ...prev, repeats: value }))
                              }
                            }}
                            className="w-full text-base bg-transparent outline-none text-[#71717a]"
                            placeholder="Enter number"
                          />
                        ) : (
                          <span className="text-base text-[#9ca3af]">Number of Total Repeats</span>
                        )}
                      </div>
                      <div className="pr-4">
                        <div className="flex flex-col -space-y-1">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              const currentRepeats = parseInt(newGoal.repeats) || 0
                              setNewGoal(prev => ({ ...prev, repeats: (currentRepeats + 1).toString() }))
                              setIsExpanded(true)
                            }}
                            className="p-0.5 hover:bg-gray-100 rounded"
                          >
                            <ChevronUp className="h-4 w-4 text-gray-500" />
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              const currentRepeats = parseInt(newGoal.repeats) || 0
                              if (currentRepeats > 1) {
                                setNewGoal(prev => ({ ...prev, repeats: (currentRepeats - 1).toString() }))
                              }
                              setIsExpanded(true)
                            }}
                            className="p-0.5 hover:bg-gray-100 rounded"
                          >
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="flex-1">
                  <DatePicker 
                    value={targetDate} 
                    onChange={setTargetDate}
                    placeholder="Choose a date to complete the goal"
                  />
                </div>

                {/* Add Goal Button */}
                <Button
                  onClick={addGoal}
                  disabled={!newGoal.text.trim() || !targetDate}
                  className={`
                    flex-1 h-[52px] rounded-[20px] flex items-center justify-center gap-2 text-base font-normal
                    ${(!newGoal.text.trim() || !targetDate) 
                      ? 'bg-gray-100 text-gray-500 hover:bg-gray-200' 
                      : 'bg-[#5b06be] text-white hover:bg-[#4c05a0]'}
                  `}
                >
                  <Plus className="h-5 w-5" />
                  Add Goal
                </Button>
              </div>
            )}
          </div>
        </div>

        {goals.length === 0 ? (
          <div className="mt-8 text-center text-gray-500">
            No goals yet. Start by adding your first goal!
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <Card key={goal.id} className="p-6 rounded-[20px] relative border border-gray-100">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className={`text-xl font-semibold ${goal.completed ? 'text-gray-400' : 'text-gray-900'}`}>
                      {goal.text}
                    </h2>
                    <div className="flex items-center gap-2">
                      <span className={`${goal.completed ? 'text-[#5b06be]' : 'text-[#5b06be]'} font-medium flex items-center`}>
                        {goal.completed ? 'Completed' : 'In Progress'} 
                        <ChevronRight className="h-5 w-5 ml-1" />
                      </span>
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Progress: {goal.progress.toFixed(0)}%</span>
                        <span className="text-gray-600">
                          {goal.current}/{goal.total}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#5b06be] transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#5b06be]">
                        Due: {new Date(goal.targetDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric'
                        })} ({getDaysRemaining(goal.targetDate)}d remaining)
                      </span>
                      <Button
                        onClick={() => setGoals(goals.filter(g => g.id !== goal.id))}
                        variant="ghost"
                        className="text-red-400 p-2 hover:bg-red-50 rounded-full"
                      >
                        <Trash2 className="h-5 w-4" />
                      </Button>
                    </div>
                  </div>

                  {!goal.completed && (
                    <Button
                      onClick={() => handleProgressClick(goal.id)}
                      className="mt-4 w-full bg-[#5b06be] text-white hover:bg-[#4c05a0] rounded-[20px] py-4"
                    >
                      Mark Progress
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
