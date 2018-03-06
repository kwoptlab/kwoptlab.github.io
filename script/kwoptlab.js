/*
 * Created by 조휘연 on 2018. 02. 28.
 * Copyright © 2018년 조휘연. All rights reserved.
 *
 * GitHub : https://github.com/hwyncho/
 * e-mail : hwyn.cho@gmail.com
 */

// A function that moves the cursor to the specified content.
function moveToContent(content) {
    var selectorDiv = "div#kwoptlab-" + content;
    var selectorItem1 = "div.ui.menu a.item";
    var selectorItem2 = "div.ui.menu a.item.kwoptlab-" + content;

    var offset = $(selectorDiv).offset().top + 1;
    $('html, body').animate({ scrollTop: offset }, 300);

    $(selectorItem1).removeClass("active");
    $(selectorItem2).addClass("active");
}

// A function that shows the details of the publications.
function readMorePublication(content) {
    var path = "./json/en/publications.json";
    var selector = "";
    var items = null;
    var html = "";

    $.getJSON(path, function (data) {
        selector = "div#kwoptlab-publications-modal div.ui.header";
        items = $(selector);
        items.text(data[content].header);

        html = "";
        for (var i = 0; i < data[content].body.length; ++i) {
            html += '<tr>\n<td>' + (i + 1) + '</td>\n<td>' + data[content].body[i] + '</td>\n</tr>';
        }

        selector = "div#kwoptlab-publications-modal table.ui.table tbody";
        items = $(selector);
        items.empty();
        items.append(html);
    });

    $("div#kwoptlab-publications-modal").modal("show");
}

// A function that gets the current language of the page.
function getLanguage() {
    var url = window.location.search.substring(1);
    var params = url.split("&");
    var pairKeyValue = {};
    var lang = "";

    for (var i = 0; i < params.length; ++i) {
        pairKeyValue = params[i].split("=");
        if (pairKeyValue[0] == "lang") {
            lang = pairKeyValue[1];
            break;
        }
    }

    if ((lang == "en") || (lang == "ko")) {
        return lang;
    } else {
        return "en";
    }
}

// A function that sets the current language of the page.
function setLanguage(lang) {
    var selector = "div.menu.kwoptlab-lang a.item.kwoptlab-lang-" + lang;
    $(selector).addClass("active");
    document.getElementsByTagName("html")[0].setAttribute("lang", lang);
}

// A function that init page.
function init() {
    // A function that activates dropdown menus of the semantic-ui.
    function initDropdown() {
        $('.ui.dropdown').dropdown();
    }

    // A function that activates item of menu.
    function initItemActive(content) {
        var selectorDiv = "div#kwoptlab-" + content;
        var selectorItem1 = "div.ui.menu a.item";
        var selectorItem2 = "div.ui.menu a.item.kwoptlab-" + content;

        $(selectorDiv).visibility({
            once: false,
            onTopPassed: function () {
                $(selectorItem1).removeClass("active");
                $(selectorItem2).addClass("active");
            },
            onBottomPassedReverse: function () {
                $(selectorItem1).removeClass("active");
                $(selectorItem2).addClass("active");
            }
        });
    }

    // A function that sets the menu-bar of the page.
    function initMenu(lang) {
        var path = "./json/" + lang + "/menu.json";
        var selector = "";
        var items = null;

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                selector = "div.ui.menu a.item.kwoptlab-" + key;
                items = $(selector);

                for (var i = 0; i < items.length; ++i) {
                    items[i].text = value;
                }
            })
        });

        $("div#kwoptlab-home div.ui.menu").visibility({
            once: false,
            onBottomPassed: function () {
                $("div#kwoptlab-menu").transition("fade in");
            },
            onBottomPassedReverse: function () {
                $("div#kwoptlab-menu").transition("fade out");
            }
        });
    }

    // A functions that sets the contents headers of the page.
    function initHeaders(lang) {
        var path = "./json/" + lang + "/headers.json";
        var selector = "";
        var items = null;

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                selector = "div#kwoptlab-" + key + " h1.ui.horizontal.divider";
                items = $(selector);
                items.text(value);
            })
        });
    }

    // A function that sets the "Home" contents of the page.
    function initHome(lang) {
        var path = "./json/" + lang + "/home.json";
        var selector = "";
        var items = null;

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                if (key == "text1") {
                    selector = "div#kwoptlab-home div.row h1";
                    items = $(selector);
                    items.text(value);
                } else if (key == "text2") {
                    selector = "div#kwoptlab-home div.row h2";
                    items = $(selector);
                    items.text(value);
                }
            })
        });

        initItemActive("home");
    }

    // A function that sets the "About" contents of the page.
    function initAbout(lang) {
        var path = "./json/" + lang + "/about.json";
        var selector = "";
        var items = null;

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                if (key == "greetings") {
                    selector = "div#kwoptlab-about div.kwoptlab-content-body h2";
                    items = $(selector);
                    items.text(value);
                } else if (key == "text") {
                    selector = "div#kwoptlab-about div.kwoptlab-content-body p";
                    items = $(selector);
                    items.text(value);
                }
            })
        });

        initItemActive("about");
    }

    // A function that sets the "Research" contents of the page.
    function initResearch(lang) {
        var path = "./json/" + lang + "/research.json";
        var selector = "";
        var items = null;
        var html = "";

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                if (key == "topics") {
                    selector = "div#kwoptlab-research-topics h2";
                    items = $(selector);
                    items.text(value.header);

                    html = ""
                    for (var i = 0; i < value.body.length; ++i) {
                        html += '<div class="column">\n<div class="ui segments">\n<div class="ui teal segment">\n<h3 class="ui header">' + value.body[i].field + '</h3>\n</div>\n<div class="ui segment">\n<p>' + value.body[i].description + '</p>\n</div>\n</div>\n</div>';
                    }

                    selector = "div#kwoptlab-research-topics div.ui.grid";
                    items = $(selector);
                    items.append(html);
                } else if (key == "grants") {
                    selector = "div#kwoptlab-research-grants h2";
                    items = $(selector);
                    items.text(value.header);

                    html = "";
                    for (var i = 0; i < value.body.length; ++i) {
                        html += '<div class="item">' + value.body[i] + '</div>\n';
                    }

                    selector = "div#kwoptlab-research-grants div.ui.list";
                    items = $(selector);
                    items.append(html);
                }
            })
        });

        initItemActive("research");
    }

    // A function that sets the "Members" contents of the page.
    function initMembers(lang) {
        var path = "./json/" + lang + "/members.json";
        var selector = "";
        var items = null;
        var html = "";

        function makeCard(member) {
            var html = "";

            html += '<div class="teal card">\n<div class="image">\n<img src="' + member.img + '">\n</div>\n<div class="content">\n<div class="header">' + member.name + '</div>\n<div class="meta">\n' + member.dept + '\n</div>\n<div class="description">' + member.role + '</div>\n</div>\n<div class="extra content"><span>';

            if (member.email != "") {
                html += '<a href="mailto:' + member.email + '">\n<i class="big mail icon"></i>\n</a>';
            }

            if (member.home != "") {
                html += '<a href="' + member.home + '">\n<i class="big home icon"></i>\n</a>';
            }

            for (snsName in member.sns) {
                if (snsName == "scholar") {
                    html += '<a href="javascript:window.open(\'' + member.sns[snsName] + '\');">\n<i class="big graduation cap icon"></i>\n</a>';
                } else if (snsName == "dblp") {
                    html += '<a href="javascript:window.open(\'' + member.sns[snsName] + '\');">\n<i class="big book icon"></i>\n</a>';
                } else {
                    html += '<a href="javascript:window.open(\'' + member.sns[snsName] + '\');">\n<i class="big ' + snsName + ' icon"></i>\n</a>';
                }
            }

            html += '</span>\n</div></div>';

            return html;
        }

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                if (key == "current") {
                    selector = "div#kwoptlab-members-current h2";
                    items = $(selector);
                    items.text(value.header);

                    html = ""
                    for (var i = 0; i < value.body.length; ++i) {
                        var member = value.body[i];
                        html += makeCard(member);
                    }

                    selector = "div#kwoptlab-members-current div.ui.stackable.cards";
                    items = $(selector);
                    items.append(html);
                } else if (key == "alumni") {
                    selector = "div#kwoptlab-members-alumni h2";
                    items = $(selector);
                    items.text(value.header);

                    html = ""
                    for (var i = 0; i < value.body.length; ++i) {
                        var member = value.body[i];
                        html += makeCard(member);
                    }

                    selector = "div#kwoptlab-members-alumni div.ui.stackable.cards";
                    items = $(selector);
                    items.append(html);
                }
            })
        });

        initItemActive("members");
    }

    // A function that sets the "Publications" contents of the page.
    function initPublications(lang) {
        var path = "./json/" + lang + "/publications.json";

        var textNumber = " items";
        var textButton = "Read More";

        if (lang == "en") {
            textNumber = " items";
            textButton = "Read More";
        } else if (lang == "ko") {
            textNumber = " 개";
            textButton = "더 보기";
        }

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                var selector = "";
                var items = null;
                var html = "";

                html += '<div class="card">\n<div class="content">\n<div class="header">' + value.header + '</div>\n<div class="meta">' + value.body.length + textNumber + '</div>\n</div>\n<div class="ui bottom attached button" onclick="readMorePublication(\'' + key + '\');"><i class="teal add icon"></i>\n' + textButton + '</div>\n</div>';

                selector = "div#kwoptlab-publications div.kwoptlab-content-body div.ui.stackable.cards";
                items = $(selector);
                items.append(html);
            })
        });

        initItemActive("publications");
    }

    // A function that sets the "Projects" contents of the page.
    function initProjects(lang) {
        var path = "./json/" + lang + "/projects.json";


        $.getJSON(path, function (data) {
            var selector = "div#kwoptlab-projects div.kwoptlab-content-body div.list";
            var items = $(selector);
            var html = "";

            for (var i = 0; i < data.length; ++i) {
                html += '<div class="item" style="padding-bottom: 0.5em; padding-top: 0.5em;">\n<i class="teal folder icon" ></i>\n<div class="content">' + data[i] + '</div>\n</div >';
            }

            items.append(html);
        });

        initItemActive("projects");
    }

    // A function that sets the "Lectures" contents of the page.
    function initLectures(lang) {
        var path = "./json/" + lang + "/lectures.json";

        $.getJSON(path, function (data) {
            var i = 0, j = 0, k = 0, l = 0;
            var semesters = null;
            var lectures = null;
            var comments = null;

            var selector = "";
            var items = null;
            var html = "";

            for (i = 0; i < data.length; ++i) {
                html = '<div class="ui basic segment">\n<div class="ui container">\n<h2 class="ui header">' + data[i].year + '</h2>\n<div class="ui stackable two column grid container">\n';

                semesters = data[i].semesters;
                for (j = 0; j < semesters.length; ++j) {
                    html += '<div class="column">\n<div class="ui segments">\n<div class="ui teal segment">\n<h3 class="ui header">' + semesters[j].semester + '</h3>\n</div>\n<div class="ui segment"><div class="ui bulleted list">\n';

                    lectures = semesters[j].lectures;
                    for (k = 0; k < lectures.length; ++k) {
                        html += '<div class="item">' + lectures[k].lecture;

                        comments = lectures[k].comments;
                        for (l = 0; l < comments.length; ++l) {
                            html += '&#09; <a href="javascript:window.open(\'' + comments[l] + '\');"><i class="teal medium comment alternate outline icon"></i></a>\n';
                        }

                        html += '</div >\n';
                    }

                    html += '</div>\n</div>\n</div>\n</div>\n';
                }

                html += '</div>\n</div>';

                selector = "div#kwoptlab-lectures div.kwoptlab-content-body";
                items = $(selector);
                items.append(html);
            }
        });

        initItemActive("lectures");
    }

    // A function that sets the "Awards" contents of the page.
    function initAwards(lang) {
        var path = "./json/" + lang + "/awards.json";

        $.getJSON(path, function (data) {
            var selector = "div#kwoptlab-awards div.kwoptlab-content-body div.list";
            var items = $(selector);
            var html = "";

            for (var i = 0; i < data.length; ++i) {
                html += '<div class="item" style="padding-bottom: 0.5em; padding-top: 0.5em;">\n<i class="yellow trophy icon" ></i>\n<div class="content">' + data[i] + '</div>\n</div >';
            }

            items.append(html);
        });

        initItemActive("awards");
    }

    // A function that sets the "News" contents of the page.
    function initNews(lang) {
        var path = "./json/" + lang + "/news.json";

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                var selector = "";
                var items = null;
            })
        });

        initItemActive("news");
    }

    // A function that sets the "Contact" contents of the page.
    function initContact(lang) {
        var path = "./json/" + lang + "/contact.json";

        $.getJSON(path, function (data) {
            $.each(data, function (key, value) {
                var selector = "";
                var item = null;

                if (key == "phone") {
                    selector = "div#kwoptlab-contact div.ui.list div.item:nth-child(1) div.content a";
                    item = $(selector);
                    item.text(value);
                } else if (key == "email") {
                    selector = "div#kwoptlab-contact div.ui.list div.item:nth-child(2) div.content a";
                    item = $(selector);
                    item.text(value);
                } else if (key == "office") {
                    selector = "div#kwoptlab-contact div.ui.list div.item:nth-child(3) div.content";
                    item = $(selector);
                    item.text(value);
                }
            })
        });

        initItemActive("contact");
    }


    var lang = getLanguage();

    initDropdown();

    initMenu(lang);
    initHeaders(lang);

    initHome(lang);
    initAbout(lang);
    initResearch(lang);
    initMembers(lang);
    initPublications(lang);
    initProjects(lang);
    initLectures(lang);
    initAwards(lang);
    initNews(lang);
    initContact(lang);

    setLanguage(lang);
}
