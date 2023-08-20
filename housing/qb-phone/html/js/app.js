} else if (PressedApplication == "houses") {
    $.post('https://qb-phone/SetupHouses', JSON.stringify({}), function(Houses){
        SetupPlayerHouses(Houses);
    });