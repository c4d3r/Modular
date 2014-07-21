function ServerRepository()
{
	this.servers = [];
	this.totalMax = 0;
	this.totalOnline = 0;
	this.draw();
}

ServerRepository.prototype.addServer = function(server) {
	this.servers.push(server);
}
ServerRepository.prototype.retrieveData = function(id) {
	$.ajax({
        type: "POST",
        url: "index.php",
        cache: false,
        data: { id : this.servers[id].id },
        dataType: "json",
        timeout: 5000,
        context: this,
        success: function(data) {
            //update server class
            if(this.servers[id] instanceof Hub) {
            	var hub = this.servers[id];
            	var tmpServers = hub.servers;
            	for(var i = 0; i < tmpServers.length; i++) {

            		if (!(typeof data[i] === 'undefined')) { 
						var tmpServer = JSON.parse(data[i]);
            			//if error just get the name
            			if ((!(typeof tmpServer["error"] === 'undefined')) && (tmpServer["error"] == true)) {
        					hub.name = tmpServers["name"];
            			} else {
		            		
		            		tmpServers[i].description = tmpServer["description"];
				            tmpServers[i].version = tmpServer["version"];
				            tmpServers[i].favicon = tmpServer["favicon"];
				            tmpServers[i].ping = tmpServer["ping"];
				            tmpServers[i].players.online = tmpServer["players"].online;
				            tmpServers[i].players.max = tmpServer["players"]["max"];
				            tmpServers[i].ping = tmpServer["ping"];
				            tmpServers[i].count = tmpServer["count"];
				            hub.name = tmpServer["name"];
			            }
			            this.servers[id].update();
		            }
            	}
            } else {
            	if ((!(typeof data["error"] === 'undefined')) && (data["error"] == true)) {
					this.servers[id].name = data["name"];
    			} else {
	            	this.servers[id].description = data["description"];
		            this.servers[id].version = data["version"];
		            this.servers[id].favicon = data["favicon"];
		            this.servers[id].ping = data["ping"];
		            this.servers[id].players.online = data["players"]["online"];
		            this.servers[id].players.max = data["players"]["max"];
		            this.servers[id].name = data["name"];
		            this.servers[id].count = data["count"];

		            if (!(typeof data["players"]["sample"] === 'undefined')) {            
		            	this.servers[id].players.sample = data["players"]["sample"];
		            }
		        }

	            this.servers[id].update();
            }
            this.calculateTotals();
            this.update();
        },
        error: function(request, status, err) {
            if(status == "timeout") {
                //console.log("Error timeout"); 
                //change status to offline
                this.servers[id].reset();
            } else {
                console.log(request.responseText);
                this.servers[id].reset();
            }
        }
    });   
}

ServerRepository.prototype.getServers = function() {
	return this.servers;
}
ServerRepository.prototype.refresh = function(id) {
	this.retrieveData(id);
	this.calculateTotals();
	this.update();
}
ServerRepository.prototype.refreshAll = function() {
	for(var i = 0; i < this.servers.length; i++) {
		this.retrieveData(this.servers[i].id);
		this.calculateTotals();
		this.update();
	}
}
ServerRepository.prototype.update = function() {
	$('#total-online').text("Total: " + this.totalOnline);
}
ServerRepository.prototype.draw = function() {
	var container = $('<h6 id="total-online"></div>').text("Total: " + this.totalOnline);
	$('#servers').after(container);
}

ServerRepository.prototype.calculateTotals = function() {
	var totalOnline = 0;
	var totalMax = 0;

	for(var i = 0; i < this.servers.length; i++) {		
		if(this.servers[i] instanceof Hub && this.servers[i].count == true) {
			totalOnline += this.servers[i].calculateOnlinePlayers();
			totalMax += this.servers[i].calculateMaxPlayers();
		} else if(this.servers[i].count == true) {

			totalOnline += parseInt(this.servers[i].players.online);
			totalMax += parseInt(this.servers[i].players.max);
		}
	}

	this.totalOnline = totalOnline;
	this.totalMax = totalMax;
}
