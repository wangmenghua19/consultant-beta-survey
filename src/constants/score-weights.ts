import type {
  AiAcceptance,
  CoBuildWillingness,
  FeedbackWillingness,
  IssueBehavior,
  NewSystemBehavior,
} from '@/types/survey'

export const SCORE_MAP = {
  newSystemBehavior: {
    explore: 25,
    wait_colleague: 18,
    wait_stable: 10,
    avoid: 0,
  } satisfies Record<NewSystemBehavior, number>,
  aiAcceptance: {
    very_high: 30,
    high_with_review: 22,
    cautious: 12,
    low: 0,
  } satisfies Record<AiAcceptance, number>,
  issueBehavior: {
    feedback_now: 25,
    feedback_later: 15,
    tolerate: 8,
    give_up: 0,
  } satisfies Record<IssueBehavior, number>,
  feedbackWillingness: {
    always: 25,
    if_easy: 15,
    reluctant: 0,
  } satisfies Record<FeedbackWillingness, number>,
  coBuildWillingness: {
    deep: 20,
    occasional: 12,
    no: 0,
  } satisfies Record<CoBuildWillingness, number>,
} as const

export const STORAGE_KEY_RESPONSES = 'beta_survey_responses_v1'
export const STORAGE_KEY_DRAFT = 'beta_survey_draft_v2'
export const STORAGE_KEY_DRAFT_LEGACY = 'beta_survey_draft_v1'
