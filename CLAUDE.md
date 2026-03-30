# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # 개발 서버 실행 (http://localhost:4321)
npm run build        # 정적 사이트 빌드
npm run preview      # 빌드 결과 미리보기
npm run typecheck    # TypeScript 타입 체크 (astro check)
npm run test         # 단위 테스트 실행 (vitest)
npm run test:e2e     # E2E 테스트 실행 (playwright)
```

## 아키텍처

Astro + Starlight 기반 개인 위키. 정적 사이트로 [GitHub Pages](https://actionsoverwords.github.io)에 배포

### 콘텐츠 구조

문서는 `src/content/docs/` 아래 MDX 파일로 관리된다. 사이드바는 `astro.config.mjs`의 `sidebar` 배열에서 디렉토리 자동생성(`autogenerate`) 또는 slug 직접 지정으로 구성한다.

현재 사이드바 섹션:
- `java-kotlin/`, `spring/`, `jpa/`, `docker/`, `messaging/` — 기술 문서 (autogenerate)
- `help/` — 위키 작성 안내 (slug 직접 지정)

새 카테고리 추가 시 `src/content/docs/`에 디렉토리를 만들고 `astro.config.mjs`의 `sidebar`에 항목을 추가해야 한다.

### MDX frontmatter

`src/content.config.ts`에서 Starlight 기본 스키마를 확장하여 `tags` 필드(선택)를 추가한다:

```yaml
---
title: 문서 제목
description: 설명
tags:
  - 태그명
sidebar:
  order: 1       # 선택: 낮을수록 위에 표시
  hidden: true   # 선택: 사이드바에서 숨김
---
```

### 커스텀 컴포넌트

- `src/components/starlight/Header.astro` — Starlight Header 오버라이드. Wiki/Tags 상단 내비게이션과 도움말 드롭다운 메뉴 포함.
- `src/components/mdx/NoticeBox.astro` — MDX에서 `import`하여 사용하는 커스텀 박스 컴포넌트 (`tone`: `info` | `warning` | `success`).
- `src/pages/tags.astro` — 모든 문서의 `tags` frontmatter를 수집하여 태그별 목록 페이지 렌더링.

### Starlight 내장 컴포넌트

MDX에서 `@astrojs/starlight/components`로 import하여 사용 가능: `Aside`, `Steps`, `Tabs`, `TabItem`, `Card`, `CardGrid`, `Badge`, `Icon`, `LinkCard` 등.
