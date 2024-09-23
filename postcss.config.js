import postCssImport from 'postcss-import';
import tailwindCss from 'tailwindcss';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [postCssImport, tailwindCss, postcssPresetEnv({
    features: {},
  })],
};
