src/components/ui/date-picker.tsx





'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  placeholder?: string
  className?: string
}

export function DatePicker({ value, onChange, placeholder = 'mm/dd/yyyy', className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (value) {
      setCurrentDate(new Date(value))
    }
  }, [value])

  useEffect(() => {
    if (!isOpen) return

    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleInputClick = () => {
    setIsOpen(true)
  }

  const handleDateSelect = (day: number) => {
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate >= today) {
      onChange(selectedDate.toISOString().split('T')[0])
      setIsOpen(false)
    }
  }

  const handleMonthChange = (increment: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1))
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate)
    const firstDay = getFirstDayOfMonth(currentDate)
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      const isSelected = value === date.toISOString().split('T')[0]
      const isToday = date.getTime() === today.getTime()
      const isPastDate = date < today

      days.push(
        <button
          key={day}
          onClick={() => !isPastDate && handleDateSelect(day)}
          disabled={isPastDate}
          className={`p-2 text-sm rounded-lg transition-all
            ${isSelected ? 'bg-[#5b06be] text-white' : ''}
            ${isToday ? 'border-2 border-[#eebc49] font-bold' : ''}
            ${isPastDate ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-[#5b06be] hover:text-white'}
          `}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div className={`relative w-full ${className}`}>
<input
  type="text"
  value={value ? new Date(value).toLocaleDateString('en-US') : ''}
  onChange={() => {}} // Handled by calendar
  onClick={handleInputClick}
  placeholder={placeholder || "Choose a date to complete the goal"}
  className="w-full h-[52px] px-6 py-3 pr-12 rounded-2xl border border-gray-200 bg-white text-gray-600 
             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-100 cursor-pointer"
  readOnly
/>
      <img
        src="https://res.cloudinary.com/drkudvyog/image/upload/v1734437402/calendar_icon_2_efgdme.png"
        alt="Calendar"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none"
      />
      {isOpen && (
        <div 
          ref={calendarRef}
          className="absolute left-0 mt-2 p-4 bg-white rounded-3xl shadow-xl border border-gray-100 z-50 w-[320px]"
        >
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => handleMonthChange(-1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-lg font-semibold text-gray-700">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={() => handleMonthChange(1)} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center text-sm font-medium text-gray-400 p-2">
                {day[0]}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <button 
              className="text-[#5b06be] hover:text-[#4c05a0] text-sm font-medium transition-colors"
              onClick={() => {
                onChange('')
                setIsOpen(false)
              }}
            >
              Clear
            </button>
            <button 
              className="text-[#5b06be] hover:text-[#4c05a0] text-sm font-medium transition-colors"
              onClick={() => {
                const today = new Date()
                today.setHours(0, 0, 0, 0)
                if (today >= new Date()) {
                  onChange(today.toISOString().split('T')[0])
                  setIsOpen(false)
                }
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
