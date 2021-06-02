---
description: Telegram Notification Service
---

# Alerting

## Community alert channels

To listen for update announcements, join the following channels: 
* Telegram **THORNode Announcements** [https://t.me/thornode_ann](https://t.me/thornode_ann)
* Discord **THORChain Community Devs** [https://discord.gg/kvZhpEtHAw](https://discord.gg/kvZhpEtHAw) especially #thornode-mccn

{% hint style="info" %}
Be sure to use a pseudonym in order to prevent doxxing yourself. Node operators should remain anonymous for the health of the network and your personal/node security. 
{% endhint %}

## thornode-telegram-bot ⚡🤖

A telegram bot to monitor the status of THORNodes. 

{% hint style="info" %}
This bot can be run in a self-sovereign manner \(a personal bot that you run that does not collect any information about you\) or by using the block42 bot: [https://t.me/thornode\_bot](https://t.me/thornode_bot) on telegram. 

If you have questions feel free to open a github issue or contact Block42 in their Telegram Channel [https://t.me/block42\_crypto](https://t.me/block42_crypto)

[https://github.com/block42-blockchain-company/thornode-telegram-bot](https://github.com/block42-blockchain-company/thornode-telegram-bot)
{% endhint %}

### Requirements

* Telegram
* Docker \(if you want to run with docker or docker-compose\)
* Docker Compose \(if you want to run with docker-compose\)
* Python3 \(if you want to run without docker\)

### Quickstart

Open `variables.env` file and set

* `TELEGRAM_BOT_TOKEN` to your Telegram Bot Token obtained from BotFather.
* `THORCHAIN_NODE_IP` to any THORNode IP you want to monitor \(or `localhost`\). Leave it empty or remove it to use testnet seed Node IPs.
* `BINANCE_NODE_IP` to any Binance Node IP you want to monitor \(or `localhost`\). Leave it empty or remove it to not monitor a Binance Node.
* `ADMIN_USER_IDS` to a list of Telegram User IDs that are permissioned to access the Admin Area.

Install `docker` and `docker-compose` and run:

```text
docker-compose up -d
```

### Steps to run everything yourself

### [Install dependencies](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#install-dependencies)

Install all required dependencies via: `pip install -r requirements.txt`

### [Create Telegram bot token via BotFather](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#create-telegram-bot-token-via-botfather)

Start a Telegram chat with [BotFather](https://t.me/BotFather) and click `start`.

Then send `/newbot` in the chat, and follow the given steps to create a new telegram token. Save this token, you will need it in a second.

### [Set environment variables](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#set-environment-variables)

Set the telegram bot token you just created as an environment variable: `TELEGRAM_BOT_TOKEN`

```text
export TELEGRAM_BOT_TOKEN=XXX
```

Next you can specify the IP of the Thornode that you want to watch in the `THORCHAIN_NODE_IP` environment variable.

Set it to `localhost` to listen a node on your own machine.

Leave this environment variable empty or don't even set it to use IPs of the testnet seed nodes from [https://testnet-seed.thorchain.info](https://testnet-seed.thorchain.info/).

{% hint style="info" %}
_Please note, if you leave `THORCHAIN_NODE_IP` empty, IP specific monitoring won't take effect \(no check for increasing block height, midgard API and catch up status\). Because we rotate through available testnet seed IPs, we would compare data of different nodes and send incorrect alerts._
{% endhint %}

```text
export THORCHAIN_NODE_IP=3.228.22.197
```

If you have a Binance Node IP that you want to monitor, you can set `BINANCE_NODE_IP` to this IP. Set it to `localhost` if the Binance Node runs on the same machine as the Telegram Bot.

Leave this environment variable empty or don't even set it to not do any Binance Node monitoring.

```text
export BINANCE_NODE_IP=3.228.22.197
```

Next set Telegram User IDs that are permissioned to access the Admin Area in the `ADMIN_USER_IDS` environment variable. Leave the default dummy values if you do not intend to use the Admin Area.

To find out your Telegram, open your Telegram Client, and search for the Telegram Bot `@userinfobot`. Ensure that this is a Bot and not a Channel and has exactly the handle `@userinfobot`, as there are a lot of channels and bots with similar names. Start this Bot and it returns you your User ID that you need to export in `ADMIN_USER_IDS`.

If you enter multiple User IDs, make sure to separate the IDs with `,` i.e. a comma.

```text
export ADMIN_USER_IDS=12345,56789,42424
```

Finally, if you want test the Thornode Telegram Bot with data from your local machine, you need to set the debug environment variable:

```text
export DEBUG=True
```

The DEBUG flag set to True will run a local web server as a separate process. This way the telegram bot can access the local files `nodeaccounts.json` und `status.json` in the `test/` folder.

To test whether the bot actually notifies you about changes, the data the bot is querying needs to change. You can simulate that by manually editing `test/nodeaccounts.json`, `test/status.json` and `test/midgard.json`.

Furthermore in DEBUG mode a separate process runs `increase_block_height.py` which artificially increases the block height so that there are no notifications that the block height got stuck.

If you are using a Jetbrains IDE \(e.g. Pycharm\), you can set these environment variables for your run configuration which is very convenient for development \(see: [https://stackoverflow.com/questions/42708389/how-to-set-environment-variables-in-pycharm](https://stackoverflow.com/questions/42708389/how-to-set-environment-variables-in-pycharm)\).

### [Start the bot](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#start-the-bot)

Start the bot via:

```text
python3 thornode_bot.py
```

Make sure that you see a message in the console which indicates that the bot is running.

### [Run and test the bot](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#run-and-test-the-bot)

When you created the telegram bot token via BotFather, you gave your bot a certain name \(e.g. `thornode_bot`\). Now search for this name in Telegram, open the chat and hit start!

At this point, you can play with the bot, see what it does and check that everything works fine!

The bot persistents all data, which means it stores its chat data in the file `storage/session.data`. Once you stop and restart the bot, everything should continue as if the bot was never stopped.

If you want to reset your bot's data, simply delete the file `session.data` in the `storage` directory before startup.

### [Production](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#production)

In production you do not want to use mock data from the local endpoint but real network data. To get real data just set `DEBUG=False` and all other environment variables as described in the 'Set environment variables' section. If you're using docker-compose to run this Bot, modify the existing variables in `variables.env` file \(No need to set DEBUG as there's no DEBUG mode in the docker version\).

#### [Docker Standalone](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#docker-standalone)

To run the bot as a docker container, make sure you have docker installed \(see: [https://docs.docker.com/get-docker](https://docs.docker.com/get-docker)\).

Navigate to the root directory of this repository and execute the following commands:

Build the docker image as described in the `Dockerfile`:

```text
docker build -t thornode-bot .
```

To make the bot's data persistent, you need to create a docker volume. If the bot crashes or restarts the volume won't be affected and keeps all the session data:

```text
docker volume create thornode-bot-volume
```

Finally run the docker container:

```text
docker run --env TELEGRAM_BOT_TOKEN=XXX --env THORCHAIN_NODE_IP=XXX --env BINANCE_NODE_IP=XXX -v /var/run/docker.sock:/var/run/docker.sock --mount source=thornode-bot-volume,target=/storage thornode-bot
```

Set the `--env TELEGRAM_BOT_TOKEN` flag to your telegram bot token.

Set the `--env THORCHAIN_NODE_IP` flag to an IP of a running THORNode, or to `localhost` if the THORNode runs on the same machine as the Telegram Bot. If you don't know any IP leave this empty i.e. `--env THORCHAIN_NODE_IP=` or remove it completely - then the Telegram Bot works with testnet seed node IPs from [https://testnet-seed.thorchain.info](https://testnet-seed.thorchain.info/).

Set the `--env BINANCE_NODE_IP` flag to an IP of a running Binance Node, or to `localhost` if Telegram Bot and Binance Node run on the same machine. Leave this empty i.e. `--env BINANCE_NODE_IP=` or remove it to not do any Binance monitoring.

The `-v` argument passes the dockersocket to the container so that we can restart docker containers from inside the Telegram Bot.

Finally, the `--mount` flag tells docker to mount our previously created volume in the directory `storage`. This is the directory where your bot saves and retrieves the `session.data` file.

{% hint style="info" %}
_Please note that as docker is intended for production, there is not the possibility for the `DEBUG` mode when using docker._
{% endhint %}

**Healthcheck**

There is a health check in the Dockerfile that runs the `healthcheck.py` file. The script assures that `thornode_bot.py` is periodically updating the `health.check` file.

If the docker health check fails, the docker container is marked as "unhealthy". However, when using docker standalone \(without docker compose or docker swarm\) this doesn't do anything. To restart unhealthy containers, we have to use the autoheal image [https://hub.docker.com/r/willfarrell/autoheal/](https://hub.docker.com/r/willfarrell/autoheal/) .

To make sure a potentially unhealthy thorbot\_node container is restarted, run the autoheal container alongside the thornode\_bot container:

```text
docker run -d --name autoheal --restart=always -v /var/run/docker.sock:/var/run/docker.sock willfarrell/autoheal
```

#### [Docker Compose](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#docker-compose)

The explained steps in the Docker Standalone section are conveniently bundled into a `docker-compose.yaml` file.

First, as before, you need to set the right values in the `variables.env` file for `TELEGRAM_BOT_TOKEN`,`THORCHAIN_NODE_IP`, `BINANCE_NODE_IP` and `ADMIN_USER_IDS`

If you don't want to spin up the official docker image from our dockerhub, open `docker-compose.yaml` and comment out the line `image: "block42blockchaincompany/thornode_bot:latest"` and comment in the line `build: .`.

Finally, start the Thornode Telegram Bot with:

```text
docker-compose up -d
```

If you have problems running 'docker-compose up' while using a VPN, try to this:

* First run in your console

```text
docker network create vpnworkaround --subnet 10.0.1.0/24
```

* Then comment in the networks configuration in `docker-compose.yaml`

```text
networks:
  default:
    external:
      name: vpnworkaround
```

* Run again in your terminal

```text
docker-compose up -d
```

This solution is taken from [https://github.com/docker/for-linux/issues/418\#issuecomment-491323611](https://github.com/docker/for-linux/issues/418#issuecomment-491323611)

### [Testing](https://github.com/block42-blockchain-company/thornode-telegram-bot/issues/new#testing)

To test the Thornode Bot, you need to impersonate your own Telegram Client programmatically.

To do that, you need to obtain your API ID and API hash by creating a telegram application that uses your user identity on [https://my.telegram.org](https://my.telegram.org/) . Simply login in with your phone number that is registered on telegram, then choose any application \(we chose Android\) and follow the steps.

Once you get access to api\_id and api\_hash, save them in the Environment variables `TELEGRAM_API_ID` and `TELEGRAM_API_HASH` respectively. Also save the name of your Telegram Bot without the preceding `@` in the `TELEGRAM_BOT_ID` environment variable \(e.g. if your bot is named `@thornode_test_bot`, save `thornode_test_bot` in `TELEGRAM_BOT_ID`\).

You also need to have set the `TELEGRAM_BOT_TOKEN` environment variable with your telegram bot token, set `ADMIN_USER_IDS` with permissioned IDs and set `DEBUG=True` as explained in previous sections. If you want to test the restarting of docker containers, do not forget to start at least one container on your system.

Keep in mind that the test always deletes the `session.data` file inside `storage/` in order to have fresh starts for every integration test. If you wish to keep your persistent data, don't run the integration test or comment out the line `os.remove("../storage/session.data")` in integration\_test.py

To run the test open the `test/` folder in your terminal and run

```text
python3 integration_test.py
```

The test should endure several minutes. Every command succeded if you see `-----ALL TESTS PASSED-----` at the end.

