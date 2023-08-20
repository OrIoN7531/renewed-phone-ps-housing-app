-- NUI Callback

RegisterNUICallback('SetupHouses', function(_, cb)
    lib.callback('ps-housing:server:GetPlayerProperties', false, function(Houses)
        cb(Houses)
    end)
end)

RegisterNUICallback('gpsProperty', function(data, cb)
    local house = data.house
    local property = house.propertyId

    exports['ps-housing']:HouseTrack(property)

    --TriggerServerEvent('setPlayerWaypoint', property)

    TriggerEvent('qb-phone:client:CustomNotification', "PROPERTIES", "GPS Marker Set!", "fas fa-car", "#e84118", 5000)

    cb("ok")
end)

RegisterNUICallback('GiveKeys', function(data, cb)
    TriggerServerEvent('qb-phone:server:giveKeys', data)
    cb("ok")
end)

RegisterNUICallback('KickPlayer', function(data, cb)
    TriggerServerEvent("ps-housing:server:removeAccess", data.propertyId, data.playerId)
    cb("ok")
end)

RegisterNetEvent('qb-phone:client:giveKeys', function(property, toplayer)
    TriggerServerEvent("ps-housing:server:addAccess", property, toplayer)
end)

RegisterNUICallback('GetPlayersWithAccess', function(data, cb)
    local propertyId = data.propertyId
    local playersWithAccess = lib.callback.await("ps-housing:cb:getPlayersWithAccess", source, propertyId)
    cb(playersWithAccess)
end)

