class ConvertationHelper {
	static toDto(str) {
  		return '<' + ConvertationHelper.capitalizeFirstLetter(str) + '>k__BackingField';
	}

	static fromDto(str) {
		return ConvertationHelper.uncapitalizeFirstLetter(/[^<>]+/.exec(str)[0]);
	}

  	static uncapitalizeFirstLetter(str) {
    	return str.charAt(0).toLowerCase() + str.slice(1);
    }
  
    static capitalizeFirstLetter(str) {
    	return str.charAt(0).toUpperCase() + str.slice(1);
	}

	static generateMapToDto(obj){
    	var objMap = {};
    	Object.keys(obj).forEach(function(item, index, arr) {
      		objMap[item] = ConvertationHelper.toDto(item);
    	});
		return objMap;
	}

	static generateMapFromDto(obj){
    	var objMap = {};
    	Object.keys(obj).forEach(function(item, index, arr) {
      		objMap[item] = ConvertationHelper.fromDto(item);
    	});
		return objMap;
	}

	static mapToDto(obj) {
    	var map = ConvertationHelper.generateMapToDto(obj);
    	return Object.keys(map).reduce(function(accum, key) {
			const value = obj[key];
			if (typeof value === 'function')
				throw Error('function cannot be transformed to the REST format in a DTO object');
			if (value instanceof Array) {
				accum[map[key]] = value.map(function (val) {
					return ConvertationHelper.mapToDto(val);
				});
				return accum;
			}
			if (typeof value === 'object')
            	if (value != null)
				return ConvertationHelper.generateMapToDto(value);
			accum[map[key]] = value;
			return accum;
		}, {});
  	}

  	static mapFromDto(obj) {
    	var map = ConvertationHelper.generateMapFromDto(obj);
    	return Object.keys(map).reduce(function(accum, key) {
			const value = obj[key];
			if (typeof value === 'function')
				throw Error('function cannot be transformed to the REST format in a DTO object');
			if (value instanceof Array) {
				accum[map[key]] = value.map(function (val) {
					return ConvertationHelper.mapFromDto(val);
				});
				return accum;
			}
			if (typeof value === 'object')
            	if (value != null)
					return ConvertationHelper.generateMapFromDto(value);
			accum[map[key]] = value;
          
			return accum;
		}, {});
  	}
}