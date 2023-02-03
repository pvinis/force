/**
 * @generated SignedSource<<dc538273e4e698c95bfecbbe4ee2840e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CollectorProfileSaves2AllRoute_me$data = {
  readonly collectionsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly name: string;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "CollectorProfileSaves2AllRoute_me";
};
export type CollectorProfileSaves2AllRoute_me$key = {
  readonly " $data"?: CollectorProfileSaves2AllRoute_me$data;
  readonly " $fragmentSpreads": FragmentRefs<"CollectorProfileSaves2AllRoute_me">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectorProfileSaves2AllRoute_me",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 30
        }
      ],
      "concreteType": "CollectionsConnection",
      "kind": "LinkedField",
      "name": "collectionsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CollectionsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Collection",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "name",
                  "storageKey": null
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "collectionsConnection(first:30)"
    }
  ],
  "type": "Me",
  "abstractKey": null
};

(node as any).hash = "29090f73dd654ac124ccff23e4a46c89";

export default node;
