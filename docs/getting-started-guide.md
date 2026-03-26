# 개인 기술 위키 시작 가이드

## 이 프로젝트는 무엇인가

이 프로젝트는 개인 기술 문서를 정리하기 위한 정적 사이트입니다.

구성은 다음과 같습니다.

- `Astro`: 사이트를 실행하고 빌드하는 프레임워크
- `Starlight`: 문서형 UI, 사이드바, 검색을 제공하는 레이어
- `MDX`: Markdown처럼 글을 쓰되 필요하면 확장도 가능한 문서 포맷

쉽게 생각하면 아래처럼 나뉩니다.

- `위키`: 주제별로 정리하는 문서
- `블로그`: 날짜 기준으로 남기는 글

## 가장 중요한 폴더

### `src/content/docs/`

위키 문서를 작성하는 곳입니다.

예시:

- `src/content/docs/backend/node/cache.mdx`
- `src/content/docs/frontend/astro/content-workflow.mdx`

이 폴더에 넣은 문서는 Starlight 문서 영역에서 보여지고, 사이드바 탐색 대상이 됩니다.

### `src/content/blog/`

블로그 글을 작성하는 곳입니다.

예시:

- `src/content/blog/2026-03-25-initial-setup.mdx`
- `src/content/blog/2026-03-25-content-model-decisions.mdx`

이 폴더에 넣은 글은 `/blog/` 아래에 노출됩니다.

### `docs/`

이 폴더는 프로젝트 운영 문서를 두는 곳입니다.

예시:

- 설계 문서
- 작성 규칙
- 작업 가이드

중요한 점:

`docs/`는 게시되는 위키 문서 폴더가 아닙니다. 실제 사이트에 보이는 위키 문서는 `src/content/docs/`에 작성해야 합니다.

## Astro는 여기서 무슨 역할인가

처음에는 Astro를 복잡한 프레임워크로 생각하지 않아도 됩니다.

이 프로젝트에서 Astro는 주로 아래 일을 합니다.

- 로컬 개발 서버 실행
- 콘텐츠 파일 읽기
- 정적 HTML 생성
- URL 경로 생성

자주 쓰는 명령어:

```bash
npm run dev
ASTRO_TELEMETRY_DISABLED=1 npm run typecheck
npm run test
ASTRO_TELEMETRY_DISABLED=1 npm run build
ASTRO_TELEMETRY_DISABLED=1 npm run test:e2e
```

## Starlight는 무엇인가

Starlight는 Astro 위에서 동작하는 문서 사이트 레이어입니다.

직접 만들지 않아도 아래 기능을 제공합니다.

- 사이드바
- 문서 레이아웃
- 목차
- 검색

즉, 문서형 사이트에서 필요한 기본 UI를 대신 제공한다고 보면 됩니다.

설정은 주로 `astro.config.mjs`에서 합니다.

## MDX는 무엇인가

초보자 기준으로는 MDX를 거의 Markdown처럼 사용하면 됩니다.

처음에는 아래 정도만 써도 충분합니다.

- 제목
- 목록
- 링크
- 코드 블록
- 이미지

나중에 필요하면 컴포넌트를 문서 안에 넣을 수도 있지만, 처음에는 몰라도 전혀 문제 없습니다.

예시:

```mdx
---
title: Redis 정리
description: Redis 기초 학습 메모
tags:
  - redis
  - backend
draft: false
lastUpdated: 2026-03-25
---

## Redis란

Redis는 빠른 캐시나 키-값 저장소로 많이 사용된다.

## 메모

- 속도가 빠르다
- 캐시에 자주 사용된다
- 키 설계가 중요하다
```

## 위키 문서 추가 방법

1. `src/content/docs/` 아래에 새 `.md` 또는 `.mdx` 파일을 만든다
2. 주제에 맞는 폴더 구조에 넣는다
3. 파일 상단에 frontmatter를 작성한다
4. 본문을 작성한다
5. `npm run dev`로 실행한 뒤 브라우저에서 확인한다

예시 경로:

`src/content/docs/backend/redis/intro.mdx`

예상 URL:

`/backend/redis/intro/`

권장 frontmatter:

```mdx
---
title: Redis 입문
description: Redis를 처음 볼 때 필요한 기초 메모
tags:
  - redis
  - backend
draft: false
lastUpdated: 2026-03-25
---
```

## 블로그 글 추가 방법

1. `src/content/blog/` 아래에 새 파일을 만든다
2. 파일 이름은 보통 `YYYY-MM-DD-slug.mdx` 형식으로 만든다
3. `date`를 포함한 frontmatter를 작성한다
4. 본문을 작성한다
5. `/blog/`에서 글이 보이는지 확인한다

예시 파일:

`src/content/blog/2026-03-26-learning-redis.mdx`

권장 frontmatter:

```mdx
---
title: Redis 공부 시작
description: Redis를 처음 공부하면서 정리한 내용
date: 2026-03-26
tags:
  - redis
  - learning
draft: false
lastUpdated: 2026-03-26
---
```

## 위키와 블로그는 언제 나눠 쓰면 좋은가

위키에 쓰는 경우:

- 주제별로 오래 보관할 내용
- 나중에 다시 찾아볼 가능성이 높은 내용
- 카테고리 구조로 정리하고 싶은 내용

블로그에 쓰는 경우:

- 날짜가 중요한 글
- 학습 일지
- 작업 기록
- 회고

## Frontmatter란 무엇인가

frontmatter는 문서 맨 위의 `---` 블록입니다.

여기에는 문서 메타데이터를 넣습니다.

- `title`
- `description`
- `tags`
- `draft`
- `lastUpdated`
- 블로그 글이라면 `date`

`draft: true`로 두면 아직 공개 전 초안으로 취급할 수 있습니다.

## 내부 링크 작성 방법

일반 Markdown 링크처럼 작성하면 됩니다.

예시:

```md
[품질 게이트](/testing/quality-gates/)
[블로그](/blog/)
[아키텍처 문서](/meta/architecture-plan/)
```

## 초보자에게 추천하는 안전한 작업 순서

1. `npm run dev`로 개발 서버를 띄운다
2. `.mdx` 파일 하나만 수정한다
3. 브라우저에서 새로고침해 확인한다
4. `npm run test`를 실행한다
5. `ASTRO_TELEMETRY_DISABLED=1 npm run typecheck`를 실행한다
6. `ASTRO_TELEMETRY_DISABLED=1 npm run build`를 실행한다

라우팅이나 페이지 구조를 크게 바꿨다면 `test:e2e`도 같이 실행하는 편이 안전합니다.

## 초보자가 자주 하는 실수

- 위키 문서를 `docs/`에 넣고 왜 사이트에 안 보이는지 헷갈리는 경우
- 블로그 글에서 `date`를 빼먹는 경우
- frontmatter의 `---` 시작과 끝을 빠뜨리는 경우
- YAML 들여쓰기를 잘못 써서 파싱 오류가 나는 경우
- MDX를 너무 어렵게 생각하는 경우

## 처음에는 이렇게 시작하면 충분하다

처음에는 복잡한 기능 없이 Markdown 스타일 MDX만 사용하면 됩니다.

즉:

- 제목 쓰기
- 목록 쓰기
- 코드 블록 쓰기
- 링크 걸기

이 정도만으로도 충분히 좋은 개인 위키를 만들 수 있습니다.
