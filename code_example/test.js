keyBreaker = /([^\[\]]+)|(\[\])/g,


module.exports = namespace.deparam = function (params, valueDeserializer) {
    //set a default value deserializer
    valueDeserializer = valueDeserializer || idenity;

    // Create an object to parse data so in this line three var created one is data
    // which is an empty object second is paris and lastPart
    var data = {}, pairs, lastPart;

    // Check if params exists and match pattern 
    if (params && paramTest.test(params)) {
        // Split the params into an an array of key-value pairs
        pairs = params.split('&');
        // Put each pair into this loop
        pairs.forEach(function (pair) {

            // Split the pair into key and value
            var parts = pair.split('='),
                key = prep(parts.shift()), // preprocess the key
                value = prep(parts.join('=')), // preprocess the value
                current = data; //reference to the current object
            
            // if key exists
            if (key) {
                // Split the key into parts using keyBreaker regex
                parts = key.match(keyBreaker);
                // Loop through each parts of the key
                for (var j = 0, l = parts.length - 1; j < l; j++) {
                    
                    var currentName = parts[j], // Current part of the key
                        nextName = parts[j + 1], // Next part of the key
                        currentIsArray = isArrayLikeName(currentName) && current instanceof Array;
                        
                    // If the current part of the key does not exist in the current object
                    if (!current[currentName]) {
                        if(currentIsArray) {
                            // If the current structre is array-like 
                            current.push( isArrayLikeName(nextName) ? [] : {} );
                        } else {
                            // If what we are pointing to looks like an `array`
                            current[currentName] = isArrayLikeName(nextName) ? [] : {};
                        }

                    }
                    // Move to the next level of the object based on the currentISArray flag
                    if(currentIsArray) {
                        current = current[current.length - 1]; // Move to the last element of the Array
                    } else {
                        current = current[currentName]; // Move to the next nested object
                    }

                }
                lastPart = parts.pop();
                if ( isArrayLikeName(lastPart) ) {
                    current.push(valueDeserializer(value));
                } else {
                    current[lastPart] = valueDeserializer(value);
                }
            }
        });
    }
    return data;
}; 
var obj = deparam(location.hash.substr(1))