"use client"

import type React from "react"

import { useState } from "react"
import { Info, Camera, Lock, Star, Sparkles, Bot, MessageSquare, Crown, MessageCircle, Flame } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { createClient } from "@supabase/supabase-js"
import { FeedbackExamples } from "./feedback-examples"

// Initialize Supabase client (would use environment variables in production)
const supabaseUrl = "https://your-project-url.supabase.co"
const supabaseAnonKey = "your-anon-key"
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function R8MeApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loginMode, setLoginMode] = useState(true) // true for login, false for signup
  const [socialUrl, setSocialUrl] = useState("")
  const [height, setHeight] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")
  const [description, setDescription] = useState("")
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null)
  const [feedbackStyle, setFeedbackStyle] = useState("no-cap")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (loginMode) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        console.log("Logged in:", data)
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })
        if (error) throw error
        console.log("Signed up:", data)
      }
    } catch (error) {
      console.error("Auth error:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImages(e.target.files)
    }
  }

  const handleSubmitFeedback = (type: string) => {
    console.log("Submitting for feedback type:", type)
    console.log("Social URL:", socialUrl)
    console.log("Height:", height, heightUnit)
    console.log("Description:", description)
    console.log("Images:", selectedImages)
    // Here you would handle the actual submission logic
  }

  const sampleFeedback = [
    {
      id: 1,
      name: "Emma",
      age: 24,
      country: "United States",
      rating: 9.2,
      review:
        "Your smile is absolutely captivating! You have a natural charm that really comes through in your photos. I love your style and the confidence you project.",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "James",
      age: 29,
      country: "United Kingdom",
      rating: 8.7,
      review:
        "Great profile! You have amazing eyes and your fashion sense is on point. The beach photos really showcase your athletic build. Maybe add more photos showing your interests?",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 3,
      name: "Sofia",
      age: 26,
      country: "Italy",
      rating: 9.5,
      review:
        "Wow! You're stunning! Your features are so harmonious and your style is impeccable. The way you present yourself shows both confidence and approachability.",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: 4,
      name: "Michael",
      age: 31,
      country: "Australia",
      rating: 8.9,
      review:
        "Very attractive profile! Your smile is genuine and your eyes are expressive. The hiking photos show you're adventurous which adds to your appeal. Great overall presentation!",
      avatar: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: 5,
      name: "Olivia",
      age: 27,
      country: "Canada",
      rating: 9.3,
      review:
        "You have such a magnetic presence! Your photos capture your personality perfectly. Love the balance of casual and dressed-up shots. Your smile is absolutely radiant!",
      avatar: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: 6,
      name: "Daniel",
      age: 28,
      country: "Germany",
      rating: 8.8,
      review:
        "Very handsome profile! You have great facial structure and your style is excellent. The photos where you're laughing look the most natural and really enhance your attractiveness.",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    {
      id: 7,
      name: "Isabella",
      age: 25,
      country: "Spain",
      rating: 9.4,
      review:
        "Absolutely gorgeous! Your features are striking and your fashion sense is impeccable. The way you pose in photos is both elegant and approachable. Truly stunning!",
      avatar: "https://i.pravatar.cc/150?img=13",
    },
  ]

  return (
    <div className={`min-h-screen font-sans ${darkMode ? "dark" : ""}`}>
      <div className="bg-background text-foreground min-h-screen relative">
        {/* Navigation */}
        <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur-md">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="url(#heart-gradient)"
                  />
                  <defs>
                    <linearGradient id="heart-gradient" x1="2" y1="3" x2="22" y2="21" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ec4899" />
                      <stop offset="0.5" stopColor="#f43f5e" />
                      <stop offset="1" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-primary sexy-glow">R8 Me</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="h-10 w-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors hover:shadow-md"
              >
                {darkMode ? <Star className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </header>

        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Takes 2/3 of the space on desktop */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <section className="text-center space-y-4 py-8">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-transparent bg-clip-text animate-pulse">
                  Discover Your True Appeal
                </h1>
                <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
                  Find how attractive you are to specific audiences and get honest, unfiltered feedback on your appeal.
                  Let others reveal what they really think about you.
                </p>
              </section>

              {/* Main Tabs */}
              <FeedbackTabs
                socialUrl={socialUrl}
                setSocialUrl={setSocialUrl}
                height={height}
                setHeight={setHeight}
                heightUnit={heightUnit}
                setHeightUnit={setHeightUnit}
                description={description}
                setDescription={setDescription}
                handleImageChange={handleImageChange}
                handleSubmitFeedback={handleSubmitFeedback}
                feedbackStyle={feedbackStyle}
                setFeedbackStyle={setFeedbackStyle}
              />

              {/* Privacy Notice - Moved below tabs */}
              <Card className="premium-card border-pink-200">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Lock className="h-5 w-5 text-primary" />
                    Your Privacy Matters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    At R8 Me, we take your privacy seriously. Your data is securely stored and only shared with the
                    audience you choose. You're always in control of what you share and who sees it. We never sell your
                    personal information to third parties.
                  </p>
                </CardContent>
              </Card>

              {/* Login Form - Made wider but shorter */}
              <Card className="premium-card border-pink-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-center text-primary">
                    {loginMode ? "Login to Your Account" : "Create an Account"}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {loginMode
                      ? "Sign in to track your ratings and get personalized insights"
                      : "Join R8 Me to save your results and get more features"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="sexy-input"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="sexy-input"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Button variant="link" onClick={() => setLoginMode(!loginMode)} className="text-primary p-0">
                        {loginMode ? "Need an account? Sign up" : "Already have an account? Login"}
                      </Button>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                      >
                        {loginMode ? "Login" : "Sign Up"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Feedback Examples Sidebar - Takes 1/3 of the space on desktop */}
            <div className="lg:col-span-1">
              <FeedbackExamples feedback={sampleFeedback} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-muted/30 py-6 mt-12">
          <div className="container text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} R8 Me. All rights reserved.</p>
            <p className="text-sm mt-2">
              Your data is secure and private. We never share your information without consent.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

// Moon icon component since it's not imported from lucide-react
function Moon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  )
}

// Separate component for the feedback tabs - updated to be sexier
function FeedbackTabs({
  socialUrl,
  setSocialUrl,
  height,
  setHeight,
  heightUnit,
  setHeightUnit,
  description,
  setDescription,
  handleImageChange,
  handleSubmitFeedback,
  feedbackStyle,
  setFeedbackStyle,
}: {
  socialUrl: string
  setSocialUrl: (url: string) => void
  height: string
  setHeight: (height: string) => void
  heightUnit: string
  setHeightUnit: (unit: string) => void
  description: string
  setDescription: (desc: string) => void
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitFeedback: (type: string) => void
  feedbackStyle: string
  setFeedbackStyle: (style: string) => void
}) {
  return (
    <Tabs defaultValue="basic" className="max-w-4xl mx-auto">
      <TabsList className="grid w-full grid-cols-4 h-auto">
        <TabsTrigger
          value="ai"
          className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-rose-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
        >
          <Bot className="mr-2 h-4 w-4" />
          AI
        </TabsTrigger>
        <TabsTrigger
          value="basic"
          className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-rose-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Basic Feedback
        </TabsTrigger>
        <TabsTrigger
          value="advanced"
          className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-rose-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Advanced Feedback
        </TabsTrigger>
        <TabsTrigger
          value="premium"
          className="py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:via-rose-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300"
        >
          <Crown className="mr-2 h-4 w-4" />
          Premium Feedback
        </TabsTrigger>
      </TabsList>

      {/* Common form structure for all tabs */}
      {["ai", "basic", "advanced", "premium"].map((tab) => (
        <TabsContent key={tab} value={tab} className="mt-6 space-y-6">
          <Card className="premium-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary flex items-center gap-2">
                {tab === "ai" && (
                  <>
                    <Bot className="h-5 w-5" /> AI-Powered Attraction Analysis
                  </>
                )}
                {tab === "basic" && (
                  <>
                    <MessageSquare className="h-5 w-5" /> Basic Attraction Feedback
                  </>
                )}
                {tab === "advanced" && (
                  <>
                    <Sparkles className="h-5 w-5" /> Advanced Attraction Insights
                  </>
                )}
                {tab === "premium" && (
                  <>
                    <Crown className="h-5 w-5" /> Premium Attraction Assessment
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {tab === "ai" && "Get instant AI-generated feedback on your attractiveness and appeal"}
                {tab === "basic" && "Discover how attractive you are with honest ratings from real people"}
                {tab === "advanced" && "Receive detailed feedback with specific suggestions to enhance your appeal"}
                {tab === "premium" &&
                  "Our most comprehensive analysis with personalized advice from attraction experts"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              {/* Social Media URL */}
              <div className="space-y-2">
                <Label htmlFor={`social-${tab}`} className="flex items-center gap-2">
                  Social Media Profile
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        Your profile must be public, or you must accept the follow request from the R8 Me official
                        account.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id={`social-${tab}`}
                  placeholder="Your Instagram/Facebook URL"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  className="sexy-input"
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor={`images-${tab}`} className="flex items-center gap-2">
                  Upload Your Best Photos <span className="text-muted-foreground text-sm">(Optional)</span>
                </Label>
                <div className="border-2 border-dashed border-pink-200 rounded-lg p-6 text-center hover:border-pink-400 transition-colors">
                  <Camera className="h-8 w-8 mx-auto text-pink-400 mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your most flattering photos here, or click to browse
                  </p>
                  <Input
                    id={`images-${tab}`}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById(`images-${tab}`)?.click()}
                    className="mt-2 sexy-border hover:shadow-md transition-all duration-300"
                  >
                    Select Photos
                  </Button>
                </div>
              </div>

              {/* Height Input */}
              <div className="space-y-2">
                <Label htmlFor={`height-${tab}`} className="flex items-center gap-2">
                  Height <span className="text-rose-500">*</span>
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={`height-${tab}`}
                    placeholder={heightUnit === "cm" ? "175" : "5'10\""}
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="flex-1 sexy-input"
                    required
                  />
                  <Select value={heightUnit} onValueChange={setHeightUnit}>
                    <SelectTrigger className="w-[120px] sexy-border">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="ft">ft & in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Additional Description */}
              <div className="space-y-2">
                <Label htmlFor={`description-${tab}`} className="flex items-center gap-2">
                  Tell Us More About You <span className="text-muted-foreground text-sm">(Optional)</span>
                </Label>
                <Textarea
                  id={`description-${tab}`}
                  placeholder="Describe your personality, what you're looking for, or what kind of feedback you want..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="sexy-input resize-none"
                />
              </div>

              {/* Feedback Style Options */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div
                  className={`bg-gradient-to-r from-pink-50 to-purple-50 border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
                    feedbackStyle === "be-kind"
                      ? "border-pink-400 shadow-md"
                      : "border-pink-200 hover:border-pink-300 hover:shadow-sm"
                  }`}
                  onClick={() => setFeedbackStyle("be-kind")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-2 rounded-full ${feedbackStyle === "be-kind" ? "bg-pink-100" : "bg-white"} transition-colors`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-500"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M9 9 A 3 3 0 0 1 15 9" />
                        <path d="M16 13h.01" />
                        <path d="M8 13h.01" />
                        <path d="M18 11.5a6 6 0 0 0-12 0" />
                      </svg>
                    </div>
                    <h3 className="font-medium">Be Kind</h3>
                    <p className="text-xs text-muted-foreground">Gentle, supportive feedback</p>
                  </div>
                </div>

                <div
                  className={`bg-gradient-to-r from-pink-50 to-purple-50 border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
                    feedbackStyle === "no-cap"
                      ? "border-pink-400 shadow-md"
                      : "border-pink-200 hover:border-pink-300 hover:shadow-sm"
                  }`}
                  onClick={() => setFeedbackStyle("no-cap")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-2 rounded-full ${feedbackStyle === "no-cap" ? "bg-pink-100" : "bg-white"} transition-colors`}
                    >
                      <MessageCircle className="h-6 w-6 text-pink-500" />
                    </div>
                    <h3 className="font-medium">No Cap</h3>
                    <p className="text-xs text-muted-foreground">Honest, straightforward truth</p>
                  </div>
                </div>

                <div
                  className={`bg-gradient-to-r from-pink-50 to-purple-50 border-2 rounded-xl p-4 text-center cursor-pointer transition-all duration-300 ${
                    feedbackStyle === "roast-me"
                      ? "border-pink-400 shadow-md"
                      : "border-pink-200 hover:border-pink-300 hover:shadow-sm"
                  }`}
                  onClick={() => setFeedbackStyle("roast-me")}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-2 rounded-full ${feedbackStyle === "roast-me" ? "bg-pink-100" : "bg-white"} transition-colors`}
                    >
                      <Flame className="h-6 w-6 text-pink-500" />
                    </div>
                    <h3 className="font-medium">Roast Me</h3>
                    <p className="text-xs text-muted-foreground">Brutally honest criticism</p>
                  </div>
                </div>
              </div>

              {/* Pricing Info for different tiers */}
              {tab !== "basic" && (
                <Card className="bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200 shadow-md">
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-2">
                      <Info className="h-5 w-5 text-pink-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {tab === "ai" && "AI feedback is available for $4.99 per submission."}
                          {tab === "advanced" && "Advanced feedback is available for $9.99 per submission."}
                          {tab === "premium" && "Premium feedback is available for $19.99 per submission."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 w-full text-lg"
                onClick={() => handleSubmitFeedback(tab)}
              >
                GET FEEDBACK!
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
