class Log {	
	static info(src, value){
		Log.info(src + " > "+ value);
	}
	
	static info(value){
		Log.e.value += "\n"+value;	
		Log.e.scrollTop = Log.e.scrollHeight;
	}

}

Log.e = document.getElementById("logTA");
