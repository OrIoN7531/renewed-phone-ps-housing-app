function HouseTrack(propertyId)
    local coords

    if PropertiesTable[propertyId].propertyData.apartment ~= nil then
        local getConfigName = PropertiesTable[propertyId].propertyData.apartment
        coords = Config.Apartments[getConfigName].door
    else
        coords = PropertiesTable[propertyId].propertyData.door_data
    end

    SetNewWaypoint(coords.x, coords.y)
end

exports("HouseTrack", HouseTrack)
