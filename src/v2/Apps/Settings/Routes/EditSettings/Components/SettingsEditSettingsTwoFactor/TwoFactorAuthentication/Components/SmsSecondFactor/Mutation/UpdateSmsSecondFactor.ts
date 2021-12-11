import {
  UpdateSmsSecondFactorInput,
  UpdateSmsSecondFactorMutation,
  UpdateSmsSecondFactorMutationResponse,
} from "v2/__generated__/UpdateSmsSecondFactorMutation.graphql"
import { Environment, commitMutation, graphql } from "react-relay"

export const UpdateSmsSecondFactor = (
  environment: Environment,
  input: UpdateSmsSecondFactorInput
) => {
  return new Promise<UpdateSmsSecondFactorMutationResponse>(
    async (resolve, reject) => {
      commitMutation<UpdateSmsSecondFactorMutation>(environment, {
        onCompleted: data => {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          const response = data.updateSmsSecondFactor.secondFactorOrErrors

          switch (response.__typename) {
            case "SmsSecondFactor":
              resolve(data)
              break
            case "Errors":
              reject(response.errors)
          }
        },
        onError: error => {
          reject(error)
        },
        // PLEASE_FIXME: REMOVE_THIS_COMMENT_RELAY_UPGRADE
        mutation: graphql`
          mutation UpdateSmsSecondFactorMutation(
            $input: UpdateSmsSecondFactorInput!
          ) @raw_response_type {
            updateSmsSecondFactor(input: $input) {
              secondFactorOrErrors {
                ... on SmsSecondFactor {
                  __typename
                }

                ... on Errors {
                  __typename
                  errors {
                    message
                    code
                    data
                  }
                }
              }
            }
          }
        `,
        variables: {
          input,
        },
      })
    }
  )
}
