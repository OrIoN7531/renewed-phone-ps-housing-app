lib.callback.register("ps-housing:server:GetPlayerProperties", function(source)
    local Player = QBCore.Functions.GetPlayer(source)
    local Properties = {}
    local citizenid = Player.PlayerData.citizenid

    while dbloaded == false do
        Wait(2000)
    end

    for _, v in pairs(PropertiesTable) do
        local propertyData = v.propertyData

        while not propertyData do
            Wait(500)
        end

        local checkAccess = lib.table.contains(propertyData.has_access, citizenid)
        if propertyData.owner == citizenid or checkAccess then
            local fullName = ""
            local Haccess = false
            local streeto

            if propertyData.street == nil and propertyData.apartment ~= nil then
                streeto = propertyData.apartment
            elseif propertyData.street ~= nil then
                streeto = propertyData.street
            else
                streeto = "Something is broken"
            end

            local HouseName = streeto .. " " .. propertyData.property_id
            local checkNum = #propertyData.has_access
            local numAccess = "Shared with: " .. #propertyData.has_access .. " friends"
            
            local getName = QBCore.Functions.GetPlayerByCitizenId(propertyData.owner) or QBCore.Functions.GetOfflinePlayerByCitizenId(propertyData.owner)
            local playerData = getName.PlayerData
            if playerData then
                fullName = playerData.charinfo.firstname .. " " .. playerData.charinfo.lastname
            end

            if propertyData.owner == citizenid then
                if checkNum < 1 then
                    numAccess = "Not shared"
                elseif checkNum == 1 then
                    numAccess = "Shared with: " .. #propertyData.has_access .. " friend"
                else
                    numAccess = "Shared with: " .. #propertyData.has_access .. " friends"
                end
                Haccess = true
            else
                numAccess = "It's not your property"
                Haccess = false
            end

            Properties[#Properties + 1] = {
                fullname = fullName,
                houseName = HouseName,
                shellName = propertyData.shell,
                propertyId = propertyData.property_id,
                has_access = Haccess,
                numAccess = numAccess,
                houseIcon = propertyData.apartment and "fa-home" or "fa-building",
                numAccessNum = #propertyData.has_access,
                garageStatus = propertyData.garage_data.x and "Have garage" or "Doesn't have garage"
            }
            print("garage_data: ", propertyData.garage_data.x)
        end
    end
    return Properties
end)
