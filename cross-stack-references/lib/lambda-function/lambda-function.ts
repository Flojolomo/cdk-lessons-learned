import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from "aws-cdk-lib/aws-logs";
import path = require("path");


export class LambdaFunction extends Construct {
    public constructor(scope: Construct, id: string, props: {layer: lambda.ILayerVersion}) {
        super(scope, id)

        new lambda.Function(this, 'MyFunction', {
            runtime: lambda.Runtime.NODEJS_18_X,  
            handler: "handler.handler",
            code: lambda.Code.fromAsset(path.join(__dirname, "handler")),
            layers: [props.layer],
            logRetention: logs.RetentionDays.ONE_DAY,
            environment: {
              NODE_PATH: '/opt/nodejs'  // This allows the function to find the layer code
            }
          });
    }
}