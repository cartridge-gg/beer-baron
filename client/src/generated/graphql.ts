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
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u128']['output']>;
  max_sellable?: Maybe<Scalars['u128']['output']>;
  sold?: Maybe<Scalars['u128']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  target_price?: Maybe<Scalars['u128']['output']>;
  time_scale_mag?: Maybe<Scalars['u128']['output']>;
  time_scale_sign?: Maybe<Scalars['bool']['output']>;
};

export type AuctionConnection = {
  __typename?: 'AuctionConnection';
  edges?: Maybe<Array<Maybe<AuctionEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type AuctionEdge = {
  __typename?: 'AuctionEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Auction>;
};

export type AuctionOrder = {
  direction: Direction;
  field: AuctionOrderOrderField;
};

export enum AuctionOrderOrderField {
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
  decay_constant_mag?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magGT?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magGTE?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magLT?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magLTE?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magNEQ?: InputMaybe<Scalars['String']['input']>;
  decay_constant_sign?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signGT?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signGTE?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signLT?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signLTE?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['String']['input']>;
  item_idGT?: InputMaybe<Scalars['String']['input']>;
  item_idGTE?: InputMaybe<Scalars['String']['input']>;
  item_idLT?: InputMaybe<Scalars['String']['input']>;
  item_idLTE?: InputMaybe<Scalars['String']['input']>;
  item_idNEQ?: InputMaybe<Scalars['String']['input']>;
  max_sellable?: InputMaybe<Scalars['String']['input']>;
  max_sellableGT?: InputMaybe<Scalars['String']['input']>;
  max_sellableGTE?: InputMaybe<Scalars['String']['input']>;
  max_sellableLT?: InputMaybe<Scalars['String']['input']>;
  max_sellableLTE?: InputMaybe<Scalars['String']['input']>;
  max_sellableNEQ?: InputMaybe<Scalars['String']['input']>;
  sold?: InputMaybe<Scalars['String']['input']>;
  soldGT?: InputMaybe<Scalars['String']['input']>;
  soldGTE?: InputMaybe<Scalars['String']['input']>;
  soldLT?: InputMaybe<Scalars['String']['input']>;
  soldLTE?: InputMaybe<Scalars['String']['input']>;
  soldNEQ?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  target_price?: InputMaybe<Scalars['String']['input']>;
  target_priceGT?: InputMaybe<Scalars['String']['input']>;
  target_priceGTE?: InputMaybe<Scalars['String']['input']>;
  target_priceLT?: InputMaybe<Scalars['String']['input']>;
  target_priceLTE?: InputMaybe<Scalars['String']['input']>;
  target_priceNEQ?: InputMaybe<Scalars['String']['input']>;
  time_scale_mag?: InputMaybe<Scalars['String']['input']>;
  time_scale_magGT?: InputMaybe<Scalars['String']['input']>;
  time_scale_magGTE?: InputMaybe<Scalars['String']['input']>;
  time_scale_magLT?: InputMaybe<Scalars['String']['input']>;
  time_scale_magLTE?: InputMaybe<Scalars['String']['input']>;
  time_scale_magNEQ?: InputMaybe<Scalars['String']['input']>;
  time_scale_sign?: InputMaybe<Scalars['Int']['input']>;
  time_scale_signGT?: InputMaybe<Scalars['Int']['input']>;
  time_scale_signGTE?: InputMaybe<Scalars['Int']['input']>;
  time_scale_signLT?: InputMaybe<Scalars['Int']['input']>;
  time_scale_signLTE?: InputMaybe<Scalars['Int']['input']>;
  time_scale_signNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Brew = {
  __typename?: 'Brew';
  batch_id?: Maybe<Scalars['u64']['output']>;
  batch_key?: Maybe<Scalars['u64']['output']>;
  beer_id?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
  status?: Maybe<Scalars['u64']['output']>;
  time_built?: Maybe<Scalars['u64']['output']>;
};

export type BrewBatchTrack = {
  __typename?: 'BrewBatchTrack';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['ContractAddress']['output']>;
};

export type BrewBatchTrackConnection = {
  __typename?: 'BrewBatchTrackConnection';
  edges?: Maybe<Array<Maybe<BrewBatchTrackEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type BrewBatchTrackEdge = {
  __typename?: 'BrewBatchTrackEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<BrewBatchTrack>;
};

export type BrewBatchTrackOrder = {
  direction: Direction;
  field: BrewBatchTrackOrderOrderField;
};

export enum BrewBatchTrackOrderOrderField {
  Count = 'COUNT',
  GameId = 'GAME_ID',
  Owner = 'OWNER'
}

export type BrewBatchTrackWhereInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  countGT?: InputMaybe<Scalars['Int']['input']>;
  countGTE?: InputMaybe<Scalars['Int']['input']>;
  countLT?: InputMaybe<Scalars['Int']['input']>;
  countLTE?: InputMaybe<Scalars['Int']['input']>;
  countNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type BrewConnection = {
  __typename?: 'BrewConnection';
  edges?: Maybe<Array<Maybe<BrewEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type BrewEdge = {
  __typename?: 'BrewEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Brew>;
};

export type BrewOrder = {
  direction: Direction;
  field: BrewOrderOrderField;
};

export enum BrewOrderOrderField {
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
  batch_id?: InputMaybe<Scalars['Int']['input']>;
  batch_idGT?: InputMaybe<Scalars['Int']['input']>;
  batch_idGTE?: InputMaybe<Scalars['Int']['input']>;
  batch_idLT?: InputMaybe<Scalars['Int']['input']>;
  batch_idLTE?: InputMaybe<Scalars['Int']['input']>;
  batch_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  batch_key?: InputMaybe<Scalars['Int']['input']>;
  batch_keyGT?: InputMaybe<Scalars['Int']['input']>;
  batch_keyGTE?: InputMaybe<Scalars['Int']['input']>;
  batch_keyLT?: InputMaybe<Scalars['Int']['input']>;
  batch_keyLTE?: InputMaybe<Scalars['Int']['input']>;
  batch_keyNEQ?: InputMaybe<Scalars['Int']['input']>;
  beer_id?: InputMaybe<Scalars['Int']['input']>;
  beer_idGT?: InputMaybe<Scalars['Int']['input']>;
  beer_idGTE?: InputMaybe<Scalars['Int']['input']>;
  beer_idLT?: InputMaybe<Scalars['Int']['input']>;
  beer_idLTE?: InputMaybe<Scalars['Int']['input']>;
  beer_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
  player_id?: InputMaybe<Scalars['String']['input']>;
  player_idGT?: InputMaybe<Scalars['String']['input']>;
  player_idGTE?: InputMaybe<Scalars['String']['input']>;
  player_idLT?: InputMaybe<Scalars['String']['input']>;
  player_idLTE?: InputMaybe<Scalars['String']['input']>;
  player_idNEQ?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  statusGT?: InputMaybe<Scalars['Int']['input']>;
  statusGTE?: InputMaybe<Scalars['Int']['input']>;
  statusLT?: InputMaybe<Scalars['Int']['input']>;
  statusLTE?: InputMaybe<Scalars['Int']['input']>;
  statusNEQ?: InputMaybe<Scalars['Int']['input']>;
  time_built?: InputMaybe<Scalars['Int']['input']>;
  time_builtGT?: InputMaybe<Scalars['Int']['input']>;
  time_builtGTE?: InputMaybe<Scalars['Int']['input']>;
  time_builtLT?: InputMaybe<Scalars['Int']['input']>;
  time_builtLTE?: InputMaybe<Scalars['Int']['input']>;
  time_builtNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Component = {
  __typename?: 'Component';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type ComponentConnection = {
  __typename?: 'ComponentConnection';
  edges?: Maybe<Array<Maybe<ComponentEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type ComponentEdge = {
  __typename?: 'ComponentEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Component>;
};

export type ComponentUnion = Auction | Brew | BrewBatchTrack | FarmArea | Game | GameTracker | ItemBalance | Joined | Ownership | Player | TavernAuction | Trade | TradeTrack;

export enum Direction {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Entity = {
  __typename?: 'Entity';
  componentNames?: Maybe<Scalars['String']['output']>;
  components?: Maybe<Array<Maybe<ComponentUnion>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type EntityConnection = {
  __typename?: 'EntityConnection';
  edges?: Maybe<Array<Maybe<EntityEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EntityEdge = {
  __typename?: 'EntityEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Entity>;
};

export type Event = {
  __typename?: 'Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Scalars['String']['output']>;
  systemCall: SystemCall;
  systemCallId?: Maybe<Scalars['Int']['output']>;
};

export type EventConnection = {
  __typename?: 'EventConnection';
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Event>;
};

export type FarmArea = {
  __typename?: 'FarmArea';
  area_id?: Maybe<Scalars['u64']['output']>;
  area_type?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
  time_built?: Maybe<Scalars['u64']['output']>;
};

export type FarmAreaConnection = {
  __typename?: 'FarmAreaConnection';
  edges?: Maybe<Array<Maybe<FarmAreaEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type FarmAreaEdge = {
  __typename?: 'FarmAreaEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<FarmArea>;
};

export type FarmAreaOrder = {
  direction: Direction;
  field: FarmAreaOrderOrderField;
};

export enum FarmAreaOrderOrderField {
  AreaId = 'AREA_ID',
  AreaType = 'AREA_TYPE',
  GameId = 'GAME_ID',
  PlayerId = 'PLAYER_ID',
  TimeBuilt = 'TIME_BUILT'
}

export type FarmAreaWhereInput = {
  area_id?: InputMaybe<Scalars['Int']['input']>;
  area_idGT?: InputMaybe<Scalars['Int']['input']>;
  area_idGTE?: InputMaybe<Scalars['Int']['input']>;
  area_idLT?: InputMaybe<Scalars['Int']['input']>;
  area_idLTE?: InputMaybe<Scalars['Int']['input']>;
  area_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  area_type?: InputMaybe<Scalars['Int']['input']>;
  area_typeGT?: InputMaybe<Scalars['Int']['input']>;
  area_typeGTE?: InputMaybe<Scalars['Int']['input']>;
  area_typeLT?: InputMaybe<Scalars['Int']['input']>;
  area_typeLTE?: InputMaybe<Scalars['Int']['input']>;
  area_typeNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  player_id?: InputMaybe<Scalars['String']['input']>;
  player_idGT?: InputMaybe<Scalars['String']['input']>;
  player_idGTE?: InputMaybe<Scalars['String']['input']>;
  player_idLT?: InputMaybe<Scalars['String']['input']>;
  player_idLTE?: InputMaybe<Scalars['String']['input']>;
  player_idNEQ?: InputMaybe<Scalars['String']['input']>;
  time_built?: InputMaybe<Scalars['Int']['input']>;
  time_builtGT?: InputMaybe<Scalars['Int']['input']>;
  time_builtGTE?: InputMaybe<Scalars['Int']['input']>;
  time_builtLT?: InputMaybe<Scalars['Int']['input']>;
  time_builtLTE?: InputMaybe<Scalars['Int']['input']>;
  time_builtNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Game = {
  __typename?: 'Game';
  entity?: Maybe<Entity>;
  entry_fee?: Maybe<Scalars['u32']['output']>;
  game_id?: Maybe<Scalars['u64']['output']>;
  game_length?: Maybe<Scalars['u32']['output']>;
  max_players?: Maybe<Scalars['u32']['output']>;
  number_players?: Maybe<Scalars['u32']['output']>;
  password?: Maybe<Scalars['felt252']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  status?: Maybe<Scalars['u64']['output']>;
};

export type GameConnection = {
  __typename?: 'GameConnection';
  edges?: Maybe<Array<Maybe<GameEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type GameEdge = {
  __typename?: 'GameEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Game>;
};

export type GameOrder = {
  direction: Direction;
  field: GameOrderOrderField;
};

export enum GameOrderOrderField {
  EntryFee = 'ENTRY_FEE',
  GameId = 'GAME_ID',
  GameLength = 'GAME_LENGTH',
  MaxPlayers = 'MAX_PLAYERS',
  NumberPlayers = 'NUMBER_PLAYERS',
  Password = 'PASSWORD',
  StartTime = 'START_TIME',
  Status = 'STATUS'
}

export type GameTracker = {
  __typename?: 'GameTracker';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
};

export type GameTrackerConnection = {
  __typename?: 'GameTrackerConnection';
  edges?: Maybe<Array<Maybe<GameTrackerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type GameTrackerEdge = {
  __typename?: 'GameTrackerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<GameTracker>;
};

export type GameTrackerOrder = {
  direction: Direction;
  field: GameTrackerOrderOrderField;
};

export enum GameTrackerOrderOrderField {
  Count = 'COUNT',
  EntityId = 'ENTITY_ID'
}

export type GameTrackerWhereInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  countGT?: InputMaybe<Scalars['Int']['input']>;
  countGTE?: InputMaybe<Scalars['Int']['input']>;
  countLT?: InputMaybe<Scalars['Int']['input']>;
  countLTE?: InputMaybe<Scalars['Int']['input']>;
  countNEQ?: InputMaybe<Scalars['Int']['input']>;
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  entity_idGT?: InputMaybe<Scalars['Int']['input']>;
  entity_idGTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idLT?: InputMaybe<Scalars['Int']['input']>;
  entity_idLTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type GameWhereInput = {
  entry_fee?: InputMaybe<Scalars['Int']['input']>;
  entry_feeGT?: InputMaybe<Scalars['Int']['input']>;
  entry_feeGTE?: InputMaybe<Scalars['Int']['input']>;
  entry_feeLT?: InputMaybe<Scalars['Int']['input']>;
  entry_feeLTE?: InputMaybe<Scalars['Int']['input']>;
  entry_feeNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_length?: InputMaybe<Scalars['Int']['input']>;
  game_lengthGT?: InputMaybe<Scalars['Int']['input']>;
  game_lengthGTE?: InputMaybe<Scalars['Int']['input']>;
  game_lengthLT?: InputMaybe<Scalars['Int']['input']>;
  game_lengthLTE?: InputMaybe<Scalars['Int']['input']>;
  game_lengthNEQ?: InputMaybe<Scalars['Int']['input']>;
  max_players?: InputMaybe<Scalars['Int']['input']>;
  max_playersGT?: InputMaybe<Scalars['Int']['input']>;
  max_playersGTE?: InputMaybe<Scalars['Int']['input']>;
  max_playersLT?: InputMaybe<Scalars['Int']['input']>;
  max_playersLTE?: InputMaybe<Scalars['Int']['input']>;
  max_playersNEQ?: InputMaybe<Scalars['Int']['input']>;
  number_players?: InputMaybe<Scalars['Int']['input']>;
  number_playersGT?: InputMaybe<Scalars['Int']['input']>;
  number_playersGTE?: InputMaybe<Scalars['Int']['input']>;
  number_playersLT?: InputMaybe<Scalars['Int']['input']>;
  number_playersLTE?: InputMaybe<Scalars['Int']['input']>;
  number_playersNEQ?: InputMaybe<Scalars['Int']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  passwordGT?: InputMaybe<Scalars['String']['input']>;
  passwordGTE?: InputMaybe<Scalars['String']['input']>;
  passwordLT?: InputMaybe<Scalars['String']['input']>;
  passwordLTE?: InputMaybe<Scalars['String']['input']>;
  passwordNEQ?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  statusGT?: InputMaybe<Scalars['Int']['input']>;
  statusGTE?: InputMaybe<Scalars['Int']['input']>;
  statusLT?: InputMaybe<Scalars['Int']['input']>;
  statusLTE?: InputMaybe<Scalars['Int']['input']>;
  statusNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type ItemBalance = {
  __typename?: 'ItemBalance';
  balance?: Maybe<Scalars['u128']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u128']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type ItemBalanceConnection = {
  __typename?: 'ItemBalanceConnection';
  edges?: Maybe<Array<Maybe<ItemBalanceEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type ItemBalanceEdge = {
  __typename?: 'ItemBalanceEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<ItemBalance>;
};

export type ItemBalanceOrder = {
  direction: Direction;
  field: ItemBalanceOrderOrderField;
};

export enum ItemBalanceOrderOrderField {
  Balance = 'BALANCE',
  GameId = 'GAME_ID',
  ItemId = 'ITEM_ID',
  PlayerId = 'PLAYER_ID'
}

export type ItemBalanceWhereInput = {
  balance?: InputMaybe<Scalars['String']['input']>;
  balanceGT?: InputMaybe<Scalars['String']['input']>;
  balanceGTE?: InputMaybe<Scalars['String']['input']>;
  balanceLT?: InputMaybe<Scalars['String']['input']>;
  balanceLTE?: InputMaybe<Scalars['String']['input']>;
  balanceNEQ?: InputMaybe<Scalars['String']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['String']['input']>;
  item_idGT?: InputMaybe<Scalars['String']['input']>;
  item_idGTE?: InputMaybe<Scalars['String']['input']>;
  item_idLT?: InputMaybe<Scalars['String']['input']>;
  item_idLTE?: InputMaybe<Scalars['String']['input']>;
  item_idNEQ?: InputMaybe<Scalars['String']['input']>;
  player_id?: InputMaybe<Scalars['String']['input']>;
  player_idGT?: InputMaybe<Scalars['String']['input']>;
  player_idGTE?: InputMaybe<Scalars['String']['input']>;
  player_idLT?: InputMaybe<Scalars['String']['input']>;
  player_idLTE?: InputMaybe<Scalars['String']['input']>;
  player_idNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Joined = {
  __typename?: 'Joined';
  address?: Maybe<Scalars['felt252']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  joined?: Maybe<Scalars['bool']['output']>;
};

export type JoinedConnection = {
  __typename?: 'JoinedConnection';
  edges?: Maybe<Array<Maybe<JoinedEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type JoinedEdge = {
  __typename?: 'JoinedEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Joined>;
};

export type JoinedOrder = {
  direction: Direction;
  field: JoinedOrderOrderField;
};

export enum JoinedOrderOrderField {
  Address = 'ADDRESS',
  GameId = 'GAME_ID',
  Joined = 'JOINED'
}

export type JoinedWhereInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  addressGT?: InputMaybe<Scalars['String']['input']>;
  addressGTE?: InputMaybe<Scalars['String']['input']>;
  addressLT?: InputMaybe<Scalars['String']['input']>;
  addressLTE?: InputMaybe<Scalars['String']['input']>;
  addressNEQ?: InputMaybe<Scalars['String']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  joined?: InputMaybe<Scalars['Int']['input']>;
  joinedGT?: InputMaybe<Scalars['Int']['input']>;
  joinedGTE?: InputMaybe<Scalars['Int']['input']>;
  joinedLT?: InputMaybe<Scalars['Int']['input']>;
  joinedLTE?: InputMaybe<Scalars['Int']['input']>;
  joinedNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type Ownership = {
  __typename?: 'Ownership';
  entity?: Maybe<Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
  owner?: Maybe<Scalars['felt252']['output']>;
};

export type OwnershipConnection = {
  __typename?: 'OwnershipConnection';
  edges?: Maybe<Array<Maybe<OwnershipEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type OwnershipEdge = {
  __typename?: 'OwnershipEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Ownership>;
};

export type OwnershipOrder = {
  direction: Direction;
  field: OwnershipOrderOrderField;
};

export enum OwnershipOrderOrderField {
  EntityId = 'ENTITY_ID',
  Owner = 'OWNER'
}

export type OwnershipWhereInput = {
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  entity_idGT?: InputMaybe<Scalars['Int']['input']>;
  entity_idGTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idLT?: InputMaybe<Scalars['Int']['input']>;
  entity_idLTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  ownerGT?: InputMaybe<Scalars['String']['input']>;
  ownerGTE?: InputMaybe<Scalars['String']['input']>;
  ownerLT?: InputMaybe<Scalars['String']['input']>;
  ownerLTE?: InputMaybe<Scalars['String']['input']>;
  ownerNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Player = {
  __typename?: 'Player';
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  name?: Maybe<Scalars['felt252']['output']>;
  player_id?: Maybe<Scalars['ContractAddress']['output']>;
};

export type PlayerConnection = {
  __typename?: 'PlayerConnection';
  edges?: Maybe<Array<Maybe<PlayerEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type PlayerEdge = {
  __typename?: 'PlayerEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Player>;
};

export type PlayerOrder = {
  direction: Direction;
  field: PlayerOrderOrderField;
};

export enum PlayerOrderOrderField {
  GameId = 'GAME_ID',
  Name = 'NAME',
  PlayerId = 'PLAYER_ID'
}

export type PlayerWhereInput = {
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  nameGT?: InputMaybe<Scalars['String']['input']>;
  nameGTE?: InputMaybe<Scalars['String']['input']>;
  nameLT?: InputMaybe<Scalars['String']['input']>;
  nameLTE?: InputMaybe<Scalars['String']['input']>;
  nameNEQ?: InputMaybe<Scalars['String']['input']>;
  player_id?: InputMaybe<Scalars['String']['input']>;
  player_idGT?: InputMaybe<Scalars['String']['input']>;
  player_idGTE?: InputMaybe<Scalars['String']['input']>;
  player_idLT?: InputMaybe<Scalars['String']['input']>;
  player_idLTE?: InputMaybe<Scalars['String']['input']>;
  player_idNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  auctionComponents?: Maybe<AuctionConnection>;
  brewComponents?: Maybe<BrewConnection>;
  brewbatchtrackComponents?: Maybe<BrewBatchTrackConnection>;
  component: Component;
  components?: Maybe<ComponentConnection>;
  entities?: Maybe<EntityConnection>;
  entity: Entity;
  event: Event;
  events?: Maybe<EventConnection>;
  farmareaComponents?: Maybe<FarmAreaConnection>;
  gameComponents?: Maybe<GameConnection>;
  gametrackerComponents?: Maybe<GameTrackerConnection>;
  itembalanceComponents?: Maybe<ItemBalanceConnection>;
  joinedComponents?: Maybe<JoinedConnection>;
  ownershipComponents?: Maybe<OwnershipConnection>;
  playerComponents?: Maybe<PlayerConnection>;
  system: System;
  systemCall: SystemCall;
  systemCalls?: Maybe<SystemCallConnection>;
  systems?: Maybe<SystemConnection>;
  tavernauctionComponents?: Maybe<TavernAuctionConnection>;
  tradeComponents?: Maybe<TradeConnection>;
  tradetrackComponents?: Maybe<TradeTrackConnection>;
};


export type QueryAuctionComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<AuctionOrder>;
  where?: InputMaybe<AuctionWhereInput>;
};


export type QueryBrewComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BrewOrder>;
  where?: InputMaybe<BrewWhereInput>;
};


export type QueryBrewbatchtrackComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BrewBatchTrackOrder>;
  where?: InputMaybe<BrewBatchTrackWhereInput>;
};


export type QueryComponentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEventArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFarmareaComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<FarmAreaOrder>;
  where?: InputMaybe<FarmAreaWhereInput>;
};


export type QueryGameComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameOrder>;
  where?: InputMaybe<GameWhereInput>;
};


export type QueryGametrackerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<GameTrackerOrder>;
  where?: InputMaybe<GameTrackerWhereInput>;
};


export type QueryItembalanceComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<ItemBalanceOrder>;
  where?: InputMaybe<ItemBalanceWhereInput>;
};


export type QueryJoinedComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<JoinedOrder>;
  where?: InputMaybe<JoinedWhereInput>;
};


export type QueryOwnershipComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<OwnershipOrder>;
  where?: InputMaybe<OwnershipWhereInput>;
};


export type QueryPlayerComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<PlayerOrder>;
  where?: InputMaybe<PlayerWhereInput>;
};


export type QuerySystemArgs = {
  id: Scalars['ID']['input'];
};


export type QuerySystemCallArgs = {
  id: Scalars['Int']['input'];
};


export type QueryTavernauctionComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TavernAuctionOrder>;
  where?: InputMaybe<TavernAuctionWhereInput>;
};


export type QueryTradeComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TradeOrder>;
  where?: InputMaybe<TradeWhereInput>;
};


export type QueryTradetrackComponentsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<TradeTrackOrder>;
  where?: InputMaybe<TradeTrackWhereInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  componentRegistered: Component;
  entityUpdated: Entity;
};

export type System = {
  __typename?: 'System';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  systemCalls: Array<SystemCall>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type SystemCall = {
  __typename?: 'SystemCall';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  system: System;
  systemId?: Maybe<Scalars['ID']['output']>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type SystemCallConnection = {
  __typename?: 'SystemCallConnection';
  edges?: Maybe<Array<Maybe<SystemCallEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemCallEdge = {
  __typename?: 'SystemCallEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<SystemCall>;
};

export type SystemConnection = {
  __typename?: 'SystemConnection';
  edges?: Maybe<Array<Maybe<SystemEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type SystemEdge = {
  __typename?: 'SystemEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<System>;
};

export type TavernAuction = {
  __typename?: 'TavernAuction';
  decay_constant_mag?: Maybe<Scalars['u128']['output']>;
  decay_constant_sign?: Maybe<Scalars['bool']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u128']['output']>;
  per_time_unit?: Maybe<Scalars['u128']['output']>;
  sold?: Maybe<Scalars['u128']['output']>;
  start_time?: Maybe<Scalars['u64']['output']>;
  target_price?: Maybe<Scalars['u128']['output']>;
};

export type TavernAuctionConnection = {
  __typename?: 'TavernAuctionConnection';
  edges?: Maybe<Array<Maybe<TavernAuctionEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type TavernAuctionEdge = {
  __typename?: 'TavernAuctionEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<TavernAuction>;
};

export type TavernAuctionOrder = {
  direction: Direction;
  field: TavernAuctionOrderOrderField;
};

export enum TavernAuctionOrderOrderField {
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
  decay_constant_mag?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magGT?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magGTE?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magLT?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magLTE?: InputMaybe<Scalars['String']['input']>;
  decay_constant_magNEQ?: InputMaybe<Scalars['String']['input']>;
  decay_constant_sign?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signGT?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signGTE?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signLT?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signLTE?: InputMaybe<Scalars['Int']['input']>;
  decay_constant_signNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['String']['input']>;
  item_idGT?: InputMaybe<Scalars['String']['input']>;
  item_idGTE?: InputMaybe<Scalars['String']['input']>;
  item_idLT?: InputMaybe<Scalars['String']['input']>;
  item_idLTE?: InputMaybe<Scalars['String']['input']>;
  item_idNEQ?: InputMaybe<Scalars['String']['input']>;
  per_time_unit?: InputMaybe<Scalars['String']['input']>;
  per_time_unitGT?: InputMaybe<Scalars['String']['input']>;
  per_time_unitGTE?: InputMaybe<Scalars['String']['input']>;
  per_time_unitLT?: InputMaybe<Scalars['String']['input']>;
  per_time_unitLTE?: InputMaybe<Scalars['String']['input']>;
  per_time_unitNEQ?: InputMaybe<Scalars['String']['input']>;
  sold?: InputMaybe<Scalars['String']['input']>;
  soldGT?: InputMaybe<Scalars['String']['input']>;
  soldGTE?: InputMaybe<Scalars['String']['input']>;
  soldLT?: InputMaybe<Scalars['String']['input']>;
  soldLTE?: InputMaybe<Scalars['String']['input']>;
  soldNEQ?: InputMaybe<Scalars['String']['input']>;
  start_time?: InputMaybe<Scalars['Int']['input']>;
  start_timeGT?: InputMaybe<Scalars['Int']['input']>;
  start_timeGTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeLT?: InputMaybe<Scalars['Int']['input']>;
  start_timeLTE?: InputMaybe<Scalars['Int']['input']>;
  start_timeNEQ?: InputMaybe<Scalars['Int']['input']>;
  target_price?: InputMaybe<Scalars['String']['input']>;
  target_priceGT?: InputMaybe<Scalars['String']['input']>;
  target_priceGTE?: InputMaybe<Scalars['String']['input']>;
  target_priceLT?: InputMaybe<Scalars['String']['input']>;
  target_priceLTE?: InputMaybe<Scalars['String']['input']>;
  target_priceNEQ?: InputMaybe<Scalars['String']['input']>;
};

export type Trade = {
  __typename?: 'Trade';
  entity?: Maybe<Entity>;
  entity_id?: Maybe<Scalars['u64']['output']>;
  game_id?: Maybe<Scalars['u64']['output']>;
  item_id?: Maybe<Scalars['u128']['output']>;
  price?: Maybe<Scalars['u128']['output']>;
  quantity?: Maybe<Scalars['u128']['output']>;
  status?: Maybe<Scalars['u8']['output']>;
};

export type TradeConnection = {
  __typename?: 'TradeConnection';
  edges?: Maybe<Array<Maybe<TradeEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type TradeEdge = {
  __typename?: 'TradeEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<Trade>;
};

export type TradeOrder = {
  direction: Direction;
  field: TradeOrderOrderField;
};

export enum TradeOrderOrderField {
  EntityId = 'ENTITY_ID',
  GameId = 'GAME_ID',
  ItemId = 'ITEM_ID',
  Price = 'PRICE',
  Quantity = 'QUANTITY',
  Status = 'STATUS'
}

export type TradeTrack = {
  __typename?: 'TradeTrack';
  count?: Maybe<Scalars['u64']['output']>;
  entity?: Maybe<Entity>;
  game_id?: Maybe<Scalars['u64']['output']>;
};

export type TradeTrackConnection = {
  __typename?: 'TradeTrackConnection';
  edges?: Maybe<Array<Maybe<TradeTrackEdge>>>;
  totalCount: Scalars['Int']['output'];
};

export type TradeTrackEdge = {
  __typename?: 'TradeTrackEdge';
  cursor: Scalars['Cursor']['output'];
  node?: Maybe<TradeTrack>;
};

export type TradeTrackOrder = {
  direction: Direction;
  field: TradeTrackOrderOrderField;
};

export enum TradeTrackOrderOrderField {
  Count = 'COUNT',
  GameId = 'GAME_ID'
}

export type TradeTrackWhereInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  countGT?: InputMaybe<Scalars['Int']['input']>;
  countGTE?: InputMaybe<Scalars['Int']['input']>;
  countLT?: InputMaybe<Scalars['Int']['input']>;
  countLTE?: InputMaybe<Scalars['Int']['input']>;
  countNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type TradeWhereInput = {
  entity_id?: InputMaybe<Scalars['Int']['input']>;
  entity_idGT?: InputMaybe<Scalars['Int']['input']>;
  entity_idGTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idLT?: InputMaybe<Scalars['Int']['input']>;
  entity_idLTE?: InputMaybe<Scalars['Int']['input']>;
  entity_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  game_id?: InputMaybe<Scalars['Int']['input']>;
  game_idGT?: InputMaybe<Scalars['Int']['input']>;
  game_idGTE?: InputMaybe<Scalars['Int']['input']>;
  game_idLT?: InputMaybe<Scalars['Int']['input']>;
  game_idLTE?: InputMaybe<Scalars['Int']['input']>;
  game_idNEQ?: InputMaybe<Scalars['Int']['input']>;
  item_id?: InputMaybe<Scalars['String']['input']>;
  item_idGT?: InputMaybe<Scalars['String']['input']>;
  item_idGTE?: InputMaybe<Scalars['String']['input']>;
  item_idLT?: InputMaybe<Scalars['String']['input']>;
  item_idLTE?: InputMaybe<Scalars['String']['input']>;
  item_idNEQ?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['String']['input']>;
  priceGT?: InputMaybe<Scalars['String']['input']>;
  priceGTE?: InputMaybe<Scalars['String']['input']>;
  priceLT?: InputMaybe<Scalars['String']['input']>;
  priceLTE?: InputMaybe<Scalars['String']['input']>;
  priceNEQ?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['String']['input']>;
  quantityGT?: InputMaybe<Scalars['String']['input']>;
  quantityGTE?: InputMaybe<Scalars['String']['input']>;
  quantityLT?: InputMaybe<Scalars['String']['input']>;
  quantityLTE?: InputMaybe<Scalars['String']['input']>;
  quantityNEQ?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Int']['input']>;
  statusGT?: InputMaybe<Scalars['Int']['input']>;
  statusGTE?: InputMaybe<Scalars['Int']['input']>;
  statusLT?: InputMaybe<Scalars['Int']['input']>;
  statusLTE?: InputMaybe<Scalars['Int']['input']>;
  statusNEQ?: InputMaybe<Scalars['Int']['input']>;
};

export type GetGamesQueryVariables = Exact<{
  status: Scalars['Int']['input'];
}>;


export type GetGamesQuery = { __typename?: 'Query', gameComponents?: { __typename?: 'GameConnection', edges?: Array<{ __typename?: 'GameEdge', node?: { __typename?: 'Game', game_id?: any | null, start_time?: any | null, status?: any | null, number_players?: any | null, max_players?: any | null, game_length?: any | null, entry_fee?: any | null, password?: any | null } | null } | null> | null } | null };


export const GetGamesDocument = gql`
    query getGames($status: Int!) {
  gameComponents(where: {status: $status}) {
    edges {
      node {
        game_id
        start_time
        status
        number_players
        max_players
        game_length
        entry_fee
        password
      }
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const GetGamesDocumentString = print(GetGamesDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getGames(variables: GetGamesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetGamesQuery; extensions?: any; headers: Dom.Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetGamesQuery>(GetGamesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getGames', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;