import Vue from "vue"
import Amplify, * as AmplifyModules from "aws-amplify"

const config = {
  ssr: true,
  aws_project_region: "eu-central-1",
  aws_cognito_region: "eu-central-1",
  aws_user_pools_id: "eu-central-1_bXa2dhoAO",
  aws_user_pools_web_client_id: "41ci3u220pgojhpcej1e40t21m",
  oauth: {},
}

Amplify.configure(config)

Vue.use(AmplifyModules)
