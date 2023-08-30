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