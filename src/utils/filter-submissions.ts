import type { SurveyListFilters, SurveySubmission } from '@/types/survey'
import dayjs from 'dayjs'

export function filterSubmissions(
  items: SurveySubmission[],
  filters: SurveyListFilters,
): SurveySubmission[] {
  return items.filter((item) => {
    if (filters.recommendLevel?.length && !filters.recommendLevel.includes(item.recommendLevel)) {
      return false
    }
    if (filters.storeName && item.answers.storeName !== filters.storeName) {
      return false
    }
    if (filters.respondentName) {
      const name = item.answers.respondentName ?? ''
      if (!name.includes(filters.respondentName)) return false
    }
    if (filters.tags?.length) {
      const hasTag = filters.tags.some((t) => item.tags.includes(t))
      if (!hasTag) return false
    }
    if (filters.dateFrom) {
      if (dayjs(item.submittedAt).isBefore(dayjs(filters.dateFrom), 'day')) return false
    }
    if (filters.dateTo) {
      if (dayjs(item.submittedAt).isAfter(dayjs(filters.dateTo), 'day')) return false
    }
    return true
  })
}
