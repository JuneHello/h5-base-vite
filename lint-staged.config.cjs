module.exports = {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  // "{!(package)*.json,*.code-snippets,.!(browserslist|nvm)*rc}": ["prettier --write--parser json"],
  "package.json": ["prettier --write"],
  "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
  "*.{scss,less,styl,html}": ["stylelint --fix --allow-empty-input", "prettier --write"],
  "*.md": ["prettier --write"]
};
