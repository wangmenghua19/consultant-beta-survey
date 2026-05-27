import { useCallback, useEffect, useMemo, useState } from 'react'
import { surveyRepository } from '@/services/survey.repository'
import type { SurveyListFilters, SurveySubmission } from '@/types/survey'
import { filterSubmissions } from '@/utils/filter-submissions'

export function useSurveyList() {
  const [allItems, setAllItems] = useState<SurveySubmission[]>([])
  const [filters, setFilters] = useState<SurveyListFilters>({})
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const items = await surveyRepository.list()
      setAllItems(items)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const filteredItems = useMemo(
    () => filterSubmissions(allItems, filters),
    [allItems, filters],
  )

  const storeOptions = useMemo(() => {
    const set = new Set(allItems.map((i) => i.answers.storeName))
    return Array.from(set).sort()
  }, [allItems])

  return {
    allItems,
    filteredItems,
    filters,
    setFilters,
    loading,
    reload: load,
    storeOptions,
  }
}
