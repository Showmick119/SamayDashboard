"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react"
import TableOfContents from "./table-of-contents"
import ResearchContent from "./research-content"

export default function Documentation() {
  const [currentSection, setCurrentSection] = useState<string>("introduction")
  const [showTableOfContents, setShowTableOfContents] = useState<boolean>(true)

  const sections = [
    { id: "introduction", title: "Introduction" },
    { id: "methodology", title: "Methodology" },
    { id: "results", title: "Results" },
    { id: "discussion", title: "Discussion" },
    { id: "conclusion", title: "Conclusion" },
    { id: "references", title: "References" },
  ]

  const navigateSection = (direction: "prev" | "next") => {
    const currentIndex = sections.findIndex((section) => section.id === currentSection)
    if (direction === "prev" && currentIndex > 0) {
      setCurrentSection(sections[currentIndex - 1].id)
    } else if (direction === "next" && currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1].id)
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {showTableOfContents && (
        <div className="w-full md:w-1/4 md:sticky md:top-24 md:self-start">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                Table of Contents
              </h3>
              <TableOfContents
                sections={sections}
                currentSection={currentSection}
                onSectionChange={setCurrentSection}
              />
            </CardContent>
          </Card>
        </div>
      )}

      <div className={`flex-1 ${showTableOfContents ? "md:w-3/4" : "w-full"}`}>
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={() => setShowTableOfContents(!showTableOfContents)}>
            {showTableOfContents ? "Hide" : "Show"} Table of Contents
          </Button>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateSection("prev")}
              disabled={sections.findIndex((section) => section.id === currentSection) === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateSection("next")}
              disabled={sections.findIndex((section) => section.id === currentSection) === sections.length - 1}
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <ResearchContent section={currentSection} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
