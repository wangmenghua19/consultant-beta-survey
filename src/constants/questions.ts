import type { OptionItem } from '@/types/survey'
import type {
  AiAcceptance,
  BetaWillingness,
  CoBuildWillingness,
  ExpectedProblem,
  FeedbackWillingness,
  IssueBehavior,
  NewSystemBehavior,
  Position,
} from '@/types/survey'

export const POSITION_OPTIONS: OptionItem<Position>[] = [
  { value: 'consultant', label: '顾问' },
  { value: 'advisor', label: '咨询师' },
  { value: 'assistant', label: '助理' },
  { value: 'manager', label: '店长' },
  { value: 'other', label: '其他' },
]

export const NEW_SYSTEM_OPTIONS: OptionItem<NewSystemBehavior>[] = [
  { value: 'explore', label: '主动摸索尝试' },
  { value: 'wait_colleague', label: '等同事教会再用' },
  { value: 'wait_stable', label: '等稳定后再用' },
  { value: 'avoid', label: '尽量不用新功能' },
]

export const BETA_WILLINGNESS_OPTIONS: OptionItem<BetaWillingness>[] = [
  { value: 'very_willing', label: '非常愿意' },
  { value: 'willing', label: '愿意，有时间会配合' },
  { value: 'watch', label: '先观望' },
  { value: 'no', label: '暂不参与' },
]

export const EXPECTED_PROBLEM_OPTIONS: OptionItem<ExpectedProblem>[] = [
  { value: 'follow_remind', label: '跟进提醒与待办' },
  { value: 'patient_summary', label: '患者信息汇总' },
  { value: 'script_suggest', label: '沟通话术建议' },
  { value: 'data_report', label: '数据统计报表' },
  { value: 'other', label: '其他' },
]

export const ISSUE_BEHAVIOR_OPTIONS: OptionItem<IssueBehavior>[] = [
  { value: 'feedback_now', label: '立即反馈' },
  { value: 'feedback_later', label: '记在心里，有空再说' },
  { value: 'tolerate', label: '忍一忍继续用' },
  { value: 'give_up', label: '放弃使用' },
]

export const FEEDBACK_WILLINGNESS_OPTIONS: OptionItem<FeedbackWillingness>[] = [
  { value: 'always', label: '愿意，可随时反馈' },
  { value: 'if_easy', label: '愿意，但需要简单入口' },
  { value: 'reluctant', label: '不太愿意' },
]

export const AI_ACCEPTANCE_OPTIONS: OptionItem<AiAcceptance>[] = [
  { value: 'very_high', label: '非常接受' },
  { value: 'high_with_review', label: '接受，但需人工确认' },
  { value: 'cautious', label: '谨慎观望' },
  { value: 'low', label: '不太接受' },
]

export const CO_BUILD_OPTIONS: OptionItem<CoBuildWillingness>[] = [
  { value: 'deep', label: '愿意深度参与（访谈、走查等）' },
  { value: 'occasional', label: '愿意偶尔参加调研' },
  { value: 'no', label: '暂不参与' },
]

export const ALL_TAG_OPTIONS = [
  '种子用户',
  '内测意愿高',
  '高反馈意愿',
  'AI接受',
  'AI保守',
  '变革抗拒',
  '共建意愿强',
  '关注跟进提醒',
  '开放度高',
] as const

function optionsToLabelMap<T extends string>(options: OptionItem<T>[]): Record<T, string> {
  return Object.fromEntries(options.map((o) => [o.value, o.label])) as Record<T, string>
}

export const LABEL_MAP = {
  position: optionsToLabelMap(POSITION_OPTIONS),
  newSystemBehavior: optionsToLabelMap(NEW_SYSTEM_OPTIONS),
  betaWillingness: optionsToLabelMap(BETA_WILLINGNESS_OPTIONS),
  expectedProblems: optionsToLabelMap(EXPECTED_PROBLEM_OPTIONS),
  issueBehavior: optionsToLabelMap(ISSUE_BEHAVIOR_OPTIONS),
  feedbackWillingness: optionsToLabelMap(FEEDBACK_WILLINGNESS_OPTIONS),
  aiAcceptance: optionsToLabelMap(AI_ACCEPTANCE_OPTIONS),
  coBuildWillingness: optionsToLabelMap(CO_BUILD_OPTIONS),
}

export function labelOf<K extends keyof typeof LABEL_MAP>(
  field: K,
  value: keyof (typeof LABEL_MAP)[K],
): string {
  const map = LABEL_MAP[field] as Record<string, string>
  return map[value as string] ?? String(value)
}

export function labelsOfProblems(values: ExpectedProblem[], other?: string): string {
  const parts = values
    .filter((v) => v !== 'other')
    .map((v) => LABEL_MAP.expectedProblems[v])
  if (values.includes('other') && other) {
    parts.push(`其他：${other}`)
  } else if (values.includes('other')) {
    parts.push('其他')
  }
  return parts.join('、')
}
