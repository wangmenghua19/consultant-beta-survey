import type { SurveyFormValues, SurveySubmission } from '@/types/survey'
import { calcOpennessScore } from '@/utils/scoring'
import { calcRecommendLevel } from '@/utils/recommend-level'
import { buildTags } from '@/utils/tagging'

export function enrichSubmission(answers: SurveyFormValues): SurveySubmission {
  const opennessScore = calcOpennessScore(answers)
  const recommendLevel = calcRecommendLevel(answers, opennessScore)
  const tags = buildTags(answers, recommendLevel, opennessScore)

  return {
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    schemaVersion: 2,
    answers,
    opennessScore,
    recommendLevel,
    tags,
    meta: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      source: 'web',
    },
  }
}
