# simple-commit-check

Warn on bad pull request titles (too short, WIP, missing conventional type).

## Usage

```yaml
name: Simple Commit Check
on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  simple-commit-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: dmytropaduchak/simple-commit-check@v0.1.0
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Inputs

| Input | Default | Description |
| --- | --- | --- |
| `github-token` | `${{ github.token }}` | Token for PR API + sticky comment |
| `fail-on` | `none` | `none` / `medium` / `high` |

## Develop

```bash
npm install && npm run build
```
