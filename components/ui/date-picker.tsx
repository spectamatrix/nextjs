"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Pick a date",
  className,
  disabled = false,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

// Date Range Picker component
interface DateRangePickerProps {
  from?: Date
  to?: Date
  onDateRangeChange?: (range: { from: Date | undefined; to: Date | undefined }) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({
  from,
  to,
  onDateRangeChange,
  placeholder = "Pick a date range",
  className,
  disabled = false,
}: DateRangePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !from && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {format(from, "LLL dd, y")} -{" "}
                  {format(to, "LLL dd, y")}
                </>
              ) : (
                format(from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={from}
            selected={{ from, to }}
            onSelect={(range) =>
              onDateRangeChange?.({
                from: range?.from,
                to: range?.to,
              })
            }
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Date Picker with Presets
const presets = [
  {
    label: "Today",
    value: new Date(),
  },
  {
    label: "Tomorrow",
    value: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
  {
    label: "In 3 days",
    value: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  },
  {
    label: "In a week",
    value: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  },
]

interface DatePickerWithPresetsProps {
  date?: Date
  onDateChange?: (date: Date | undefined) => void
  className?: string
  disabled?: boolean
}

export function DatePickerWithPresets({
  date,
  onDateChange,
  className,
  disabled = false,
}: DatePickerWithPresetsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
          />
        </div>
        <div className="flex flex-col space-y-1">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="ghost"
              className="justify-start font-normal"
              onClick={() => onDateChange?.(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
