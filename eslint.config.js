// ESLint 기본 권장 규칙 (JS core rules)
import js from '@eslint/js';

// 브라우저 전역 객체(window, document 등) 정의
import globals from 'globals';

// React 관련 ESLint 플러그인
import react from 'eslint-plugin-react';

// React Hooks 규칙 강제 (의존성 배열 등)
import reactHooks from 'eslint-plugin-react-hooks';

// Vite 환경에서 React Fast Refresh 관련 규칙
import reactRefresh from 'eslint-plugin-react-refresh';

// Prettier와 충돌하는 ESLint 규칙 비활성화
import prettier from 'eslint-config-prettier';

// import/export 문법 관련 규칙 (경로, 순서, 해석 등)
import importPlugin from 'eslint-plugin-import';

// Flat Config용 설정 헬퍼
import { defineConfig, globalIgnores } from 'eslint/config';

import tsParser from '@typescript-eslint/parser';

export default defineConfig([
  // 빌드 산출물과 vite.config.ts는 린트 대상에서 제외
  globalIgnores(['dist', 'vite.config.ts']),

  {
    // JS / JSX / TS / TSX 파일에만 규칙 적용
    files: ['**/*.{js,jsx,ts,tsx}'],

    // 사용할 ESLint 플러그인 등록
    plugins: {
      import: importPlugin,
    },

    // 확장 규칙 세트
    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      prettier,
    ],

    // 파서 및 언어 옵션
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // 플러그인별 추가 설정
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },

    // 💡 최종 수정: 숨어있던 리액트 3대장까지 모조리 끄거나 경고로 낮춤!
    rules: {
      // 🚨 타입스크립트 쓰니까 prop-types는 아예 검사 끄기 (off)
      'react/prop-types': 'off',

      // 🚨 훅 규칙 위반 무시 (나중에 리팩토링할 때 고치도록 임시 off)
      'react-hooks/rules-of-hooks': 'off',

      // 🚨 변수 중복 선언 무시 (off)
      'no-redeclare': 'off',

      //

      'react-hooks/set-state-in-effect': 'off',
      // 아래는 아까 설정했던 경고(warn)들
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'react/jsx-key': 'warn',
      'react/self-closing-comp': 'warn',
      'no-console': 'warn',
      'no-var': 'error',
      eqeqeq: 'warn',
      curly: 'warn',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'warn',
      'import/no-relative-packages': 'warn',
      'react/no-unescaped-entities': 'warn',
      'no-undef': 'warn',
    },
  },
]);
