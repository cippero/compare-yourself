export default {
    // s3: {
    //     REGION: "us-west-2",
    //     BUCKET: "namad-app-api-dev-serverlessdeploymentbucket-8086ep8vfb84"
    // },
    apiGateway: {
        REGION: "us-west-2",
        URL: "https://38oovlytec.execute-api.us-west-2.amazonaws.com/dev/"
    },
    cognito: {
        REGION: "us-west-2",
        USER_POOL_ID: "us-west-2_DewZCyxkn",
        APP_CLIENT_ID: "2a07bn5443cobf4hsk6b6smvpv",
        IDENTITY_POOL_ID: "us-west-2:cfd0d543-74a2-4f0c-87ba-2b965172eb47"
    }
    // ,MAX_ATTACHMENT_SIZE: 5000000,
};