#!/bin/bash
set -e

# Load environment variables
source .env.deploy

BUILD_DIR="../dist"

echo "Building application..."
# Run npm from parent directory
(cd .. && npm run build)

echo "Uploading to S3..."
aws s3 sync ./$BUILD_DIR s3://$S3_BUCKET_NAME --delete

echo "Setting content types..."
aws s3 sync ./$BUILD_DIR s3://$S3_BUCKET_NAME \
  --exclude "*" --include "*.html" \
  --content-type "text/html" --cache-control "no-cache"

aws s3 sync ./$BUILD_DIR s3://$S3_BUCKET_NAME \
  --exclude "*" --include "*.js" \
  --content-type "application/javascript" --cache-control "max-age=31536000"

aws s3 sync ./$BUILD_DIR s3://$S3_BUCKET_NAME \
  --exclude "*" --include "*.css" \
  --content-type "text/css" --cache-control "max-age=31536000"

if [ -n "$CLOUDFRONT_DISTRIBUTION_ID" ]; then
  echo "Invalidating CloudFront cache..."
  INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)
  echo "Invalidation ID: $INVALIDATION_ID"
fi

echo "Deployment complete!"
echo "S3 URL: $S3_WEBSITE_URL"
echo "CloudFront URL: $CLOUDFRONT_URL"
if [ -n "$INVALIDATION_ID" ]; then
  echo "Invalidation ID: $INVALIDATION_ID"
fi