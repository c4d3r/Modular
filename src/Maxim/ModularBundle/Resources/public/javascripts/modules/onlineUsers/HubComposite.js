/**
 * Created by Maxim on 13/07/2014.
 */
var HubComposite = function(id, name) {
    ServerComponent.apply(this, [id, name]);
    this.servers = [];
};

HubComposite.prototype = Object.create(ServerComponent.prototype);
HubComposite.prototype.constructor = HubComposite;

HubComposite.prototype.add = function(server) {
    this.servers.push(server);
};
HubComposite.prototype.remove = function(server) {
    for(var s, i = 0; s = this.getServer(i); i++) {
        if(s == server) {
            this.servers.splice(i, 1);
            return true;
        }

        if(s.remove(server)) {
            return true;
        }
    }
    return false;
};
HubComposite.prototype.getServer = function(server) {
    return this.servers[i];
};
HubComposite.prototype.calculateOnlinePlayers = function() {
    this.players.online = 0;
    for(var key in this.servers) {
        this.players.online += this.servers[key].calculateOnlinePlayers();
    }
    return this.players.online;
};
HubComposite.prototype.calculateMaxPlayers = function() {
    this.players.max = 0;
    for(var key in this.servers) {
        this.players.max += this.servers[key].calculateMaxPlayers();
    }
    return this.players.max;
};

/*HubComposite.prototype.update = function() {

    var _self = this;

    var progressbar = _self.element.find(".progress > .progress-bar");
    var perc = _self.calculatePercentage();
    progressbar.css("width", perc + "%");
    progressbar.attr('aria-valuenow', perc);
    progressbar.find('.bar-text').text(_self.players.online  + "/" + _self.players.max);

    var title = _self.element.find(".title-text");
    title.text(_self.name);

    var status = _self.element.find(".label");

    //if(status.hasClass(this.configs["classes"]["ping"]["warning"])) {
    //status.removeClass(this.configs["classes"]["ping"]["warning"]);
    //}

    if(_self.ping == 0) {
        //status.removeClass(this.configs["classes"]["ping"]["success"]).addClass(this.configs["classes"]["ping"]["danger"]);
        //status.text(this.configs["texts"]["status"]["offline"]);
    } else {
        // status.removeClass(this.configs["classes"]["ping"]["danger"]).addClass(this.configs["classes"]["ping"]["success"]);
        status.text(Math.floor(_self.ping) + "ms");
    }
};   */