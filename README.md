# ts-boilerplate

Pre-configured repo for Frontend development with my favorite tooling.

## Tooling

- `node` v22.5.1 controlled with `asdf`
- `react` v18.3.1
- `typescript` and Matt Pocock's `ts-reset`
- `classnames` to conditionally apply styling via CSS classes
- `tailwindCSS`
- PostCSS, with these plugins:
  - `postcss-import`: to inline at-import rules content
  - `tailwindcss`
  - `postcss-preset-env`: to apply plugins when CSS code is not supported based on MDN/CanIUse data and browserslist config. It includes Autoprefixer under-the-hood and adds prefixes when needed
- `browserslist`
- `vite`, configured with tsconfig-paths and browserslist config
- `vitest` for testing, including `@testing-library/react` and other packages
- `prettier` with Tailwind plugin
- `eslint` with **strict TS typed-recommended configs**, including these plugins:
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `eslint-plugin-tailwindcss`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-compat`
  - `eslint-plugin-import`
- Github Action to deploy on Fly.io

## SVG Icon Sprite

The repo is already setup to deliver a single SVG sprite, located at `assets/icons/sprite.svg`.

New icons can be wrapped with `<symbol>` tags and pasted into the sprite. Then, the `scripts/gen-icon-types.ts` script parses the icons and generates a union type at `app/components/icon/icon-types.ts` with all ids found.

This leads to a type-safe React `<Icon>` component that is performant and fully compatible with all modern browsers.
