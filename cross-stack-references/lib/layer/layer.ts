import { Construct } from "constructs";
import * as lambda from 'aws-cdk-lib/aws-lambda';
import path = require("path");

export class Layer extends Construct {

    public readonly layer: lambda.ILayerVersion;

    public constructor(scope: Construct, id: string) {
        super(scope,id)
        this.layer = new lambda.LayerVersion(this, 'MyLayer', {
            description: 'A custom layer created from local source code',
            code: lambda.Code.fromAsset(path.join(__dirname, 'layer-code')),
            compatibleRuntimes: [
            lambda.Runtime.NODEJS_18_X,
            ],
        });
    }
}