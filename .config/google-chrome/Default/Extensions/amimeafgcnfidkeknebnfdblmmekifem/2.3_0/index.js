(function () {
    'use strict';

    var _trackList, _player;
    var _toggleRepostsButton = $('<button class="sc-button-repost sc-button sc-button-large sc-button-responsive"></button>');

    var TrackList = function (element) {

        var _element = element;
        var _tracks = [];
        var _that = this;
        var _trackPagingListener, _removeReposts = false;

        var removeReposts = function () {
            _toggleRepostsButton.addClass('sc-button-selected');
            internalRemoveReposts();
            _trackPagingListener.startListening();
            chrome.storage.sync.set({'state': 'active'});
            _player.onTrackChanged(function (tracklink) {
                if(!isRepost(tracklink)) {
                    _player.next();
                }
            });
        };

        var endsWith = function (str, suffix) {
            return str.indexOf(suffix, str.length - suffix.length) !== -1;
        };

        var isRepost = function (tracklink) {
            var result = getPosts().filter(function (post) {
                return post.getLink() === tracklink || endsWith(tracklink, 'in=' + post.getLink().substring(1));
            });
            return result.length > 0;
        };

        var internalRemoveReposts = function () {
            getReposts().forEach(function (repost) {
                repost.remove();
            });
        };

        var getPosts = function () {
            return _tracks.filter(function (track) {
                return !track.isRepost();
            });
        };

        var getReposts = function () {
            return _tracks.filter(function (track) {
                return track.isRepost();
            });
        };

        var revealReposts = function () {
            _toggleRepostsButton.removeClass('sc-button-selected');
            /*getReposts().forEach(function (repost) {
                repost.revealOnList(_that);
            });*/
            _trackPagingListener.stopListening();
            chrome.storage.sync.set({'state': 'inactive'}, function(){
                location.href = '/stream';
            });
        };

        this.toggleReposts = function () {
            _removeReposts = !_removeReposts;
            if (_removeReposts) {
                console.log('remove reposts');
                removeReposts();
            } else {
                console.log('reveal reposts');
                revealReposts();
            }
        };

        this.insertOnPosition = function(track, position){
            var trackList = $('li.soundList__item', _element);
            if(trackList.length > 0) {
                trackList.eq(position).before(track);
            } else {
                _element.append(track);
            }
        };

        (function init() {
            $('li.soundList__item', _element).each(function (index) {
                _tracks.push(new TrackItem($(this), index));
            });
            _trackPagingListener = new TrackPagingListener(_element);
            _trackPagingListener.onNextTracksLoaded(function () {
                var trackAmount = _tracks.length;
                var nextTracks = $('li.soundList__item', _element).slice(_tracks.length - getReposts().length);
                nextTracks.each(function (index) {
                    _tracks.push(new TrackItem($(this), index + trackAmount));
                });
                internalRemoveReposts();
            });
            chrome.storage.sync.get('state', function(result) {
                if(result.state === 'active') {
                    removeReposts();
                    _removeReposts = true;
                }
                console.log(_removeReposts);
            });
        })();

    };

    var TrackPagingListener = function (tracklist) {

        var _trackList = tracklist;
        var _onNextTracksLoadedCallback, _running, _interval;

        this.startListening = function () {
            if (!_running) {
                var currentTracklistSize = _trackList.height();
                _interval = setInterval(function () {
                    var actualTracklistSize = _trackList.height();
                    if (actualTracklistSize > currentTracklistSize) {
                        if (_onNextTracksLoadedCallback) {
                            _onNextTracksLoadedCallback();
                        }
                        currentTracklistSize = _trackList.height();
                    }
                }, 500);
                _running = true;
            }
        };

        this.onNextTracksLoaded = function(callback) {
            _onNextTracksLoadedCallback = callback;
        };

        this.stopListening = function () {
            if (_running) {
                clearInterval(_interval);
                _running = false;
            }
        };

    };

    var Player = function (element) {

        var _element = element;
        var _lastTrack, _currentTrack, _onTrackChangedCallback, _nextControl, _prevControl, _prevDirection, _onTrackChangingInterval;

        this.onTrackChanged = function (callback) {
            _onTrackChangedCallback = callback;
        };

        this.next = function () {
            if(_prevDirection) {
                _prevControl.get(0).dispatchEvent(new Event('click'));
            } else {
                _nextControl.get(0).dispatchEvent(new Event('click'));
            }
        };

        this.stopListening = function(){
            clearInterval(_onTrackChangingInterval);
        };

        (function init() {
            _nextControl = $('button.skipControl__next', _element);
            _prevControl = $('button.skipControl__previous', _element);
            _currentTrack = $('.playControls__soundBadge a.playbackSoundBadge__title', _element).attr('href');
            _onTrackChangingInterval = setInterval(function () {
                var actualTrackLink = $('.playControls__soundBadge a.playbackSoundBadge__title', _element);
                if (actualTrackLink.length > 0) {
                    var actualTrack = actualTrackLink.attr('href');
                    if (actualTrack !== _currentTrack) {
                        if(_lastTrack === actualTrack) {
                            _prevDirection = !_prevDirection;
                        }
                        _lastTrack = _currentTrack;
                        _currentTrack = actualTrack;
                        if (_onTrackChangedCallback) {
                            _onTrackChangedCallback(_currentTrack);
                        }
                    }
                }
            }, 300);
        })();

    };

    var TrackItem = function (element, position) {

        var _element = element;
        var _position = position;
        var _restoreElementCopy, _repost, _removed, _link;

        this.remove = function () {
            if(!_removed) {
//                _restoreElementCopy = _element.clone(true, true);
                _element.remove();
                _removed = true;
            }
        };

        this.revealOnList = function (list) {
            if (_removed) {
                list.insertOnPosition(_restoreElementCopy, _position);
                _element = _restoreElementCopy;
                _removed = false;
            }
        };

        this.isRepost = function(){
            return _repost;
        };

        this.getLink = function(){
            return _link;
        };


        (function init() {
            _repost = $('.soundContext .sc-ministats-reposts', _element).length > 0;
            _link = $('a.soundTitle__title', _element).attr('href');
        })();

    };

    var appendToggleButton = function () {
        $('.l-tabs ul.g-tabs').append(_toggleRepostsButton);
        _toggleRepostsButton.wrap('<li class="g-tabs-item repost-toggle-item"></li>');

        _toggleRepostsButton.unbind();
        _toggleRepostsButton.click(function (e) {
            e.preventDefault();
            e.stopPropagation();
            _trackList.toggleReposts();
        });
    };

    var initTracklist = function (callback) {
        var waitTracksLoadedInterval = setInterval(function () {
            var tracklistElement = $('.lazyLoadingList__list', '.stream__list');
            if (tracklistElement.length > 0 && $('li', tracklistElement).length > 0) {
                _trackList = new TrackList(tracklistElement);
                clearInterval(waitTracksLoadedInterval);
                if (callback) {
                    callback();
                }
            }
        }, 100);
    };

    var init = function(){
        initTracklist(function () {
            appendToggleButton();
            _player = new Player($('.playControls'));
        });
    };


    (function initPlugin() {
        var loc = window.location.pathname;
        setInterval(function () {
            if (loc !== window.location.pathname) {
                loc = window.location.pathname;
                if (loc === '/stream') {
                    init();
                } else {
                    _player.stopListening();
                }
            }
        }, 500);
        init();
    })();

})();