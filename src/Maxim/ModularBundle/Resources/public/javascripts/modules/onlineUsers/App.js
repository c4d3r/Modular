/**
 * Created by Maxim on 13/07/2014.
 */
var App = function(url, configs) {
    this.url = url;
    this.configs = {
        classes: {
            progress: 'progress progress-striped active',
            progressbar: 'progress-bar progress-bar-success',
            ping: {
                success: 'label-success',
                warning: 'label-warning',
                danger: 'label-danger'
            }
        },
        elements: {
            start: $('#servers')
        },
        texts: {
            fetching: "Fetching...",
            pinging: "Pinging...",
            status: {
                offline: "Offline"
            }
        }
    };
    this.serverComponents = [];
    this.data = [];
    this.isStarted = false;
    this.retrieve();
};

App.prototype.refreshAll = function() {
    this.retrieve();
};

App.prototype.start = function() {

    var hub
        , server
        , _app = this
        , _servers = this.data;

    for (var i in _servers) {

        // HUB
        if (_servers[i] instanceof Array) {
            hub = new HubComposite(i);
            for (var j = 0; j < _servers[i].length; j++) {
                hub.add(new Server(j));
            }
            _app.serverComponents.push(hub);

            hub.draw();

            // SERVER
        } else {
            server = new Server(i);
            _app.serverComponents.push(server);
            server.draw();
        }
    }

    setInterval(function () {
        _app.refreshAll();
    }, 3000);
};



App.prototype.retrieve = function() {

    $.ajax({
        type: "GET",
        url: this.url,
        dataType: "json",
        //timeout: 15000,
        context: this, //So i can access this inside callback
        success: function (data) {

            console.log(data);
            this.data = data;

            // do first call if not started
            if(!this.isStarted) {
                this.isStarted = true;
                this.start();
            }

            // parse data into components
            this.parseData();
        },
        error: function (request, status, err) {
            console.log(err);
            if (status == "timeout") {
                //console.log("Error timeout");
                //change status to offline
                //this.servers[id].reset();
            } else {
                console.log(request.responseText);
                //this.servers[id].reset();
            }
        }
    });
};
App.prototype.parseData = function() {

    //update server class
    var servers = this.data;
    var sc = this.serverComponents;

    var id;
    for(id in servers) {
        sc[id].description = servers[id]["description"];
        sc[id].version = servers[id]["version"];
        //sc[id].favicon = servers["favicon"];
        //sc[id].ping = servers["ping"];

        if (!(typeof servers[id]["players"] === 'undefined')) {
            sc[id].players = servers[id]["players"];
        }

        sc[id].name = servers[id]["name"];

        sc[id].update();

    }

    /*if (this.servers[id] instanceof Hub) {
        var hub = this.servers[id];
        var tmpServers = hub.servers;
        for (var i = 0; i < tmpServers.length; i++) {

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
    }         */
    //this.calculateTotals();
    //this.update();

};