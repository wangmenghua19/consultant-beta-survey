import { App, Button, Space } from 'antd'
import { surveyRepository } from '@/services/survey.repository'
import type { SurveySubmission } from '@/types/survey'
import { exportSubmissionsToExcel, exportSubmissionsToJson } from '@/utils/export-excel'

interface ExportToolbarProps {
  filtered: SurveySubmission[]
  total: number
  onCleared: () => void
}

export function ExportToolbar({ filtered, total, onCleared }: ExportToolbarProps) {
  const { modal, message } = App.useApp()

  return (
    <Space wrap style={{ marginBottom: 16 }}>
      <Button type="primary" onClick={() => exportSubmissionsToExcel(filtered)}>
        导出 Excel（当前筛选 {filtered.length} 条）
      </Button>
      <Button onClick={() => exportSubmissionsToJson(filtered)}>
        导出 JSON（当前筛选）
      </Button>
      <Button
        onClick={async () => {
          const all = await surveyRepository.list()
          exportSubmissionsToJson(all, `顾问跟进内测问卷_全部_${total}.json`)
        }}
      >
        导出 JSON（全部 {total} 条）
      </Button>
      <Button
        danger
        onClick={() => {
          modal.confirm({
            title: '清空本地数据',
            content: '将删除本浏览器中保存的全部问卷记录，请先导出备份。确定继续？',
            okText: '确定清空',
            okType: 'danger',
            onOk: async () => {
              try {
                await surveyRepository.clearAll()
                message.success('已清空')
                onCleared()
              } catch (e) {
                message.error(e instanceof Error ? e.message : '清空失败')
              }
            },
          })
        }}
      >
        清空本地数据
      </Button>
    </Space>
  )
}
