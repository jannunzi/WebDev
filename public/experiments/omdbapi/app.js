(function(){

    var searchBtn;
    var titleFld;
    var tbody;
    var searchUrl = "http://www.omdbapi.com/?s=TITLE&page=PAGE&type=movie";
    var detailsUrl = "http://www.omdbapi.com/?i=IMDBID&type=movie&plot=full&tomatoes=true";
    var $plot;
    var $detailPoster;
    var $actors;
    var $more;
    var collapsed = true;

    $(init);

    function init() {
        searchBtn = $("#searchBtn");
        titleFld = $("#title");
        tbody = $("#results");
        $plot = $("#plot");
        $detailPoster = $("#detailPoster");
        $actors = $("#actors");
        $more = $("#more");

        searchBtn.click(search);
        $more.click(toggleMore);
    }

    function toggleMore() {
        if(collapsed) {
            $more.css("height", "auto");
            collapsed = false;
        } else {
            $more.css("height", "300px");
            collapsed = true;
        }
    }

    function search() {
        var title = titleFld.val();
        var url = searchUrl.replace("TITLE", title);
        url = url.replace("PAGE", 1);
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            success: renderMovies
        });
    }

    function details(event) {
        console.log(event);
        var target = $(event.currentTarget);
        var imdbid = target.attr("id");
        var url = detailsUrl.replace("IMDBID", imdbid);
        $.ajax({
            url: url,
            jsonp: "callback",
            dataType: "jsonp",
            success: renderDetails
        });
    }

    function renderDetails(results) {
        console.log(results);
        var actors = results.Actors;
        var boxOffice = results.BoxOffice;
        var director = results.Director;
        var plot = results.Plot;
        var poster = results.Poster;
        var title = results.Title;
        var tomatoConsensus = results.tomatoConsensus;
        var tomatoMeter = results.tomatoMeter;
        var tomatoURL = results.tomatoURL;

        $plot.html(plot);
        $detailPoster.attr("src", poster);
        $actors.empty();
        var actorList = actors.split(",");
        for(var a = 0; a < actorList.length; a++) {
            var $li = $("<li>")
                .append(actorList[a]);
            $actors.append($li);
        }
    }

    function renderMovies(results) {
        tbody.empty();
        var movies = results.Search;
        var totalResults = results.totalResults;
        for(var m = 0; m < movies.length; m++) {
            var movie = movies[m];
            var title = movie.Title;
            var year = movie.Year;
            var imdbid = movie.imdbID;
            var poster = movie.Poster;
            var tr = $("<tr>");
            var img = $("<img>")
                .attr("src", poster)
                .attr("id", imdbid)
                .click(details);
            var td = $("<td>").append(img);
            tr.append(td);
            td = $("<td>").append(title);
            tr.append(td);
            td = $("<td>").append(year);
            tr.append(td);
            td = $("<td>").append(imdbid);
            tr.append(td);

            tbody.append(tr);
        }
    }
})();