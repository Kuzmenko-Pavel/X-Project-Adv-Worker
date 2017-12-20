/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(function () {
    return function encryptDecrypt(key, input) {
        key = key.split('');
        var output = [];

        for (var i = 0; i < input.length; i++) {
            var charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
            output.push(String.fromCharCode(charCode));
        }
        return output.join('');
    };
});