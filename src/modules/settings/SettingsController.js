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

    uploadPic() {
	    return this.Upload.upload({
	      url: '/api/user/updateImage',
	      method: 'POST',
	      file: this.picFile,
	    })
    	.then(response => {
    		return response.data;
    	});
    }

};