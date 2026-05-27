import type { RecommendLevel, SurveyFormValues } from '@/types/survey'

export function buildTags(
  answers: SurveyFormValues,
  level: RecommendLevel,
  score: number,
): string[] {
  const tags: string[] = []

  if (level === 'A') tags.push('种子用户')
  if (answers.betaWillingness === 'very_willing' || answers.betaWillingness === 'willing') {
    tags.push('内测意愿高')
  }
  if (answers.feedbackWillingness === 'always') tags.push('高反馈意愿')
  if (answers.aiAcceptance === 'very_high' || answers.aiAcceptance === 'high_with_review') {
    tags.push('AI接受')
  }
  if (answers.aiAcceptance === 'low') tags.push('AI保守')
  if (answers.newSystemBehavior === 'avoid') tags.push('变革抗拒')
  if (answers.coBuildWillingness === 'deep') tags.push('共建意愿强')
  if (answers.expectedProblems.includes('follow_remind')) tags.push('关注跟进提醒')
  if (score >= 80) tags.push('开放度高')

  return [...new Set(tags)]
}
