
<div>
  <img src="title.gif"  />
</div>

## Table of contents:
- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Project structure](#project-structure)
  - [Spotify folder](#spotify-folder)
  - [Storage folder](#storage-folder)
  - [Discord folder and Telegram folder](#discord-folder-and-telegram-folder)
  - [StartBot.js](#startbotjs)

## Introduction

This is a little but interesting project that can have many applications. 
If you use Spotify you will know that there is a section for the new releases where you can find all musical releases filtered by some parameters.


<div>
  <img src="new_releases_param.jpg" width="500"  />
</div>

As you can see, one of the parameters is the country, because every country has a different "new releases" section, whose contente depends on the relevance of the releases for that country.
The result is that the releases that i see from my account are relevant for Italy. The most important releases are relevant regardless of country but let's say that i wanted to see Chilean releases, it would be difficoult from Italy as they are not internationally renowned artists's releases.
<br/></br>
Therefore, this project was born to overcome this problem.

By querying the spotify open api, i can set the country of which i want the new releases. Obviously, it would be inconvenient to query the API manually, better have a bot do it for us!
<br/></br>
I choose to develop a Discord bot and a Telegram bot at once, because i think thant both the platforms are very interesting.
Let's see the project.


## Dependencies

I used JavaScript and Node.js, so be sure to have it installed on your computer. 
- [Discord.js](https://github.com/discordjs/discord.js) --> It's the Node.js module to interact with Discord Bot Api
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) --> It's the Node.js module to interact with Telegram Bot Api
- [btoa](https://www.npmjs.com/package/btoa) --> We need it to turn binary data to base64-encoded ascii
- [nodemon](https://nodemon.io/) --> Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. 
<br/></br>

You need to create a new Node.js project with: 
```
npm init
```
Then install all the dependencies on the project folder.
```
npm install discord.js
```

## Project structure

<div>
  <img src="project_folder.jpg" width="200"  />
</div>

We can see that in the project folder there are:

- discord --> contains the Discord bot

- node_modules --> contains all the installed modules

- spotify --> contains the script to fetch data from Spotify api

- storage --> contains the script to insert fetched data in the json files

- telegram --> contains the Telegram bot

- package-lock.json --> contains an exact versioned dependency tree

- startBot.js --> it's a simple script that starts both the bots
Now we can deepen the individual parts.
<br/></br>

### Spotify folder
<div>
  <img src="spotify_folder.jpg" width="150"  />
</div>

The spotify folder contains only one file "spotifyApp.js".
Check the file to read the full commented code. 
Basically the file contains a big function which in turn contains three functions:

1. getToken --> asks the Spotify api for the token (necessary to query the Spotify api), which will be provided only after sending the client Id and the secret Id, two codes that you can find in your Spotify for developers profile, after you have created a new app. 

2. getReleases --> once we have recived the token, we can begin to fetch data from Spotify api. In our case we ask for the new releases ([all documentation here](developer.spotify.com/documentation/web-api/reference/browse/get-list-new-releases/)). As we mentioned above there are some parameters we can pass. One is the country we are interested in, the other is the number of the results that we want. I setted the number to 15. For the country, we will pass the value from another function (we will see it later), therefore i setted it as a variable:

<div>
  <img src="spotify_new_releases.jpg" width="600"  />
</div>

3. getArtist --> from the second function we recive a list of releases but i want to filter them by genre (rap in my case). Unfortunately in the data recived from the secon function, we don't have the genre of the releases. To have it, we need to query the Spotify api for the third time, asking for the datas of the single artists of the releases.
To do so we need the artist id, contained in the data returned by the second function. Once we ask for the single artists, we finally have the genres of the artists.



### Storage folder

<div>
  <img src="storage_folder.jpg" width="200"  />
</div>
The storage folder contains the files in which we save the data fetched from the Spotify api (json files) and the script to read the files, check if new data are already present and if they're not add them to the files.
<br/></br>
You can check the code for more detailed comments about the script. All you have to know for now is that the function in the script will be called by the bots after they have sendt the request to the Spotify api and they have recived the datas.

### Discord folder and Telegram folder

This two folders are very similar. Basically, ther's an index file that starts the bot e calls the events files. 
The difference between the two bots is that in the Discord one we have two events (onReady and onMessage), in the Telegram one we have only onMessage event.
For this reason the two folders are slightly different. 

<div>
  <img src="discord_folder.jpg" width="200"  />
</div>

The Discord folder contains:
1. The index file
2. The events folder
3. The resolvers folder

<div>
  <img src="telegram_folder.jpg" width="200"  />
</div>

The Telegram folder contains:
1. The index file (in which we have also the onMessage event)
2. The resolvers folder

The two resolvers (helpCommand and musicCommand) are very similar in the two bots. Only a few things changes, as the method used to make the bot respond to message or the the way user messages are processed. To see the differences in depth, check the code and the comments!

As you can notice, the helpCommand and the musicCommand are so similar that might seem a little bit repetitive. As i said before, the main difference is the way in which the bot responds and we might find a way to use parameters in order to reduce the similar code and use only one helpCommand and musicCommand for both the bots.

<div>
  <img src="switch_commands.jpg" width="300"  />
</div>

Now, let's quickly see how the bot works, we'll take for example the Telegram bot.
Once we have the token, we create a new TelegramBot instance. Now we can define "onText" event.
First of all we have to choose a character (or a string) that identify the command. In telegram bot we use "/command". 
Let's suppose that the user message is "/help music", this is what it happens:
1. We store the chat Id, in order to know in which chat we have to send the response;
2. We take the input message and we split it in order to separate the first word ("help") and the other words("music" in our case, but it could be more than one word);
3. Now we can call a resolver by comparing the first word of the command and the case that we have wrote ("helpCommand" in our case);
4. Once we called the resolver, the case that matches the other words of the command ("music" in our case) is executed;
<div>
  <img src="switch_commands2.jpg" width="300"  />
</div>

The "musicCommand" resolver is a little bit more complicated: we have to call the 3 async functions of the "spotyApp", one ofther the other. The important thing is that the subsequent function can start only after having received the results of the previous function as input. 
As always, for a more detailed comment check the code.

### StartBot.js

<div>
  <img src="start_bot.jpg" width="200"  />
</div>

This is a simple script to start both the bots at the same time.

Now you con start it with:

You need to create a new Node.js project with: 
```
nodemon startBot
```
<br/></br>
That's it!
