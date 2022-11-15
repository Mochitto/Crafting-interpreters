class LexerOutOfBounds extends Error {
    constructor(message) {
        super(message)
        this.name = "LexerOutOfBounds";
        }
}

class Lexer {
    constructor(text) {
        this.currentIndex = 0
        this.text = text
        this.textLength = text.length
        this.tokens = []
    }

    next() {
        if (!this.done()) {
            let char = this.text.charAt(this.currentIndex++)
            return char
        } else {
            this.throwError("No more letters to iterate through.", LexerOutOfBounds)
        }
    }

    done() {
        return (this.currentIndex >= this.textLength)
    }

    throwError(report, ErrorObject) {
        throw new ErrorObject(report)
    }

    reportError(message) {
        return `${message}\n\n${this.getErrorPosition()}\n`
    }

    getErrorPosition() {
        let errorIndex = this.currentIndex

        let lastNewLine = this.text.lastIndexOf("\n", errorIndex)
        let nextNewLine = this.text.indexOf("\n", errorIndex)
        if (nextNewLine == -1) nextNewLine = undefined // Ignore the end value

        let line = this.text.slice(0, errorIndex).split("\n").length
        let column = errorIndex - lastNewLine

        let untilBadChar = this.text.slice(lastNewLine+1, errorIndex)
        let afterBadChar = this.text.slice(errorIndex, nextNewLine)

        return (`${line};${column} | ${untilBadChar}(This caused the error ->)${afterBadChar}`)
    }
}



class Tokenizer {
    constructor() {
        this.tokens = []
    }

    scanTokens(Lexer) {
        while (!Lexer.done()) {

        }
    }
}

// const TOKENTYPES = {
//     // Punctuation
//     "LEFT_PAREN": {type: "punct", value: null, index: null},
//     "RIGHT_PAREN",
//     "LEFT_BRACE",
//     "RIGHT_BRACE",
//     "COMMA", 
//     "DOT", 

//     // Operations
//     "MINUS", 
//     "PLUS", 
//     "SEMICOLON", 
//     "SLASH", 
//     "STAR",
  
//     // One or two character tokens.
//     "BANG", 
//     'BANG_EQUAL',
//     "EQUAL", 
//     "EQUAL_EQUAL",
//     "GREATER", 
//     "GREATER_EQUAL",
//     "LESS", 
//     "LESS_EQUAL",
  
//     // Literals.
//     "IDENTIFIER", 
//     "STRING", 
//     "NUMBER",
  
//     // Keywords.
//     "AND", 
//     "CLASS", 
//     "ELSE", 
//     "FALSE", 
//     "FUN", 
//     "FOR", 
//     "IF", 
//     "NIL", 
//     "OR",
//     "PRINT", 
//     "RETURN", 
//     "SUPER", 
//     "THIS", 
//     "TRUE", 
//     "VAR", 
//     "WHILE",
  
//     "EOF"}


let myLexer = new Lexer("This is")

for (let i = 0; i < 2; i++) {
    console.log(myLexer.next())}
myLexer.throwError(myLexer.getErrorPosition(), LexerOutOfBounds)