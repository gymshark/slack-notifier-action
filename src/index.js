/*
 * Copyright (c) 2019. Gymshark Limited. All rights Reserved.
 */

const core = require('@actions/core');
const github = require('@actions/github');
const slack = require('slack-notify')(core.getInput('webhook_url'));
const channel = core.getInput('channel');
const job = JSON.parse(core.getInput('job'));
try {
    // Get the JSON webhook payload for the event that triggered the workflow
    let payload;

    if (job.status === 'Failure') {
        payload = {
            pretext: 'Deployment failure',
            color: '#C0392A',
            icon: ':red_circle:',
        };
    } else if (job.status === 'Success') {
        payload = {
            pretext: 'Deployment Success',
            color: '#27ae60',
            icon: ':green_circle:',
        };
    } else if (job.status === 'Cancelled') {
        payload = {
            pretext: 'Deployment Canceled',
            color: '#FEEFAB',
            icon: ':yellow_circle:',
        };
    }

    slack.send({
        icon_emoji: payload.icon,
        username: 'Github Actions',
        attachments: [
            {
                fallback: 'Required Fallback String',
                pretext: payload.pretext,
                author_name: github.context.payload.repository.full_name,
                author_link: `https://github.com/${github.context.payload.repository.full_name}/`,
                title: github.context.payload.ref,
                title_link: `https://github.com/${github.context.payload.repository.full_name}/actions`,
                text: github.context.payload.repository.description,
                color: payload.color,
                fields: [
                    { title: 'Job Status', value: job.status, short: false },
                ],
            },
        ],
    });
} catch (error) {
    core.setFailed(error.message);
}
