# Соглашения о разработке Music Utils

## Ветки

Базовая ветка — `develop`. `master` — только для деплоя.
Feature-ветки создаются от `develop` и именуются по схеме:

- `feat/<name>` — новая функциональность;
- `fix/<name>` — исправление;
- `refactor/<name>` — рефакторинг без изменения поведения;
- `chore/<name>` — инфраструктура, конфиги, зависимости;
- `docs/<name>` — документация.

После завершения ветка пушится в `origin` и вливается в `develop`.

## Коммиты (Conventional Commits)

Формат: `<type>(<scope>): <summary>`.

Типы: `feat`, `fix`, `refactor`, `chore`, `test`, `docs`, `build`, `ci`.
Примеры: `fix(note): correct octave wrap in upOnSemitones`,
`chore(vitest): replace jest with vitest`.

## Цикл работы над задачей

1. `git checkout develop && git pull && git checkout -b <type>/<name>`.
2. Реализация: минимальный сфокусированный диф, импорты вниз по слоям FSD.
3. Тесты на Vitest для изменённой логики/поведения.
4. Локальные проверки: `yarn lint`, `yarn ts`, `yarn test --run`, `yarn build`.
5. Ревью: `git diff develop...HEAD` — проверить реактивность, типы и `any`,
   edge cases (границы октав, пустые массивы), дублирование, циклические импорты.
6. Устранение замечаний и повторный прогон проверок.
7. Коммит и пуш: `git add -A && git commit -m "<type>(<scope>): <summary>"`
   и `git push -u origin <branch>`, затем merge в `develop`.

## Шаблон промта для реализации фичи

> Ветка `<type>/<name>`. Задача: <описание>. Ограничения: не менять несвязанный
> код, соблюдать текущий стиль (Prettier/ESLint), импорты вниз по слоям FSD.
> После реализации добавить тесты Vitest, покрывающие <сценарии>. Прогнать
> `yarn lint`, `yarn ts`, `yarn test --run`, `yarn build`. Затем выполнить
> `git diff develop...HEAD`, проверить диф на вероятные проблемы и устранить их.
> В конце закоммитить и запушить ветку.
