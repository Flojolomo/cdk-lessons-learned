#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as ssm from 'aws-cdk-lib/aws-ssm';

import { Layer } from '../lib/layer/layer';
import { LambdaFunction } from '../lib/lambda-function/lambda-function';
import { LayerVersion } from 'aws-cdk-lib/aws-lambda';

const app = new cdk.App();

function shareResourcesBetweenStackInstances(app: cdk.App) {
    const stackOne = new cdk.Stack(app, "StackWithSharedLayer")
    const layer = new Layer(stackOne, "Layer").layer
    
    const stackTwo = new cdk.Stack(app, "StackDependingOnSharedLayer")
    new LambdaFunction(stackTwo, "Function", { layer })
}

function shareResourcesBetweenNestedStackInstances(app: cdk.App) {
    const stack = new cdk.Stack(app, "DependenciesOfNestedStacks")
    const nestedStackOne = new cdk.NestedStack(stack, "One")
    const layerInNestedStack = new Layer(nestedStackOne, "Layer").layer
    
    const nestedStackTwo = new cdk.NestedStack(stack, "Two")
    new LambdaFunction(nestedStackTwo, "Function", { layer: layerInNestedStack })
}

shareResourcesBetweenStackInstances(app)
shareResourcesBetweenNestedStackInstances(app)