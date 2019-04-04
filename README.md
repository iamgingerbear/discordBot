# discordBot

to set up this bot for use you will need node installed.<br>
after installing the package json, edit the config.<br>

token : your bots token<br>
approvedChannels: any channels you want the bot to track, can be added using a bot command 'addChannel'<br>
admin: your discord id, you will need to add this manually<br>
googleApiProjectId : you'll need to set this up here https://cloud.google.com/<br>
dbUrl: you'll need a database https://mlab.com/ offers 500mb free, most servers shouldn't touch that<br>

## current commands:

ping:
test command to see if i am still awake
<prefix> ping

translate:
translates a word or phrase into a target language.
<prefix> translate <language code> <phrase>

### notes:
#### pin: <br>
pin something to a channel<br>
Seperate the title and message with a comma
```
<prefix> pin <title>, <text>
```

#### pins:
lists pins that are in the current channel<br>
Seperate the title and message with a comma
```
<prefix> pins
```

#### create:
creates a note tied to your username.<br>
Seperate the title and message with a comma
```
<prefix> create <title>, <note>
```

#### edit:
updates one of your notes<br>
Seperate the title and message with a comma
```
<prefix> edit <title>, <updated note>
```

#### read:
replies with saved note or pin
```
<prefix> read <pin / note> <title>
```

#### delete:
deletes a pin or note
```
<prefix> delete <pin / note> <title>
```

#### list:
lists all the titles of your notes
```
<prefix> list
```

#### reminder:
sets a reminder for kanna to pm you at a given time
```
<prefix> reminder <days till reminder> <time in 00:00 format> <reminder messasge>
  ```

### voice:

#### join:
joins the voice channel of the user
```
<prefix> join
```

#### play:
plays the youtube video. Adds the video to a queue then plays it. Will join channel if not in one already.
```
<prefix> play <url / playlist title>
```

#### playing:
replies with the title and a link to the video that is currently playing
```
<prefix> playing
```

#### volume:
sets the volume of the current broadcast  
```
 <prefix> volume <0 - 200>
 ```

#### queue:
adds a song or playlist to the queue
```
<prefix> queue <url / playlist title>
```

#### skip:
skips to the next song in the queue
```
<prefix> skip
```

#### pause:
pauses the broadcast
```
<prefix> pause
```

#### resume:
resumes the broadcast
```
<prefix> resume
```

#### stop:
ends the broadcast
```
<prefix> stop
```

#### leave:
from voice channel disconnects.
```
<prefix> leave
```

#### playlist:
the bot will add to a playlist, or create one if the title doesn't exist
```
<prefix> playlist <playlist title> <url>
  ```

alternatively, she can list the videos in a playlist.
```
<prefix> playlist <playlist title>
  ```


