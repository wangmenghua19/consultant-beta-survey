import type { RecommendLevel, SurveyFormValues } from '@/types/survey'

function isSeedCandidate(answers: SurveyFormValues, opennessScore: number): boolean {
  const willingBeta = answers.betaWillingness === 'very_willing' || answers.betaWillingness === 'willing'
  const willingFeedback =
    answers.feedbackWillingness === 'always' || answers.feedbackWillingness === 'if_easy'
  return willingBeta && willingFeedback && opennessScore >= 70
}

export function calcRecommendLevel(
  answers: SurveyFormValues,
  opennessScore: number,
): RecommendLevel {
  if (answers.betaWillingness === 'no') return 'D'

  if (
    answers.newSystemBehavior === 'avoid' &&
    answers.aiAcceptance === 'low'
  ) {
    return 'D'
  }

  if (isSeedCandidate(answers, opennessScore)) return 'A'

  if (answers.betaWillingness === 'watch') return 'C'

  if (opennessScore < 40) return 'D'

  if (opennessScore >= 55) return 'B'

  if (opennessScore >= 40 && opennessScore < 55) return 'C'

  return 'C'
}

export const RECOMMEND_LEVEL_LABELS: Record<RecommendLevel, string> = {
  A: 'A · 强烈推荐',
  B: 'B · 推荐',
  C: 'C · 观望',
  D: 'D · 暂不推荐',
}

export const RECOMMEND_LEVEL_COLORS: Record<RecommendLevel, string> = {
  A: 'green',
  B: 'blue',
  C: 'orange',
  D: 'default',
}
