# 인터넷기초[04]과제2 - 나만의 인공지능 서비스 백엔드
menuAI api

## 개요

- '오늘의 메뉴 추천' 서비스(https://github.com/ryuryuryuk/menuAI)를 위한 LLM 호출 API
- 프론트엔드의 요청을 받아서 Gemini API를 호출하고, LLM 답변 생성이 완료되면 그 결과를 다시 프론트엔드 쪽으로 응답함.


## 기술 스택
- Node.js (Es module 기반)
- Google Generative AI API (Gemini 2.0 Flash)
- Vercel Serverless Function (배포환경)
- JSON 기반 POST 요청 처리

  

## 참고
- https://ai.google.dev/gemini-api/prompts?hl=ko
- https://ai.google.dev/gemini-api/docs/prompting-strategies?hl=ko
