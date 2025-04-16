"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TableOfContentsProps {
  sections: { id: string; title: string }[]
  currentSection: string
  onSectionChange: (section: string) => void
}

export default function TableOfContents({ sections, currentSection, onSectionChange }: TableOfContentsProps) {
  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-1">
        {sections.map((section) => (
          <Button
            key={section.id}
            variant={currentSection === section.id ? "secondary" : "ghost"}
            className="w-full justify-start text-left"
            onClick={() => onSectionChange(section.id)}
          >
            {section.title}
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
}
