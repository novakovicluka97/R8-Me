"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronUp, ChevronDown, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Feedback = {
  id: number
  name: string
  age: number
  country: string
  rating: number
  review: string
  avatar: string
}

export function FeedbackExamples({ feedback }: { feedback: Feedback[] }) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const scrollUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: -200, behavior: "smooth" })
      setScrollPosition(containerRef.current.scrollTop - 200)
    }
  }

  const scrollDown = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ top: 200, behavior: "smooth" })
      setScrollPosition(containerRef.current.scrollTop + 200)
    }
  }

  // Update scroll position when scrolling
  useEffect(() => {
    const container = containerRef.current
    const handleScroll = () => {
      if (container) {
        setScrollPosition(container.scrollTop)
      }
    }

    container?.addEventListener("scroll", handleScroll)
    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative h-full">
      <div className="sticky top-20 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary sexy-glow">Recent Feedback</h2>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-pink-200 hover:bg-pink-50 transition-all duration-300 hover:shadow-md"
              onClick={scrollUp}
            >
              <ChevronUp className="h-4 w-4" />
              <span className="sr-only">Scroll up</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full border-pink-200 hover:bg-pink-50 transition-all duration-300 hover:shadow-md"
              onClick={scrollDown}
            >
              <ChevronDown className="h-4 w-4" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </div>
        </div>

        <div
          ref={containerRef}
          className="space-y-4 overflow-y-auto pr-2 pb-4 premium-scrollbar"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          {feedback.map((item) => (
            <FeedbackCard key={item.id} feedback={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden border-pink-200 transition-all duration-500 premium-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar
                className={`h-12 w-12 border-2 border-pink-200 transition-all duration-300 ${isHovered ? "border-pink-400 scale-105" : ""}`}
              >
                <AvatarImage src={feedback.avatar || "/placeholder.svg"} alt={feedback.name} />
                <AvatarFallback className="bg-gradient-to-r from-pink-200 to-purple-200">
                  {feedback.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-bold text-lg">
                  {feedback.name}, {feedback.age}
                </h3>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  {feedback.country}
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-lg px-3 py-2 text-xl shadow-md ml-2">
              {feedback.rating}
            </div>
          </div>

          <div
            className={`bg-gradient-to-r from-pink-50/80 to-purple-50/80 rounded-lg p-4 border border-pink-100 transition-all duration-300 ${isHovered ? "border-pink-300 shadow-md" : ""}`}
          >
            <p className="italic text-gray-700">{feedback.review}</p>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
