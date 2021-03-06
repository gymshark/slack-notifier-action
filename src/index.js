/*
 * Copyright (c) 2019. Gymshark Limited. All rights Reserved.
 */

const core = require('@actions/core');
const github = require('@actions/github');
const slack = require('slack-notify')(core.getInput('webhook_url'));
const job = JSON.parse(core.getInput('job'));
const payloads = {
    "failure": {
        pretext: "Failed",
        color: "#C0392A",
        icon: ":red_circle:",
    },
    "success": {
        pretext: "Success",
        color: "#27ae60",
        icon: ":white_check_mark:",
    },
    "cancelled": {
        pretext: "Success",
        color: "#27ae60",
        icon: ":warning:",
    },
};

try {
    let payload = payloads[job.status];
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
