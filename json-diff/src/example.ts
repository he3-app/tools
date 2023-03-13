export const yamlDiffExample = `id: 1
uuid: 3d877494-e7d4-48e3-aa7a-164373a7920d
name: He3
age: 26
isActive: true
registered: 2020-02-03T06:00:03 -08:00
tags:
  - tools
  - development
language:
  - id: 0
    name: English
  - id: 1
    name: Español
  - id: 2
    name: Chinese`

export const yamlDiffExample2 = `id: 2
uuid: 3d877494-e7d4-972b-aa7a-164373a7920d
name: He3
age: 99
isActive: false
registered: 2020-02-03T06:00:03 -08:00
tags:
  - tools
  - development
language:
  - id: 0
    name: Español
  - id: 1
    name: Chinese
  - id: 2
    name: English`

export const textDiffInitData = `A Free, Modern Toolbox
    Built for Developers.
    Rich Toolsets
    200+ tools builtin with 1000 more to come. Covering use cases of formatting, parsing, converting, encoding, encrypting, hashing, etc.
    
    Productive
    Easy to use. High productivity with smart search. Quick access to tools via keyboard shortcuts. Instant feedback as you type in the tool's interface.
    
    Intelligent
    With smart detection of clipboard content, it can select the best tool and provide the result as soon as you open the app. Let it be your best companion in daily tasks.
      
    `

export const textDiffInitData2 = `A Free Toolbox
    Built for Developers.
    Rich Toolsets
    200+ tools builtin with 1000 more to come. Covering use cases of formatting, parsing, converting, encoding, encrypting, hashing, etc.
    
    Productive
    Easy to use. High productivity with intelligence search. Quick access to tools via keyboard shortcuts. Instant feedback as you type in the tool's interface.
    
    Intelligent
    With intelligence detection of clipboard content, it can select the best tool and provide the result as soon as you open the app. Let it be your best companion in daily tasks.
      
    `


export const jsonMergeExample = `{
  "id": 1,
  "uuid": "3d877494-e7d4-48e3-aa7a-164373a7920d",
  "name": "He3",
  "age": 26,
  "isActive": true,
  "registered": "2020-02-03T06:00:03 -08:00",
  "tags": [
    "tools",
    "development"
  ],
  "language": [
    {
      "id": 0,
      "name": "English"
    },
    {
      "id": 1,
      "name": "Español"
    },
    {
      "id": 2,
      "name": "Chinese"
    }
  ]
}`
export const jsonMergeExample2 = `{
  "id": 2,
  "uuid": "3d877494-e7d4-66aa-aa7a-164373a7920d",
  "name": "He3",
  "age": 36,
  "isActive": false,
  "registered": "2020-02-03T06:00:03 -08:00",
  "tags": [
    "tools",
    "development"
  ],
  "language": [
    {
      "id": 3,
      "name": "English"
    },
    {
      "id": 2,
      "name": "Español"
    },
    {
      "id": 1,
      "name": "Chinese"
    }
  ]
}`
