let $sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
let $keyCaps = $('#keyboard-upper-container')
let $keyLowCaps = $('#keyboard-lower-container')
let $sentenceNumber = 0
let $currentSentence = $sentences[$sentenceNumber]
let $charNumber = 0
let $letterPress = $currentSentence.substring($charNumber, $charNumber + 1)
$('#sentence').text($currentSentence)
$('#target-letter').text($letterPress)
let $letterHighlight = $('#yellow-block')
let $letterHighlightPosition = 180
let $isTimeCounting = false;
let $startDate;
let $startTime;
let $mistakes = 0



$(document).ready(function () {
    $("#keyboard-upper-container").hide();
})

$(document).keydown(function (key) {
    if (key.which === 16) {
        $($keyCaps).css('display', 'block')
        $($keyLowCaps).css('display', 'none')
        $(document).keyup(function (key1) {
            if (key1.which === 16) {
                $($keyCaps).css('display', 'none')
                $($keyLowCaps).css('display', 'block')
            }
        })
    }
})

$(document).keypress(function (whichkey) {
    let $key = $('#' + whichkey.which)
    $($key).css('background-color', 'yellow')
    $(document).keyup(function () {
        $($key).css('background-color', '#f5f5f5')
    })
})

$(document).keypress(function (key) {
    if ($isTimeCounting === false) {
        $startDate = new Date();
        $startTime = $startDate.getTime();
        $isTimeCounting = true;
    }
    if (key.which == $sentences[$sentenceNumber].charCodeAt($charNumber)) {
        let $correct = $("<span>✔</span>");
        $($correct).addClass('bg-success');
        $($correct).appendTo("#feedback");
        $letterHighlightPosition += 21
        $($letterHighlight).css('margin-left', $letterHighlightPosition + 'px')
        $charNumber++
        $letterPress = $currentSentence.substring($charNumber, $charNumber + 1)
        $('#target-letter').text($letterPress)
        if ($charNumber === $currentSentence.length) {
            $sentenceNumber++
            if ($sentenceNumber == $sentences.length) {
                let $endDate = new Date()
                let $endTime = $endDate.getTime()
                let $minutes = $endTime - $startTime / 60000
                $wpm = Math.round(54 / $minutes - 2 * $mistakes)
                var r = confirm("Your WPM is " + $wpm + ". Would you like to try again?");
                if (r == true) {
                    location.reload();
                }
            } else{
                $currentSentence = $sentences[$sentenceNumber]
                $('#sentence').text($currentSentence)
                $charNumber = 0
                $letterPress = $currentSentence.substring($charNumber, $charNumber + 1)
                $('#target-letter').text($letterPress)
                $letterHighlightPosition = 0
                $($letterHighlight).css('margin-left', $letterHighlightPosition + 'px')
                $('#feedback').text('')
            }
        }
    } else {
        let $wrong = $("<span>✗</span>");
            $($wrong).addClass('red');
            $($wrong).appendTo("#feedback");
            $mistakes++;
    }
})
