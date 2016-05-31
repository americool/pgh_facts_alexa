/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Pittsburgh facts.
 */
var PGH_FACTS = [
    "More than 50 major films have been shot on location in the area during the past decade?",
    "Pittsburgh has the first Ferris Wheel in 1893?", 
    "Pittsburgh had the world's first commerical radio station in 1923?", 
    "Pittsburgh is home to the original polio vaccine?",
    "Pittsburgh had the first internet emoticon, the smiley, in 1982", 
    "The Big Mac, the world's most famous hamburger, was 'invented' near Pittsburgh by McDonald's franchise owner Jim Delligatti in 1967 and distributed nationally in 1968?", 
    "Pittsburgh is home to the first U.S. Public Television Station in 1954?",
    "The much beloved Fred Rogers of “Mr. Rogers’ Neighborhood” called Pittsburgh home?", 
    "Pittsburgh has an Inspector of Steps, a man who checks all 700 of the stairs making this hilly city navigable.", 
    "Pittsburghers use something called a “parking chair” to save their parking space in the street?", 
    "Pittsburgh is home to the first Ice Capades in 1940?", 
    "The Point State Park fountain is actually spewing out 6,000 gallons per minute of water from a glacial formation?", 
    "Pittsburgh is the city of bridges...446...more than anywhere else in the world? Yes. Even more than Venice.", 
    "Pittsburgh-based American Bantam Car Company developed the first Jeep?",  
    "In 1913, Pittsburgh opened the first gas station ever?", 
    "1909, Pittsburgh built the first baseball stadium, Forbes Field?", 
    "Joe Gilliam, a Pittsburgh Steeler, was the first ever African-American NFL starting quarterback?", 
    "Alcoa, a Pittsburgh-based company, created the handy pull-tab on cans in 1962?", 
    "Rosie the Riveter was born in Pittsburgh in 1942?", 
    "Pittsburgh created the first robotics insititute in 1979 at Carnegie Mellon University?", 
    "Hugh J. Ward first came up with the concept of bingo in Pittsburgh and began running the game at carnivals in the early 1920s, taking it nationwide in 1924?", 
    "Pittsburgh's long history of professional sports has produced some of the greatest athletes and legends of all time, including Kurt Angle, Roberto Clemente, Mario Lemieux, Dan Marino, Bill Mazeroski, Joe Montana, Joe Namath, Arnold Palmer, and Johnny Unitas?", 
    "Sam Isaly invented the Klondike Bar in 1929. Pittsburghers know and love Isaly’s Deli for its chipped ham and barbecue sauce, among other favorites.",
    "With six victories, the Pittsburgh Steelers have won the most Super Bowls in the NFL.", 
    "The Carnegie Museum of Art, which opened in 1895, holds the distinction of being the world’s first modern art museum?",
    "The Poison Center at Children’s Hospital of Pittsburgh created the first Mr. Yuk stickers in 1971?",
    "The Civic Arena made history, becoming the first stadium with a retractable roof, when it opened on September 18, 1961, it was created before hydrualic technology and when it's creator died, nobody knew how to fix it."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * PGHFACTS is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var pittsburgh_Facts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
pittsburgh_Facts.prototype = Object.create(AlexaSkill.prototype);
pittsburgh_Facts.prototype.constructor = pittsburgh_Facts;

pittsburgh_Facts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Pittsburgh facts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

pittsburgh_Facts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Pittsburgh facts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
pittsburgh_Facts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Pittsburgh facts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

pittsburgh_Facts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("Ask me for a fact about Pittsburgh by saying tell me a fact about pittsburgh", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random  fact from the  facts list
    var factIndex = Math.floor(Math.random() * PGH_FACTS.length);
    var fact = PGH_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Did you know that: " + fact;

    response.tellWithCard(speechOutput, "pittsburgh_Facts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the pittsburgh_Facts skill.
    var pittsburgh_facts = new pittsburgh_Facts();
    pittsburgh_facts.execute(event, context);
};

