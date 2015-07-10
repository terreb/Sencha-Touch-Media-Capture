Ext.define('TestCapture.controller.Main', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            'main' : 'main'
        },
        control: {
            'main button': {
                tap: 'captureVideo'
            }
        }
    },

    captureSuccess: function(mediaFiles) {
        console.log('uploading...');
        var i, len;
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            TestCapture.app.getController('Main').uploadFile(mediaFiles[i]);
        }
    },

    // Called if something bad happens.
    //
    captureError: function(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        //navigator.notification.alert(msg, null, 'Uh oh!');
        alert(msg);
        console.log('capture error: ', msg);
    },

    // A button will call this function
    //
    captureVideo: function() {
        console.log('capturing...');
        // TODO: might need to show a privacy notification that the app is going to access the camera
        if (navigator.device && navigator.device.capture) {
            // Launch device video recording application,
            // allowing user to capture up to 2 video clips
            //navigator.device.capture.captureVideo(this.captureSuccess, this.captureError, {limit: 2});
            navigator.device.capture.captureVideo(this.captureSuccess, this.captureError);
        }
    },

    // Upload files to server
    uploadFile: function(mediaFile) {
        var ft = new FileTransfer(),
            path = mediaFile.fullPath,
            name = mediaFile.name;

        ft.upload(path,
            "http://server.com/mediaupload/file_upload.php",
            function(result) {
                console.log('Upload success: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent');
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
            },
            { fileName: name });
    }
});
