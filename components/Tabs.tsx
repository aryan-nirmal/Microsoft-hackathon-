import React from 'react'

interface TabsProps {
  tabs: { label: string; content: React.ReactNode }[]
  defaultTab?: number
}

export default function Tabs({ tabs, defaultTab = 0 }: TabsProps) {
  const [active, setActive] = React.useState(defaultTab)

  return (
    <div>
      <div className="flex gap-2 border-b border-slate-700">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 font-medium transition ${
              active === i
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[active]?.content}</div>
    </div>
  )
}
