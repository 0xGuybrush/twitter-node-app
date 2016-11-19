# Twitter/Node toy application

##Overview
A sample application to return tweets using the Twitter API â it will return the latest tweets for an arbitrary user, as defined by a URI parameter and display them in a responsive webpage.

###Focus
Given a limited amount of time, I focused my efforts on the JavaScript driving the logic of the application â aiming to ensure I was producing modular, testable, scalable JavaScript to support the application. 

I also aimed to architect the application with basic security, scalabity and performance in mind, e.g. 

* using user-input in a limited fashion to avoid potential security issues
* not introducing additional JavaScript on the front-end, where it wasn't necessary for the scope of the project
* ensuring that content was structured in a way to give it a cacheable URL

###Still to do
Given more time, I would have liked to:

* Add test coverage metrics for unit and integration tests
* Refine the presentation of the Tweet data, e.g. by:
	* cross-linking hashtags and links within the text of the tweet
	* displaying more user-info on the page itself, such as a profile photo
	* tidying the format of the timestamp output
* Reduce duplication in the Handlebars templates by using more partials
* Offering a way to pull additional tweets, further down a user's timeline via an AJAX call
* Supporting general search-terms or hashtags in the URI parameter format.
* Turn on caching for the Handlebar templates generated and offer a safe way for these to be invalidated
* Integrate minification of the assets into the build.
* 
##Installation and set-up

###Pre-requisites
This application runs on Node.js and uses it's package manager to pull in its dependencies. It was built and tested with Node `v7.1.0` and npm version `3.10.9`, but it's assumed to work with any version of Node supporting ECMAScript 2015.

**You should have:**

* Node installed
* Node package manager (npm) installed
* An internet connection to pull down dependencies
* A Developer account on Twitter to create an API key and associated tokens.

###Installation and Set-up
 1. Check out the code using `git clone`.
 2. Run `npm install` to pull in the required dependencies.

####Getting Twitter application keys:

  1. Create or log-in to your Twitter account and go to the [Application dashboard](https://apps.twitter.com/) in the Developer portal and choose "Create new app".
  2. Fill in the relevant details and choose "Create your Twitter application".
  3. Once your on your application page, look under **Application Settings**, and choose "Manage keys and access tokens".
  4. Note down the "Consumer Key", "Consumer Secret", "Access Token" and "Access Token Secret".

####Setting up your environment
#####**Exporting environment variables**
The above twitter keys need to be exported as environment variables before starting the application, as follows:

```
export TWITTER_CONSUMER_KEY=${your_consumer_key}
export TWITTER_CONSUMER_SECRET=${your_consumer_secret}
export TWITTER_ACCESS_TOKEN_KEY=${your_access_token}
 export TWITTER_ACCESS_TOKEN_SECRET=${your_access_token_secret}
 #You can also optionally export the port that Express will run on. This will default to 5000 if not set.
 #export PORT=1234
```

####Running the Node application

To run the application, simply run `npm start`. This will:

* run the test suite
* lint the JavaScript and SASS files
* clean the previously compiled SASS files and generate a new CSS file
* start the application.

Other commands, for running these steps on their own, can be found in the `package.json` file.

####Trouble-shooting:

If you get an error for *"Bad authentication data"* in the console, this is related to your Twitter credentials. Ensure that they are exported in the current Terminal shell from which you're running the app.

###Coding conventions used

####CSS

* The site doesn't use a grid framework as it has a simple UI

#### JavaScript

This project uses ESLint to enforce a given ruleset on what style of JS formatting should be used. I've used Google's ruleset as a base, with the following exceptions:

* `arrow-parens` - "as needed": This provides for easier readability and less boilerplate code
* `no-multi-spaces` - exception for variable declaration: Keeping the equals signs alligned on variable declaration makes it easier to scan initilisation at the start of a file
* `require-jsdoc` - "false": While public interfaces should be lightly documented, this is out of scope for a toy project in this case. I also strive for self-documenting code as much as possible.
* `comma-dangle` - "never": Disallow trailing commas on objects for readability
###Frameworks and libraries
This project makes use of:

* **Express:** For the Application Server itself
* **Express-Handlebars:** As a middleware, to provide page rendering
* **Twitter npm module**: to provide a restful client for the Twitter API
* **ESLint/SASS-Lint:** for static code analysis
* **Mocha/Supertest**: for unit and integration testing 
* **Node-SASS:** for CSS pre-compilation
