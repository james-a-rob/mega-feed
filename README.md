# MegaFeed

![MegaFeed demo](https://gcdn.pbrd.co/images/dHvc2dMBjMXe.gif)

A web app that aggregates all the most important message from across digital tools.

Receive messages in real time from a multitude of different services. Supports advanced search and deep linking back into apps.

Digital tools meaning things like Slack, Github and Figma.

Events meaning "A designer has just updated the latest IOS app mockups".

## Dependancies

MegaFeed requires Loophole in order for the local client to securely listen from incoming events.

See instructions [here](https://loophole.cloud/download).

Loophole will need adding to an executable path.

## Installation

To install the app just clone this repo and run `npm install`.

## Running

Simple run `npm run start`

Navigate to http://localhost:3000

## Setup

When MegaFeed starts it will print a url for each service supported. In order to receive events you need to add the relevant url to the Webhook configuration of each service. See doc links below:

- [Github](https://docs.github.com/en/developers/webhooks-and-events/webhooks/creating-webhooks#setting-up-a-webhook)
- [Slack](https://api.slack.com/apis/connections/events-api#the-events-api__subscribing-to-event-types)
- [Figma](https://www.figma.com/developers/api#webhooks-v2-post-endpoint)

### Example Setup (Github)

TODO

### Currently Supported Services

- Github
- Slack
- Figma

### Adding Additional Services

MegaFeed has been designed from the ground up to be easy to extend.
If you know a bit of JavaScript and understand Webhooks then you will be able to build new service support for MegaFeed.

See src/services directory for examples of service (Github, Slack) integration.

Each service just requires developers to write a parser function, an authenticate function and a respond function.
