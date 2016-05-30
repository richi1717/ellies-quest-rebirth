<h2>Machi Koro</h2>

<p>This is just some of the brainstorming ideas to get started.  I know it looks like crap and I will update this to actually explain everything properly. After that I will also put this brainstorming session into a separate .md file</p>


Roll the dice,
determine what cards get activated based on roll,
reds get dealt with first,
blues second,
greens third,
purples fourth,
check conditions for each card i.e. if during red phase I rolled a 3 and player b has a Cafe and I have money pay them 1 coin,
do a lot of if statements to check gameplay and order,
Lodash seems like a great tool for this,
Once you have buy a card of a new type it will set a new variable called "whatever type the card is" + "Own" and set it's value = 1,
then when you obtain/buy a new card of that same cardType it will increment that cardType,
if you buy the same card more than once it will do the same effect over again as many times as you have the cards
i.e. if you have 2 wheatfields it will first give you one coin then give you 1 coin for a total of 2,
every player will have a coin variable called playerACoinTotal or B or C or D or E,
the play will always go clockwise unless red cards are rolled then they are paid in reverse order until the coins run out,
i.e. if player A rolls a 3 and has 3 coins and player B has 3 Cafes and player C has 2 Cafes player C gets 2 coins and player B gets 1 coin,
if (turn && roll && condition) {pay} else {don't pay} is a sample for a green card,
if (roll && condition) {pay} else {don't pay} is a sample for a blue card,
if (turn && roll && condition) {pay} else {don't pay} is a sample for a purple card,
if (!turn && roll && condition) {pay} else {don't pay} is a sample for a red card,
if (turn && roll && condition) {owe} else {don't owe} is a sample of Bank Loan green card,

Choosing to do this in React for good practice and I have been messing with it so I understand it pretty well,
It seems like React will make this a fun project and it will be difficult but easy,
I'm going to use Firebase.com even though it seems like I cannot have a null value:( so I use empty "",
Plan on making this and then having friends test it with me then send a copy of it to the makers of machi koro,
to see if they would be interested in making this into a full fledged online game.

I have put some sudo code in the game-pieces.json for the requirements of rolling.  Obviously those need to be
adjusted to match the actual gameplay.  
