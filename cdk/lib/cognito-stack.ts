import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import { UserPool } from "aws-cdk-lib/aws-cognito";

export class CognitoStack extends Stack {
  readonly userPool: UserPool;

  constructor(parent: Stack, id: string, props?: StackProps) {
    super(parent, id, props);

    this.userPool = new UserPool(this, "ChefSite-UserPool", {
      autoVerify: {
        email: true,
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: false,
        requireDigits: false,
        requireUppercase: false,
        requireSymbols: false,
      },
      selfSignUpEnabled: true,
    });

    const userPoolClient = this.userPool.addClient("ChefSiteAdminClient", {
      userPoolClientName: "ChefSite-admin",
      authFlows: {
        userPassword: true,
        userSrp: true,
      },
      preventUserExistenceErrors: true,
    });

    new CfnOutput(this, "ChefSite-UserPoolId", { value: this.userPool.userPoolId });
    new CfnOutput(this, "ChefSite-UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });
  }
}