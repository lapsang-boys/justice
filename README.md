# Justice

Emil is da bomb @ > 
Setup screen -> Display (Roll mode)

# Setup screen

die-selector [advanced]=true

number of dies		die-slider
kind of dies		die-type-slider
num dist batches 
(player names order)
modes...
reshuffle on depletion
distribution preview

# Display

Greyed out true distribution
Colored after probability in remaining distribution
	? Countdown to empty bucket

Roll history (/ per player)

## Roll mode

Roll button
Undo (mutates random, i.e the next roll will not be the same as the mistaken roll)

## Services

distributionService <- data container givet setup parametrar
configService <- setup screen basically
rollService <- seed / history

## Components

setup component
	custom die component low top
	num input component

dashboard component
	distribution component
		* staple component
			? num / fraction

roll-buttons component
	roll component
	undo component


