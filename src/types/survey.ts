export type NewSystemBehavior = 'explore' | 'wait_colleague' | 'wait_stable' | 'avoid'

export type BetaWillingness = 'very_willing' | 'willing' | 'watch' | 'no'

export type ExpectedProblem =
  | 'follow_remind'
  | 'patient_summary'
  | 'script_suggest'
  | 'data_report'
  | 'other'

export type IssueBehavior = 'feedback_now' | 'feedback_later' | 'tolerate' | 'give_up'

export type FeedbackWillingness = 'always' | 'if_easy' | 'reluctant'

export type AiAcceptance = 'very_high' | 'high_with_review' | 'cautious' | 'low'

export type CoBuildWillingness = 'deep' | 'occasional' | 'no'

export type Position = 'consultant' | 'advisor' | 'assistant' | 'manager' | 'other'

export type RecommendLevel = 'A' | 'B' | 'C' | 'D'

export interface SurveyFormValues {
  storeName: string
  respondentName: string
  position: Position
  newSystemBehavior: NewSystemBehavior
  betaWillingness: BetaWillingness
  expectedProblems: ExpectedProblem[]
  expectedProblemsOther?: string
  issueBehavior: IssueBehavior
  feedbackWillingness: FeedbackWillingness
  aiAcceptance: AiAcceptance
  coBuildWillingness: CoBuildWillingness
}

export interface SurveySubmission {
  id: string
  submittedAt: string
  schemaVersion: 1 | 2
  answers: SurveyFormValues
  opennessScore: number
  recommendLevel: RecommendLevel
  tags: string[]
  meta: {
    userAgent?: string
    source: 'web'
  }
}

export type StoragePayload = {
  version: 1
  items: SurveySubmission[]
}

export interface SurveyListFilters {
  recommendLevel?: RecommendLevel[]
  tags?: string[]
  storeName?: string
  respondentName?: string
  dateFrom?: string
  dateTo?: string
}

export interface OptionItem<T extends string = string> {
  value: T
  label: string
}
