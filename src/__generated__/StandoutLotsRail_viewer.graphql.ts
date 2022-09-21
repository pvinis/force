/**
 * @generated SignedSource<<addf4630fd0e95f6eb1bf549dc4bd418>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StandoutLotsRail_viewer$data = {
  readonly standoutLotsRailConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly internalID: string;
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"ShelfArtwork_artwork">;
      } | null;
    } | null> | null;
  } | null;
  readonly " $fragmentType": "StandoutLotsRail_viewer";
};
export type StandoutLotsRail_viewer$key = {
  readonly " $data"?: StandoutLotsRail_viewer$data;
  readonly " $fragmentSpreads": FragmentRefs<"StandoutLotsRail_viewer">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StandoutLotsRail_viewer",
  "selections": [
    {
      "alias": "standoutLotsRailConnection",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 50
        },
        {
          "kind": "Literal",
          "name": "forSale",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "geneIDs",
          "value": [
            "our-top-auction-lots"
          ]
        }
      ],
      "concreteType": "FilterArtworksConnection",
      "kind": "LinkedField",
      "name": "artworksConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "FilterArtworksEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Artwork",
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
                  "name": "slug",
                  "storageKey": null
                },
                {
                  "args": [
                    {
                      "kind": "Literal",
                      "name": "width",
                      "value": 325
                    }
                  ],
                  "kind": "FragmentSpread",
                  "name": "ShelfArtwork_artwork"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "artworksConnection(first:50,forSale:true,geneIDs:[\"our-top-auction-lots\"])"
    }
  ],
  "type": "Viewer",
  "abstractKey": null
};

(node as any).hash = "627efa328f2de06e4cccd9b7720b4980";

export default node;
