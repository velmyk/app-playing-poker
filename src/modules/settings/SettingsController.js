export default class SettingsController {
    constructor(IdentityStore,
    			Upload,
    			$timeout) {
        'ngInject';

        this.currentUser = IdentityStore.get();
        this.Upload = Upload;
        this.$timeout = $timeout;
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