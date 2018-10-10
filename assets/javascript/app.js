$(document).ready(function() {

        var topics = [ "Aragorn","Gimli","Legolas","Gandalf","Boromir","Faramir","Peregrin Took","Meriadoc Brandybuck","Frodo Baggins","Samwise Gamgee"]
        
        var results;
        
        
        function makeButtons () {
            
            $("#gif-buttons").empty();
        
            for (i = 0; i < topics.length; i++) {
        
                var b = $("<button>");
        
                b.addClass("gif-btn");
                b.attr("data-name", topics[i]);
                b.text(topics[i]);
        
                $("#gif-buttons").append(b);
            };
        
        };
        
        $("#add-gif").on("click", function(event) {
        
            event.preventDefault();
        
            var gifs = $("#gif-input").val().trim();
        
            topics.push(gifs);
            $("#gif-input").val("");
        
            makeButtons();
        
            console.log(topics);
        
        
        });
        
        makeButtons();
        
        function dataPull() {
        
            var gifName = $(this).attr("data-name");
            var gifStr = gifName.split(" ").join("+");
            var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + gifStr + "&api_key=xk01q9mEBG6UkU6448q6ieLO8YMCsJGm&limit=10";
        
                    $.ajax({
                url: giphyURL,
                method: "GET"
              }).done(function(response) {
        
                console.log(giphyURL);
                console.log(response);
        
                results = response.data;
        
                $("#gifs").empty();
                for (var i = 0; i < results.length; i++) {
        
                    var gifDiv = $("<div>");
                    var para = $("<p class ='rating'>").text("Rating: " + results[i].rating);
                    var gifImage = $("<img>");
        
                    para.addClass("rating-text")
        
                    gifImage.addClass("image-gifs")
                        gifImage.attr("src", results[i].images.fixed_height_still.url);
                        gifImage.attr("data-state", "still");
                        gifImage.attr("data-position", i);
        
                    gifDiv.append(para);
                    gifDiv.append(gifImage);
                    gifDiv.addClass("individual-gifs")
        
                    $("#gifs").prepend(gifDiv);
        
        
                };
        
              });
        
            };
        
            $(document).on("click", ".gif-btn", dataPull);
        
            function gifAnimation() {
                var state = $(this).attr("data-state");
                var position = $(this).attr("data-position");
                position = parseInt(position);
        
                console.log(results[position].images.fixed_height.url);
                console.log(position);
        
                if (state === "still") {
                    console.log("hello world");
                    $(this).attr("src", results[position].images.fixed_height.url);
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", results[position].images.fixed_height_still.url);
                    $(this).attr("data-state", "still");
                }
                };
        
                $(document).on("click", ".image-gifs", gifAnimation);
        
            })
