function Hub(id, configs) {
	this.servers = [];
	this.online = 0;
	this.max = 0;	
	this.name = "Fetching...";
	this.id = id;
    this.configs = configs;
}
Hub.prototype.addServer = function(server){
	this.servers.push(server);
}
Hub.prototype.calculatePercentage = function() {	
	return this.max == 0 ? 0 : (this.online / this.max * 100);
}
Hub.prototype.calculateOnlinePlayers = function() {
	this.online = 0;

	for(var i in this.servers) {
		this.online += this.servers[i].players.online;
	}
	return this.online;
}
Hub.prototype.calculateMaxPlayers = function() {
    this.max = 0;
	for(var i in this.servers) {
		this.max += this.servers[i].players.max;
	}
	return this.max;
}
Hub.prototype.calculateTotalPing = function() {
	var totalping = 0;
	for(var i = 0; i < this.servers.length; i++) {
		totalping += parseInt(Math.ceil(this.servers[i].ping));
	}
	return Math.ceil(totalping / this.servers.length);
}
Hub.prototype.reset = function() {
    var status = this.element.find(".label");
    status.removeClass().addClass("label label-danger");
    status.text("Offline");
}
Hub.prototype.update = function() {
    var progressbar = this.element.find(".progress .progress-bar");
    progressbar.css("width", this.calculatePercentage() + "%");
    progressbar.text(this.calculateOnlinePlayers() + "/" + this.calculateMaxPlayers());

    var title = this.element.find(".title-text");
    title.text(this.name);

    var status = this.element.find(".label");

    if(status.hasClass(this.configs["classes"]["ping"]["warning"])) {
        status.removeClass(this.configs["classes"]["ping"]["warning"]);
    }

    var ping = this.calculateTotalPing();
    if(ping == 0) {
        status.removeClass(this.configs["classes"]["ping"]["success"]).addClass(this.configs["classes"]["ping"]["danger"]);
        status.text(this.configs["texts"]["status"]["offline"]);
    } else {
        status.removeClass(this.configs["classes"]["ping"]["danger"]).addClass(this.configs["classes"]["ping"]["success"]);
        status.text(ping + "ms");
    }
}

Hub.prototype.draw = function(server) {

    var _document = document;
    
    //<div id="server-ID"></div>
    var id1 = $('<div id="server-' + this.id + '"></div>');

    //<h5>{$server.NAME}{if $server.ONLINE }<span style="float:right;" class="label label-success">Online</span>{/if}</h5>
    var id2 = $('<h5><span class="title-text">' + this.name + '</span></h5>');

    var ping = this.calculateTotalPing();
    var id3 = $('<span style="float:right;" class="label ' + this.configs["classes"]["ping"]["success"] + '"></span>').text(ping + "ms");
    if(ping == 0) {
        id3.removeClass(this.configs["classes"]["ping"]["success"]).addClass(this.configs["classes"]["ping"]["success"]).text(this.configs["texts"]["pinging"]);
    }

    //<div class="progress progress-striped active">
    var id4 = $('<div class="' + this.configs["classes"]["progress"] + '"></div>');

    //<span class="bar-text">{$server.PLAYERS} / {$server.MAXPLAYERS}</span>
    var id5 = $('<span class="bar-text"></span>');

    //<div class="bar" style="width: {$server.PERCENTAGE}%;"></div>
    var id6 = $('<div class="' + this.configs["classes"]["progressbar"] + '" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: ' + this.calculatePercentage() + '%;"></div>').text(this.calculateOnlinePlayers() + "/" + this.calculateMaxPlayers());

    id2.append(id3);
    id2.append(id3);
    id1.append(id2);
    id1.append(id4);
    id4.append(id5);
    id4.append(id6);

    this.configs["elements"]["start"].append(id1);

    this.element = id1;
    this.drawn = true;
}