# MDX 사용법 가이드

## MDX를 어떻게 이해하면 좋은가

초보자 기준으로 MDX는 거의 Markdown처럼 사용하면 됩니다.

즉, 처음에는 이렇게 생각하면 충분합니다.

- `.mdx` 파일은 문서를 쓰는 파일이다
- Markdown 문법으로 대부분의 글을 작성할 수 있다
- 필요할 때만 확장 기능을 쓴다

처음부터 React 컴포넌트나 복잡한 문법을 알 필요는 없습니다.

## 이 프로젝트에서 MDX를 쓰는 곳

- 위키 문서: `src/content/docs/`
- 블로그 글: `src/content/blog/`

둘 다 `.md` 또는 `.mdx`로 쓸 수 있지만, 앞으로 확장성을 생각하면 `.mdx`를 기본으로 쓰는 것이 편합니다.

## MDX 파일의 기본 구조

보통 MDX 파일은 아래 두 부분으로 구성됩니다.

1. frontmatter
2. 본문

예시:

```mdx
---
title: Redis 입문
description: Redis 기초를 정리한 메모
tags:
  - redis
  - backend
draft: false
lastUpdated: 2026-03-25
---

## Redis란

Redis는 빠른 키-값 저장소로 자주 사용된다.
```

## Frontmatter란

frontmatter는 문서 맨 위의 `---` 블록입니다.

문서의 메타데이터를 적는 영역입니다.

위키 문서에서는 보통 아래 값을 씁니다.

- `title`
- `description`
- `tags`
- `draft`
- `lastUpdated`

블로그 글에서는 여기에 `date`가 추가됩니다.

블로그 예시:

```mdx
---
title: Redis 공부 시작
description: Redis를 처음 공부하며 정리한 기록
date: 2026-03-26
tags:
  - redis
  - learning
draft: false
lastUpdated: 2026-03-26
---
```

## 제목 쓰기

Markdown과 동일하게 `#`을 사용합니다.

```md
# 큰 제목
## 중간 제목
### 작은 제목
```

주의할 점:

- 문서 안에는 보통 `#` 제목을 여러 개 두지 않는 편이 좋습니다
- 큰 구분은 `##`부터 시작해도 충분한 경우가 많습니다

## 목록 쓰기

점 목록:

```md
- 첫 번째
- 두 번째
- 세 번째
```

번호 목록:

```md
1. 첫 번째
2. 두 번째
3. 세 번째
```

## 강조 쓰기

```md
**굵게**
*기울임*
`코드처럼 보이기`
```

예시:

- 중요한 개념은 `Redis`
- 명령어는 `npm run dev`
- 파일 경로는 `src/content/docs/`

## 링크 쓰기

일반 링크:

```md
[Astro 공식 사이트](https://astro.build)
```

사이트 내부 링크:

```md
[품질 게이트](/testing/quality-gates/)
[블로그](/blog/)
[초보자 가이드](/meta/beginner-guide/)
```

내부 링크는 나중에 다시 찾아보기 쉽게 만드는 데 매우 중요합니다.

## 코드 블록 쓰기

백틱 3개를 사용합니다.

```md
````md
```bash
npm run dev
```
````

언어를 같이 적으면 하이라이팅이 됩니다.

예시:

```bash
npm run dev
```

```ts
const title = 'Hello MDX';
```

## 이미지 넣기

가장 쉬운 방법은 Markdown 이미지 문법을 그대로 쓰는 것입니다.

```md
![Redis 구조 다이어그램](/images/redis-diagram.png)
```

이 방식은 `public/` 아래에 둔 이미지를 참조할 때 적합합니다.

예를 들어 `public/images/redis-diagram.png` 파일이 있다면 위처럼 바로 연결할 수 있습니다.

이 프로젝트 문서에서는 아래 두 방식 모두 실제 렌더링 예시를 같이 보여줍니다.

조금 더 Astro 방식으로 쓰고 싶다면 import 기반으로 이미지를 사용할 수 있습니다.

```mdx
import { Image } from 'astro:assets';
import redisDiagram from '../../../assets/redis-diagram.png';

<Image src={redisDiagram} alt="Redis 구조 다이어그램" />
```

정리하면:

- 빨리 문서에 이미지만 넣고 싶다면 Markdown 방식
- 이미지 크기, 자산 관리, 최적화 흐름까지 같이 챙기고 싶다면 Astro 방식

## 문단 나누기

문단은 한 줄을 비워서 나눕니다.

잘못된 예:

```md
첫 문장
둘째 문장
```

권장 예:

```md
첫 문장

둘째 문장
```

## 위키 문서 예시

```mdx
---
title: Redis 메모
description: Redis 기초 정리
tags:
  - redis
  - backend
draft: false
lastUpdated: 2026-03-25
---

## Redis란

Redis는 메모리 기반 데이터 저장소다.

## 핵심 포인트

- 캐시에 자주 사용된다
- 속도가 빠르다
- 키 설계가 중요하다

## 관련 문서

[품질 게이트](/testing/quality-gates/)
```

## 블로그 글 예시

```mdx
---
title: Redis 첫날 공부 기록
description: Redis를 처음 보고 정리한 학습 메모
date: 2026-03-26
tags:
  - redis
  - study-log
draft: false
lastUpdated: 2026-03-26
---

오늘은 TTL과 캐시 무효화의 차이를 먼저 정리했다.

## 오늘의 핵심

- TTL은 시간 기준 만료
- 무효화는 조건 기준 제거
```

## 이 프로젝트에서 자주 쓰는 MDX 패턴

### 1. 개념 설명

개념을 짧게 정의하고, 아래에 목록으로 핵심 포인트를 적습니다.

### 2. 체크리스트

검토 항목을 목록으로 적습니다.

예시:

```md
- cold path가 정상 동작하는가
- 캐시 키는 일관적인가
- 테스트가 있는가
```

### 3. 관련 문서 연결

문서 끝에 관련 링크를 붙입니다.

예시:

```md
[블로그 보기](/blog/)
[작성 워크플로](/meta/writing-workflow/)
```

## 초보자가 자주 하는 실수

### frontmatter의 `---`를 빼먹는 경우

문서가 제대로 인식되지 않을 수 있습니다.

### YAML 들여쓰기를 틀리는 경우

예를 들어 `tags`는 아래처럼 써야 합니다.

```mdx
tags:
  - redis
  - backend
```

### 블로그 글에서 `date`를 빼먹는 경우

블로그 스키마와 맞지 않아 오류가 납니다.

### 파일을 잘못된 폴더에 넣는 경우

- 위키 문서: `src/content/docs/`
- 블로그 글: `src/content/blog/`

`docs/`에 넣으면 사이트 콘텐츠로는 보이지 않습니다.

## 처음에는 어디까지 알면 충분한가

처음에는 아래만 알면 됩니다.

- frontmatter 작성
- 제목 쓰기
- 목록 쓰기
- 링크 쓰기
- 코드 블록 쓰기

이 다섯 가지만으로도 충분히 좋은 문서를 만들 수 있습니다.

## 추천 학습 순서

1. 기존 `.mdx` 파일 하나를 열어 본다
2. 제목과 문단을 하나 수정해 본다
3. 목록 하나를 추가해 본다
4. 내부 링크를 하나 넣어 본다
5. 새 위키 문서 하나를 직접 만든다
6. 그 다음 블로그 글 하나를 만든다

## 관련 문서

- `docs/getting-started-guide.md`
- `docs/mdx-extensions-guide.md`
- `src/content/docs/meta/beginner-guide.mdx`
- `src/content/docs/meta/writing-workflow.mdx`
