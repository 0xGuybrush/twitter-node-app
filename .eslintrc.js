module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "arrow-parens": ["error", "as-needed"],
        "no-multi-spaces": [
            "error",
            {
                "exceptions": { "VariableDeclarator": true }
            }
        ],
	"require-jsdoc": 0
    }
};
