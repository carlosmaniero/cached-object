# cached-object

Javascript Memory Cache

## Installation

    npm install cached-object

## Usage

    var CachedObject = require('cached-object');

    // Simple example
    var cache1 = new CachedObject();

    // Sets the content to be cached
    cache1.set({ name:"Cached 1" });

    // Sets the reniew function
    cache1.setFunction(function(cache){
        // this is a function very heavy
        cache.set({ name:"Cache 1 renew" });
    })

## API

### CachedObject()
Create an CachedObject object with a random id and 15000 ms to expires time.
The id cannot be modified.

    var cache = new CachedObject();

### CachedObject(id)
Create an CachedObject object with a specific id and 15000 ms to expires time.

    var cache = new CachedObject('cache1');

### CachedObject(id, expires)
Create an CachedObject object with a specific id and expires time.
    
    // Expires in 5 seconds
    var cache = new CachedObject('cache1', 5000);

### CachedObject.get()
Gets the cached object

    var cache = new CachedObject();
    var obj = cache.get();

### CachedObject.get(force_cache)
Gets the cached object without validate expiry time..

    var cache = new CachedObject();
    var obj = cache.get(true);

### CachedObject.renew()
Renews the cached object with the function passed on CachedObject.setFunction().

    cache.renew();

### CachedObject.renew()
Renews the cached object with the function passed by parameter.

    cache.renew(function(cache){
        cache.set({})
    });

### CachedObject.clean()
Cleans the cached object.

    cache.clean();

### CachedObject.clean(all)
Cleans the cached object and config options (expires time, renew function...).

    cache.clean(true);

### CachedObject.setFunction(value)
Set the renew function.

### CachedObject.setExpires(value)
Set the expires time.

### CachedObject.setDebug(value)
If true active debug message.

### CachedObject.set(value)
Set the object to be cached.

### CachedObject.getId()
Return the id of CachedObject.