import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
	{
		ignores: ['node_modules/', 'dist/', 'storybook-static/', 'public/']
	},
	js.configs.recommended,
	...tsPlugin.configs['flat/recommended'],
	react.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	importPlugin.flatConfigs.recommended,
	prettierConfig,
	{
		files: ['**/*.{ts,tsx,js,jsx}'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true
				},
				sourceType: 'module'
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2022
			}
		},
		plugins: {
			prettier,
			'react-hooks': reactHooks
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json'
				},
				node: {
					extensions: ['.js', '.jsx', '.ts', '.tsx']
				}
			},
			react: {
				version: 'detect'
			},
			linkComponents: [
				'Hyperlink',
				{
					name: 'Link',
					linkAttribute: 'to'
				}
			]
		},
		rules: {
			'no-console': 1,
			'import/no-extraneous-dependencies': 0,
			'no-param-reassign': 0,
			'no-unneeded-ternary': 0,
			'arrow-body-style': 0,
			'arrow-parens': 0,
			'no-lonely-if': 0,
			'react/jsx-filename-extension': 0,
			'no-nested-ternary': 0,
			'no-irregular-whitespace': 'error',
			'no-unused-expressions': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': 1,
			'react/prop-types': 'off',
			'react/display-name': 0,
			'react/jsx-curly-brace-presence': [
				'error',
				{
					props: 'always',
					children: 'always',
					propElementValues: 'always'
				}
			],
			'react/react-in-jsx-scope': 'off',
			'import/no-named-as-default': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'prettier/prettier': 'error'
		}
	}
];
