'use strict';

/**
 * Configuration dependencies.
 */

var config  = require('../config/config');
var modules = require('../config/modules');

/**
 * Adding in head social comments for movie page.
 *
 * @return {String}
 */

function headComments() {

    var start = (modules.comments.data.disqus.shortname)
        ? 'dsqs_comment'
        : (modules.comments.data.vk.app_id)
            ? 'veka_comment'
            : 'fcbk_comment';

    var data = '<script type="text/javascript">function showComments(){var t=this.dataset&&this.dataset.id?this.dataset.id:"' + start + '",e=document.querySelector("#"+t);if(e){var n=document.querySelectorAll(".comment");if(n&&n.length)for(var o=0;o<n.length;o++)n[o].style.display="none";e.style.display="block"}}window.addEventListener("load",function(){var t=document.querySelectorAll(".button");if(t&&t.length)for(var e=0;e<t.length;e++)t[e].addEventListener("click",showComments);showComments()});</script>';

    if (modules.comments.data.vk.app_id) {
        data += '<script type="text/javascript" src="//vk.com/js/api/openapi.js?122"></script><script type="text/javascript">if (typeof VK == "object") {VK.init({apiId: ' + modules.comments.data.vk.app_id + ', onlyWidgets: true});}</script>';
    }

    if (modules.comments.data.facebook.admins) {
        var admins = modules.comments.data.facebook.admins.split(',');
        for (var i = 0; i < admins.length; i++) {
            admins[i] = '<meta property="fb:admins" content="' + admins[i] + '">';
        }

        data += admins.join('');
    }

    return data;

}

/**
 * Adding social comments for movie page.
 *
 * @param {Object} movie - The get url movie page.
 * @return {String}
 */

function codesComments(movie) {

    var data = {};

    if (modules.comments.data.disqus.shortname) {
        data.disqus = '<div id="disqus_thread"></div><script>var disqus_config=function(){this.page.url="' + movie.url + '",this.page.identifier="' + movie.url + '"};!function(){var e=document,t=e.createElement("script");t.src="//' + modules.comments.data.disqus.shortname + '.disqus.com/embed.js",t.setAttribute("data-timestamp",+new Date),(e.head||e.body).appendChild(t)}();</script>';
    }

    if (modules.comments.data.vk.app_id) {
        data.vk = '<div id="vk_comments"></div><script type="text/javascript">if (typeof VK == "object") {VK.Widgets.Comments("vk_comments", {limit: 10, width: "665", attach: "*"});}</script>';
    }

    if (modules.comments.data.facebook.admins) {
        data.facebook = '<div class="fb-comments" data-href="' + movie.url + '" data-numposts="10" data-width="665"></div><div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.6"; fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));</script>';
    }

    var buttons = '';
    var blocks = '';

    if (data.disqus) {
        buttons += '<a href="#dsqs" class="button dsqs" data-id="dsqs_comment" style="background: #2E9FFF; color: #fff; border-radius: 2px; padding: 10px; text-decoration: none; margin-right: 5px;">Комментарии</a>';
        blocks += '<div class="comment" id="dsqs_comment" style="display: none;">' + data.disqus + '</div>';
    }
    if (data.vk) {
        buttons += '<a href="#veka" class="button veka" data-id="veka_comment" style="background: #507299; color: #fff; border-radius: 2px; padding: 10px; text-decoration: none; margin-right: 5px;">ВКонтакте</a>';
        blocks += '<div class="comment" id="veka_comment" style="display: none;">' + data.vk + '</div>';
    }
    if (data.facebook) {
        buttons += '<a href="#fcbk" class="button fsbk" data-id="fcbk_comment" style="background: #3B5998; color: #fff; border-radius: 2px; padding: 10px; text-decoration: none;">Facebook</a>';
        blocks += '<div class="comment" id="fcbk_comment" style="display: none;">' + data.facebook + '</div>';
    }

    return '' +
        '<div class="CP_buttons" style="margin: 30px 0;">' + buttons + '</div>' +
        '<div class="CP_comments" style="margin: 20px 0;">' + blocks + '</div>';

}

module.exports = {
    "codes" : codesComments,
    "head"  : headComments
};