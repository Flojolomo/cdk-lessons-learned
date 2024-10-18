# Cross Stack References

CDk access to reference resources over cross boundaries. By defining subclasses of `cdk.Stack`, resources can be references through accessing public fields, even without explicity declaring `cdk.CfnOutput` values with a defined `exportName` property. This is done by CDK.

If resources are referenced by accessing public member variables, CDK creates a CloudFormation Output with an export name. And the referencing stack importes that value with the intrinsic CloudFormation function `Fn::Import`. 
The drawback of this approach is, that as long as an Output is referenced, it cannot be updated or deleted.

A [CDK issue](https://github.com/aws/aws-cdk/issues/1972) describes a workaround using SSM Parameter Store resources to share ARNs over Stack boundaries. A different approach of to solve this issue is to instances of `cdk.NestedStack`. CDK coordinates updates of both nested stacks to avoid updates bracking deployments. The downside of this approach is the coupling of those instances in one Stack instance.

> The focus of this repository is to share lessons learned about CDK. But a problem statement related to SST v2 was the reason to investigate this topic of referencing resources over stack boundaries. **The most important insight of this investigation is, that SST v2 does not support nested stacks! As a consequence, the references are shared by Outputs and imported in other stacks. Hence, those values cannot be updated afterwards.

# Approaches

The code for those approaches is located at the [bin directory](./bin/cross-stack-references.ts) in dedicated functions. The module can be deployed as is.
To do so, run `npm run cdk deploy`.

The effects of updating an Output value used by another stack, just go to the [layer code](./lib/layer/layer-code/nodejs/utils.js) and do any change & redeploy the changes.
The update of `DependenciesOfNestedStacks` will go through without any issues but the opdate of `StackWithSharedLayer` will fails. The error on the command line is not speaking but in the events of the stack in the CloudFormation console, you can see the event `UPDATE_IN_PROGRESS` (`Requested update requires the creation of a new physical resource; hence creating one.` ) for the layer which succeeds. The event updating the stack Output fails with the error `Export StackWithSharedLayer:ExportsOutputRefLayerMyLayer*** cannot be updated as it is in use by StackDependingOnSharedLayer`.

There is a third approach for sharing values with SSM String Parameters. An [CDK issue](https://github.com/aws/aws-cdk/issues/1972) provides a suggestion how to implement this.  
