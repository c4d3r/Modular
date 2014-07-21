/**
 * Created by Maxim on 13/07/2014.
 */
/**
 *
 * @param id
 * @param name
 * @constructor
 * @abstract
 */
var ServerComponent = function(id, name) {

    if(this.constructor === ServerComponent) {
        throw new Error("Can't instantiate abstract class");
    }

    this.id = id;
    this.name = name;
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
};

ServerComponent.prototype.calculatePercentage = function() {
    var players = this.players.online;
    var max = this.players.max;
    return max == 0 ? 0 : (players / max * 100);
};
ServerComponent.prototype.calculateOnlinePlayers = function() {
    return this.players.online;
};
ServerComponent.prototype.calculateMaxPlayers = function() {
    return this.players.max;
};
ServerComponent.prototype.reset = function() {
    var status = this.element.find(".label");
    status.removeClass().addClass("label label-danger");
    status.text(this.configs["texts"]["status"]["offline"]);
};
ServerComponent.prototype.update = function() {

    var _self = this;

    var progressbar = _self.element.find(".progress > .progress-bar");
    var perc = _self.calculatePercentage();
    progressbar.css("width", perc + "%");
    progressbar.attr('aria-valuenow', perc);
    progressbar.find('.bar-text').text(_self.calculateOnlinePlayers()  + "/" + _self.calculateMaxPlayers());

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
};

ServerComponent.prototype.draw = function(parent) {

    var _document = document;

    //<div id="server-ID"></div>
    var id1 = $('<div id="server-' + this.id + '"></div>');

    //<h5>{$server.NAME}{if $server.ONLINE }<span style="float:right;" class="label label-success">Online</span>{/if}</h5>
    var id2 = $('<h5><span class="title-text">' + this.name + '</span></h5>');

    var id3 = $('<span style="float:right;" class="label "></span>').text(Math.floor(this.ping) + "ms");
   /* if(this.ping == 0) {
        id3.removeClass(this.configs["classes"]["ping"]["success"]).addClass(this.configs["classes"]["ping"]["success"]).text(this.configs["texts"]["pinging"]);
    }  */

    var id4 = $('<div class="progress"></div>');

    //<span class="bar-text">{$server.PLAYERS} / {$server.MAXPLAYERS}</span>
    var id5 = $('<span class="bar-text"></span>').text(this.calculateOnlinePlayers() + "/" + this.calculateMaxPlayers());

    //<div class="bar" style="width: {$server.PERCENTAGE}%;"></div>
    var perc = this.calculatePercentage();
    var id6 = $('<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="' + perc + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + perc + '%;"></div>');

    id2.append(id3);
    id2.append(id3);
    id1.append(id2);
    id1.append(id4);
    id6.append(id5);
    id4.append(id6);

    $('#servers').append(id1);
   // this.configs["elements"]["start"].append(id1);

    this.element = id1;
    this.drawn = true;
};
