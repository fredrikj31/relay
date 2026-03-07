export default {
  "app/**/*": () => [
    "pnpm run app:format:check",
    "pnpm run app:lint",
    "pnpm run app:build:check",
  ],
};
