$(".studycard").flip();

$("#viewDecks").click(function(event){
    let id= $(this).data("id")
    location.href=`/deck/${id}`
})
let cardData = location.href.split("/");
let deckIndx = cardData[cardData.length - 1];
let counter = 0;
    
if (cardData[cardData.length - 2] === "study") {
    
    $.get("/api/deck/" + deckIndx).then(function (data){
        const cardCount = data.length;

        $("#question").text(data[0].question)
        $("#answer").text(data[0].answer)
        $(".count-display").text(`${counter + 1}/${cardCount}`);
    
        $("#next").click(function(event){
            if (counter + 1 < cardCount) {
                $("#answer").text("");
                $(".studycard").flip(false);
                setTimeout(function(){
                    counter++
                    $("#question").text(data[counter].question)
                    $("#answer").text(data[counter].answer)
                    $(".count-display").text(`${counter + 1}/${cardCount}`);
                }, 200);
            }
        })
    
        $("#previous").click(function(event){
            if (counter + 1 > 1) {
                $("#answer").text("");
                $(".studycard").flip(false);
                setTimeout(function(){
                        counter--
                        $("#question").text(data[counter].question)
                        $("#answer").text(data[counter].answer)
                        $(".count-display").text(`${counter + 1}/${cardCount}`);
                }, 200);
            }   
        })
    })
}
