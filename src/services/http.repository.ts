import type { ISurveyRepository } from '@/services/survey.repository'
import type { SurveyListFilters, SurveySubmission } from '@/types/survey'

const base = import.meta.env.VITE_API_BASE ?? '/api/beta-survey'

/**
 * 正式环境 Repository 占位实现。
 * 后端就绪后实现 POST/GET/DELETE，请求体与 SurveySubmission 保持一致。
 */
export class HttpSurveyRepository implements ISurveyRepository {
  async save(submission: SurveySubmission): Promise<void> {
    const res = await fetch(`${base}/submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
    if (!res.ok) {
      throw new Error(`提交失败: ${res.status} ${res.statusText}`)
    }
  }

  async list(filters?: SurveyListFilters): Promise<SurveySubmission[]> {
    const params = new URLSearchParams()
    if (filters?.recommendLevel?.length) {
      params.set('level', filters.recommendLevel.join(','))
    }
    if (filters?.storeName) params.set('storeName', filters.storeName)
    if (filters?.tags?.length) params.set('tags', filters.tags.join(','))
    if (filters?.dateFrom) params.set('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.set('dateTo', filters.dateTo)

    const qs = params.toString()
    const url = qs ? `${base}/submissions?${qs}` : `${base}/submissions`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`加载失败: ${res.status} ${res.statusText}`)
    }
    const data = (await res.json()) as { items: SurveySubmission[] }
    return data.items ?? []
  }

  async remove(id: string): Promise<void> {
    const res = await fetch(`${base}/submissions/${id}`, { method: 'DELETE' })
    if (!res.ok) {
      throw new Error(`删除失败: ${res.status}`)
    }
  }

  async clearAll(): Promise<void> {
    throw new Error('HttpSurveyRepository.clearAll 需由后端提供批量清理接口')
  }

  async findTodayDuplicate(
    storeName: string,
    respondentName: string,
    position: string,
  ): Promise<SurveySubmission | null> {
    const params = new URLSearchParams({ storeName, respondentName, position, today: '1' })
    const res = await fetch(`${base}/submissions/duplicate?${params}`)
    if (res.status === 404) return null
    if (!res.ok) return null
    return (await res.json()) as SurveySubmission
  }
}
