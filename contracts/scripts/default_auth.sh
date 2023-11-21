#!/bin/bash
set -euo pipefail
pushd $(dirname "$0")/..

export RPC_URL="http://localhost:5050";

# export RPC_URL="https://api.cartridge.gg/x/beer-baron-prod-2/katana"

export WORLD_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.world.address')

export AUCTIONS_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "auctions" ).address')
export BREWING_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "brewing" ).address')
export FARMING_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "farming" ).address')
export LOBBY_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "lobby" ).address')
export TRADING_ADDRESS=$(cat ./target/dev/manifest.json | jq -r '.contracts[] | select(.name == "trading" ).address')

echo "---------------------------------------------------------------------------"
echo world : $WORLD_ADDRESS 
echo " "
echo actions : $AUCTIONS_ADDRESS
echo "---------------------------------------------------------------------------"

# enable system -> component authorizations
COMPONENTS=("Auction" "Brew" "BrewBatchTrack" "FarmArea" "Game" "GameTracker" "IndulgenceAuction" "IndulgenceAuctionCount" "ItemBalance" "Joined" "Ownership" "Player" "TavernAuction" "Trade" "TradeTrack")

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component $AUCTIONS_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL

    echo ${component}
    sleep 1 
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component $BREWING_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 1 
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component $FARMING_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 1 
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component $LOBBY_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL

    echo ${LOBBY_ADDRESS}
    echo ${component}
    sleep 1 
done

for component in ${COMPONENTS[@]}; do
    sozo auth writer $component $TRADING_ADDRESS --world $WORLD_ADDRESS --rpc-url $RPC_URL
    sleep 1 
done

echo "Default authorizations have been successfully set."