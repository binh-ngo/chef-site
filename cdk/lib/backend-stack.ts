import {
    CfnOutput,
    Duration,
    Expiration,
    Stack,
    StackProps,
  } from "aws-cdk-lib";
  import { IUserPool } from "aws-cdk-lib/aws-cognito";
  import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
  import {
    AuthorizationType,
    FieldLogLevel,
    GraphqlApi,
    Schema,
    UserPoolDefaultAction,
  } from "@aws-cdk/aws-appsync-alpha";
  import {
    Code,
    Function as LambdaFunction,
    Runtime,
  } from "aws-cdk-lib/aws-lambda";
import { Effect, PolicyStatement, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
  
  interface BackendStackProps extends StackProps {
    readonly userPool: IUserPool;
  }
  
  export class BackendStack extends Stack {
    constructor(parent: Stack, id: string, props: BackendStackProps) {
      super(parent, id, props);
  
      const chefSiteTable = new Table(this, "ChefSiteTable", {
        billingMode: BillingMode.PAY_PER_REQUEST,
        partitionKey: {
          name: "PK",
          type: AttributeType.STRING,
        },
        sortKey: {
          name: "SK",
          type: AttributeType.STRING,
        },
      });
      new CfnOutput(this, "ChefSiteTableName", {
        value: chefSiteTable.tableName,
      });
  
      const chefSiteLambda = new LambdaFunction(this, "ChefSiteLambda", {
        runtime: Runtime.NODEJS_18_X,
        handler: "main.handler",
        code: Code.fromAsset("lambda"),
        memorySize: 512,
        environment: {
          // CHEFS Table
          POSTS_TABLE: chefSiteTable.tableName,
        },
      });
      chefSiteTable.grantFullAccess(chefSiteLambda);
  
      const api = new GraphqlApi(this, "ChefSiteGraphQL", {
        name: "chef-site",
        schema: Schema.fromAsset("./graphql/schema.graphql"),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: AuthorizationType.API_KEY,
            apiKeyConfig: {
              expires: Expiration.after(Duration.days(365)),
            },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: AuthorizationType.USER_POOL,
              userPoolConfig: {
                userPool: props.userPool,
                appIdClientRegex: ".*",
                defaultAction: UserPoolDefaultAction.ALLOW,
              },
            },
          ],
        },
        logConfig: {
          fieldLogLevel: FieldLogLevel.ERROR,
        },
        xrayEnabled: false,
      });
  
      // Prints out the AppSync GraphQL endpoint to the terminal
      new CfnOutput(this, "ChefSiteGraphQLAPIURL", {
        value: api.graphqlUrl,
      });
  
      // Prints out the AppSync GraphQL API key to the terminal
      new CfnOutput(this, "ChefSiteGraphQLAPIKey", {
        value: api.apiKey || "",
      });
  
      // Prints out the stack region to the terminal
      new CfnOutput(this, "Stack Region", {
        value: this.region,
      });

      // Define the IAM role for the AppSync DataSource
      const appSyncDataSourceRole = new Role(this, 'AppSyncDataSourceRole', {
        assumedBy: new ServicePrincipal('appsync.amazonaws.com'),
      });
  
      // Attach the necessary policy statement to the role
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['lambda:InvokeFunction'], 
        resources: [chefSiteLambda.functionArn],
      }));
      
      appSyncDataSourceRole.addToPolicy(new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['dynamodb:UpdateItem'], 
        resources: [chefSiteTable.tableArn],
      }));

      const chefSiteDataSource = api.addLambdaDataSource(
        "ChefSiteDataSource",
        chefSiteLambda
      );

      // Chef Resolvers
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllChefs",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getChefById",
      })

      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createChef",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteChef",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateChef",
      })

      // Post Resolvers
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllPosts",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getPublishedPosts",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllPostsFromAllChefs",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getPostById",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createPost",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "publishPost",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deletePost",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updatePost",
      })

      // Comment Resolvers
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getCommentById",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createComment",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteComment",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateComment",
      })

      // Tag Resolvers
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getTagById",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllTags",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createTag",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteTag",
      })

      // Review Resolvers
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getReviewById",
      })
      chefSiteDataSource.createResolver({
        typeName: "Query",
        fieldName: "getAllReviews",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "createReview",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "deleteReview",
      })
      chefSiteDataSource.createResolver({
        typeName: "Mutation",
        fieldName: "updateReview",
      })
    }
  }