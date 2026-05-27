import { useEffect, useRef } from 'react'
import type { FormInstance } from 'antd'
import { draftStorage } from '@/services/survey.repository'
import type { SurveyFormValues } from '@/types/survey'

const DEBOUNCE_MS = 500

export function useSurveyDraft(form: FormInstance<SurveyFormValues>) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const draft = draftStorage.load()
    if (draft && Object.keys(draft).length > 0) {
      form.setFieldsValue(draft)
    }
  }, [form])

  const onValuesChange = (_: Partial<SurveyFormValues>, all: SurveyFormValues) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      draftStorage.save(all)
    }, DEBOUNCE_MS)
  }

  return { onValuesChange }
}
