<template>
  <Layout5 :max-width="1280">
    <template #one>
      <div>
        <Form
          v-show="!props.renderOnSearch"
          :label-col="{ span: 8 }"
          :wrapper-col="{ span: 12 }"
        >
          <FormItem :label="$t('now.UserInput')">
            <h-input select-all-on-mount v-model:value="userInput" />
            <template #extra>
              <TypographyText type="secondary">
                {{ $t('now.Suggests[0]') }}
              </TypographyText>
              <TypographyLink
                type="secondary"
                :content="$t('now.Example[0]')"
                underline
                @click="userInput = '8/17/1990 3:35 pm PST'"
              />
              <Divider type="vertical" />
              <TypographyLink
                type="secondary"
                underline
                :content="$t('now.Example[1]')"
                @click="userInput = 'Fourth of July'"
              />
              <Divider type="vertical" />
              <TypographyLink
                type="secondary"
                :content="$t('now.Example[2]')"
                underline
                @click="userInput = 'Next Monday'"
              />
              <TypographyText
                type="secondary"
                :content="$t('now.Suggests[1]')"
              />
            </template>
          </FormItem>
          <FormItem>
            <template #label>
              <Space>
                <span>{{ $t('now.CustomFormat') }}</span>
                <TypographyLink
                  @click="
                    nodeAbility.openBrowser(
                      'https://day.js.org/docs/en/display/format',
                    )
                  "
                >
                  <QuestionCircleOutlined />
                </TypographyLink>
              </Space>
            </template>
            <Input v-model:value="customFormat" />
          </FormItem>
        </Form>

        <Table
          :columns="columns"
          :data-source="dataSource"
          :size="props.renderOnSearch ? 'small' : 'middle'"
          :show-header="false"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
              <TextCopyButton
                v-if="record.value"
                type="link"
                :copy-content="record.value"
              />
            </template>
          </template>
        </Table>
      </div>
    </template>
  </Layout5>
</template>

<script setup lang="ts">
import {
  Form,
  FormItem,
  Input,
  Table,
  Divider,
  TypographyText,
  TypographyLink,
  Space,
} from 'ant-design-vue'
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import dayjs, { Dayjs } from 'dayjs'
import Sugar from 'sugar'
import { useI18n } from 'vue-i18n'
import { Layout5, TextCopyButton, hInput } from '@/hui'
import { nodeAbility } from '@/utils/InjectGlobalAbility'

const { t } = useI18n()

const props = defineProps<{
  renderOnSearch?: boolean
}>()

const userInput = ref<string>('now')
const customFormat = ref<string>('')
const columns = ref([
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    align: 'right',
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  },
  {
    key: 'action',
    align: 'left',
  },
])

function defaultDataSource(): any[] {
  const dataSource: any[] = [
    {
      name: t('now.DataSources[0]'),
      value: '',
      format: 'LLL',
    },
    {
      name: t('now.DataSources[1]'),
      value: '',
      format: 'LLL',
      timezone: 'UTC',
    },
    {
      name: t('now.DataSources[3]'),
      value: '',
      format: 'X',
    },
    {
      name: t('now.DataSources[4]'),
      value: '',
      format: 'x',
    },
  ]
  if (!props.renderOnSearch) {
    dataSource.push(
      {
        name: t('now.DataSources[2]'),
        value: '',
        format: 'YYYY-MM-DDTHH:mm:ssZ',
      },
      {
        name: t('now.DataSources[5]'),
        value: '',
        format: 'w',
      },
      {
        name: t('now.DataSources[6]'),
        value: '',
        format: 'ddd, DD MMM YYYY HH:mm:ss ZZ',
      },
      {
        name: t('now.DataSources[7]'),
        value: '',
        format: 'YYYY-MM-DDTHH:mm:ssZ',
      },
      {
        name: t('now.DataSources[8]'),
        value: '',
        specialFormat: 'julian',
      },
      {
        name: t('now.DataSources[9]'),
        value: '',
        specialFormat: 'custom',
      },
    )
  }
  return dataSource
}

const dataSource = ref(defaultDataSource())

function formatDate() {
  let data
  if (/^\d+$/.test(userInput.value)) {
    // is timestamp
    data = dayjs(parseInt(userInput.value))
  } else {
    data = dayjs(userInput.value)
  }
  if (!data.isValid()) {
    const sugarData = new Sugar.Date(userInput.value)
    if (!sugarData.isValid()) {
      data = null
    } else {
      data = dayjs(parseInt(sugarData.format('{x}').toString()))
    }
  }
  return data
}

function formatDateTime(
  date: Dayjs,
  format: string,
  timezone: string | undefined,
) {
  if (timezone) {
    return date.tz(timezone).format(format)
  } else {
    return date.format(format)
  }
}

function displayData() {
  const data = formatDate()
  for (const item of dataSource.value) {
    if (data) {
      const format = item.format
      const specialFormat = item.specialFormat
      const timezone = item.timezone
      if (format) {
        item.value = formatDateTime(data, format, timezone)
      } else {
        switch (specialFormat) {
          case 'julian':
            item.value = (data.valueOf() / 86400000 + 2440587.5).toString()
            break
          case 'custom':
            if (customFormat.value) {
              item.value = formatDateTime(data, customFormat.value, timezone)
            } else {
              item.value = ''
            }
            break
        }
      }
    } else {
      item.value = 'Invalid Date'
    }
  }
}

const intervalId = setInterval(displayData, 10)
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped lang="less"></style>
