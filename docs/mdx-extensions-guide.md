# MDX 확장 기능 가이드

## 이 문서는 무엇을 설명하나

이 문서는 "MDX가 Markdown보다 어디까지 확장될 수 있는가"를 설명합니다.

기본 문법만으로도 대부분의 문서는 충분히 작성할 수 있습니다. 하지만 아래와 같은 상황에서는 확장 기능이 필요해질 수 있습니다.

- 같은 형식의 안내 박스를 여러 번 쓰고 싶을 때
- 특정 UI 조각을 문서 안에 넣고 싶을 때
- 단순 텍스트보다 구조화된 표현이 필요할 때

중요한 기준:

처음에는 확장 기능을 많이 쓰지 않는 편이 좋습니다. 문서 대부분은 여전히 일반 Markdown 스타일로 쓰는 것이 유지보수에 유리합니다.

## MDX가 Markdown보다 확장되는 지점

MDX는 Markdown 문서 안에서 아래 같은 것들을 사용할 수 있게 해 줍니다.

- `import` 구문
- 컴포넌트 사용
- JSX 스타일 속성 전달
- 일부 HTML 태그 직접 작성

즉, "문서"와 "UI 조각"을 한 파일 안에서 함께 다룰 수 있습니다.

## 1. import 구문

MDX에서는 파일 상단에서 무언가를 가져올 수 있습니다.

예시:

```mdx
import NoticeBox from '../../components/NoticeBox.astro';
```

이 말은 "문서 안에서 쓸 컴포넌트를 미리 가져온다"는 뜻입니다.

처음에는 이렇게 이해하면 충분합니다.

- `import`는 문서 안에서 사용할 부품을 불러오는 코드다
- 자주 반복되는 UI가 필요할 때 쓴다

## 2. 컴포넌트 사용

가져온 컴포넌트는 문서 본문 안에서 태그처럼 사용할 수 있습니다.

예시:

```mdx
import NoticeBox from '../../components/NoticeBox.astro';

<NoticeBox title="주의">
이 설정은 운영 환경에 바로 적용하기 전에 테스트가 필요합니다.
</NoticeBox>
```

이런 방식은 아래 상황에 적합합니다.

- 경고 박스
- 팁 박스
- 반복되는 카드 UI
- 공통 안내 문구

이 프로젝트에서는 실제로 [src/components/mdx/NoticeBox.astro](/Users/leehk/workspace/private/wiki-mdx/src/components/mdx/NoticeBox.astro) 같은 예시 컴포넌트를 추가했고, 게시된 문서 [mdx-extensions.mdx](/Users/leehk/workspace/private/wiki-mdx/src/content/docs/meta/mdx-extensions.mdx)에서 실제 렌더링 결과를 볼 수 있습니다.

## 3. 속성 전달

컴포넌트에 값을 넘길 수 있습니다.

예시:

```mdx
<NoticeBox title="팁" tone="info" />
```

여기서 `title`, `tone` 같은 값이 속성입니다.

초보자 기준으로는 이렇게 이해하면 됩니다.

- HTML 태그의 속성과 비슷하다
- 컴포넌트 동작이나 모양을 조절하는 값이다

## 4. HTML 태그 직접 쓰기

MDX에서는 Markdown만 쓰는 대신 HTML 태그를 섞어 쓸 수도 있습니다.

예시:

```mdx
<details>
  <summary>자세히 보기</summary>
  여기에는 접어서 숨기고 싶은 설명을 넣을 수 있습니다.
</details>
```

이 방식은 간단한 접기/펼치기처럼 Markdown만으로 표현하기 애매할 때 유용합니다.

다만 처음에는 HTML을 너무 많이 섞지 않는 편이 좋습니다.

## 5. 표현식과 동적 값

MDX는 필요하면 중괄호를 사용해 값을 표현할 수 있습니다.

예시:

```mdx
<NoticeBox title={"주의"} />
```

하지만 이 프로젝트의 현재 문서 작성 목적에서는 이런 형태를 자주 쓸 필요는 없습니다.

처음에는 문자열을 그냥 직접 적는 편이 더 단순합니다.

## 초보자에게 추천하는 사용 순서

1. 먼저 일반 Markdown처럼 쓴다
2. 같은 안내 UI가 반복되면 컴포넌트를 고민한다
3. 정말 반복이 많을 때만 import와 컴포넌트를 도입한다

즉, 확장 기능은 "처음부터 쓰는 것"이 아니라 "반복 문제가 생겼을 때 쓰는 것"에 가깝습니다.

## 언제 확장 기능을 쓰는 게 좋은가

좋은 경우:

- 경고/팁 박스를 여러 문서에서 반복해서 쓰는 경우
- 공통 카드나 배너를 재사용하고 싶은 경우
- 문서 안에 일정한 UI 패턴이 자주 등장하는 경우

좋지 않은 경우:

- 한 번만 쓸 표현을 위해 복잡한 컴포넌트를 만드는 경우
- 단순 텍스트 문서를 굳이 코드처럼 만드는 경우
- 문서 작성보다 UI 구현이 더 어려워지는 경우

## 실전 예시 1: 경고 박스

```mdx
import NoticeBox from '../../components/NoticeBox.astro';

## 운영 주의사항

<NoticeBox title="주의" tone="warning">
캐시 키 구조를 바꾸면 기존 데이터와 충돌할 수 있으므로 배포 전 검토가 필요합니다.
</NoticeBox>
```

## 실전 예시 2: 접기/펼치기

```mdx
<details>
  <summary>TTL과 무효화 차이 보기</summary>

  TTL은 시간 기준 만료이고, 무효화는 특정 조건에 따라 데이터를 지우는 것입니다.
</details>
```

게시된 페이지에서는 이 예시들이 코드만 있는 것이 아니라 실제 결과까지 함께 보이도록 구성했습니다. 브라우저에서 `/meta/mdx-extensions/`로 열면 바로 확인할 수 있습니다.

## 실전 예시 3: 반복되는 카드 대신 문서 링크

확장 기능을 쓰기 전에 먼저 링크만으로 충분한지 생각하는 편이 좋습니다.

예시:

```md
[품질 게이트](/testing/quality-gates/)
[작성 워크플로](/meta/writing-workflow/)
```

이 정도로 해결되면 굳이 컴포넌트를 만들 필요가 없습니다.

## 실전 예시 4: 탭 컴포넌트

탭 컴포넌트는 MDX 문서에서만 실제 UI로 렌더링됩니다.

예시:

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="위키">
    <p>위키 문서는 <code>src/content/docs/</code> 아래에 작성합니다.</p>
    <p>오래 보관할 주제 정리, 개념 문서, 레퍼런스 메모를 모읍니다.</p>
  </TabItem>
  <TabItem label="블로그">
    <p>블로그 글은 <code>src/content/blog/</code> 아래에 작성합니다.</p>
    <p>날짜 기반 기록, 학습 로그, 회고 메모를 남깁니다.</p>
  </TabItem>
</Tabs>
```

중요:

- 이 파일은 `docs/mdx-extensions-guide.md`이므로 저장소용 설명 문서입니다
- 그래서 위 코드는 여기서는 "실행 결과"가 아니라 예시 텍스트로만 보이는 것이 정상입니다
- 실제 렌더링 결과는 게시용 MDX 문서인 [src/content/docs/meta/mdx-extensions.mdx](/Users/leehk/workspace/private/wiki-mdx/src/content/docs/meta/mdx-extensions.mdx) 의 "예시 4: 탭 컴포넌트"에서 확인할 수 있습니다

## 현재 프로젝트 기준 권장 원칙

- 기본은 Markdown 스타일 MDX
- 확장 기능은 정말 반복되는 UI가 있을 때만
- 처음에는 `import`와 컴포넌트 사용을 서두르지 않기
- 문서가 복잡해지기 시작하면 먼저 단순한 링크와 목록으로 해결 가능한지 보기

## 초보자가 자주 헷갈리는 점

### MDX를 쓰려면 React를 알아야 하나

아닙니다. 기본 문서 작성에는 React 지식이 없어도 됩니다.

### 모든 문서를 컴포넌트 기반으로 써야 하나

그럴 필요 없습니다. 대부분의 문서는 일반 Markdown 스타일이 더 낫습니다.

### HTML을 많이 써도 되나

쓸 수는 있지만, 과하게 섞으면 문서 가독성이 떨어질 수 있습니다.

## 지금 단계에서 기억할 핵심

- MDX의 기본은 문서 작성이다
- 확장 기능은 반복되는 UI 문제를 해결할 때 쓰는 도구다
- 처음에는 최소한만 사용하는 편이 좋다

## 관련 문서

- `docs/mdx-guide.md`
- `docs/getting-started-guide.md`
- `src/content/docs/meta/mdx-guide.mdx`
