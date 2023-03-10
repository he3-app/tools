import { CaseType, CaseTypeMap } from './constants'

export default {
  'en': {
    $name: 'Case Converter',
    $description:
      'Convert text to: camelCase, PascalCase, snake_case, UPPERCASE, lowercase, kebab-case, dot.case, path/case, text case, Sentence case, Header Case', // 插件的描述
    $keywords: [
      'Upper',
      'Lower',
      'camelCase',
      'PascalCase',
      'snake_case',
      'UPPERCASE',
      'lowercase',
      'kebab-case',
      'dot.case',
      'path/case',
      'text case',
      'Sentence case',
      'Header Case',
    ],
    input: {
      placeholder:
        'Please input any text, including plain text, variables, function names, etc.',
    },
    output: {
      placeholder: 'Convert string into different formats',
      ...CaseType,
    },
    sample: 'Sample',
    clear: 'Clear',
  },
  'zh': {
    $name: '变量命名转换',
    $description:
      '将字符串转换为不同的格式：驼峰式, 帕斯卡式, 下划线式, 大写, 小写, 短横线式, 点式, 路径式, 文本式, 句式, 标题式',
    $keywords: [
      '驼峰式',
      '帕斯卡式',
      '下划线式',
      '大写',
      '小写',
      '短横线式',
      '点式',
      '路径式',
      '文本式',
      '句式',
      '标题式',
    ],
    input: {
      placeholder: '请输入任意字符串，包括普通文本、变量、函数名称等',
    },
    output: {
      placeholder: '将字符串转换为不同的格式',
      [CaseTypeMap.CAMEL_CASE]: '驼峰式',
      [CaseTypeMap.PASCAL_CASE]: '帕斯卡式',
      [CaseTypeMap.SNAKE_CASE]: '下划线式',
      [CaseTypeMap.UPPER_CASE]: '大写',
      [CaseTypeMap.LOWER_CASE]: '小写',
      [CaseTypeMap.KEBAB_CASE]: '短横线式',
      [CaseTypeMap.DOT_CASE]: '点式',
      [CaseTypeMap.PATH_CASE]: '路径式',
      [CaseTypeMap.TEXT_CASE]: '文本式',
      [CaseTypeMap.SENTENCE_CASE]: '句式',
      [CaseTypeMap.HEADER_CASE]: '标题式',
    },
    sample: '示例',
    clear: '清空',
  },
}
