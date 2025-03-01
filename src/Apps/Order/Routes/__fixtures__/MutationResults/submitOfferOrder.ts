import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"

export const submitOfferOrderWithFailure = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      error: {
        type: "validation",
        code: "credit_card_not_found",
        data: '{"credit_card_id":"5b9987f72957190026d0ff54"}',
      },
    },
  },
}

export const submitOfferOrderFailedConfirmation = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      __typename: "CommerceOrderWithMutationFailure",
      error: {
        type: "processing",
        code: "payment_method_confirmation_failed",
        data: null,
      },
    },
  },
}

export const submitOfferOrderWithVersionMismatchFailure = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      error: {
        type: "processing",
        code: "artwork_version_mismatch",
        data: null,
      },
    },
  },
}

export const submitOfferOrderWithNoInventoryFailure = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      error: {
        type: "processing",
        code: "insufficient_inventory",
        data: null,
      },
    },
  },
}

export const submitOfferOrderWithActionRequired = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      actionData: {
        clientSecret: "client-secret",
      },
    },
  },
}

export const submitOfferOrderSuccess = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        state: "SUBMITTED",
      },
    },
  },
}

export const submitOfferOrderSuccessInReview = {
  submitOfferOrderWithConversation: {
    orderOrError: {
      order: {
        ...OfferOrderWithShippingDetails,
        // TODO: uncomment state & remove payment method once buyerStatus
        // is implemented in Exchange.
        // See https://www.notion.so/artsy/2023-02-09-Platform-Practice-Meeting-Notes-87f4cc9987a7436c9c4b207847e318db?pvs=4
        // state: "IN_REVIEW",
        paymentMethod: "WIRE_TRANSFER",
      },
    },
  },
}
