export default class SettingsController {
    constructor(IdentityStore,
    			Upload,
    			$timeout,
    			$http) {
        'ngInject';

        this.currentUser = IdentityStore.get();
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$http = $http;
        this.savedStories = [];
    }

    loadSavedStories() {
    	this.$http.get('/api/room/all')
    		.then(response => {
    			this.savedStories = response.data;
    		});
    }

    onFormSubmit() {
    	this.$http.put(`/api/user/${this.currentUser._id}`, this.input);
    }

    uploadPic(file) {
	    file.upload = this.Upload.upload({
	      url: '/api/user/updateImage',
	      data: {username: this.currentUser._id, file: file},
	    });

	    file.upload
	    	.then(
		    	response => {
			      	this.$timeout(function () {
			        	file.result = response.data;
			      	});
			    },
			    response => {
			      	if (response.status > 0)
			        	this.errorMsg = response.status + ': ' + response.data;
			    },
			    evt => {
			      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			    }
		    );
    }

};