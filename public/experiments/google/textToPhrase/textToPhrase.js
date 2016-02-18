(function(){
    var dictionary = [
        "to",
        "be",
        "or",
        "not"
    ];
    var text = "tobeornottobe";
    function textToPhrase(text, dictionary) {
        var phrase = [];
        for(var i = 0; i < text.length; i++) {
            console.log(text[i]);
            for(var j = 0; j < dictionary.length; j++) {
                var k = text.indexOf(dictionary[j], i);
                if(i === k) {
                    phrase.push(dictionary[j]);
                    i += dictionary[j].length - 1;
                    console.log(phrase);
                    break;
                }
            }
        }
        phrase = phrase.join(' ');
        console.log(phrase);
    }
    textToPhrase(text, dictionary);
})();