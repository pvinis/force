/**
 * @generated SignedSource<<845954cb7e9ebe4e5af1a104ae9f77d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderSourceEnum = "artwork_page" | "inquiry" | "private_sale" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_REVIEW" | "PENDING" | "PROCESSING_APPROVAL" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommercePaymentMethodEnum = "CREDIT_CARD" | "SEPA_DEBIT" | "US_BANK_ACCOUNT" | "WIRE_TRANSFER" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Review_order$data = {
  readonly artworkDetails: string | null;
  readonly code: string;
  readonly conditionsOfSale: string | null;
  readonly impulseConversationId: string | null;
  readonly internalID: string;
  readonly itemsTotal: string | null;
  readonly lineItems: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly artwork: {
          readonly artists: ReadonlyArray<{
            readonly slug: string;
          } | null> | null;
          readonly internalID: string;
          readonly slug: string;
        } | null;
        readonly " $fragmentSpreads": FragmentRefs<"ItemReview_lineItem">;
      } | null;
    } | null> | null;
  } | null;
  readonly mode: CommerceOrderModeEnum | null;
  readonly myLastOffer?: {
    readonly hasDefiniteTotal: boolean;
    readonly internalID: string;
  } | null;
  readonly paymentMethod: CommercePaymentMethodEnum | null;
  readonly source: CommerceOrderSourceEnum;
  readonly state: CommerceOrderStateEnum;
  readonly stateExpiresAt: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"AdditionalArtworkDetails_order" | "ArtworkSummaryItem_order" | "OfferSummaryItem_order" | "OrderStepper_order" | "PaymentMethodSummaryItem_order" | "ShippingArtaSummaryItem_order" | "ShippingSummaryItem_order" | "TransactionDetailsSummaryItem_order">;
  readonly " $fragmentType": "Review_order";
};
export type Review_order$key = {
  readonly " $data"?: Review_order$data;
  readonly " $fragmentSpreads": FragmentRefs<"Review_order">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Review_order",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "state",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artworkDetails",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "paymentMethod",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mode",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "code",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "source",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "conditionsOfSale",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "precision",
          "value": 2
        }
      ],
      "kind": "ScalarField",
      "name": "itemsTotal",
      "storageKey": "itemsTotal(precision:2)"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "impulseConversationId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "format",
          "value": "MMM D"
        }
      ],
      "kind": "ScalarField",
      "name": "stateExpiresAt",
      "storageKey": "stateExpiresAt(format:\"MMM D\")"
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommerceLineItemConnection",
      "kind": "LinkedField",
      "name": "lineItems",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceLineItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CommerceLineItem",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ItemReview_lineItem"
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "Artwork",
                  "kind": "LinkedField",
                  "name": "artwork",
                  "plural": false,
                  "selections": [
                    (v1/*: any*/),
                    (v0/*: any*/),
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artist",
                      "kind": "LinkedField",
                      "name": "artists",
                      "plural": true,
                      "selections": [
                        (v1/*: any*/)
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommerceOffer",
          "kind": "LinkedField",
          "name": "myLastOffer",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasDefiniteTotal",
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "type": "CommerceOfferOrder",
      "abstractKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtworkSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AdditionalArtworkDetails_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransactionDetailsSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PaymentMethodSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ShippingArtaSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OfferSummaryItem_order"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OrderStepper_order"
    }
  ],
  "type": "CommerceOrder",
  "abstractKey": "__isCommerceOrder"
};
})();

(node as any).hash = "8a942ae1c0810a549f305790a2c1049b";

export default node;
