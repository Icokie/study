//-------------------------------------------------------------/
// Check if input string is palindrome (true/false)
//-------------------------------------------------------------/
function palindrome(str) {

    var source = str.match(/[a-z0-9]+/ig).join('').toLowerCase();

    var result = source.split('').reverse().join('');

    return source === result;
}
//--------- check for palindrome ends here --------------------/

//-- test block --/
console.log('string: never odd or even ; is palindrome ? : ', palindrome("never odd or even"));
console.log('string: not a palindrome ; is palindrome ? : ', palindrome("not a palindrome"));