# twitter-node-app
Sample application to return tweets using the Twitter API

##Coding conventions

### JavaScript

This project uses ESLint to enforce a given ruleset on what style of JS formatting should be used. I've used Google's ruleset as a base, with the following exceptions:

* `arrow-parens` - "as needed": This provides for easier readability and less boilerplate code
* `no-multi-spaces` - exception for variable declaration: Keeping the equals signs alligned on variable declaration makes it easier to scan initilisation at the start of a file
* `require-jsdoc` - "false": While public interfaces should be lightly documented, this is out of scope for a toy project in this case. I also strive for self-documenting code as much as possible.
* `comma-dangle` - "never": Disallow trailing commas on objects for readability
