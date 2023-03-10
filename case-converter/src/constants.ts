import jsConvert from 'js-convert-case'

export const sample = `requestURLDecoderID
HTTP_CLIENT_FACTORY
generic_activity_highlights
RankedOrganicTweet
suggest-activity-feed
This is a normal sentence
A long sentence with emjois 👋 and fốrêign characters`

export const CaseType = {
  CAMEL_CASE: 'camelCase',
  PASCAL_CASE: 'PascalCase',
  SNAKE_CASE: 'snake_case',
  UPPER_CASE: 'UPPERCASE',
  LOWER_CASE: 'lowercase',
  KEBAB_CASE: 'kebab-case',
  DOT_CASE: 'dot.case',
  PATH_CASE: 'path/case',
  TEXT_CASE: 'text case',
  SENTENCE_CASE: 'Sentence case',
  HEADER_CASE: 'Header Case',
}

export const CaseTypeMap: {
  [key in keyof typeof CaseType]: key
} = {
  CAMEL_CASE: 'CAMEL_CASE',
  PASCAL_CASE: 'PASCAL_CASE',
  SNAKE_CASE: 'SNAKE_CASE',
  UPPER_CASE: 'UPPER_CASE',
  LOWER_CASE: 'LOWER_CASE',
  KEBAB_CASE: 'KEBAB_CASE',
  DOT_CASE: 'DOT_CASE',
  PATH_CASE: 'PATH_CASE',
  TEXT_CASE: 'TEXT_CASE',
  SENTENCE_CASE: 'SENTENCE_CASE',
  HEADER_CASE: 'HEADER_CASE',
}

export const CaseConverter = {
  [CaseType.CAMEL_CASE]: jsConvert.toCamelCase,
  [CaseType.PASCAL_CASE]: jsConvert.toPascalCase,
  [CaseType.SNAKE_CASE]: jsConvert.toSnakeCase,
  [CaseType.UPPER_CASE]: jsConvert.toUpperCase,
  [CaseType.LOWER_CASE]: jsConvert.toLowerCase,
  [CaseType.KEBAB_CASE]: jsConvert.toKebabCase,
  [CaseType.DOT_CASE]: jsConvert.toDotCase,
  [CaseType.PATH_CASE]: jsConvert.toPathCase,
  [CaseType.TEXT_CASE]: jsConvert.toTextCase,
  [CaseType.SENTENCE_CASE]: jsConvert.toSentenceCase,
  [CaseType.HEADER_CASE]: jsConvert.toHeaderCase,
}
