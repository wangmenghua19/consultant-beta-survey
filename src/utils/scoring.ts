import { SCORE_MAP } from '@/constants/score-weights'
import type { SurveyFormValues } from '@/types/survey'

export function calcOpennessScore(answers: SurveyFormValues): number {
  const s1 = SCORE_MAP.newSystemBehavior[answers.newSystemBehavior]
  const s2 = SCORE_MAP.aiAcceptance[answers.aiAcceptance]
  const s3 =
    (SCORE_MAP.issueBehavior[answers.issueBehavior] +
      SCORE_MAP.feedbackWillingness[answers.feedbackWillingness]) /
    2
  const s4 = SCORE_MAP.coBuildWillingness[answers.coBuildWillingness]
  return Math.round(Math.min(100, s1 + s2 + s3 + s4))
}
