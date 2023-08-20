let house;
let propertyId;

$(document).on('click', '.tab', function() {
    $('.tab-content').hide();
    $('.tab').removeClass('active');
    $(this).addClass('active');
    if ($(this).text() === 'Owned') {
        $('#owned').show();
    } else if ($(this).text() === 'Shared') {
        $('#shared').show();
    }
});

$(document).on('click', '.property-card', function(e){
    e.stopPropagation();
    var ownerOptions = $(this).find(".owner-options");
    ownerOptions.toggle();
    var HouseData = $(this).data('HouseData');
    if (HouseData && HouseData.propertyId) {
        propertyId = HouseData.propertyId;
    } else {
        console.error("HouseData not found or doesn't have a propertyId:", HouseData);
        return;
    }
    if (HouseData.numAccessNum > 0 && HouseData.has_access) {
        var sharedContainer = [];
        var self = this;
        $.post("https://qb-phone/GetPlayersWithAccess", JSON.stringify({
            propertyId: propertyId,
        }), function(playersWithAccess){
            if (playersWithAccess.length === 0) {
                $(self).find(".access-list").html('<li>No shared players.</li>');
            } else {
                $.each(playersWithAccess, function(index, sharedPlayer){
                    if (!sharedPlayer.citizenid) {
                        console.error("sharedPlayer doesn't have a citizenid property:", sharedPlayer);
                        return;
                    }
                    var playerName = sharedPlayer.name;
                    var sharedItem = '<li data-playerId=\'' + JSON.stringify(sharedPlayer) + '\'><i class="fas fa-user user-icon"></i><span>' + playerName + '</span><i class="fas fa-times remove-icon"></i></li>';
                    sharedContainer.push(sharedItem);
                });
                $(self).find(".access-list").html(sharedContainer.join(''));
            }
        });
    }
});

function ConfirmationFrame() {
    $('.spinner-input-frame').css("display", "flex");
    setTimeout(function () {
        $('.spinner-input-frame').css("display", "none");
        $('.checkmark-input-frame').css("display", "flex");
        setTimeout(function () {
            $('.checkmark-input-frame').css("display", "none");
        }, 2000)
    }, 1000)
}

function closeApp() {
    QB.Phone.Animations.TopSlideUp('.phone-application-container', 400, -160);
    QB.Phone.Animations.TopSlideUp('.'+QB.Phone.Data.currentApplication+"-app", 400, -160);
    setTimeout(function(){
        QB.Phone.Functions.ToggleApp(QB.Phone.Data.currentApplication, "none");
    }, 400)
    QB.Phone.Functions.HeaderTextColor("white", 300);
    QB.Phone.Data.currentApplication = null;
}

$(document).on('click', '.remove-icon', function(e){
    e.stopPropagation();
    
    var listItem = $(this).closest('li');
    var playerIdDataString = listItem.attr('data-playerId');
    
    if (playerIdDataString) {
        var playerIdData = JSON.parse(playerIdDataString);
    }

    if (!playerIdData || !playerIdData.citizenid) {
        console.error("playerId data attribute not found or doesn't have a citizenid property:", playerIdData);
        return;
    }

    var playerId = playerIdData.citizenid;
    var houseData = $(this).closest('.property-card').data('HouseData');

    $.post("https://qb-phone/KickPlayer", JSON.stringify({
        propertyId: houseData.propertyId,
        playerId: playerId,
    }));

    setTimeout(function(){
        ConfirmationFrame()
    }, 150);

    closeApp()
});


$(document).on('click', '.property-icon', function(e){
    e.stopPropagation();
    var houseData = $(this).closest('.property-card').data('HouseData');
    $.post("https://qb-phone/gpsProperty", JSON.stringify({
        house: houseData,
    }));
});

$(document).on('click', '.add-access-btn', function(e){
    e.stopPropagation();
    var userInputSection = $(this).siblings('.user-input-section');
    if (userInputSection.is(":visible")) {
        var stateid = userInputSection.find('.user-input').val();
        if (stateid !== "") {
            var houseData = $(this).closest('.property-card').data('HouseData');
            $.post("https://qb-phone/GiveKeys", JSON.stringify({
                propertyId: houseData.propertyId,
                hasAccess: houseData.has_access,
                id: stateid,
            }));
            userInputSection.find('.user-input').val('');
            userInputSection.hide();
            setTimeout(function(){
                ConfirmationFrame()
            }, 150);
            closeApp();
        } else {
            userInputSection.hide();
        }
    } else {
        userInputSection.show();
    }
});

$(document).on('click', '.user-input', function(e){
    e.stopPropagation();
});

document.addEventListener("DOMContentLoaded", function() {
    const userInputSection = document.querySelector('.user-input-section');

    userInputSection.addEventListener('keydown', function(event) {
        event.stopPropagation();
    });
});


SetupPlayerHouses = function (Houses) {
    $("#owned").html('<p class="no-properties-message">You don\'t own any property...</p>');
    $("#shared").html('<p class="no-properties-message">You don\'t have the keys to someone else\'s property</p>');
    if (Houses != null) {
        $.each(Houses, function (i, house) {
            var Element = '<div class="property-card" id="house-' + i + '">';
            Element += '<div class="property-header">';
            Element += '<h3 class="property-address">' + house.houseName + '</h3>';
            Element += '<i class="fas ' + house.houseIcon + ' property-icon" data-toggle="tooltip" data-placement="top" title="Owner: ' + house.fullname + '<br>Click to set GPS"></i>';
            Element += '</div>';
            Element += '<div class="property-info">';
            Element += '<i class="fas fa-box info-icon" data-toggle="tooltip" data-placement="top" title="' + house.shellName + '"></i>';
            Element += '<i class="fas fa-user-friends users-icon" data-toggle="tooltip" data-placement="top" title="' + house.numAccess + '"></i>';
            Element += '<i class="fas fa-car info-icon" data-toggle="tooltip" data-placement="top" title="' + house.garageStatus + '"></i>';
            Element += '</div>';
            if (house.has_access) {
                Element += '<div class="owner-options" style="display: none;">';
                Element += '<div class="add-user-section">';
                Element += '<button class="add-access-btn"><i class="fas fa-plus" data-toggle="tooltip" data-placement="top" title="Add player by ID"></i></button>';
                Element += '<div class="user-input-section" style="display: none;">';
                Element += '<input type="text" class="user-input" placeholder="STATE ID NOT CITIZEN!">';
                Element += '</div>';
                Element += '</div>';
                Element += '<ul class="access-list">';
                Element += '</ul>';
                Element += '</div>';
            }
            Element += '</div>';
            if (house.has_access) {
                $("#owned").append(Element);
            } else {
                $("#shared").append(Element);
            }
            $("#house-" + i).data('HouseData', house);
        });

        if ($("#owned .property-card").length === 0) {
            console.log("Showing owned no-properties-message");
            $("#owned .no-properties-message").show();
        } else {
            console.log("Hiding owned no-properties-message");
            $("#owned .no-properties-message").hide();
        }
            
        if ($("#shared .property-card").length === 0) {
            console.log("Showing shared no-properties-message");
            $("#shared .no-properties-message").show();
        } else {
            console.log("Hiding shared no-properties-message");
            $("#shared .no-properties-message").hide();
        }


        $('[data-toggle="tooltip"]').tooltip({ html: true });
    }
};
