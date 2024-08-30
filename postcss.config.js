import postCssImport from 'postcss-import';
import tailwindCss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [postCssImport, tailwindCss, autoprefixer],
};
