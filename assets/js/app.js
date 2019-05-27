---
layout: null
---

function fetchInsta (options) {
  if (!options) { return; }
  options = options || {};
  if (!options.accessToken || !options.target) { return; }
  if (!options.numOfPics || typeof options.numOfPics !== "number") {
    options.numOfPics = 4;
  }

  $.ajax({
    url: "https://api.instagram.com/v1/users/self/media/recent/?access_token=" +
      options.accessToken + "&count=" + options.numOfPics /* + "&callback=?" */,
    method: "GET",
    dataType: "jsonp"
  }).done(function(json) {
    var $targetEl = $(options.target);
    var $article, pic;

    $targetEl.attr({
      class: "jdb-row-padding",
      style: 'background-image: url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%235dbcd2" fill-opacity="0.4"%3E%3Cpath opacity=".5" d="M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z"/%3E%3Cpath d="M6 5V0H5v5H0v1h5v94h1V6h94V5H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\');'
    });

    $.each(json.data, function (index, data) {
      $article = $("<article>").addClass("insta-item jdb-quarter");
      // TODO:
      // 1. Add play icon for video type :DONE:
      // 2. Add like count if > 0
      // 3. Add caption/description
      // 4. Add tags
      // 5. Add created time
      pic = data.images.standard_resolution.url;
      $article.append(
        $("<a>", {
          href: data.link,
          target: "_blank"
        }).append(
          $("<div>").addClass(["jdb-padding", (data.type == "video" ? " insta-video" : "")]).append(
            $("<div>").attr({
              class: "jdb-image",
              style: "background-image:url(" + pic + ")"
            })
          )
        )
      ).appendTo($targetEl);
    });
  }).fail(function(error) {
    console.error(error);
  });
}

$(document).ready(function(){
  var mustFixHeader = $("#jdb-wrapper").hasClass("blog");

  function updateNavigationOnScroll (win) {
    var wintop = $(win).scrollTop();
    var docheight = $(document).height();
    var winheight = $(win).height();
    var totalScroll = (wintop/(docheight-winheight))*100;
    $(".jdb-progressBarfx").css("width", totalScroll + "%");

    if (wintop >= 42.4) {
      $("nav.jdb-navigation").addClass(["jdb-top", "jdb-card-2"]);
      if (mustFixHeader) {
        $("#jdb-wrapper > main").css("margin-top", "57px");
      }
    } else {
      $("nav.jdb-navigation").removeClass(["jdb-top", "jdb-card-2"]);
      if (mustFixHeader) {
        $("#jdb-wrapper > main").css("margin-top", "17px");
      }
    }
  }

  updateNavigationOnScroll(window);

  $(window).scroll(function(){
    updateNavigationOnScroll(this);
  });

  // Toggle small menu
  $("[data-jdb-action='toggle-small-screen-menu']").each(function() {
    $(this).click(function() {
      $("#small-screen-menu").slideToggle();
    });
  });

  $("[data-jdb-toggle]").each(function(){
    $(this).click(function(){
      var sel = $(this).data("jdb-toggle");
      if (sel != "") {
        $(sel).slideToggle();
      }
    });
  });

  $.extend(true, $.magnificPopup.defaults, {
    tClose: "Fermer (Echap)",
    tLoading: "Chargement...",
    gallery: {
      tPrev: "Précédent (Flèche gauche)",
      tNext: "Suivant (Flèche droite)",
      tCounter: "%curr% sur %total%"
    },
    image: {
      tError: "<a href='%url%'>L'image</a> ne peut être chargée."
    },
    ajax: {
      tError: "<a href='%url%'>Le contenu</a> ne peut être chargé."
    }
  });

  // $(".page img, .post img").magnificPopup({type:"image"});

  (function(){
    if (document.querySelector(".news-container") !== null) {
      var $form = $(".news-form");
      $form.find("input[type=email]").focus(function(){
        $form.find("button[type=submit]").removeClass("jdb-hide");
      });
    }

    {% if site.ig_access_token %}
      if (document.getElementById("instagram-frame") !== null) {
        fetchInsta({
          accessToken: "{{ site.ig_access_token }}",
          target: "#instagram-frame",
          numOfPics: 4
        });
      }
    {% endif %}
  })();
});