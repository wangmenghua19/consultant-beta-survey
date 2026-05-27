import * as XLSX from 'xlsx'
import dayjs from 'dayjs'
import { labelOf, labelsOfProblems } from '@/constants/questions'
import type { SurveySubmission } from '@/types/survey'
import { RECOMMEND_LEVEL_LABELS } from '@/utils/recommend-level'

function dateStr() {
  return dayjs().format('YYYYMMDD_HHmm')
}

export function exportSubmissionsToExcel(
  rows: SurveySubmission[],
  filename?: string,
) {
  const data = rows.map((r) => ({
    提交时间: dayjs(r.submittedAt).format('YYYY-MM-DD HH:mm:ss'),
    门店: r.answers.storeName,
    姓名: r.answers.respondentName || '—',
    岗位: labelOf('position', r.answers.position),
    内测推荐等级: RECOMMEND_LEVEL_LABELS[r.recommendLevel],
    开放度评分: r.opennessScore,
    用户标签: r.tags.join('、'),
    新系统习惯: labelOf('newSystemBehavior', r.answers.newSystemBehavior),
    内测意愿: labelOf('betaWillingness', r.answers.betaWillingness),
    希望解决的问题: labelsOfProblems(
      r.answers.expectedProblems,
      r.answers.expectedProblemsOther,
    ),
    发现问题时的行为: labelOf('issueBehavior', r.answers.issueBehavior),
    主动反馈意愿: labelOf('feedbackWillingness', r.answers.feedbackWillingness),
    AI接受程度: labelOf('aiAcceptance', r.answers.aiAcceptance),
    后续共建意愿: labelOf('coBuildWillingness', r.answers.coBuildWillingness),
  }))

  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, '内测问卷')
  XLSX.writeFile(wb, filename ?? `顾问跟进内测问卷_${dateStr()}.xlsx`)
}

export function exportSubmissionsToJson(rows: SurveySubmission[], filename?: string) {
  const payload = {
    exportedAt: new Date().toISOString(),
    count: rows.length,
    items: rows,
  }
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename ?? `顾问跟进内测问卷_${dateStr()}.json`
  a.click()
  URL.revokeObjectURL(url)
}
