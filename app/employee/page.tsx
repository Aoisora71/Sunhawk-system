"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SurveyProgress } from "@/components/survey-progress"
import { SurveyQuestionCard } from "@/components/survey-question-card"
import { surveyQuestions } from "@/lib/survey-questions"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

export default function EmployeePage() {
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestion = surveyQuestions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === surveyQuestions.length - 1
  const isFirstQuestion = currentQuestionIndex === 0
  const currentAnswer = answers[currentQuestion.id]

  const handleAnswerChange = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setTimeout(() => {
      router.push("/survey/complete")
    }, 1500)
  }

  const answeredCount = Object.keys(answers).length
  const completionPercentage = Math.round((answeredCount / surveyQuestions.length) * 100)
  const allAnswered = answeredCount === surveyQuestions.length

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="flex flex-col md:flex-row">
        <DashboardNav />
        <main className="flex-1 p-3 sm:p-4 md:p-8 w-full overflow-x-hidden">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-1 sm:mb-2">
                組織サーベイ回答
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                全78問の質問にお答えください。あなたの回答は組織の改善に役立てられます。
              </p>
            </div>

            {/* Completion Alert */}
            {allAnswered && (
              <Card className="border-[oklch(0.55_0.15_160)] bg-[oklch(0.98_0.01_160)]">
                <CardContent className="pt-4 sm:pt-6 flex items-start gap-3">
                  <Check className="h-5 w-5 text-[oklch(0.55_0.15_160)] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">すべての質問に回答しました</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      下の「回答を送信」ボタンをクリックして、回答を提出してください。
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Overall Progress */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">回答状況</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {answeredCount}問 / {surveyQuestions.length}問 回答済み（{completionPercentage}%）
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Progress */}
            <SurveyProgress
              current={currentQuestionIndex + 1}
              total={surveyQuestions.length}
              category={currentQuestion.category}
            />

            {/* Question Card */}
            <SurveyQuestionCard question={currentQuestion} value={currentAnswer} onChange={handleAnswerChange} />

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 sm:pt-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={isFirstQuestion}
                className="w-full sm:w-auto text-sm sm:text-base bg-transparent"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                前の質問
              </Button>

              <div className="text-xs sm:text-sm text-muted-foreground order-3 sm:order-2">
                {currentQuestionIndex + 1} / {surveyQuestions.length}
              </div>

              {isLastQuestion ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  className="w-full sm:w-auto text-sm sm:text-base order-2 sm:order-3"
                >
                  {isSubmitting ? (
                    "送信中..."
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      回答を送信
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="w-full sm:w-auto text-sm sm:text-base order-2 sm:order-3"
                >
                  次の質問
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Category Progress */}
            <Card>
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base">カテゴリ別進捗</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                  {[
                    "変化意識",
                    "成果視点",
                    "行動優先意識",
                    "結果明確",
                    "自己評価意識",
                    "時感覚",
                    "組織内位置認識",
                    "免責意識",
                  ].map((category) => {
                    const categoryQuestions = surveyQuestions.filter((q) => q.category === category)
                    const categoryAnswered = categoryQuestions.filter((q) => answers[q.id]).length
                    const categoryTotal = categoryQuestions.length
                    const categoryComplete = categoryAnswered === categoryTotal

                    return (
                      <div key={category} className="space-y-1">
                        <div className="flex items-center gap-1">
                          <div className="text-xs sm:text-sm font-medium text-foreground">{category}</div>
                          {categoryComplete && <Check className="h-3 w-3 text-[oklch(0.55_0.15_160)]" />}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {categoryAnswered} / {categoryTotal}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
