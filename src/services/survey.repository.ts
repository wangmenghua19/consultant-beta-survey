import type { SurveyFormValues, SurveyListFilters, SurveySubmission } from '@/types/survey'
import { LocalStorageSurveyRepository } from '@/services/local-storage.repo'
import { HttpSurveyRepository } from '@/services/http.repository'

export interface ISurveyRepository {
  save(submission: SurveySubmission): Promise<void>
  list(filters?: SurveyListFilters): Promise<SurveySubmission[]>
  remove(id: string): Promise<void>
  clearAll(): Promise<void>
  findTodayDuplicate(
    storeName: string,
    respondentName: string,
    position: string,
  ): Promise<SurveySubmission | null>
}

export const surveyRepository: ISurveyRepository =
  import.meta.env.VITE_USE_API === 'true'
    ? new HttpSurveyRepository()
    : new LocalStorageSurveyRepository()

export interface IDraftStorage {
  load(): Partial<SurveyFormValues> | null
  save(values: Partial<SurveyFormValues>): void
  clear(): void
}

export { draftStorage } from '@/services/draft.storage'
