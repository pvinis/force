/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import {  } from "relay-runtime";
export type OrderedSetLayouts = "DEFAULT" | "FULL" | "%future added value";
export type FeatureSetContainer_set = {
    readonly id: string;
    readonly layout: OrderedSetLayouts;
    readonly itemType: string | null;
    readonly orderedItems: {
        readonly edges: ReadonlyArray<{
            readonly __typename: string;
        } | null> | null;
    };
    readonly " $refType": "FeatureSetContainer_set";
};
export type FeatureSetContainer_set$data = FeatureSetContainer_set;
export type FeatureSetContainer_set$key = {
    readonly " $data"?: FeatureSetContainer_set$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FeatureSetContainer_set">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FeatureSetContainer_set",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "layout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "itemType",
      "storageKey": null
    },
    {
      "alias": "orderedItems",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 35
        }
      ],
      "concreteType": "OrderedSetItemConnection",
      "kind": "LinkedField",
      "name": "orderedItemsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "OrderedSetItemEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "orderedItemsConnection(first:35)"
    }
  ],
  "type": "OrderedSet",
  "abstractKey": null
};
(node as any).hash = 'dbc95ca1326c9724f65daa11cbf83c1d';
export default node;
