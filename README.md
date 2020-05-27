# Gymshark's Slack Notifier for Github Actions

This action will post the action status to a nominated Slack channel for your enjoyment.

## Inputs

### `webhook_url`

**Required** The Slack webhook URL to post to.

## Example usage

```
uses: actions/slack-notifier-action@v1
with:
  webhook_url: 'https://hooks.slack.com/services/ABC123/def456'
  job: ${{ toJson(job) }}
```

## Build

```bash
yarn build
```

