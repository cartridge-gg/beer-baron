import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  bool: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u8: { input: any; output: any; }
  u32: { input: any; output: any; }
  u64: { input: any; output: any; }
  u128: { input: any; output: any; }
};

export type Auction = {
  __typename?: 'Auction';
  decay_constant_mag?: Maybe<Scalars['u128']['output']>;
  decay_constant_sign?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u64']['output']>;
  max_sellable?: Maybe<Scalars['u128']['output']>;
  sold?: Maybe<Scalars['u64']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  target_price?: Maybe<Scalars['u128']['output']>;
  time_scale_mag?: Maybe<Scalars['u128']['output']>;
  time_scale_sign?: Maybe<Scalars['bool']['output']>;
};

export type AuctionConnection = {
  __typename?: 'AuctionConnection';
  edges?: Maybe<Array<Maybe<AuctionEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type AuctionEdge = {
  __typename?: 'AuctionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Auction>;
};

export type AuctionOrder = {
  direction: OrderDirection;
  field: AuctionOrderField;
};

export enum AuctionOrderField {
  DecayConstantMag = 'DECAY_CONSTANT_MAG',
  DecayConstantSign = 'DECAY_CONSTANT_SIGN',
  GameId = 'GAME_ID',
  ItemId = 'ITEM_ID',
  MaxSellable = 'MAX_SELLABLE',
  Sold = 'SOLD',
  StartTime = 'START_TIME',
  TargetPrice = 'TARGET_PRICE',
  TimeScaleMag = 'TIME_SCALE_MAG',
  TimeScaleSign = 'TIME_SCALE_SIGN'
}

export type AuctionWhereInput = {
  decay_constant_mag?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magEQ?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magGT?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magGTE?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magLT?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magLTE?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magNEQ?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_sign?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signEQ?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signGT?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signGTE?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signLT?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signLTE?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signNEQ?: InputMaybe<Scalars['bool']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  item_id?: InputMaybe<Scalars['u64']['input']>;
  item_idEQ?: InputMaybe<Scalars['u64']['input']>;
  item_idGT?: InputMaybe<Scalars['u64']['input']>;
  item_idGTE?: InputMaybe<Scalars['u64']['input']>;
  item_idLT?: InputMaybe<Scalars['u64']['input']>;
  item_idLTE?: InputMaybe<Scalars['u64']['input']>;
  item_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  max_sellable?: InputMaybe<Scalars['u128']['input']>;
  max_sellableEQ?: InputMaybe<Scalars['u128']['input']>;
  max_sellableGT?: InputMaybe<Scalars['u128']['input']>;
  max_sellableGTE?: InputMaybe<Scalars['u128']['input']>;
  max_sellableLT?: InputMaybe<Scalars['u128']['input']>;
  max_sellableLTE?: InputMaybe<Scalars['u128']['input']>;
  max_sellableNEQ?: InputMaybe<Scalars['u128']['input']>;
  sold?: InputMaybe<Scalars['u64']['input']>;
  soldEQ?: InputMaybe<Scalars['u64']['input']>;
  soldGT?: InputMaybe<Scalars['u64']['input']>;
  soldGTE?: InputMaybe<Scalars['u64']['input']>;
  soldLT?: InputMaybe<Scalars['u64']['input']>;
  soldLTE?: InputMaybe<Scalars['u64']['input']>;
  soldNEQ?: InputMaybe<Scalars['u64']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  target_price?: InputMaybe<Scalars['u128']['input']>;
  target_priceEQ?: InputMaybe<Scalars['u128']['input']>;
  target_priceGT?: InputMaybe<Scalars['u128']['input']>;
  target_priceGTE?: InputMaybe<Scalars['u128']['input']>;
  target_priceLT?: InputMaybe<Scalars['u128']['input']>;
  target_priceLTE?: InputMaybe<Scalars['u128']['input']>;
  target_priceNEQ?: InputMaybe<Scalars['u128']['input']>;
  time_scale_mag?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magEQ?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magGT?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magGTE?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magLT?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magLTE?: InputMaybe<Scalars['u128']['input']>;
  time_scale_magNEQ?: InputMaybe<Scalars['u128']['input']>;
  time_scale_sign?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signEQ?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signGT?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signGTE?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signLT?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signLTE?: InputMaybe<Scalars['bool']['input']>;
  time_scale_signNEQ?: InputMaybe<Scalars['bool']['input']>;
};

export type Brew = {
  __typename?: 'Brew';
  batch_id?: Maybe<Scalars['u64']['output']>;
  batch_key?: Maybe<Scalars['u64']['output']>;
  beer_id?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
  status?: Maybe<Scalars['u64']['output']>;
  time_built?: Maybe<Scalars['u64']['output']>;
};

export type BrewBatchTrack = {
  __typename?: 'BrewBatchTrack';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type BrewBatchTrackConnection = {
  __typename?: 'BrewBatchTrackConnection';
  edges?: Maybe<Array<Maybe<BrewBatchTrackEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type BrewBatchTrackEdge = {
  __typename?: 'BrewBatchTrackEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<BrewBatchTrack>;
};

export type BrewBatchTrackOrder = {
  direction: OrderDirection;
  field: BrewBatchTrackOrderField;
};

export enum BrewBatchTrackOrderField {
  Count = 'COUNT',
  GameId = 'GAME_ID',
  Owner = 'OWNER'
}

export type BrewBatchTrackWhereInput = {
  count?: InputMaybe<Scalars['u64']['input']>;
  countEQ?: InputMaybe<Scalars['u64']['input']>;
  countGT?: InputMaybe<Scalars['u64']['input']>;
  countGTE?: InputMaybe<Scalars['u64']['input']>;
  countLT?: InputMaybe<Scalars['u64']['input']>;
  countLTE?: InputMaybe<Scalars['u64']['input']>;
  countNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type BrewConnection = {
  __typename?: 'BrewConnection';
  edges?: Maybe<Array<Maybe<BrewEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type BrewEdge = {
  __typename?: 'BrewEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Brew>;
};

export type BrewOrder = {
  direction: OrderDirection;
  field: BrewOrderField;
};

export enum BrewOrderField {
  BatchId = 'BATCH_ID',
  BatchKey = 'BATCH_KEY',
  BeerId = 'BEER_ID',
  GameId = 'GAME_ID',
  Owner = 'OWNER',
  PlayerId = 'PLAYER_ID',
  Status = 'STATUS',
  TimeBuilt = 'TIME_BUILT'
}

export type BrewWhereInput = {
  batch_id?: InputMaybe<Scalars['u64']['input']>;
  batch_idEQ?: InputMaybe<Scalars['u64']['input']>;
  batch_idGT?: InputMaybe<Scalars['u64']['input']>;
  batch_idGTE?: InputMaybe<Scalars['u64']['input']>;
  batch_idLT?: InputMaybe<Scalars['u64']['input']>;
  batch_idLTE?: InputMaybe<Scalars['u64']['input']>;
  batch_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  batch_key?: InputMaybe<Scalars['u64']['input']>;
  batch_keyEQ?: InputMaybe<Scalars['u64']['input']>;
  batch_keyGT?: InputMaybe<Scalars['u64']['input']>;
  batch_keyGTE?: InputMaybe<Scalars['u64']['input']>;
  batch_keyLT?: InputMaybe<Scalars['u64']['input']>;
  batch_keyLTE?: InputMaybe<Scalars['u64']['input']>;
  batch_keyNEQ?: InputMaybe<Scalars['u64']['input']>;
  beer_id?: InputMaybe<Scalars['u64']['input']>;
  beer_idEQ?: InputMaybe<Scalars['u64']['input']>;
  beer_idGT?: InputMaybe<Scalars['u64']['input']>;
  beer_idGTE?: InputMaybe<Scalars['u64']['input']>;
  beer_idLT?: InputMaybe<Scalars['u64']['input']>;
  beer_idLTE?: InputMaybe<Scalars['u64']['input']>;
  beer_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  ownerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  status?: InputMaybe<Scalars['u64']['input']>;
  statusEQ?: InputMaybe<Scalars['u64']['input']>;
  statusGT?: InputMaybe<Scalars['u64']['input']>;
  statusGTE?: InputMaybe<Scalars['u64']['input']>;
  statusLT?: InputMaybe<Scalars['u64']['input']>;
  statusLTE?: InputMaybe<Scalars['u64']['input']>;
  statusNEQ?: InputMaybe<Scalars['u64']['input']>;
  time_built?: InputMaybe<Scalars['u64']['input']>;
  time_builtEQ?: InputMaybe<Scalars['u64']['input']>;
  time_builtGT?: InputMaybe<Scalars['u64']['input']>;
  time_builtGTE?: InputMaybe<Scalars['u64']['input']>;
  time_builtLT?: InputMaybe<Scalars['u64']['input']>;
  time_builtLTE?: InputMaybe<Scalars['u64']['input']>;
  time_builtNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type FarmArea = {
  __typename?: 'FarmArea';
  area_id?: Maybe<Scalars['u64']['output']>;
  area_type?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
  time_built?: Maybe<Scalars['u64']['output']>;
};

export type FarmAreaConnection = {
  __typename?: 'FarmAreaConnection';
  edges?: Maybe<Array<Maybe<FarmAreaEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type FarmAreaEdge = {
  __typename?: 'FarmAreaEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<FarmArea>;
};

export type FarmAreaOrder = {
  direction: OrderDirection;
  field: FarmAreaOrderField;
};

export enum FarmAreaOrderField {
  AreaId = 'AREA_ID',
  AreaType = 'AREA_TYPE',
  GameId = 'GAME_ID',
  PlayerId = 'PLAYER_ID',
  TimeBuilt = 'TIME_BUILT'
}

export type FarmAreaWhereInput = {
  area_id?: InputMaybe<Scalars['u64']['input']>;
  area_idEQ?: InputMaybe<Scalars['u64']['input']>;
  area_idGT?: InputMaybe<Scalars['u64']['input']>;
  area_idGTE?: InputMaybe<Scalars['u64']['input']>;
  area_idLT?: InputMaybe<Scalars['u64']['input']>;
  area_idLTE?: InputMaybe<Scalars['u64']['input']>;
  area_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  area_type?: InputMaybe<Scalars['u64']['input']>;
  area_typeEQ?: InputMaybe<Scalars['u64']['input']>;
  area_typeGT?: InputMaybe<Scalars['u64']['input']>;
  area_typeGTE?: InputMaybe<Scalars['u64']['input']>;
  area_typeLT?: InputMaybe<Scalars['u64']['input']>;
  area_typeLTE?: InputMaybe<Scalars['u64']['input']>;
  area_typeNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  time_built?: InputMaybe<Scalars['u64']['input']>;
  time_builtEQ?: InputMaybe<Scalars['u64']['input']>;
  time_builtGT?: InputMaybe<Scalars['u64']['input']>;
  time_builtGTE?: InputMaybe<Scalars['u64']['input']>;
  time_builtLT?: InputMaybe<Scalars['u64']['input']>;
  time_builtLTE?: InputMaybe<Scalars['u64']['input']>;
  time_builtNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type Game = {
  __typename?: 'Game';
  entity?: Maybe<World__Entity>;
  entry_fee?: Maybe<Scalars['u32']['output']>;
  game_id?: Maybe<Scalars['u64']['output']>;
  game_length?: Maybe<Scalars['u32']['output']>;
  max_players?: Maybe<Scalars['u32']['output']>;
  number_players?: Maybe<Scalars['u32']['output']>;
  password?: Maybe<Scalars['felt252']['output']>;
  seed?: Maybe<Scalars['u64']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  status?: Maybe<Scalars['u64']['output']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Game>;
};

export type GameOrder = {
  direction: OrderDirection;
  field: GameOrderField;
};

export enum GameOrderField {
  EntryFee = 'ENTRY_FEE',
  GameId = 'GAME_ID',
  GameLength = 'GAME_LENGTH',
  MaxPlayers = 'MAX_PLAYERS',
  NumberPlayers = 'NUMBER_PLAYERS',
  Password = 'PASSWORD',
  Seed = 'SEED',
  StartTime = 'START_TIME',
  Status = 'STATUS'
}

export type GameTracker = {
  __typename?: 'GameTracker';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
};

export type GameTrackerConnection = {
  __typename?: 'GameTrackerConnection';
  edges?: Maybe<Array<Maybe<GameTrackerEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type GameTrackerEdge = {
  __typename?: 'GameTrackerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<GameTracker>;
};

export type GameTrackerOrder = {
  direction: OrderDirection;
  field: GameTrackerOrderField;
};

export enum GameTrackerOrderField {
  Count = 'COUNT',
  EntityId = 'ENTITY_ID'
}

export type GameTrackerWhereInput = {
  count?: InputMaybe<Scalars['u64']['input']>;
  countEQ?: InputMaybe<Scalars['u64']['input']>;
  countGT?: InputMaybe<Scalars['u64']['input']>;
  countGTE?: InputMaybe<Scalars['u64']['input']>;
  countLT?: InputMaybe<Scalars['u64']['input']>;
  countLTE?: InputMaybe<Scalars['u64']['input']>;
  countNEQ?: InputMaybe<Scalars['u64']['input']>;
  entity_id?: InputMaybe<Scalars['u64']['input']>;
  entity_idEQ?: InputMaybe<Scalars['u64']['input']>;
  entity_idGT?: InputMaybe<Scalars['u64']['input']>;
  entity_idGTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idLT?: InputMaybe<Scalars['u64']['input']>;
  entity_idLTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type GameWhereInput = {
  entry_fee?: InputMaybe<Scalars['u32']['input']>;
  entry_feeEQ?: InputMaybe<Scalars['u32']['input']>;
  entry_feeGT?: InputMaybe<Scalars['u32']['input']>;
  entry_feeGTE?: InputMaybe<Scalars['u32']['input']>;
  entry_feeLT?: InputMaybe<Scalars['u32']['input']>;
  entry_feeLTE?: InputMaybe<Scalars['u32']['input']>;
  entry_feeNEQ?: InputMaybe<Scalars['u32']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_length?: InputMaybe<Scalars['u32']['input']>;
  game_lengthEQ?: InputMaybe<Scalars['u32']['input']>;
  game_lengthGT?: InputMaybe<Scalars['u32']['input']>;
  game_lengthGTE?: InputMaybe<Scalars['u32']['input']>;
  game_lengthLT?: InputMaybe<Scalars['u32']['input']>;
  game_lengthLTE?: InputMaybe<Scalars['u32']['input']>;
  game_lengthNEQ?: InputMaybe<Scalars['u32']['input']>;
  max_players?: InputMaybe<Scalars['u32']['input']>;
  max_playersEQ?: InputMaybe<Scalars['u32']['input']>;
  max_playersGT?: InputMaybe<Scalars['u32']['input']>;
  max_playersGTE?: InputMaybe<Scalars['u32']['input']>;
  max_playersLT?: InputMaybe<Scalars['u32']['input']>;
  max_playersLTE?: InputMaybe<Scalars['u32']['input']>;
  max_playersNEQ?: InputMaybe<Scalars['u32']['input']>;
  number_players?: InputMaybe<Scalars['u32']['input']>;
  number_playersEQ?: InputMaybe<Scalars['u32']['input']>;
  number_playersGT?: InputMaybe<Scalars['u32']['input']>;
  number_playersGTE?: InputMaybe<Scalars['u32']['input']>;
  number_playersLT?: InputMaybe<Scalars['u32']['input']>;
  number_playersLTE?: InputMaybe<Scalars['u32']['input']>;
  number_playersNEQ?: InputMaybe<Scalars['u32']['input']>;
  password?: InputMaybe<Scalars['felt252']['input']>;
  passwordEQ?: InputMaybe<Scalars['felt252']['input']>;
  passwordGT?: InputMaybe<Scalars['felt252']['input']>;
  passwordGTE?: InputMaybe<Scalars['felt252']['input']>;
  passwordLT?: InputMaybe<Scalars['felt252']['input']>;
  passwordLTE?: InputMaybe<Scalars['felt252']['input']>;
  passwordNEQ?: InputMaybe<Scalars['felt252']['input']>;
  seed?: InputMaybe<Scalars['u64']['input']>;
  seedEQ?: InputMaybe<Scalars['u64']['input']>;
  seedGT?: InputMaybe<Scalars['u64']['input']>;
  seedGTE?: InputMaybe<Scalars['u64']['input']>;
  seedLT?: InputMaybe<Scalars['u64']['input']>;
  seedLTE?: InputMaybe<Scalars['u64']['input']>;
  seedNEQ?: InputMaybe<Scalars['u64']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  status?: InputMaybe<Scalars['u64']['input']>;
  statusEQ?: InputMaybe<Scalars['u64']['input']>;
  statusGT?: InputMaybe<Scalars['u64']['input']>;
  statusGTE?: InputMaybe<Scalars['u64']['input']>;
  statusLT?: InputMaybe<Scalars['u64']['input']>;
  statusLTE?: InputMaybe<Scalars['u64']['input']>;
  statusNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type IndulgenceAuction = {
  __typename?: 'IndulgenceAuction';
  auction_id?: Maybe<Scalars['u64']['output']>;
  auction_id_value?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  expiry?: Maybe<Scalars['u64']['output']>;
  game_id?: Maybe<Scalars['u64']['output']>;
  highest_bid_player_id?: Maybe<Scalars['ContractAddress']['output']>;
  price?: Maybe<Scalars['u64']['output']>;
  status?: Maybe<Scalars['u8']['output']>;
};

export type IndulgenceAuctionConnection = {
  __typename?: 'IndulgenceAuctionConnection';
  edges?: Maybe<Array<Maybe<IndulgenceAuctionEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type IndulgenceAuctionCount = {
  __typename?: 'IndulgenceAuctionCount';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
};

export type IndulgenceAuctionCountConnection = {
  __typename?: 'IndulgenceAuctionCountConnection';
  edges?: Maybe<Array<Maybe<IndulgenceAuctionCountEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type IndulgenceAuctionCountEdge = {
  __typename?: 'IndulgenceAuctionCountEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<IndulgenceAuctionCount>;
};

export type IndulgenceAuctionCountOrder = {
  direction: OrderDirection;
  field: IndulgenceAuctionCountOrderField;
};

export enum IndulgenceAuctionCountOrderField {
  Count = 'COUNT',
  GameId = 'GAME_ID'
}

export type IndulgenceAuctionCountWhereInput = {
  count?: InputMaybe<Scalars['u64']['input']>;
  countEQ?: InputMaybe<Scalars['u64']['input']>;
  countGT?: InputMaybe<Scalars['u64']['input']>;
  countGTE?: InputMaybe<Scalars['u64']['input']>;
  countLT?: InputMaybe<Scalars['u64']['input']>;
  countLTE?: InputMaybe<Scalars['u64']['input']>;
  countNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type IndulgenceAuctionEdge = {
  __typename?: 'IndulgenceAuctionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<IndulgenceAuction>;
};

export type IndulgenceAuctionOrder = {
  direction: OrderDirection;
  field: IndulgenceAuctionOrderField;
};

export enum IndulgenceAuctionOrderField {
  AuctionId = 'AUCTION_ID',
  AuctionIdValue = 'AUCTION_ID_VALUE',
  Expiry = 'EXPIRY',
  GameId = 'GAME_ID',
  HighestBidPlayerId = 'HIGHEST_BID_PLAYER_ID',
  Price = 'PRICE',
  Status = 'STATUS'
}

export type IndulgenceAuctionWhereInput = {
  auction_id?: InputMaybe<Scalars['u64']['input']>;
  auction_idEQ?: InputMaybe<Scalars['u64']['input']>;
  auction_idGT?: InputMaybe<Scalars['u64']['input']>;
  auction_idGTE?: InputMaybe<Scalars['u64']['input']>;
  auction_idLT?: InputMaybe<Scalars['u64']['input']>;
  auction_idLTE?: InputMaybe<Scalars['u64']['input']>;
  auction_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  auction_id_value?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueEQ?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueGT?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueGTE?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueLT?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueLTE?: InputMaybe<Scalars['u64']['input']>;
  auction_id_valueNEQ?: InputMaybe<Scalars['u64']['input']>;
  expiry?: InputMaybe<Scalars['u64']['input']>;
  expiryEQ?: InputMaybe<Scalars['u64']['input']>;
  expiryGT?: InputMaybe<Scalars['u64']['input']>;
  expiryGTE?: InputMaybe<Scalars['u64']['input']>;
  expiryLT?: InputMaybe<Scalars['u64']['input']>;
  expiryLTE?: InputMaybe<Scalars['u64']['input']>;
  expiryNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  highest_bid_player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  highest_bid_player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  price?: InputMaybe<Scalars['u64']['input']>;
  priceEQ?: InputMaybe<Scalars['u64']['input']>;
  priceGT?: InputMaybe<Scalars['u64']['input']>;
  priceGTE?: InputMaybe<Scalars['u64']['input']>;
  priceLT?: InputMaybe<Scalars['u64']['input']>;
  priceLTE?: InputMaybe<Scalars['u64']['input']>;
  priceNEQ?: InputMaybe<Scalars['u64']['input']>;
  status?: InputMaybe<Scalars['u8']['input']>;
  statusEQ?: InputMaybe<Scalars['u8']['input']>;
  statusGT?: InputMaybe<Scalars['u8']['input']>;
  statusGTE?: InputMaybe<Scalars['u8']['input']>;
  statusLT?: InputMaybe<Scalars['u8']['input']>;
  statusLTE?: InputMaybe<Scalars['u8']['input']>;
  statusNEQ?: InputMaybe<Scalars['u8']['input']>;
};

export type ItemBalance = {
  __typename?: 'ItemBalance';
  balance?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u64']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type ItemBalanceConnection = {
  __typename?: 'ItemBalanceConnection';
  edges?: Maybe<Array<Maybe<ItemBalanceEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type ItemBalanceEdge = {
  __typename?: 'ItemBalanceEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<ItemBalance>;
};

export type ItemBalanceOrder = {
  direction: OrderDirection;
  field: ItemBalanceOrderField;
};

export enum ItemBalanceOrderField {
  Balance = 'BALANCE',
  GameId = 'GAME_ID',
  ItemId = 'ITEM_ID',
  PlayerId = 'PLAYER_ID'
}

export type ItemBalanceWhereInput = {
  balance?: InputMaybe<Scalars['u64']['input']>;
  balanceEQ?: InputMaybe<Scalars['u64']['input']>;
  balanceGT?: InputMaybe<Scalars['u64']['input']>;
  balanceGTE?: InputMaybe<Scalars['u64']['input']>;
  balanceLT?: InputMaybe<Scalars['u64']['input']>;
  balanceLTE?: InputMaybe<Scalars['u64']['input']>;
  balanceNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  item_id?: InputMaybe<Scalars['u64']['input']>;
  item_idEQ?: InputMaybe<Scalars['u64']['input']>;
  item_idGT?: InputMaybe<Scalars['u64']['input']>;
  item_idGTE?: InputMaybe<Scalars['u64']['input']>;
  item_idLT?: InputMaybe<Scalars['u64']['input']>;
  item_idLTE?: InputMaybe<Scalars['u64']['input']>;
  item_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type Joined = {
  __typename?: 'Joined';
  address?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  joined?: Maybe<Scalars['bool']['output']>;
};

export type JoinedConnection = {
  __typename?: 'JoinedConnection';
  edges?: Maybe<Array<Maybe<JoinedEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type JoinedEdge = {
  __typename?: 'JoinedEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Joined>;
};

export type JoinedOrder = {
  direction: OrderDirection;
  field: JoinedOrderField;
};

export enum JoinedOrderField {
  Address = 'ADDRESS',
  GameId = 'GAME_ID',
  Joined = 'JOINED'
}

export type JoinedWhereInput = {
  address?: InputMaybe<Scalars['felt252']['input']>;
  addressEQ?: InputMaybe<Scalars['felt252']['input']>;
  addressGT?: InputMaybe<Scalars['felt252']['input']>;
  addressGTE?: InputMaybe<Scalars['felt252']['input']>;
  addressLT?: InputMaybe<Scalars['felt252']['input']>;
  addressLTE?: InputMaybe<Scalars['felt252']['input']>;
  addressNEQ?: InputMaybe<Scalars['felt252']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  joined?: InputMaybe<Scalars['bool']['input']>;
  joinedEQ?: InputMaybe<Scalars['bool']['input']>;
  joinedGT?: InputMaybe<Scalars['bool']['input']>;
  joinedGTE?: InputMaybe<Scalars['bool']['input']>;
  joinedLT?: InputMaybe<Scalars['bool']['input']>;
  joinedLTE?: InputMaybe<Scalars['bool']['input']>;
  joinedNEQ?: InputMaybe<Scalars['bool']['input']>;
};

export type ModelUnion = Auction | Brew | BrewBatchTrack | FarmArea | Game | GameTracker | IndulgenceAuction | IndulgenceAuctionCount | ItemBalance | Joined | Ownership | Player | TavernAuction | Trade | TradeTrack;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Ownership = {
  __typename?: 'Ownership';
  entity?: Maybe<World__Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['felt252']['output']>;
};

export type OwnershipConnection = {
  __typename?: 'OwnershipConnection';
  edges?: Maybe<Array<Maybe<OwnershipEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type OwnershipEdge = {
  __typename?: 'OwnershipEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Ownership>;
};

export type OwnershipOrder = {
  direction: OrderDirection;
  field: OwnershipOrderField;
};

export enum OwnershipOrderField {
  EntityId = 'ENTITY_ID',
  Owner = 'OWNER'
}

export type OwnershipWhereInput = {
  entity_id?: InputMaybe<Scalars['u64']['input']>;
  entity_idEQ?: InputMaybe<Scalars['u64']['input']>;
  entity_idGT?: InputMaybe<Scalars['u64']['input']>;
  entity_idGTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idLT?: InputMaybe<Scalars['u64']['input']>;
  entity_idLTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  owner?: InputMaybe<Scalars['felt252']['input']>;
  ownerEQ?: InputMaybe<Scalars['felt252']['input']>;
  ownerGT?: InputMaybe<Scalars['felt252']['input']>;
  ownerGTE?: InputMaybe<Scalars['felt252']['input']>;
  ownerLT?: InputMaybe<Scalars['felt252']['input']>;
  ownerLTE?: InputMaybe<Scalars['felt252']['input']>;
  ownerNEQ?: InputMaybe<Scalars['felt252']['input']>;
};

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: OrderDirection;
  field: PlayerOrderField;
};

export enum PlayerOrderField {
  GameId = 'GAME_ID',
  Name = 'NAME',
  PlayerId = 'PLAYER_ID'
}

export type PlayerWhereInput = {
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  name?: InputMaybe<Scalars['felt252']['input']>;
  nameEQ?: InputMaybe<Scalars['felt252']['input']>;
  nameGT?: InputMaybe<Scalars['felt252']['input']>;
  nameGTE?: InputMaybe<Scalars['felt252']['input']>;
  nameLT?: InputMaybe<Scalars['felt252']['input']>;
  nameLTE?: InputMaybe<Scalars['felt252']['input']>;
  nameNEQ?: InputMaybe<Scalars['felt252']['input']>;
  player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
};

export type TavernAuction = {
  __typename?: 'TavernAuction';
  decay_constant_mag?: Maybe<Scalars['u128']['output']>;
  decay_constant_sign?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u64']['output']>;
  per_time_unit?: Maybe<Scalars['u128']['output']>;
  sold?: Maybe<Scalars['u64']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  target_price?: Maybe<Scalars['u128']['output']>;
};

export type TavernAuctionConnection = {
  __typename?: 'TavernAuctionConnection';
  edges?: Maybe<Array<Maybe<TavernAuctionEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TavernAuctionEdge = {
  __typename?: 'TavernAuctionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<TavernAuction>;
};

export type TavernAuctionOrder = {
  direction: OrderDirection;
  field: TavernAuctionOrderField;
};

export enum TavernAuctionOrderField {
  DecayConstantMag = 'DECAY_CONSTANT_MAG',
  DecayConstantSign = 'DECAY_CONSTANT_SIGN',
  GameId = 'GAME_ID',
  ItemId = 'ITEM_ID',
  PerTimeUnit = 'PER_TIME_UNIT',
  Sold = 'SOLD',
  StartTime = 'START_TIME',
  TargetPrice = 'TARGET_PRICE'
}

export type TavernAuctionWhereInput = {
  decay_constant_mag?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magEQ?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magGT?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magGTE?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magLT?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magLTE?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_magNEQ?: InputMaybe<Scalars['u128']['input']>;
  decay_constant_sign?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signEQ?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signGT?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signGTE?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signLT?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signLTE?: InputMaybe<Scalars['bool']['input']>;
  decay_constant_signNEQ?: InputMaybe<Scalars['bool']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  item_id?: InputMaybe<Scalars['u64']['input']>;
  item_idEQ?: InputMaybe<Scalars['u64']['input']>;
  item_idGT?: InputMaybe<Scalars['u64']['input']>;
  item_idGTE?: InputMaybe<Scalars['u64']['input']>;
  item_idLT?: InputMaybe<Scalars['u64']['input']>;
  item_idLTE?: InputMaybe<Scalars['u64']['input']>;
  item_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  per_time_unit?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitEQ?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitGT?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitGTE?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitLT?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitLTE?: InputMaybe<Scalars['u128']['input']>;
  per_time_unitNEQ?: InputMaybe<Scalars['u128']['input']>;
  sold?: InputMaybe<Scalars['u64']['input']>;
  soldEQ?: InputMaybe<Scalars['u64']['input']>;
  soldGT?: InputMaybe<Scalars['u64']['input']>;
  soldGTE?: InputMaybe<Scalars['u64']['input']>;
  soldLT?: InputMaybe<Scalars['u64']['input']>;
  soldLTE?: InputMaybe<Scalars['u64']['input']>;
  soldNEQ?: InputMaybe<Scalars['u64']['input']>;
  start_time?: InputMaybe<Scalars['u64']['input']>;
  start_timeEQ?: InputMaybe<Scalars['u64']['input']>;
  start_timeGT?: InputMaybe<Scalars['u64']['input']>;
  start_timeGTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeLT?: InputMaybe<Scalars['u64']['input']>;
  start_timeLTE?: InputMaybe<Scalars['u64']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['u64']['input']>;
  target_price?: InputMaybe<Scalars['u128']['input']>;
  target_priceEQ?: InputMaybe<Scalars['u128']['input']>;
  target_priceGT?: InputMaybe<Scalars['u128']['input']>;
  target_priceGTE?: InputMaybe<Scalars['u128']['input']>;
  target_priceLT?: InputMaybe<Scalars['u128']['input']>;
  target_priceLTE?: InputMaybe<Scalars['u128']['input']>;
  target_priceNEQ?: InputMaybe<Scalars['u128']['input']>;
};

export type Trade = {
  __typename?: 'Trade';
  entity?: Maybe<World__Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
  game_id?: Maybe<Scalars['u64']['output']>;
  game_id_value?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u64']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
  price?: Maybe<Scalars['u64']['output']>;
  quantity?: Maybe<Scalars['u64']['output']>;
  status?: Maybe<Scalars['u8']['output']>;
};

export type TradeConnection = {
  __typename?: 'TradeConnection';
  edges?: Maybe<Array<Maybe<TradeEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TradeEdge = {
  __typename?: 'TradeEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Trade>;
};

export type TradeOrder = {
  direction: OrderDirection;
  field: TradeOrderField;
};

export enum TradeOrderField {
  EntityId = 'ENTITY_ID',
  GameId = 'GAME_ID',
  GameIdValue = 'GAME_ID_VALUE',
  ItemId = 'ITEM_ID',
  PlayerId = 'PLAYER_ID',
  Price = 'PRICE',
  Quantity = 'QUANTITY',
  Status = 'STATUS'
}

export type TradeTrack = {
  __typename?: 'TradeTrack';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
};

export type TradeTrackConnection = {
  __typename?: 'TradeTrackConnection';
  edges?: Maybe<Array<Maybe<TradeTrackEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type TradeTrackEdge = {
  __typename?: 'TradeTrackEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<TradeTrack>;
};

export type TradeTrackOrder = {
  direction: OrderDirection;
  field: TradeTrackOrderField;
};

export enum TradeTrackOrderField {
  Count = 'COUNT',
  GameId = 'GAME_ID'
}

export type TradeTrackWhereInput = {
  count?: InputMaybe<Scalars['u64']['input']>;
  countEQ?: InputMaybe<Scalars['u64']['input']>;
  countGT?: InputMaybe<Scalars['u64']['input']>;
  countGTE?: InputMaybe<Scalars['u64']['input']>;
  countLT?: InputMaybe<Scalars['u64']['input']>;
  countLTE?: InputMaybe<Scalars['u64']['input']>;
  countNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
};

export type TradeWhereInput = {
  entity_id?: InputMaybe<Scalars['u64']['input']>;
  entity_idEQ?: InputMaybe<Scalars['u64']['input']>;
  entity_idGT?: InputMaybe<Scalars['u64']['input']>;
  entity_idGTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idLT?: InputMaybe<Scalars['u64']['input']>;
  entity_idLTE?: InputMaybe<Scalars['u64']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id?: InputMaybe<Scalars['u64']['input']>;
  game_idEQ?: InputMaybe<Scalars['u64']['input']>;
  game_idGT?: InputMaybe<Scalars['u64']['input']>;
  game_idGTE?: InputMaybe<Scalars['u64']['input']>;
  game_idLT?: InputMaybe<Scalars['u64']['input']>;
  game_idLTE?: InputMaybe<Scalars['u64']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id_value?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueEQ?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueGT?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueGTE?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueLT?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueLTE?: InputMaybe<Scalars['u64']['input']>;
  game_id_valueNEQ?: InputMaybe<Scalars['u64']['input']>;
  item_id?: InputMaybe<Scalars['u64']['input']>;
  item_idEQ?: InputMaybe<Scalars['u64']['input']>;
  item_idGT?: InputMaybe<Scalars['u64']['input']>;
  item_idGTE?: InputMaybe<Scalars['u64']['input']>;
  item_idLT?: InputMaybe<Scalars['u64']['input']>;
  item_idLTE?: InputMaybe<Scalars['u64']['input']>;
  item_idNEQ?: InputMaybe<Scalars['u64']['input']>;
  player_id?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_idNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  price?: InputMaybe<Scalars['u64']['input']>;
  priceEQ?: InputMaybe<Scalars['u64']['input']>;
  priceGT?: InputMaybe<Scalars['u64']['input']>;
  priceGTE?: InputMaybe<Scalars['u64']['input']>;
  priceLT?: InputMaybe<Scalars['u64']['input']>;
  priceLTE?: InputMaybe<Scalars['u64']['input']>;
  priceNEQ?: InputMaybe<Scalars['u64']['input']>;
  quantity?: InputMaybe<Scalars['u64']['input']>;
  quantityEQ?: InputMaybe<Scalars['u64']['input']>;
  quantityGT?: InputMaybe<Scalars['u64']['input']>;
  quantityGTE?: InputMaybe<Scalars['u64']['input']>;
  quantityLT?: InputMaybe<Scalars['u64']['input']>;
  quantityLTE?: InputMaybe<Scalars['u64']['input']>;
  quantityNEQ?: InputMaybe<Scalars['u64']['input']>;
  status?: InputMaybe<Scalars['u8']['input']>;
  statusEQ?: InputMaybe<Scalars['u8']['input']>;
  statusGT?: InputMaybe<Scalars['u8']['input']>;
  statusGTE?: InputMaybe<Scalars['u8']['input']>;
  statusLT?: InputMaybe<Scalars['u8']['input']>;
  statusLTE?: InputMaybe<Scalars['u8']['input']>;
  statusNEQ?: InputMaybe<Scalars['u8']['input']>;
};

export type World__Content = {
  __typename?: 'World__Content';
  cover_uri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon_uri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  event_id?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  model_names?: Maybe<Scalars['String']['output']>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  created_at?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transaction_hash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  cover_img?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  icon_img?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  class_hash?: Maybe<Scalars['felt252']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__Query = {
  __typename?: 'World__Query';
  auctionModels?: Maybe<AuctionConnection>;
  brewModels?: Maybe<BrewConnection>;
  brewbatchtrackModels?: Maybe<BrewBatchTrackConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  events?: Maybe<World__EventConnection>;
  farmareaModels?: Maybe<FarmAreaConnection>;
  gameModels?: Maybe<GameConnection>;
  gametrackerModels?: Maybe<GameTrackerConnection>;
  indulgenceauctionModels?: Maybe<IndulgenceAuctionConnection>;
  indulgenceauctioncountModels?: Maybe<IndulgenceAuctionCountConnection>;
  itembalanceModels?: Maybe<ItemBalanceConnection>;
  joinedModels?: Maybe<JoinedConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  ownershipModels?: Maybe<OwnershipConnection>;
  playerModels?: Maybe<PlayerConnection>;
  tavernauctionModels?: Maybe<TavernAuctionConnection>;
  tradeModels?: Maybe<TradeConnection>;
  tradetrackModels?: Maybe<TradeTrackConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
};


export type World__QueryAuctionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AuctionOrder>;
  where?: InputMaybe<AuctionWhereInput>;
};


export type World__QueryBrewModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BrewOrder>;
  where?: InputMaybe<BrewWhereInput>;
};


export type World__QueryBrewbatchtrackModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BrewBatchTrackOrder>;
  where?: InputMaybe<BrewBatchTrackWhereInput>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryFarmareaModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FarmAreaOrder>;
  where?: InputMaybe<FarmAreaWhereInput>;
};


export type World__QueryGameModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameOrder>;
  where?: InputMaybe<GameWhereInput>;
};


export type World__QueryGametrackerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameTrackerOrder>;
  where?: InputMaybe<GameTrackerWhereInput>;
};


export type World__QueryIndulgenceauctionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<IndulgenceAuctionOrder>;
  where?: InputMaybe<IndulgenceAuctionWhereInput>;
};


export type World__QueryIndulgenceauctioncountModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<IndulgenceAuctionCountOrder>;
  where?: InputMaybe<IndulgenceAuctionCountWhereInput>;
};


export type World__QueryItembalanceModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ItemBalanceOrder>;
  where?: InputMaybe<ItemBalanceWhereInput>;
};


export type World__QueryJoinedModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JoinedOrder>;
  where?: InputMaybe<JoinedWhereInput>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryOwnershipModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OwnershipOrder>;
  where?: InputMaybe<OwnershipWhereInput>;
};


export type World__QueryPlayerModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type World__QueryTavernauctionModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TavernAuctionOrder>;
  where?: InputMaybe<TavernAuctionWhereInput>;
};


export type World__QueryTradeModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TradeOrder>;
  where?: InputMaybe<TradeWhereInput>;
};


export type World__QueryTradetrackModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TradeTrackOrder>;
  where?: InputMaybe<TradeTrackWhereInput>;
};


export type World__QueryTransactionArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  max_fee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  sender_address?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transaction_hash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  total_count: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};

export type GetGamesQueryVariables = Exact<{
  status: Scalars['u64']['input'];
  gameId?: InputMaybe<Scalars['u64']['input']>;
}>;


export type GetGamesQuery = { __typename?: 'World__Query', gameModels?: { __typename?: 'GameConnection', edges?: Array<{ __typename?: 'GameEdge', node?: { __typename?: 'Game', entity?: { __typename?: 'World__Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Auction' } | { __typename: 'Brew' } | { __typename: 'BrewBatchTrack' } | { __typename: 'FarmArea' } | { __typename: 'Game', game_id?: any | null, start_time?: any | null, status?: any | null, number_players?: any | null, max_players?: any | null, game_length?: any | null, entry_fee?: any | null, password?: any | null } | { __typename: 'GameTracker' } | { __typename: 'IndulgenceAuction' } | { __typename: 'IndulgenceAuctionCount' } | { __typename: 'ItemBalance' } | { __typename: 'Joined' } | { __typename: 'Ownership', owner?: any | null } | { __typename: 'Player' } | { __typename: 'TavernAuction' } | { __typename: 'Trade' } | { __typename: 'TradeTrack' } | null> | null } | null } | null } | null> | null } | null, joinedModels?: { __typename?: 'JoinedConnection', edges?: Array<{ __typename?: 'JoinedEdge', node?: { __typename?: 'Joined', entity?: { __typename?: 'World__Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Auction' } | { __typename: 'Brew' } | { __typename: 'BrewBatchTrack' } | { __typename: 'FarmArea' } | { __typename: 'Game' } | { __typename: 'GameTracker' } | { __typename: 'IndulgenceAuction' } | { __typename: 'IndulgenceAuctionCount' } | { __typename: 'ItemBalance' } | { __typename: 'Joined', joined?: any | null } | { __typename: 'Ownership' } | { __typename: 'Player', name?: any | null } | { __typename: 'TavernAuction' } | { __typename: 'Trade' } | { __typename: 'TradeTrack' } | null> | null } | null } | null } | null> | null } | null };

export type GetTradesQueryVariables = Exact<{
  game_id: Scalars['u64']['input'];
  status: Scalars['u8']['input'];
}>;


export type GetTradesQuery = { __typename?: 'World__Query', tradeModels?: { __typename?: 'TradeConnection', edges?: Array<{ __typename?: 'TradeEdge', node?: { __typename?: 'Trade', entity?: { __typename?: 'World__Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Auction' } | { __typename: 'Brew' } | { __typename: 'BrewBatchTrack' } | { __typename: 'FarmArea' } | { __typename: 'Game' } | { __typename: 'GameTracker' } | { __typename: 'IndulgenceAuction' } | { __typename: 'IndulgenceAuctionCount' } | { __typename: 'ItemBalance' } | { __typename: 'Joined' } | { __typename: 'Ownership' } | { __typename: 'Player' } | { __typename: 'TavernAuction' } | { __typename: 'Trade', entity_id?: any | null, game_id?: any | null, item_id?: any | null, quantity?: any | null, price?: any | null, status?: any | null, player_id?: any | null } | { __typename: 'TradeTrack' } | null> | null } | null } | null } | null> | null } | null };

export type GetIndulgencesQueryVariables = Exact<{
  game_id: Scalars['u64']['input'];
  status: Scalars['u8']['input'];
}>;


export type GetIndulgencesQuery = { __typename?: 'World__Query', indulgenceauctionModels?: { __typename?: 'IndulgenceAuctionConnection', edges?: Array<{ __typename?: 'IndulgenceAuctionEdge', node?: { __typename?: 'IndulgenceAuction', entity?: { __typename?: 'World__Entity', keys?: Array<string | null> | null, models?: Array<{ __typename: 'Auction' } | { __typename: 'Brew' } | { __typename: 'BrewBatchTrack' } | { __typename: 'FarmArea' } | { __typename: 'Game' } | { __typename: 'GameTracker' } | { __typename: 'IndulgenceAuction', game_id?: any | null, price?: any | null, status?: any | null, auction_id?: any | null, highest_bid_player_id?: any | null, expiry?: any | null, auction_id_value?: any | null } | { __typename: 'IndulgenceAuctionCount' } | { __typename: 'ItemBalance' } | { __typename: 'Joined' } | { __typename: 'Ownership' } | { __typename: 'Player' } | { __typename: 'TavernAuction' } | { __typename: 'Trade' } | { __typename: 'TradeTrack' } | null> | null } | null } | null } | null> | null } | null };

export type GetAllBalancesForGameQueryVariables = Exact<{
  game_id: Scalars['u64']['input'];
}>;


export type GetAllBalancesForGameQuery = { __typename?: 'World__Query', itembalanceModels?: { __typename?: 'ItemBalanceConnection', edges?: Array<{ __typename?: 'ItemBalanceEdge', node?: { __typename?: 'ItemBalance', balance?: any | null, item_id?: any | null, player_id?: any | null } | null } | null> | null } | null, playerModels?: { __typename?: 'PlayerConnection', edges?: Array<{ __typename?: 'PlayerEdge', node?: { __typename?: 'Player', name?: any | null, player_id?: any | null } | null } | null> | null } | null };


export const GetGamesDocument = gql`
    query getGames($status: u64!, $gameId: u64) {
  gameModels(where: {status: $status, game_id: $gameId}) {
    edges {
      node {
        entity {
          keys
          models {
            __typename
            ... on Game {
              game_id
              start_time
              status
              number_players
              max_players
              game_length
              entry_fee
              password
            }
            ... on Ownership {
              owner
            }
          }
        }
      }
    }
  }
  joinedModels {
    edges {
      node {
        entity {
          keys
          models {
            __typename
            ... on Joined {
              joined
            }
            ... on Player {
              name
            }
          }
        }
      }
    }
  }
}
    `;
export const GetTradesDocument = gql`
    query getTrades($game_id: u64!, $status: u8!) {
  tradeModels(where: {game_id: $game_id, status: $status}) {
    edges {
      node {
        entity {
          keys
          models {
            __typename
            ... on Trade {
              entity_id
              game_id
              item_id
              quantity
              price
              status
              player_id
            }
          }
        }
      }
    }
  }
}
    `;
export const GetIndulgencesDocument = gql`
    query getIndulgences($game_id: u64!, $status: u8!) {
  indulgenceauctionModels(where: {game_id: $game_id, status: $status}) {
    edges {
      node {
        entity {
          keys
          models {
            __typename
            ... on IndulgenceAuction {
              game_id
              price
              status
              auction_id
              highest_bid_player_id
              expiry
              auction_id_value
            }
          }
        }
      }
    }
  }
}
    `;
export const GetAllBalancesForGameDocument = gql`
    query getAllBalancesForGame($game_id: u64!) {
  itembalanceModels(limit: 100, where: {game_id: $game_id}) {
    edges {
      node {
        ... on ItemBalance {
          balance
          item_id
          player_id
        }
      }
    }
  }
  playerModels(limit: 100, where: {game_id: $game_id}) {
    edges {
      node {
        ... on Player {
          name
          player_id
        }
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetGamesDocumentString = print(GetGamesDocument);
const GetTradesDocumentString = print(GetTradesDocument);
const GetIndulgencesDocumentString = print(GetIndulgencesDocument);
const GetAllBalancesForGameDocumentString = print(GetAllBalancesForGameDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getGames(variables: GetGamesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetGamesQuery; extensions?: any; headers: any; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetGamesQuery>(GetGamesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGames', 'query');
    },
    getTrades(variables: GetTradesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetTradesQuery; extensions?: any; headers: any; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetTradesQuery>(GetTradesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTrades', 'query');
    },
    getIndulgences(variables: GetIndulgencesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetIndulgencesQuery; extensions?: any; headers: any; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetIndulgencesQuery>(GetIndulgencesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getIndulgences', 'query');
    },
    getAllBalancesForGame(variables: GetAllBalancesForGameQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetAllBalancesForGameQuery; extensions?: any; headers: any; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetAllBalancesForGameQuery>(GetAllBalancesForGameDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getAllBalancesForGame', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;