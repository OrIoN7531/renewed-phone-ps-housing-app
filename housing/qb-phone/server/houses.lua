RegisterNetEvent('qb-phone:server:giveKeys', function(data)
    local src = source
    local Player = QBCore.Functions.GetPlayer(src)
    local toplayer = tonumber(data.id)
    local OtherAsshole = QBCore.Functions.GetPlayer(toplayer)
    local property = tonumber(data.propertyId)

    if data.hasAccess == false then 
        TriggerClientEvent("QBCore:Notify", src, 'You are not an owner!', "error")
        return 
    end
    if not OtherAsshole then TriggerClientEvent("QBCore:Notify", src, 'State ID does not exist!', "error") return false end
    if not data.propertyId then return end
    if Player.PlayerData.citizenid == OtherAsshole.PlayerData.citizenid then return TriggerClientEvent("QBCore:Notify", src, 'You cannot give keys to yourself!', "error") end

    TriggerClientEvent("qb-phone:client:giveKeys", src, property, toplayer)
    TriggerClientEvent("QBCore:Notify", src, 'Done!', "success")
end)
