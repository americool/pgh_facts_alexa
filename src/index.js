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
 * Array containing Trump facts.
 */
var TRUMP_FACTS = [
    "Did you know Donald Trump's last name was originally Drumph?",
    "Did you know nearly 30 years ago Vanity Fair made a joke about Donald Trump having small hands…and he’s still not over it?", 
    "Remember that time Donald Trump said he wanted to date his daughter?", 
    "He actually has vague ties to organized crime. Though, in fairness, he probably thinks that’s cool.",
    "He’s actually a terrible business man. If he had simply invested his real estate holdings and inheritance in index funds, he’d be worth 10 billion more than he is today.", 
    "He looks really stupid. I’m not sure that’s a fact, but it’s hard to argue.", 
    "He described his high level of intelligence as saying… I have the best words…seriously? What a jagoff.",
    "Lindsey Graham said that if you killed Ted Cruz on the floor of the senate, and the trial was on the floor of the senate, nobody could could convict you. However, he ended up endorsing Ted Cruz…because he wasn’t Trump.", 
    "People think Ted Cruz is the Zodiac Killer, but endorsed him over Trump. Let that one sink in.", 
    "Donald Trump used to have a brand of steaks which you could only buy at the sharper image in 2007. In 2008 the Sharper Image went bankrupt.", 
    "Trump, despite his bragging, has a huge collection of failed business ventures. Trump airlines, water, magazine, and university have all gone under.", 
    "Donald trump doesn’t drink. That’s not necessarily bad but it’s kinda scary when you realize his brain like this sober.", 
    "Trump won a film award once. Worst supporting actor. In a film where he played himself.", 
    "He thinks Taco Bowls are Mexican food.",  
    "In 1991 he would pretended to be his own publicist so he could brag about himself to journalists.", 
    "He signs letters in gold sharpie…seriously.", 
    "If you do a google search for Donald trump’s friend the first thing that comes up is Mike Tyson.", 
    "As Linsey Graham said, “he makes John Boehner look like an albino.", 
    "Did you know his IQ is one of the highest? Yeah he said that.", 
    "He has a plan to make America great again. By banning shredded cheese.", 
    "Trump has patteneded products nearly identical to several current existing ones, a Trump version of monopoly, a trump vodka, a trump travel website, and a trump lifestyle magazine. However they all failed rather quickly. Probably because they have his face on them.", 
    "Trump eat’s Pizza with a knife and fork. Enough said.", 
    "Trump orders steak well done. He’s unfit to hold any office, and certainly to have sold steaks.",
    "If Trump killed himself so his estate could collect the 100 million dollar bounty El Chapo put on him. He’d still need to die another 4 times to pay off the rest of his debt. Alas only the weird thing he wears on his head has nine lives.", 
    "President Obama pointed out that Trump could possibly succeed where he failed; in finally closing down guantanamo bay, given all his experience in running waterfront property into the ground."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * TrumpJag is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var TrumpJag = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TrumpJag.prototype = Object.create(AlexaSkill.prototype);
TrumpJag.prototype.constructor = TrumpJag;

TrumpJag.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("TrumpJag onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

TrumpJag.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TrumpJag onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
TrumpJag.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("TrumpJag onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

TrumpJag.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Trump is a Jagoff tell me about how Trum is a Jagoff, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    // Get a random Trump insult from the trump facts list
    var factIndex = Math.floor(Math.random() * TRUMP_FACTS.length);
    var fact = TRUMP_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact about how trump is a jagoff: " + fact;

    response.tellWithCard(speechOutput, "TrumpJag", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the TrumpJag skill.
    var trumpJag = new TrumpJag();
    trumpJag.execute(event, context);
};

