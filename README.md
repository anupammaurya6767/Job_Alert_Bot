# Job_Alert_Bot

JAlert Bot is a Node.js application designed to fetch and alert users about new job postings from various companies. It utilizes GitHub Actions for scheduled tasks and connects with MongoDB to store and manage job data.

## Features

- **Automated Job Updates**: Scheduled GitHub Actions workflow fetches new job postings at regular intervals.
- **MongoDB Integration**: Stores job information in a MongoDB database for persistence.
- **Notification Alerts**: Sends job alerts to an external endpoint about newly available job opportunities.
- **Company Handlers**: Supports multiple company handlers for a diverse range of job sources.
