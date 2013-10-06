var objects = {}

/**
 * CacheObject
 * Cache an object
 * @param id The id of cached object
 * @param expires time to expires in milliseconds
 */
function CachedObject(id, expires){

	// Define de Last update date
	var id = id || 'obj' + Math.random();
	var debug = false;

	objects[id] = objects[id] || {};

	objects[id].expires = expires || objects[id].expires || 15000;
	objects[id].lastUpdate = objects[id].lastUpdate || new Date();

	var self = this;

	/**
	 * Show a debug message
	 */
	function show_debug(msg){
		if(debug) console.log(msg);
	}

	this.get = function(force_cache){
		// Return undefined when obj is undefined
		if(objects[id].data === undefined){
			show_debug("No cache :(");
			return objects[id].data;	
		} 

		// Force the cache
		if(force_cache !== undefined && force_cache === true){
			show_debug("Cached object " + id);
			return objects[id].data;
		}

		// Execute Async
		if((new Date() - objects[id].lastUpdate) >= objects[id].expires) 
			setTimeout(self.renew, 1);

		show_debug("Cached object " + id);
		return objects[id].data;
	}


	/**
	 * Renew the cache
	 */
	this.renew = function(fn){

		if(fn !== undefined) self.setFunction(fn);

		if(objects[id].fn !== undefined){
			show_debug("Renew cache of " + id + " at " + new Date());
			objects[id].fn(self);
			objects[id].lastUpdate = new Date();
		}
	}

	/**
	 * Clean the cache
	 * @param all 
	 */
	this.clean = function(all){
		delete objects[id].data;

		if(all !== undefined && all === true){
			delete objects[id];
		}
	}

	// Sets
	this.setFunction 	= function(value){ objects[id].fn 			= value; };
	this.setExpires 	= function(value){ objects[id].expires 		= value; };
	this.setDebug 		= function(value){ debug 					= value; };
	this.set 			= function(value){ objects[id].data 		= value; };

	// Gets
	this.getId			= function(){ return id; }
}

module.exports = CachedObject;