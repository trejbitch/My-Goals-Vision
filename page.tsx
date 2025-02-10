src/app/embed/goals-tracker/page.tsx


"use client"

import GoalsTracker from "@/components/ui/goals-tracker"

export default function Page() {
  return (
    <div style={{ background: 'white' }} className="min-h-screen w-full bg-white">
      <div style={{ background: 'white' }} className="w-full bg-white">
        <GoalsTracker />
      </div>
    </div>
  )
}
