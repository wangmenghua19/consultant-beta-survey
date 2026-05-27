import { STORAGE_KEY_DRAFT, STORAGE_KEY_DRAFT_LEGACY } from '@/constants/score-weights'
import type { IDraftStorage } from '@/services/survey.repository'
import type { SurveyFormValues } from '@/types/survey'

class LocalDraftStorage implements IDraftStorage {
  load(): Partial<SurveyFormValues> | null {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY_DRAFT) ??
        localStorage.getItem(STORAGE_KEY_DRAFT_LEGACY)
      if (!raw) return null
      return JSON.parse(raw) as Partial<SurveyFormValues>
    } catch {
      return null
    }
  }

  save(values: Partial<SurveyFormValues>): void {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(values))
  }

  clear(): void {
    localStorage.removeItem(STORAGE_KEY_DRAFT)
  }
}

export const draftStorage: IDraftStorage = new LocalDraftStorage()
