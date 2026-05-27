import { DatePicker, Form, Input, Select, Space } from 'antd'
import dayjs from 'dayjs'
import { ALL_TAG_OPTIONS } from '@/constants/questions'
import type { RecommendLevel, SurveyListFilters } from '@/types/survey'
import { RECOMMEND_LEVEL_LABELS } from '@/utils/recommend-level'

interface FilterBarProps {
  filters: SurveyListFilters
  onChange: (filters: SurveyListFilters) => void
  storeOptions: string[]
}

const LEVEL_OPTIONS = (['A', 'B', 'C', 'D'] as RecommendLevel[]).map((v) => ({
  value: v,
  label: RECOMMEND_LEVEL_LABELS[v],
}))

export function FilterBar({ filters, onChange, storeOptions }: FilterBarProps) {
  return (
    <Form layout="inline" style={{ marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
      <Form.Item label="推荐等级">
        <Select
          mode="multiple"
          allowClear
          placeholder="全部"
          style={{ minWidth: 200 }}
          value={filters.recommendLevel}
          options={LEVEL_OPTIONS}
          onChange={(recommendLevel) => onChange({ ...filters, recommendLevel })}
        />
      </Form.Item>
      <Form.Item label="标签">
        <Select
          mode="multiple"
          allowClear
          placeholder="包含任一标签"
          style={{ minWidth: 180 }}
          value={filters.tags}
          options={ALL_TAG_OPTIONS.map((t) => ({ value: t, label: t }))}
          onChange={(tags) => onChange({ ...filters, tags })}
        />
      </Form.Item>
      <Form.Item label="门店">
        <Select
          allowClear
          showSearch
          placeholder="全部门店"
          style={{ minWidth: 160 }}
          value={filters.storeName}
          options={storeOptions.map((s) => ({ value: s, label: s }))}
          onChange={(storeName) => onChange({ ...filters, storeName })}
        />
      </Form.Item>
      <Form.Item label="姓名">
        <Input
          allowClear
          placeholder="包含关键词"
          style={{ width: 120 }}
          value={filters.respondentName}
          onChange={(e) =>
            onChange({ ...filters, respondentName: e.target.value || undefined })
          }
        />
      </Form.Item>
      <Form.Item label="提交日期">
        <DatePicker.RangePicker
          onChange={(dates) => {
            onChange({
              ...filters,
              dateFrom: dates?.[0] ? dayjs(dates[0]).format('YYYY-MM-DD') : undefined,
              dateTo: dates?.[1] ? dayjs(dates[1]).format('YYYY-MM-DD') : undefined,
            })
          }}
        />
      </Form.Item>
      <Form.Item>
        <Space>
          <a
            onClick={() =>
              onChange({
                recommendLevel: undefined,
                tags: undefined,
                storeName: undefined,
                respondentName: undefined,
                dateFrom: undefined,
                dateTo: undefined,
              })
            }
          >
            重置筛选
          </a>
        </Space>
      </Form.Item>
    </Form>
  )
}
