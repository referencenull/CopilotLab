# Copilot Instructions for CopilotLab

## Preferred Languages & Frameworks
- Prioritize TypeScript and Python for new features.
- Use React for frontend components.
- Use Express or FastAPI for backend code.

## File Structure
- Place frontend code in `src/frontend/`.
- Place backend code in `src/backend/`.
- Put shared utilities in `src/utils/`.

## Code Style
- Use 2-space indentation for JS/TS; 4 spaces for Python.
- Prefer named exports over default exports.
- Use ES6+ syntax (arrow functions, destructuring, etc.).
- Avoid using `any` in TypeScript — prefer strict types.

## Testing
- Write tests in `__tests__/` using Jest (JS/TS) and pytest (Python).
- Include at least one test per new module.

## Documentation
- Document functions with JSDoc (JS/TS) or docstrings (Python).
- Update `/docs` with significant changes.

## Comments & TODOs
- Use `// TODO:` for unfinished features.
- Prefer short, clear inline comments.

## Patterns to Avoid
- Do not use deprecated APIs.
- Avoid using global variables unless absolutely necessary.
- Refrain from copying large code blocks from Stack Overflow.

## Example
```typescript
/**
 * Sums two numbers.
 * @param a First number
 * @param b Second number
 * @returns Sum of a and b
 */
export function add(a: number, b: number): number {
  return a + b;
}
```

## Additional Notes
- If unsure about implementing a feature, suggest a design or ask for clarification.
- Always prioritize security best practices (e.g., sanitize user input).
