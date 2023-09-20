# renewed-phone-ps-housing-app

1. qb-phone/html/index.html replace 
```
                    <div class="houses-app">
                        <div class="houses-app-header">
                            <div class="houses-app-header-tab houses-app-header-tab-selected" data-housetab="myhouses"><p>My Houses</p></div>
                            <div class="houses-app-header-tab" data-housetab="mykeys"><p>My Keys</p></div>
                        </div>

                        <div class="house-app-myhouses-container">
                            <div class="myhouses-house">
                                <div class="myhouse-house-icon"><i class="fas fa-home"></i></div>
                                <div class="myhouse-house-titel">Grove St. 1 | Tier 1</div>
                                <div class="myhouse-house-details"><i class="fas fa-key"></i>&nbsp;&nbsp;5</div>
                            </div>
                        </div>

                        <div class="house-app-mykeys-container">
                        </div>

                        <div class="phone-menu-body" id="house-transfer-new-box">
                            <div class="phone-menu-main">
                                <input class="phone-menu-text myhouse-option-transfer-container-citizenid" type="text"><i class="fas fa-id-card" id="phone-menu-icon"></i><span class="phone-menu-title">CSN</span>
                                <p> </p>
                                <div class="phone-menu-button phone-menu-cancel" id="box-new-cancel">Cancel</div>
                                <div class="phone-menu-button phone-menu-accept" id="myhouse-option-transfer-confirm">Submit</div>
                            </div>
                        </div>

                        <div class="myhouses-options-container">
                            <div class="myhouses-options">
                                <div class="myhouses-options-header">Grove St. 1</div>
                                <div class="myhouses-option" id="myhouse-option-transfer">TRANSFER</div>
                                <div class="myhouses-option" id="myhouse-option-keys">KEYS</div>
                                <br>
                                <br>
                                <div class="myhouses-option" id="myhouse-option-close">CLOSE</div>
                            </div>

                            <div class="myhouse-option-transfer-container">
                                <div class="myhouse-option-transfer-container-header">Transfer House</div>
                                <input class="myhouse-option-transfer-container-citizenid" type="text" spellcheck="false" placeholder="CSN" required>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <div class="myhouses-option" id="myhouse-option-transfer-confirm">CONFIRM</div>
                                <div class="myhouses-option" id="myhouse-option-transfer-back">RETURN</div>
                            </div>

                            <div class="myhouse-option-keys-container">
                                <div class="keys-container">
                                </div>
                                <div class="myhouses-option" id="myhouse-option-keys-back">RETURN</div>
                            </div>
                        </div>
                    </div>
```

With
```
<div class="houses-app">
                        
    <div class="house-container">
        <div class="tabs">
            <button class="tab active">Owned</button>
            <button class="tab">Shared</button>
        </div>
        <div id="owned" class="tab-content">
            <p class="no-properties-message" style="display: none;">You don't own any property...</p>
            <div class="property-card">
                <div class="property-header">
                    <h3 class="property-address">123 Main St, City</h3>
                    <i class="fas fa-home property-icon"></i>
                </div>
                <div class="property-info">
                    <i class="fas fa-box info-icon" title="Shell"></i>
                    <i class="fas fa-user-friends users-icon" title="3 Users"></i>
                    <i class="fas fa-car info-icon" title="Garage"></i>
                </div>
                <div class="owner-options">
                    <div class="add-user-section">
                        <button class="add-access-btn"><i class="fas fa-plus"></i></button>
                        <div class="user-input-section" style="display: none;">
                            <input type="text" class="user-input" placeholder="Add User">
                        </div>
                    </div>
                    <ul class="access-list">
                        <li>
                            <i class="fas fa-user user-icon"></i>
                            <span>John Doe</span>
                            <i class="fas fa-times remove-icon"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="shared" class="tab-content" style="display: none;">
            <p class="no-properties-message" style="display: none;">You don't have the keys to someone else's property</p>
            <div class="property-card">
                <div class="property-header">
                    <h3 class="property-address">456 Elm St, City</h3>
                    <i class="fas fa-building property-icon"></i>
                </div>
                <div class="property-info">
                    <i class="fas fa-box info-icon" title="Shell"></i>
                    <i class="fas fa-user-friends users-icon" title="3 Users"></i>
                    <i class="fas fa-car info-icon" title="Garage"></i>
                </div>
                <div class="owner-options">
                    <div class="add-user-section">
                        <button class="add-access-btn"><i class="fas fa-plus"></i></button>
                        <div class="user-input-section" style="display: none;">
                            <input type="text" class="user-input" placeholder="Add User">
                        </div>
                    </div>
                    <ul class="access-list">
                        <li>
                            <i class="fas fa-user user-icon"></i>
                            <span>John Doe</span>
                            <i class="fas fa-times remove-icon"></i>
                        </li>
                    </ul>
                </div>
            </div>
        </div>            
    </div>
    
</div>
```

2. qb-phone/html/js/app.js replace

```
                } else if (PressedApplication == "houses") {
                    $.post('https://qb-phone/GetPlayerHouses', JSON.stringify({}), function(Houses){
                        SetupPlayerHouses(Houses);
                    });
                    $.post('https://qb-phone/GetPlayerKeys', JSON.stringify({}), function(Keys){
                        $(".house-app-mykeys-container").html("");
                        if (Keys.length > 0) {
                            $.each(Keys, function(i, key){
                                var elem = '<div class="mykeys-key" id="keyid-'+i+'"><span class="mykeys-key-label">' + key.HouseData.adress + '</span> <span class="mykeys-key-sub">Click to set GPS</span> </div>';
                                $(".house-app-mykeys-container").append(elem);
                                $("#keyid-"+i).data('KeyData', key);
                            });
                        }
                    });
```

With

```
} else if (PressedApplication == "houses") {
    $.post('https://qb-phone/SetupHouses', JSON.stringify({}), function(Houses){
        SetupPlayerHouses(Houses);
    });
```

3. qb-phone/html/js/houses.js Replace the file for the file I provided!
4. qb-phone/html/css/houses.css Replace the file for the file I provided!
5. qb-phone/client/houses.lua Replace the file for the file I provided!
6. qb-phone/server/houses.lua Replace the file for the file I provided!

7. ps-housing/server/server.lua paste at the bottom the following code:

```
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
```

8. ps-housing/client/client.lua paste at the bottom following code:

```
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
```
9. qb-phone/fxmanifest.lua add into shared_scripts:

'@ox_lib/init.lua',

Example before:
```
shared_scripts {
    'config.lua',
    '@qb-apartments/config.lua',
    '@qb-garages/config.lua',
}
```

Example after:
```
shared_scripts {
    'config.lua',
    '@qb-apartments/config.lua',
    '@qb-garages/config.lua',
    '@ox_lib/init.lua',
}
```
