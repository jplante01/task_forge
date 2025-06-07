#!/bin/bash
set -e

BUCKET_NAME="task-forge-85749303"
DISTRIBUTION_ID="E35S4N2EA4NS9D"
BUILD_DIR="dist"

echo "Building application..."
npm run build

echo "Uploading to S3..."
aws s3 sync ./$BUILD_DIR s3://$BUCKET_NAME --delete

echo "Setting content types..."
aws s3 sync ./$BUILD_DIR s3://$BUCKET_NAME \
  --exclude "*" --include "*.html" \
  --content-type "text/html" --cache-control "no-cache"

aws s3 sync ./$BUILD_DIR s3://$BUCKET_NAME \
  --exclude "*" --include "*.js" \
  --content-type "application/javascript" --cache-control "max-age=31536000"

aws s3 sync ./$BUILD_DIR s3://$BUCKET_NAME \
  --exclude "*" --include "*.css" \
  --content-type "text/css" --cache-control "max-age=31536000"

echo "Invalidating CloudFront cache..."
INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*" \
  --query 'Invalidation.Id' \
  --output text)

echo "Deployment complete!"
echo "S3 URL: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
echo "CloudFront URL: https://taskforge.jplante.dev"
echo "Invalidation ID: $INVALIDATION_ID"