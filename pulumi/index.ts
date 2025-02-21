import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.BucketV2("my-bucket");

// Create an S3 Bucket object
const bucketObject = new aws.s3.BucketObject("index.html", {
  bucket: bucket.id,
  source: new pulumi.asset.FileAsset("./index.html"),
});

// Export the name of the bucket
export const bucketName = bucket.id;
