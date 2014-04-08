readme.txt

Currently, XML information is only displayed on the index.html page.

The file savedgame.xml (main directory) keeps track of fastest times game was completed.
inside the <highscores> header, a <high> element is created and given the attribute of the
name of the player. Their time is placed inside the high element which contains the time
they won the game in.

The 2nd part of the savedgame.xml file is for holding a saved game to be resumed at a later time.
<gameboard> holds <rows> which each have the string of pieces represented by digits 0-4. These will
be read in, translated to a gameboard array. And allow the player to play from that point.

