import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['Int'];
  messages: Array<Message>;
  name: Scalars['String'];
  public: Scalars['Boolean'];
  users: Array<User>;
};

export type Error = {
  __typename?: 'Error';
  message?: Maybe<Scalars['String']>;
  path: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<Error>>;
  ok: Scalars['Boolean'];
  refreshToken?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  id: Scalars['Int'];
  text: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChannel: Scalars['Boolean'];
  createMessage: Scalars['Boolean'];
  createTeam: Scalars['Boolean'];
  login: LoginResponse;
  register: RegisterResponse;
};


export type MutationCreateChannelArgs = {
  name: Scalars['String'];
  public?: InputMaybe<Scalars['Boolean']>;
  teamId: Scalars['Int'];
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  getUser: User;
};


export type QueryGetUserArgs = {
  id: Scalars['Int'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  errors?: Maybe<Array<Error>>;
  ok: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Team = {
  __typename?: 'Team';
  channels: Array<Channel>;
  members: Array<User>;
  owner: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  teams: Array<Team>;
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Channel: ResolverTypeWrapper<Channel>;
  Error: ResolverTypeWrapper<Error>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RegisterResponse: ResolverTypeWrapper<RegisterResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Team: ResolverTypeWrapper<Team>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Channel: Channel;
  Error: Error;
  Int: Scalars['Int'];
  LoginResponse: LoginResponse;
  Message: Message;
  Mutation: {};
  Query: {};
  RegisterResponse: RegisterResponse;
  String: Scalars['String'];
  Team: Team;
  User: User;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  public?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createChannel?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateChannelArgs, 'name' | 'public' | 'teamId'>>;
  createMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'channelId' | 'text'>>;
  createTeam?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationCreateTeamArgs, 'name'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  register?: Resolver<ResolversTypes['RegisterResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'email' | 'password' | 'username'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  allUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
};

export type RegisterResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RegisterResponse'] = ResolversParentTypes['RegisterResponse']> = {
  errors?: Resolver<Maybe<Array<ResolversTypes['Error']>>, ParentType, ContextType>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TeamResolvers<ContextType = any, ParentType extends ResolversParentTypes['Team'] = ResolversParentTypes['Team']> = {
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  members?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  teams?: Resolver<Array<ResolversTypes['Team']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegisterResponse?: RegisterResponseResolvers<ContextType>;
  Team?: TeamResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

