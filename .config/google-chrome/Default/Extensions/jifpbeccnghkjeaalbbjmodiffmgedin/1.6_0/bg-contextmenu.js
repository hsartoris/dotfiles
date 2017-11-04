/**
 * (c) 2013 Rob Wu <rob@robwu.nl>
 */
/* jshint browser:true, devel:true */
/* globals chrome, cws_match_pattern, ows_match_pattern, amo_match_patterns, amo_file_version_match_pattern, get_crx_url */
/* globals encodeQueryString */

'use strict';
(function() {
    var MENU_ID_LINK = 'nl.robwu.contextmenu.crxlink';
    var MENU_ID_PAGE = 'nl.robwu.contextmenu.crxpage';
    var MENU_ID_AMO_APPROVED_LINK = 'nl.robwu.contextmenu.amoapprovedlink';
    var MENU_ID_AMO_APPROVED_PAGE = 'nl.robwu.contextmenu.amoapprovedpage';
    chrome.storage.onChanged.addListener(function(changes) {
        if (!changes.showContextMenu) return;
        if (changes.showContextMenu.newValue) show();
        else hide();
    });
    chrome.runtime.onInstalled.addListener(checkContextMenuPref);
    chrome.runtime.onStartup.addListener(checkContextMenuPref);
    function checkContextMenuPref() {
        var storageArea = chrome.storage.sync;
        storageArea.get({showContextMenu:true}, function(items) {
            if (items.showContextMenu) show();
        });
    }
    
    function contextMenusOnClicked(info, tab) {
        var url = info.menuItemId == MENU_ID_PAGE ||
           info.menuItemId == MENU_ID_AMO_APPROVED_PAGE ? info.pageUrl : info.linkUrl;
        url = get_crx_url(url);
        var params = encodeQueryString({crx: url});

        chrome.tabs.create({
            url: chrome.extension.getURL('crxviewer.html') + '?' + params,
            active: true
        });
    }
    chrome.contextMenus.onClicked.addListener(contextMenusOnClicked);
    function show() {
        chrome.contextMenus.create({
            id: MENU_ID_LINK,
            title: 'View linked extension source',
            contexts: ['link'],
            targetUrlPatterns: [
                '*://*/*.crx*',
                '*://*/*.CRX*',
                '*://*/*.NEX*',
                '*://*/*.nex*',
                '*://*/*.XPI*',
                '*://*/*.xpi*',
                cws_match_pattern,
                ows_match_pattern,
                amo_file_version_match_pattern,
            ]
        });
        // AMO lists multiple versions, specifically state that this
        // is the latest approved version to avoid ambiguity.
        chrome.contextMenus.create({
            id: MENU_ID_AMO_APPROVED_LINK,
            title: 'View linked extension source (latest approved version)',
            contexts: ['link'],
            targetUrlPatterns: amo_match_patterns,
        });
        chrome.contextMenus.create({
            id: MENU_ID_PAGE,
            title: 'View extension source',
            contexts: ['all'],
            documentUrlPatterns: [
                cws_match_pattern,
                ows_match_pattern,
                amo_file_version_match_pattern,
            ]
        });
        // AMO lists multiple versions, specifically state that this
        // is the latest approved version to avoid ambiguity.
        chrome.contextMenus.create({
            id: MENU_ID_AMO_APPROVED_PAGE,
            title: 'View extension source (latest approved version)',
            contexts: ['page', 'frame', 'link'],
            documentUrlPatterns: amo_match_patterns,
        });
    }
    function hide() {
        chrome.contextMenus.removeAll();
    }
})();

