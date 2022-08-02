import Cookies from "cookies-js"
import { useEffect } from "react"
import { useSystemContext } from "System"
import { useAddUserToSubmission } from "Apps/Consign/Routes/SubmissionFlow/Mutations"
import createLogger from "Utils/logger"
import { MutationParameters } from "relay-runtime"
import { useDidMount } from "Utils/Hooks/useDidMount"

const logger = createLogger("Utils/Hooks/useConnectUserToSubmission.tsx")

export const connectUserToSubmission = async (
  addUser: (
    variables: MutationParameters["variables"]
  ) => Promise<MutationParameters["response"]>
) => {
  const submissionId = await Cookies.get("submissionId")

  if (!submissionId) return

  try {
    await addUser({
      variables: {
        input: {
          id: submissionId,
        },
      },
    })
  } catch (error) {
    logger.error("Add user to submission error", error)
  } finally {
    Cookies.expire("submissionId")
  }
}

export const useConnectUserToSubmission = () => {
  const isMounted = useDidMount()
  const { user } = useSystemContext()
  const { submitMutation: addUser } = useAddUserToSubmission()

  useEffect(() => {
    if (!user || !isMounted) return

    connectUserToSubmission(addUser)
  }, [user, isMounted, addUser])
}