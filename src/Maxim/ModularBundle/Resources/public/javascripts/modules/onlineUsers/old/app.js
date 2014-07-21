function App(url, configs) {
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
	this.start();
}

App.prototype.start = function() {
	var serverRepository = new ServerRepository();
	$.ajax({
        type: "POST",
        url: this.url + "/ids",
        cache: true,
        dataType: "json",
        timeout: 5000,
        context: this,
        success: function(servers) {
        	for(var i in servers) {
				if(servers[i] instanceof Array) {
					hub = new Hub(i, this.configs);
					for(var j = 0; j < servers[i].length; j++) {
						hub.addServer(new Server(j, this.configs));
					}
					serverRepository.addServer(hub);

					hub.draw(this.configs["elements"]["start"]);
				} else {
					server = new Server(servers[i], this.configs);
					serverRepository.addServer(server);
					server.draw(this.configs["elements"]["start"]);
				}
				serverRepository.retrieveData(i);
			}	
			setInterval(function(){ serverRepository.refreshAll(); }, 10000);
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