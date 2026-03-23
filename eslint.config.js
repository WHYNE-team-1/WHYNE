// ESLint 기본 권장 규칙 (JS core rules)
import js from "@eslint/js";

// 브라우저 전역 객체(window, document 등) 정의
import globals from "globals";

// React 관련 ESLint 플러그인
import react from "eslint-plugin-react";

// React Hooks 규칙 강제 (의존성 배열 등)
import reactHooks from "eslint-plugin-react-hooks";

// Vite 환경에서 React Fast Refresh 관련 규칙
import reactRefresh from "eslint-plugin-react-refresh";

// Prettier와 충돌하는 ESLint 규칙 비활성화
import prettier from "eslint-config-prettier";

// import/export 문법 관련 규칙 (경로, 순서, 해석 등)
import importPlugin from "eslint-plugin-import";

// Flat Config용 설정 헬퍼
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // 빌드 산출물은 린트 대상에서 제외
  globalIgnores(["dist"]),

  {
    // JS / JSX 파일에만 규칙 적용
    files: ["**/*.{js,jsx}"],

    // 사용할 ESLint 플러그인 등록
    plugins: {
      import: importPlugin,
    },

    // 확장 규칙 세트
    extends: [
      js.configs.recommended, // 기본 JS 권장 규칙
      react.configs.flat.recommended, // React 권장 규칙
      reactHooks.configs.flat.recommended, // React Hooks 권장 규칙
      reactRefresh.configs.vite, // Vite + Fast Refresh 대응
      prettier, // Prettier와 충돌 제거
    ],

    // 파서 및 언어 옵션
    languageOptions: {
      ecmaVersion: 2020, // ES2020 문법까지 허용
      globals: globals.browser, // browser 전역 변수 허용
      parserOptions: {
        ecmaVersion: "latest", // 최신 ECMAScript 문법
        ecmaFeatures: { jsx: true }, // JSX 사용
        sourceType: "module", // ES Module 사용
      },
    },

    // 플러그인별 추가 설정
    settings: {
      // React 버전을 자동 감지
      react: { version: "detect" },

      // import 경로 해석 설정
      "import/resolver": {
        alias: {
          // @/xxx → src/xxx
          map: [["@", "./src"]],
          extensions: [".js", ".jsx"],
        },
      },
    },

    // 커스텀 룰 정의
    rules: {
      // 사용하지 않는 변수 에러 (단, _로 시작하면 허용)
      "no-unused-vars": ["error", { varsIgnorePattern: "^_" }],

      // 리스트 렌더링 시 key 필수
      "react/jsx-key": "error",

      // self-closing 가능한 컴포넌트는 닫아쓰기 권장
      "react/self-closing-comp": "warn",

      // console.log는 경고
      "no-console": "warn",

      // var 사용 금지 (let/const 강제)
      "no-var": "error",

      // == 대신 === 강제
      eqeqeq: "error",

      // 중괄호 강제 (if, for 등)
      curly: "error",

      // React 17+ JSX 자동 변환 대응
      "react/react-in-jsx-scope": "off",

      // import 경로 해석 실패 시 에러
      "import/no-unresolved": "error",

      // 패키지 내부 상대경로 import 경고
      "import/no-relative-packages": "warn",
    },
  },
]);
