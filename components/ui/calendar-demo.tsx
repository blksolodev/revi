import { useState } from "react"

import { Calendar, type RangeValue } from "@/components/ui/calendar"

export default function DefaultCalendarDemo() {
  const [date, setDate] = useState<RangeValue | null>(null)
  return (
    <div className="self-start pt-30">
      <Calendar allowClear isDocsPage onChange={setDate} value={date} />
    </div>
  )
}

