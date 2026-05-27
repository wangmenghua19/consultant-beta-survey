import dayjs from 'dayjs'
import { STORAGE_KEY_RESPONSES } from '@/constants/score-weights'
import type { ISurveyRepository } from '@/services/survey.repository'
import type { StoragePayload, SurveyListFilters, SurveySubmission } from '@/types/survey'
import { filterSubmissions } from '@/utils/filter-submissions'

export class LocalStorageSurveyRepository implements ISurveyRepository {
  async save(submission: SurveySubmission): Promise<void> {
    const payload = this.read()
    payload.items.push(submission)
    localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(payload))
  }

  async list(filters?: SurveyListFilters): Promise<SurveySubmission[]> {
    const items = this.read()
      .items.slice()
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    if (!filters) return items
    return filterSubmissions(items, filters)
  }

  async remove(id: string): Promise<void> {
    const payload = this.read()
    payload.items = payload.items.filter((i) => i.id !== id)
    localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify(payload))
  }

  async clearAll(): Promise<void> {
    localStorage.setItem(STORAGE_KEY_RESPONSES, JSON.stringify({ version: 1, items: [] }))
  }

  async findTodayDuplicate(
    storeName: string,
    respondentName: string,
    position: string,
  ): Promise<SurveySubmission | null> {
    const today = dayjs().format('YYYY-MM-DD')
    const found = this.read().items.find(
      (i) =>
        i.answers.storeName === storeName &&
        (i.answers.respondentName ?? '') === respondentName &&
        i.answers.position === position &&
        dayjs(i.submittedAt).format('YYYY-MM-DD') === today,
    )
    return found ?? null
  }

  private read(): StoragePayload {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_RESPONSES)
      if (!raw) return { version: 1, items: [] }
      const parsed = JSON.parse(raw) as StoragePayload
      if (parsed.version !== 1 || !Array.isArray(parsed.items)) {
        return { version: 1, items: [] }
      }
      return parsed
    } catch {
      return { version: 1, items: [] }
    }
  }
}
