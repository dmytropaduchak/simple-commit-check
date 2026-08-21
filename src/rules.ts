export type Severity = "high" | "medium" | "low";
export type Finding = {
  ruleId: string;
  severity: Severity;
  title: string;
  detail: string;
  file: string;
  line?: number;
};

const CONVENTIONAL = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!:\s.+/i;

export function scanTitle(title: string, minLength: number, requireConventional: boolean): Finding[] {
  const findings: Finding[] = [];
  const t = title.trim();
  if (t.length < minLength) {
    findings.push({
      ruleId: "title-too-short",
      severity: "medium",
      title: `PR title shorter than ${minLength} characters`,
      detail: t || "(empty)",
      file: "pull_request",
    });
  }
  if (/\b(wip|do not merge|dnd)\b/i.test(t)) {
    findings.push({
      ruleId: "title-wip",
      severity: "high",
      title: "PR title looks like WIP / do-not-merge",
      detail: t,
      file: "pull_request",
    });
  }
  if (requireConventional && t && !CONVENTIONAL.test(t)) {
    findings.push({
      ruleId: "title-conventional",
      severity: "low",
      title: "PR title is not conventional-commit style",
      detail: "Expected feat|fix|docs|…: description",
      file: "pull_request",
    });
  }
  return findings;
}
