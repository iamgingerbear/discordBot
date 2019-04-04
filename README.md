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
kanna ping

translate:
translates a word or phrase into a target language.
kanna translate <language code> <phrase>

###notes:
 #### pin: <br>
  pin something to a channel<br>
  Seperate the title and message with a comma
  ```
kanna pin <title>, <text>
```

  #### pins:
  lists pins that are in the current channel<br>
  Seperate the title and message with a comma
```
kanna pins
```

  #### create:
  creates a note tied to your username.<br>
  Seperate the title and message with a comma
  ```
kanna create <title>, <note>
```

  ####edit:
  updates one of your notes<br>
  Seperate the title and message with a comma
  ```
kanna edit <title>, <updated note>
```

####read:
replies with saved note or pin
```
kanna read <pin / note> <title>
  ```

####delete:
deletes a pin or note
```
kanna delete <pin / note> <title>
  ```

####list:
lists all the titles of your notes
```
kanna list
```

####reminder:
sets a reminder for kanna to pm you at a given time
```
kanna reminder <days till reminder> <time in 00:00 format> <reminder messasge>
  ```

###voice:

####join:
joins the voice channel of the user
```
kanna join
```

####play:
plays the youtube video. Adds the video to a queue then plays it. Will join channel if not in one already.
```
kanna play <url / playlist title>
```

####playing:
replies with the title and a link to the video that is currently playing
```
kanna playing
```

####volume:
sets the volume of the current broadcast  
```
 kanna volume <0 - 200>
 ```

####queue:
adds a song or playlist to the queue
```
kanna queue <url / playlist title>
```

####skip:
skips to the next song in the queue
```
kanna skip
```

####pause:
pauses the broadcast
```
kanna pause
```

####resume:
resumes the broadcast
```
kanna resume
```

####stop:
ends the broadcast
```
kanna stop
```

####leave:
from voice channel disconnects.
```
kanna leave
```

####playlist:
kanna will add to a playlist, or create one if the title doesn't exist
```
kanna playlist <playlist title> <url>
  ```

alternatively, she can list the videos in a playlist.
```
kanna playlist <playlist title>
  ```


