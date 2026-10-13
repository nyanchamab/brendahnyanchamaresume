---
title: HelpEdge
description: A web-based IT service desk for raising, assigning and resolving support tickets, with SLAs, role-based access and reporting.
date: 2025-08-01
tags:
  - Next.js
  - React
  - FastAPI
  - Python
  - Render
  - MongoDB
  - AWS S3
featured: true
demo: https://helpedge.vercel.app
---

<!--
  Personal project built in 2025, separate from the AWS internship.
-->

## Problem

Small teams often track IT support requests in email threads and spreadsheets,
where tickets get lost, there is no clear owner, and no one can see how long
things take to resolve. I wanted a single place to raise a request, route it to
the right person, and keep an auditable record of what happened.

## Approach

I built HelpEdge as a web-based IT service desk. A requester opens a ticket;
it gets assigned and moves through a clear set of states to resolution. The
system supports:

- Role-based access so requesters, agents and admins see the right views.
- SLAs on tickets so time-to-respond and time-to-resolve are tracked.
- Reporting so the team can see volume and turnaround at a glance.

The front end is built with Next.js and React and deployed on Vercel. The
back-end is a Python/FastAPI service hosted on Render, with the data stored in
MongoDB Atlas. File and attachment storage is on Amazon S3.

## Outcome

HelpEdge is a working, deployed platform that takes a support request from
"raised" to "resolved" in one place, with clear ownership at every step. In its
current form it provides:

- **A defined ticket lifecycle:** each ticket moves through four states, Open to
  In progress to Resolved to Closed, so its status is always clear.
- **Role-based access with seven roles:** from service desk agent and technician
  up to administrator, so each person sees the views their job needs.
- **SLA tracking:** time-to-respond and time-to-resolve are tracked against each
  ticket, so urgent work is visible and nothing is quietly missed.
- **A reporting view:** the team can see ticket volume and turnaround at a glance.

Building it end to end (a Next.js front-end, a FastAPI service on Render, a
MongoDB Atlas database and S3 for file storage) taught me how the pieces of a
service desk fit together, and how much a clear ticket workflow and good
reporting help a support team stay on top of its work.
