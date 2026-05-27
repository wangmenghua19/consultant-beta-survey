import { useCallback, useState } from 'react'
import { App } from 'antd'
import { draftStorage, surveyRepository } from '@/services/survey.repository'
import { labelOf } from '@/constants/questions'
import type { SurveyFormValues } from '@/types/survey'
import { enrichSubmission } from '@/utils/enrich-submission'

export function useSurveySubmit() {
  const { modal, message } = App.useApp()
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const submit = useCallback(
    async (values: SurveyFormValues) => {
      const duplicate = await surveyRepository.findTodayDuplicate(
        values.storeName,
        values.respondentName,
        values.position,
      )

      const doSave = async () => {
        setLoading(true)
        try {
          const submission = enrichSubmission(values)
          await surveyRepository.save(submission)
          draftStorage.clear()
          setSubmitted(true)
          message.success('提交成功，感谢您的参与')
        } catch (e) {
          message.error(e instanceof Error ? e.message : '提交失败，请稍后重试')
        } finally {
          setLoading(false)
        }
      }

      if (duplicate) {
        modal.confirm({
          title: '今日已提交过问卷',
          content: `「${values.storeName}」的 ${values.respondentName}（${labelOf('position', values.position)}）今日已有记录，是否仍要再次提交？`,
          okText: '仍要提交',
          cancelText: '取消',
          onOk: doSave,
        })
        return
      }

      await doSave()
    },
    [message, modal],
  )

  const reset = useCallback(() => {
    setSubmitted(false)
  }, [])

  return { submit, loading, submitted, reset }
}
