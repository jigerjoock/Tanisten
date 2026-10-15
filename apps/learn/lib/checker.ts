export interface AutomaticCheckResult {
  passed: boolean;
  message: string;
}

export function checkAnswer(answer: string, config: Record<string, unknown>): AutomaticCheckResult {
  const normalized = answer.trim();
  const minLength = typeof config.min_length === "number" ? config.min_length : 1;
  const requiredText = typeof config.contains === "string" ? config.contains.toLowerCase() : null;
  const expected = typeof config.equals === "string" ? config.equals.trim() : null;

  if (normalized.length < minLength) return { passed: false, message: `Add at least ${minLength} characters before checking.` };
  if (requiredText && !normalized.toLowerCase().includes(requiredText)) return { passed: false, message: `Your answer must include “${requiredText}”.` };
  if (expected && normalized !== expected) return { passed: false, message: "The answer does not match the expected result." };
  return { passed: true, message: "Checks passed. Exercise completed." };
}
