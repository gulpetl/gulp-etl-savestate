import * as handler from './handler';

let event = { resource: '/doparse',
path: '/doparse',
httpMethod: 'POST',
headers: 
{ Accept: '*/*',
'Accept-Encoding': 'gzip, deflate',
'cache-control': 'no-cache',
'CloudFront-Forwarded-Proto': 'https',
'CloudFront-Is-Desktop-Viewer': 'true',
'CloudFront-Is-Mobile-Viewer': 'false',
'CloudFront-Is-SmartTV-Viewer': 'false',
'CloudFront-Is-Tablet-Viewer': 'false',
'CloudFront-Viewer-Country': 'US',
'Content-Type': 'application/json',
Host: 'cypbmaxvwf.execute-api.us-west-2.amazonaws.com',
'Postman-Token': '0c9517f3-819c-4c58-9cef-cfbc95efc90d',
'User-Agent': 'PostmanRuntime/7.6.0',
Via: '1.1 4a495e8480f789db14c4afa001a38181.cloudfront.net (CloudFront)',
'X-Amz-Cf-Id': 'GmZwl3mursBQa296O6rVpWbxoU7zmPTzsVauu93bzZjD1vDu-gVe7A==',
'X-Amzn-Trace-Id': 'Root=1-5c523266-ebf576946ea8c068191f6bb8',
'X-Forwarded-For': '65.182.85.9, 216.137.42.73',
'X-Forwarded-Port': '443',
'X-Forwarded-Proto': 'https' },
multiValueHeaders: 
{ Accept: [ '*/*' ],
'Accept-Encoding': [ 'gzip, deflate' ],
'cache-control': [ 'no-cache' ],
'CloudFront-Forwarded-Proto': [ 'https' ],
'CloudFront-Is-Desktop-Viewer': [ 'true' ],
'CloudFront-Is-Mobile-Viewer': [ 'false' ],
'CloudFront-Is-SmartTV-Viewer': [ 'false' ],
'CloudFront-Is-Tablet-Viewer': [ 'false' ],
'CloudFront-Viewer-Country': [ 'US' ],
'Content-Type': [ 'application/json' ],
Host: [ 'cypbmaxvwf.execute-api.us-west-2.amazonaws.com' ],
'Postman-Token': [ '0c9517f3-819c-4c58-9cef-cfbc95efc90d' ],
'User-Agent': [ 'PostmanRuntime/7.6.0' ],
Via: 
[ '1.1 4a495e8480f789db14c4afa001a38181.cloudfront.net (CloudFront)' ],
'X-Amz-Cf-Id': [ 'GmZwl3mursBQa296O6rVpWbxoU7zmPTzsVauu93bzZjD1vDu-gVe7A==' ],
'X-Amzn-Trace-Id': [ 'Root=1-5c523266-ebf576946ea8c068191f6bb8' ],
'X-Forwarded-For': [ '65.182.85.9, 216.137.42.73' ],
'X-Forwarded-Port': [ '443' ],
'X-Forwarded-Proto': [ 'https' ] },
queryStringParameters: null,
multiValueQueryStringParameters: null,
pathParameters: null,
stageVariables: null,
requestContext: 
{ resourceId: 'm6q4uf',
resourcePath: '/doparse',
httpMethod: 'POST',
extendedRequestId: 'UVzQDEDOPHcF6LQ=',
requestTime: '30/Jan/2019:23:25:26 +0000',
path: '/dev/doparse',
accountId: '943224623824',
protocol: 'HTTP/1.1',
stage: 'dev',
domainPrefix: 'cypbmaxvwf',
requestTimeEpoch: 1548890726777,
requestId: '5328c6b7-24e6-11e9-aab8-eb383d20cf48',
identity: 
{ cognitoIdentityPoolId: null,
accountId: null,
cognitoIdentityId: null,
caller: null,
sourceIp: '65.182.85.9',
accessKey: null,
cognitoAuthenticationType: null,
cognitoAuthenticationProvider: null,
userArn: null,
userAgent: 'PostmanRuntime/7.6.0',
user: null },
domainName: 'cypbmaxvwf.execute-api.us-west-2.amazonaws.com',
apiId: 'cypbmaxvwf' },
body: '{\n\t"config":{\n\t\t\n\t},\n\t"toParse": "{\\"type\\":\\"STATE\\",\\"value\\":{\\"envelope\\":{\\"to\\":[],\\"cc\\":[],\\"from\\":[],\\"bcc\\":[]},\\"tap_log\\":[{\\"tap_name\\":\\"parseFlat\\",\\"result\\":{\\"linesRead\\":{\\"USDA_Class\\":3}}}],\\"errors\\":[]} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119458,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":36,\\"Strength\\":317,\\"Leaf Grade\\":4,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":733,\\"Color +b\\":91,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":820,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0035\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"RECORD\\",\\"stream\\":\\"Bale\\",\\"record\\":{\\"Gin Code Number\\":60115,\\"Gin Bale Number\\":1119463,\\"Date Classed\\":\\"2015-09-03T00:00:00.000Z\\",\\"Module, Trailer, or Single Bale\\":0,\\"Module\\/Trailer Number\\":\\"00000\\",\\"Bales in Module\\/Trailer\\":0,\\"Official Color Grade\\":42,\\"Fiber Staple Length\\":37,\\"Micronaire\\":34,\\"Strength\\":302,\\"Leaf Grade\\":5,\\"Extraneous Matter\\":0,\\"Remarks\\":0,\\"Instrument ColorCode\\":42,\\"Color Quadrant\\":1,\\"Color Rd\\":725,\\"Color +b\\":92,\\"Non-Lint Content (Trash Percent Area)\\":8,\\"Length Uniformity Index (Percent)\\":809,\\"Upland or Pima\\":1,\\"Record Type\\":0,\\"Record Status\\":0,\\"CCC Loan Premiums and Discounts\\":\\"-0425\\"} }\\r\\n{\\"type\\":\\"STATE\\",\\"value\\":{\\"envelope\\":{\\"to\\":[],\\"cc\\":[],\\"from\\":[],\\"bcc\\":[]},\\"tap_log\\":[{\\"tap_name\\":\\"parseFlat\\",\\"result\\":{\\"linesRead\\":{\\"USDA_Class\\":3}}}],\\"errors\\":[]} }"\n}',
isBase64Encoded: false }

let Vinyl = require('vinyl');

handler.doParse(event,null,(err:any,response:any)=>{
    let vinyl = JSON.parse(response.body);
    console.log("\nresponse: \n" + Buffer.from(vinyl._contents).toString());
});