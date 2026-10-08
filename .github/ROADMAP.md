# Roadmap

Планы развития Starter Kit. Порядок может меняться; принятые направления фиксируются в `decisions/`.

## Ближайшее

- [ ] Английская версия документов шаблона (выбор языка при установке) и сайта.
- [ ] Recovery drill как автоматический сценарий проверки в CI: новый агент восстанавливает контекст по образцовому проекту.
- [ ] Пример заполненного проекта (`examples/`) для демонстрации на сайте.

## Task Protocol v1 и Project Observatory

Принятое направление — [`decisions/0001-task-protocol-and-project-observatory.md`](decisions/0001-task-protocol-and-project-observatory.md):

1. Спецификация Task Protocol v1 (`SPEC → PLAN → IMPLEMENT → VERIFY → ACCEPT`).
2. Схемы состояний, переходов, хэшей и инвалидации подтверждений.
3. Безопасный формат проверок и evidence.
4. Схема `project-snapshot.json`.
5. Валидатор и сборщик snapshot.
6. Статический read-only Dashboard.

Реализация начинается только после отдельного утверждения спецификации.
