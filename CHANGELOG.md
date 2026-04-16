# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project adheres to Semantic Versioning.

## 0.1.0 Under development

- feat: reference Yii2 + Inertia.js + React `19` application with shadcn/ui, Tailwind CSS `v4`, Vite, Codeception, and Cloudflare Turnstile.
- chore: add `.prettierrc.json` and apply Prettier formatting to JS, CSS, and YAML files.
- chore: migrate package to `yii2-extensions` organization and raise minimum PHP requirement to `8.3`.
- fix: add `postInstall` command to `post-create-project` scripts in `composer.json`.
- docs: enhance quick start instructions in `README.md`.
- chore: skip `yiisoft/yii2` in foxy via `config.foxy.enable-packages` to avoid pulling legacy `jquery`, `jquery-pjax`, `inputmask`, `punycode`, and `yii2-pjax` assets into the merged `package.json`.
- docs: document the Vite HMR development workflow (`npm run dev` + `YII_ENV=dev ./yii serve`) in `README.md`.
- docs: document the validate-before-call contract on `ResetPasswordForm::resetPassword()`.
- fix(security): replace user-disclosing validation message in `PasswordResetRequestForm` and `ResendVerificationEmailForm` to mitigate user enumeration.
- fix: cache negative lookup in `LoginForm::getUser()` via a `userLoaded` flag to avoid a second `User::findByUsername()` DB query on repeated calls.
- fix(security): harden `request-password-reset` and `resend-verification-email` flows against email enumeration by returning a generic success response regardless of account state.
