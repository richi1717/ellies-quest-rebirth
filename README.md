<h2>Ellie's Quest Rebirth</h2>

<p>This is a redo of my final project for Rockit Bootcamp where I made a final fantasy like turn based rpg with javascript and backbone.  I decided to rewrite this with React and Redux.  Feel free to clone, fork, hit me up, or do some pull requests.  I want to do this and then actually turn this into a nice working game:)</p>

### Play

Now it's still in development and needs a lot of work but if you want to check out the progress, go [here]('https://still-mesa-66853.herokuapp.com/') to see what I have so far.  Will be fixing the issues with items not working and I've noticed a few bugs.  Another thing I will put in place soon is url parameters that change the location of the battles during development.  Any thoughts or feedback would be nice.  If anyone out there reading this is an artist or designer and wants to make some 8bit-ish characters and scenery for me feel free to email me at richi1717@gmail.com.  


### Installation

I use `yarn` and if you'd like to use it too

```javascript
$ brew install yarn    // obviously using brew
```
or
```javascript
$ curl -o- -L https://yarnpkg.com/install.sh | bash   // if you don't have brew
```

Want to do everything on one line?

```javascript
$ git clone git@github.com:richi1717/ellies-quest-rebirth.git && cd ellies-quest-rebirth && yarn
```
Or Step by Step?

```javascript
$ git clone git@github.com:richi1717/ellies-quest-rebirth.git
$ cd ellies-quest-rebirth
$ yarn
```

If you do not have webpack and webpack-dev-server installed globally do it now

```javascript
$ yarn global add webpack webpack-dev-server
```

Then finally 

```javascript
$ gulp dev
```

Then go to http://localhost:8888/ in chrome (because honestly that's the only one I've tested in right now) and enjoy.

### Insight

As you can clearly tell this is a huge project.  The original that I did was poorly written as it was the first project I'd ever written by myself.  Now I've gotten a few projects done and have a much better understanding of the tools I am using.  I want to do this right and honestly have fun with it.  

At the point of writing this I have only worked on the battle scene and have hard coded certain pieces just for testing.  I've commented out the music for the battles, haven't even worked on triggering the battles, have hard coded the forest as my battle scene, and when you win the battle the only thing that happens is a div pops up with the words `You Win!!!` above the hero's head.  I also, to save time and test, have only been using the one character.  Eventually I'd like to get more characters in as well.  I know React was not created with the thought of making games and honestly I will probably never create games for a living, but it is fun.  I love React.  So if anyone can learn from this and would like to help I'd be happy to speak with you.  Hope this gets finished some day where people can play it and enjoy it as much as I have.  
