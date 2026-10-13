---
title: HelpEdge
description: A web-based IT service desk for raising, assigning and resolving support tickets, with SLAs, role-based access and reporting.
date: 2025-01-01
tags:
  - Next.js
  - React
  - Vercel
  - AWS S3
featured: true
demo: https://helpedge.vercel.app
---

<!--
  Personal project built in 2025, separate from the AWS internship.
  Parts marked [TO FILL] are intentionally left blank until confirmed —
  do not publish guesses. Fill in: exact AWS compute service, back-end
  framework, database, and (if the text-classification feature ships) the
  base model and framework. Then add those to the `tags` above.
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
back-end runs on AWS, with file/attachment storage on Amazon S3.
<!-- [TO FILL] name the AWS compute service (e.g. EC2 / Lambda / Elastic Beanstalk),
     the back-end framework, and the database, then describe them in one line here. -->

## Outcome

HelpEdge is a working, deployed platform that takes a support request from
"raised" to "resolved" with ownership, SLAs and reporting in one place.
<!-- [TO FILL] add concrete, honest outcomes once you can state them: e.g.
     number of ticket states, what the reporting view shows, or anything you
     measured. Do not invent testimonials or usage numbers. -->
