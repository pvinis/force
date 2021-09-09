import React, { useState } from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Dialog,
  Flex,
  Input,
  Modal,
  ModalWidth,
  Spacer,
  Text,
  Select,
  Box,
} from "@artsy/palette"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "../Utils/shippingUtils"
import { Formik, FormikHelpers, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "../Utils/formValidators"
import { updateUserAddress } from "../Mutations/UpdateUserAddress"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { AddressModalFields } from "v2/Components/Address/AddressModalFields"
import { useSystemContext } from "v2/System/SystemContext"
import { updateUserDefaultAddress } from "../Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"
import { PhoneNumberUtil } from "google-libphonenumber"
import styled from "styled-components"
import { replace } from "lodash"
import { countries, countryCodes } from "v2/Utils/countries"
import { useEffect } from "react"
export interface ModalDetails {
  addressModalTitle: string
  addressModalAction: AddressModalAction
}

export interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
  onSuccess: (
    address?: UpdateUserAddressMutationResponse &
      CreateUserAddressMutationResponse
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: ModalDetails
  me: SavedAddresses_me
}

const SERVER_ERROR_MAP: Record<string, Record<string, string>> = {
  "Validation failed for phone: not a valid phone number": {
    field: "phoneNumber",
    message: "Please enter a valid phone number",
  },
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

export type AddressModalAction = "editUserAddress" | "createUserAddress"

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  onSuccess,
  onDeleteAddress,
  onError,
  modalDetails,
  me,
}) => {
  const phoneUtil = PhoneNumberUtil.getInstance()
  const [countryCode, setCountryCode] = useState<string>("us")
  const [formattedPhoneNumber, setformattedPhoneNumber] = useState<
    string | null
  >(null)
  const [phoneNumber, setphoneNumber] = useState<string>(
    address?.phoneNumber ?? ""
  )
  const title = modalDetails?.addressModalTitle
  const createMutation =
    modalDetails?.addressModalAction === "createUserAddress"

  const validator = (values: any) => {
    const validationResult = validateAddress(values)
    const phoneValidation = validatePhoneNumber(values.phoneNumber)
    const errors = Object.assign({}, validationResult.errors, {})
    const errorsTrimmed = removeEmptyKeys(errors)

    return errorsTrimmed
  }

  const { relayEnvironment } = useSystemContext()
  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  if (!relayEnvironment) return null

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }
  const mergeCountryCodeToPhoneNum = (phoneInput: string) => {
    const cc = countryCodes[countryCode.toUpperCase()] ?? ""
    setphoneNumber("+" + cc + phoneInput)
  }

  return (
    <>
      <Modal
        title={title}
        show={show}
        onClose={handleModalClose}
        modalWidth={ModalWidth.Wide}
      >
        <Formik
          validateOnMount
          initialValues={createMutation ? { country: "US" } : address}
          validate={validator}
          onSubmit={(
            values: SavedAddressType,
            actions: FormikHelpers<SavedAddressType>
          ) => {
            const handleError = message => {
              const userMessage: Record<string, string> | null =
                SERVER_ERROR_MAP[message]
              if (userMessage) {
                actions.setFieldError(userMessage.field, userMessage.message)
              } else {
                setCreateUpdateError(GENERIC_FAIL_MESSAGE)
              }
              actions?.setSubmitting(false)
              onError && onError(message)
            }

            const handleSuccess = savedAddress => {
              console.log(
                "🚀 ~ file: AddressModal.tsx ~ line 187 ~ savedAddress",
                savedAddress
              )
              // update default address only if isDefault changed or new
              // address marked ad default
              if (
                values?.isDefault &&
                values?.isDefault !== address?.isDefault
              ) {
                updateUserDefaultAddress(
                  relayEnvironment,
                  savedAddress?.createUserAddress?.userAddressOrErrors
                    ?.internalID || address?.internalID,
                  () => {
                    onSuccess(savedAddress)
                  },
                  onError
                )
              } else {
                onSuccess && onSuccess(savedAddress)
              }

              setCreateUpdateError(null)
            }
            const addressInput = convertShippingAddressToMutationInput(
              phoneNumber,
              values
            )

            if (createMutation) {
              createUserAddress(
                relayEnvironment,
                addressInput,
                handleSuccess,
                handleError,
                me,
                closeModal
              )
            } else {
              if (address?.internalID) {
                updateUserAddress(
                  relayEnvironment,
                  address.internalID,
                  addressInput,
                  closeModal,
                  handleSuccess,
                  handleError
                )
              }
            }
          }}
        >
          {(formik: FormikProps<SavedAddressType>) => (
            <form onSubmit={formik.handleSubmit}>
              <Text data-test="credit-card-error" color="red" my={2}>
                {createUpdateError}
              </Text>
              <AddressModalFields />
              <Spacer mb={2} />
              <Flex>
                <Box style={{ maxWidth: "35%" }}>
                  <Select
                    title="Phone number"
                    description="Only used for shipping purposes"
                    options={countries}
                    onSelect={cc => {
                      setCountryCode(cc)
                    }}
                    style={{
                      letterSpacing: "1px",
                      borderRight: "none",
                    }}
                  />
                </Box>
                <Flex
                  flexDirection="column"
                  style={{
                    width: "100%",
                  }}
                >
                  <Box height="100%"></Box>
                  <Input
                    title=""
                    description=""
                    placeholder={"Add phone number"}
                    name="phoneNumber"
                    type="tel"
                    onChange={formik.handleChange}
                    onBlur={e => {
                      mergeCountryCodeToPhoneNum(e.target.value)

                      formik.handleBlur
                    }}
                    error={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    value={formik.values?.phoneNumber ?? ""}
                    style={{ borderLeft: "none" }}
                  />
                </Flex>
              </Flex>

              <Spacer mb={2} />
              {(!address?.isDefault || createMutation) && (
                <Checkbox
                  onSelect={selected => {
                    formik.setFieldValue("isDefault", selected)
                  }}
                  selected={formik.values?.isDefault}
                  data-test="setAsDefault"
                >
                  Set as default
                </Checkbox>
              )}
              {!createMutation && (
                <Flex mt={2} flexDirection="column" alignItems="center">
                  <Clickable
                    data-test="deleteButton"
                    onClick={() => setShowDialog(true)}
                  >
                    <Text variant="text" color="red100">
                      Delete address
                    </Text>
                  </Clickable>
                </Flex>
              )}
              <Button
                data-test="saveButton"
                type="submit"
                size="large"
                loading={formik.isSubmitting}
                disabled={Object.keys(formik.errors).length > 0}
                width="100%"
                mt={2}
              >
                Save
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
      <Dialog
        title="Delete address?"
        detail="This will remove this address from your saved addresses."
        show={showDialog}
        primaryCta={{
          action: () => {
            setShowDialog(false)
            closeModal()
            if (address?.internalID) {
              onDeleteAddress(address.internalID)
            }
          },
          text: "Delete",
        }}
        secondaryCta={{
          action: () => {
            setShowDialog(false)
          },
          text: "Cancel",
        }}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}

export const StyledSelect = styled(Select)`
  > label {
    min-width: 400px;
    border: solid 1px hotpink;
  }
`
