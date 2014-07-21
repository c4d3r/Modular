function Server(id, configs) 
{
    this.configs = configs;
    this.id = id;
    this.name = this.configs.texts.fetching;
    this.players = {
        online: 0,
        max: 0,
        sample: []
    };
    this.version = [];
    this.favicon = null;
    this.description = null;
    this.element = null;
    this.ping = 0;
}
Server.prototype.calculatePercentage = function() {
    return this.players.max == 0 ? 0 : (this.players.online / this.players.max * 100);
}
Server.prototype.calculateOnlinePlayers = function() {
    return this.players.online;
}
Server.prototype.calculateMaxPlayers = function() {
    return this.players.max;
}
Server.prototype.reset = function() {
    var status = this.element.find(".label");
    status.removeClass().addClass("label label-danger");
    status.text(this.configs["texts"]["status"]["offline"]);
}
Server.prototype.update = function() {
    var progressbar = this.element.find(".progress .progress-bar");
    progressbar.css("width", this.calculatePercentage() + "%");
    progressbar.text(this.players.online + "/" + this.players.max);

    var title = this.element.find(".title-text");
    title.text(this.name);

    var status = this.element.find(".label");

    if(status.hasClass(this.configs["classes"]["ping"]["warning"])) {
        status.removeClass(this.configs["classes"]["ping"]["warning"]);
    }

    if(this.ping == 0) {
        status.removeClass(this.configs["classes"]["ping"]["success"]).addClass(this.configs["classes"]["ping"]["danger"]);
        status.text(this.configs["texts"]["status"]["offline"]);
    } else {
        status.removeClass(this.configs["classes"]["ping"]["danger"]).addClass(this.configs["classes"]["ping"]["success"]);
        status.text(Math.floor(this.ping) + "ms");
    }
    
}

Server.prototype.draw = function(parent) {

    var _document = document;
    
    //<div id="server-ID"></div>
    var id1 = $('<div id="server-' + this.id + '"></div>');

    //<h5>{$server.NAME}{if $server.ONLINE }<span style="float:right;" class="label label-success">Online</span>{/if}</h5>
    var id2 = $('<h5><span class="title-text">' + this.name + '</span></h5>');

    var id3 = $('<span style="float:right;" class="label ' + this.configs["classes"]["ping"]["success"] + '"></span>').text(Math.floor(this.ping) + "ms");
    if(this.ping == 0) {
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

