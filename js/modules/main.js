!(function() {
    "use strict";

    var main = {}
    main.init = function() {


        var url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails,status&maxResults=10&playlistId=PLSi28iDfECJPJYFA4wjlF5KUucFvc0qbQ&key=AIzaSyCuv_16onZRx3qHDStC-FUp__A6si-fStw';

        var settings = {
            part: 'contentDetails',
            key: 'AIzaSyBDiG4eWXSTJZNHTHVVtzBKx976ppXAnIk',
            channelId: 'UCc1SpIDSvxrf5ofxUMyXReg',
            part: 'snippet',
            maxResults: 10,
            playlistId: ''
        }


        $.get(url, settings, function(data) {
            var output;
            $.each(data.items, function(i, item) {
                var pid = item.snippet.playlistId;
                var videoThumbnail = item.snippet.thumbnails.default.url
                var videoTitle = '<li class="videoTitle">' + item.snippet.title + '</li>'
                var videoDes = '<li class="description">' + item.snippet.description + '</li>'
                var dateAdded = '<li>' + 'Published At: ' + new Date(item.snippet.publishedAt).toDateString() + '</li>'

                var videoId = item.contentDetails.videoId

                var videoThumbnails = '<li class="thumbs" data=' + videoId + '><img height="200" width="400" src= ' + videoThumbnail + '></img></li>';


                var output = function() {
                    return '<li class="res"><iframe height="200" width="400" src=\"//www.youtube.com/embed/' + videoId + '\"></iframe></li>';
                }

                var videoListView = function() {
                    return $('.results').append(output() + videoTitle + videoDes + dateAdded)
                }

                var videoThumbView = function() {
                    return $('.results').append('<ul>' + videoTitle + dateAdded + videoThumbnails + videoDes + '</ul>')
                }

                //videoListView()
                videoThumbView()


            })


        }).done(function(data){
            $('.thumbs').on('click touchend', function() {
                //console.log($(this).attr('data'))
                $('.results').hide()
                var Videos = '<li class="res"><iframe height="200" width="400" src=\"//www.youtube.com/embed/' + $(this).attr('data') + '\"></iframe></li>';
                $('.results').html(Videos).show()
                $('.back_btn').show().on('click touchend', function() {
                    location.reload();
                });

            })
        })




    }

    return window.main = main;

})();


